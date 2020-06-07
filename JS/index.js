(function () {
  let lastIntervalId;
  let count = 5;

  showMsg(false, 1, function () {
    document.querySelector("#messageOverlay").style.display = "none";
    lastIntervalId = restartCounter();
  });

  document.querySelector("#antiCheatingBtn").addEventListener("mousedown", function () {
    stopCounter(5, lastIntervalId);
  });

  document.querySelector("#antiCheatingBtn").addEventListener("mouseup", function () {
    lastIntervalId = restartCounter(lastIntervalId);
  });

  document.querySelector("#antiCheatingBtn").addEventListener("mouseleave", function () {
    lastIntervalId = restartCounter(lastIntervalId);
  });

  document.querySelector("#form").addEventListener("mousemove", function () {
    stopCounter(5, lastIntervalId);
    lastIntervalId = restartCounter(lastIntervalId);
  })

  document.querySelector("#form").addEventListener("mouseout", function () {
    lastIntervalId = restartCounter(lastIntervalId);
  })

  document.querySelectorAll("#formChoice").forEach(function (element) {
    element.addEventListener("click", function () {
      document.querySelectorAll("#formChoice").forEach(function (element) {
        element.classList.remove("form__choice--active");
      });

      element.classList.add("form__choice--active");
    });
  });

  document.querySelector("#formButton").addEventListener("click", function () {
    let choseOne = false;
    document.querySelectorAll("#formChoice").forEach(function (element) {
      if (element.classList.contains("form__choice--active")) {
        choseOne = true;
      }
    })
    if (choseOne) {
      showMsg("Whatever, this is not important. What matters is your code not the editor.😇");
    } else {
      showMsg("Well, you have got to choose an answer.");
    }
  });

  function showMsg(msgTxt, overlayOpacity = 0.7, closingCallback, canBeClosed = true) {
    document.querySelector("#messageBoxText").innerText = msgTxt ? msgTxt : document.querySelector("#messageBoxText").innerText;
    document.querySelector("#messageOverlay").style.display = "block";
    document.querySelector("#messageOverlay").style.backgroundColor = `rgba(0, 0, 0, ${overlayOpacity})`;

    if (!closingCallback) {
      closingCallback = function () {
        document.querySelector("#messageOverlay").style.display = "none";
      };
    }

    if (!canBeClosed) {
      document.querySelector("#messageBoxCloseIcon").style.display = "none";
    }

    document.querySelector("#messageBoxCloseIcon").addEventListener("click", closingCallback);
  }

  function stopCounter(newCount, prevIntervalId) {
    clearInterval(prevIntervalId);
    count = newCount;
    document.querySelector("#counter").innerText = newCount;
  }

  function restartCounter(prevIntervalId) {
    clearInterval(prevIntervalId);
    return setInterval(function () {
      if (count == 0) {
        showMsg("You can no longer complete this test, you were considered cheating.", 1, void(0), false);
        clearInterval(lastIntervalId);
      } else {
        count--;
        document.querySelector("#counter").innerText = count;
      }
    }, 1000);
  }
})();