document.querySelectorAll(".form__choice").forEach(function (element) {
  element.addEventListener("click", function (event) {
    document.querySelectorAll(".form__choice").forEach(function (element) {
      element.classList.remove("form__choice--active");
    });

    element.classList.add("form__choice--active");
  });
});

document.querySelector(".form__button").addEventListener("click", function () {
  let choseOne = false;
  document.querySelectorAll(".form__choice").forEach(function (element) {
    if (element.classList.contains("form__choice--active")) {
      choseOne = true;
    }
  })
  if (choseOne) {
    showMsg("Whatever, this is not important. What matters is your code not the editor.😇")
  } else {
    showMsg("Well, you have got to choose an answer.")
  }
});

document.querySelector(".message-box__close-icon").addEventListener("click", function () {
  document.querySelector(".message-overlay").style.display = "none";
});

function showMsg(msgTxt) {
  document.querySelector(".message-box__text").innerText = msgTxt;
  document.querySelector(".message-overlay").style.display = "block";
}