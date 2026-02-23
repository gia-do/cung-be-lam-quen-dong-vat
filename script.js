const diceElements = document.querySelectorAll(".die");
const resultDisplay = document.getElementById("result");

// Animal mapping
const animals = ["Shrimp", "Crab", "Fish", "Pig", "Chicken", "Giraffe"];
const animalEmojis = {
  Shrimp: "🦐",
  Crab: "🦀",
  Fish: "🐟",
  Pig: "🐖",
  Chicken: "🐓",
  Giraffe: "🦒"
};
const animalColors = {
  Shrimp: ['#ff69b4', '#ffb6c1'],
  Crab: ['#ff0000', '#ff4500'],
  Fish: ['#1e90ff', '#00ced1'],
  Pig: ['#ffc0cb', '#ff69b4'],
  Chicken: ['#ffff00', '#ffd700'],
  Giraffe: ['#daa520', '#f4a460']
};

function rollDie() {
  return animals[Math.floor(Math.random() * animals.length)];
}

function getAnimalEmoji(animal) {
  return animalEmojis[animal] || "🎲";
}

function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US"; // change to "vi-VN" for Vietnamese
  speechSynthesis.speak(utterance);
}

function launchMultiConfetti(animalsRolled) {
  const colors = animalsRolled.flatMap(animal => animalColors[animal] || []);
  confetti({
    particleCount: 150,
    spread: 100,
    origin: { y: 0.6 },
    colors: colors
  });
}

// Roll button logic
document.getElementById("rollButton").addEventListener("click", () => {
  diceElements.forEach(die => {
    die.textContent = "🎲";
    die.classList.add("rolling");
  });

  setTimeout(() => {
    const rolledAnimals = [];
    diceElements.forEach(die => {
      const animal = rollDie();
      die.textContent = getAnimalEmoji(animal);
      rolledAnimals.push(animal);
      speakText(animal);
      die.classList.remove("rolling");
    });
    resultDisplay.textContent = "Result: " + rolledAnimals.join(", ");
    launchMultiConfetti(rolledAnimals);
  }, 6000);
});

// Celebrate button logic
document.getElementById("celebrateButton").addEventListener("click", () => {
  const listText = document.getElementById("congratsList").value;
  const congratulationsList = listText.split("\n").filter(line => line.trim() !== "");
  const randomIndex = Math.floor(Math.random() * congratulationsList.length);
  const message = congratulationsList[randomIndex];
  speakText(message);
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
});
