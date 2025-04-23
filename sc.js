document.addEventListener("DOMContentLoaded", function () {
  const playerListDiv = document.getElementById("player-list");
  const predictionArea = document.getElementById("prediction-area");
  const fieldDiv = document.getElementById("field");
  const resetPredictionButton = document.getElementById("reset-prediction");
  const playerTemplateArea = document.getElementById("player-template-area");
  const playerTemplateName = document.getElementById("template-name");
  const playerTemplatePosition = document.getElementById("template-position");
  const closeTemplateButton = document.getElementById("close-template");
  const players = [];
  let selectedPlayer = null;

  // Create player buttons and add event listeners
  playerListDiv.querySelectorAll(".player").forEach((button) => {
    button.addEventListener("click", function () {
      if (players.length < 11 && !players.includes(this.textContent)) {
        players.push(this.textContent);
        const playerIcon = document.createElement("div");
        playerIcon.classList.add("player-icon");
        playerIcon.textContent = this.textContent.charAt(0).toUpperCase();
        const playerNameTooltip = document.createElement("span");
        playerNameTooltip.textContent = this.textContent;
        playerIcon.appendChild(playerNameTooltip);
        playerIcon.draggable = true;
        fieldDiv.appendChild(playerIcon);
        this.disabled = true; // Disable button after clicking
        predictionArea.classList.remove("hidden");
      } else if (players.length >= 11) {
        alert("You have already selected 11 players!");
      } else if (players.includes(this.textContent)) {
        alert("This player has already been selected!");
      }
    });
  });

  // Drag and drop functionality
  fieldDiv.addEventListener("dragstart", function (event) {
    selectedPlayer = event.target;
    event.dataTransfer.setData("text", ""); // Set data for transfer
  });

  fieldDiv.addEventListener("dragover", function (event) {
    event.preventDefault();
  });

  fieldDiv.addEventListener("drop", function (event) {
    if (
      event.target.classList.contains("player-icon") &&
      event.target !== selectedPlayer
    ) {
      // Logic to swap positions between icons (optional)
      const tempText = event.target.textContent;
      event.target.textContent = selectedPlayer.textContent;
      selectedPlayer.textContent = tempText;

      const tempTooltip = event.target.querySelector("span").textContent;
      event.target.querySelector("span").textContent =
        selectedPlayer.querySelector("span").textContent;
      selectedPlayer.querySelector("span").textContent = tempTooltip;
    } else if (event.target === fieldDiv) {
      // Logic to update player position if dropped elsewhere in the field (if needed)
    }
    selectedPlayer = null;
  });

  // Show template on player icon click
  fieldDiv.addEventListener("click", function (event) {
    if (event.target.classList.contains("player-icon")) {
      const playerName = event.target.querySelector("span").textContent;
      const playerPosition = getPlayerPosition(event.target); // Function to get position
      playerTemplateName.textContent = playerName;
      playerTemplatePosition.textContent = playerPosition;
      playerTemplateArea.classList.remove("hidden");
    }
  });

  // Helper function to get player position based on field layout
  function getPlayerPosition(element) {
    // Here you can determine the position based on the field's grid layout
    // This is an example, update it to match your field layout
    const index = Array.from(fieldDiv.children).indexOf(element);
    const rows = 3; // Number of grid columns in your field
    const col = index % rows;
    const row = Math.floor(index / rows);

    // Creating a simple position label
    if (row === 0) {
      return col === 1 ? "Goalkeeper" : "Defender";
    } else if (row === 1) {
      return "Midfielder";
    } else {
      return "Forward";
    }
  }

  resetPredictionButton.addEventListener("click", function () {
    players.length = 0; // Clear the players array
    fieldDiv.innerHTML = ""; // Remove player icons from the field
    predictionArea.classList.add("hidden");
    playerTemplateArea.classList.add("hidden");
    playerListDiv.querySelectorAll(".player").forEach((button) => {
      button.disabled = false; // Re-enable player buttons
    });
  });

  closeTemplateButton.addEventListener("click", function () {
    playerTemplateArea.classList.add("hidden");
  });
});
