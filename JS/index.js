// Wrapped the whole thing inside a self-invoked
// function to prevent any malicious manipulation
// of the variables or anything else.
(function () {
  // Used to stop intervals to
  // prevent having more
  // than one active interval.
  let allIntervalsIDs = [];

  // The number in seconds before user
  // is considered cheating if not active
  // on the page.
  let originalCount = 5;

  let count = originalCount;

  // Used to remove click event listener
  // from the closing icon of the message
  // to be able add new one and function
  // properly.
  let latestClosingCallback;

  // Shows a message at the start of the
  // test to tell the user info needed to
  // complete the test.
  showMsg(false, 1, welcomeMessageClosingCallback);

  // Stop the counter on clicking the anti-cheating
  // button at the bottom of the questions form.
  document.querySelector("#antiCheatingBtn").addEventListener("mousedown", function (event) {
    // Prevent stoping the counter programatically
    // using the isTrusted property.
    if (event.isTrusted) {
      stopCounter(5);
    }
  });

  // Restart the counter on releasing the anti-cheating
  // button, or moving away from it or moving away from the
  // form.
  document.querySelector("#antiCheatingBtn").addEventListener("mouseup", restartCounterForUser);
  document.querySelector("#antiCheatingBtn").addEventListener("mouseleave", restartCounterForUser);
  document.querySelector("#form").addEventListener("mouseleave", restartCounterForUser)

  // Stop the counter if mouse moves inside the form
  // to consider the situation in which the user is
  // not clicking the anti-cheating button but trying
  // to choose an answer.
  document.querySelector("#form").addEventListener("mousemove", mouseMoveInsideFormHandler)

  // Attach event listener for all choices to
  // chose an answer on clicking any of them.
  document.querySelectorAll(".form__choice").forEach(function (element) {
    element.addEventListener("click", function () {
      // Remove the active class from all of them
      document.querySelectorAll(".form__choice").forEach(function (element) {
        element.classList.remove("form__choice--active");
      });

      // Then add it to the only clicked one.
      element.classList.add("form__choice--active");
    });
  });

  // Form submission.
  document.querySelector("#formButton").addEventListener("click", function () {
    let choseOne = false;

    document.querySelectorAll(".form__choice").forEach(function (element) {
      // Make sure that the user chose an answer
      if (element.classList.contains("form__choice--active")) {
        choseOne = true;
      }
    })

    if (choseOne) {
      stopCounter(5);
      stopAllAntiCheatingEventListeners();
      showMsg("Whatever, this is not important. What matters is your code not the editor.😇");
    } else {
      showMsg("Well, you have got to choose an answer.");
    }
  });

  // A function to show popup messages to the user
  function showMsg(msgTxt, overlayOpacity = 0.7, closingCallback, canBeClosed = true) {
    // Leave the message text not changed if
    // no new message text is passed
    document.querySelector("#messageBoxText").innerText = msgTxt ? msgTxt : document.querySelector("#messageBoxText").innerText;

    document.querySelector("#messageOverlay").style.display = "block";
    document.querySelector("#messageOverlay").style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;

    // Set the callback for clicking the
    // close button on the message to close it
    // if no new callback is passed.
    if (!closingCallback) {
      closingCallback = function () {
        document.querySelector("#messageOverlay").style.display = "none";
      };
    }

    // Hide the close button if the message
    // can not be closed.
    if (!canBeClosed) {
      document.querySelector("#messageBoxCloseIcon").style.display = "none";
    }

    // Remove click event listener from the
    // closing icon of the message if the
    // latest callback used to add it is defined
    if (latestClosingCallback) {
      document.querySelector("#messageBoxCloseIcon").removeEventListener("click", latestClosingCallback);
    }

    latestClosingCallback = closingCallback;
    document.querySelector("#messageBoxCloseIcon").addEventListener("click", closingCallback);
  }

  function stopCounter(newCount) {
    // Stop all intervals
    clearAllIntervals();

    count = newCount;
    document.querySelector("#counter").innerText = newCount;
  }

  function restartCounter(prevIntervalId) {
    // Stop all intervals
    clearAllIntervals();

    // Start a new interval and
    // store its id in allIntervalsIDs
    // array to be used later to stop it.
    let intervalID = setInterval(function () {
      // Consider user cheating if count reaches 0
      if (count == 0) {
        showMsg("You can no longer complete this test, you were considered cheating.", 1, void(0), false);
        clearAllIntervals();
      } else {
        count--;
        document.querySelector("#counter").innerText = count;
      }
    }, 1000);

    allIntervalsIDs.push(intervalID);
  }

  // A function used as callback
  // when events indicating the user
  // existence in the page are fired.
  function restartCounterForUser() {
    count = originalCount;
    restartCounter();
  }

  function clearAllIntervals() {
    allIntervalsIDs.forEach(function (intervalID, index) {
      clearInterval(intervalID);
      allIntervalsIDs.splice(index, 1);
    });
  }

  function stopAllAntiCheatingEventListeners() {
    document.querySelector("#antiCheatingBtn").removeEventListener("mouseup", restartCounterForUser);
    document.querySelector("#antiCheatingBtn").removeEventListener("mouseleave", restartCounterForUser);
    document.querySelector("#form").removeEventListener("mouseleave", restartCounterForUser);
    document.querySelector("#form").removeEventListener("mousemove", mouseMoveInsideFormHandler);
  }

  function mouseMoveInsideFormHandler(event) {
    if (event.isTrusted) {
      stopCounter(5);
      restartCounter();
    }
  }

  function welcomeMessageClosingCallback() {
    // Hide the message and start the counter
    // on closing this popup.
    document.querySelector("#messageOverlay").style.display = "none";
    restartCounter();
  }
})();