document.addEventListener("DOMContentLoaded", function () {
  const body = document.body;
  const textElement = document.getElementById("myText");
  const changeBgButton = document.getElementById("changeBg");
  const changeColorButton = document.getElementById("changeColor");
  const changeSpacingButton = document.getElementById("changeSpacing");
  const changeTextButton = document.getElementById("changeText");

  const backgrounds = ["#a8dadc", "#457b9d", "#1d3557", "#f1faee"];
  let bgIndex = 0;
  const colors = ["#e63946", "#f4a261", "#2a9d8f", "#e9c46a"];
  let colorIndex = 0;
  let spacingIncreased = false;
  const texts = [
    "Hi, This is Mejbaul Mubin",
    "Hello, Noakhali!",
    "How are you?",
    "The weather is nice today.",
    "Thank you!",
  ];
  let textIndex = 0;

  changeBgButton.addEventListener("click", function () {
    bgIndex = (bgIndex + 1) % backgrounds.length;
    body.style.backgroundColor = backgrounds[bgIndex];
  });

  changeColorButton.addEventListener("click", function () {
    colorIndex = (colorIndex + 1) % colors.length;
    textElement.style.color = colors[colorIndex];
  });

  changeSpacingButton.addEventListener("click", function () {
    if (spacingIncreased) {
      textElement.style.letterSpacing = "normal";
      spacingIncreased = false;
    } else {
      textElement.style.letterSpacing = "10px";
      spacingIncreased = true;
    }
  });

  changeTextButton.addEventListener("click", function () {
    textIndex = (textIndex + 1) % texts.length;
    textElement.textContent = texts[textIndex];
  });
});
