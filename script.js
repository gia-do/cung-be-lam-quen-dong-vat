const diceElements = document.querySelectorAll(".die");
const resultDisplay = document.getElementById("result");

// Động vật bằng tiếng Việt
const animals = ["Tôm", "Cua", "Cá", "Lợn", "Gà", "Hươu"];
const animalEmojis = {
  Tôm: "🦐",
  Cua: "🦀",
  Cá: "🐟",
  Lợn: "🐖",
  Gà: "🐓",
  Hươu: "🦒"
};
const animalColors = {
  Tôm: ['#ff69b4', '#ffb6c1'],
  Cua: ['#ff0000', '#ff4500'],
  Cá: ['#1e90ff', '#00ced1'],
  Lợn: ['#ffc0cb', '#ff69b4'],
  Gà: ['#ffff00', '#ffd700'],
  Hươu: ['#daa520', '#f4a460']
};

function rollDie() {
  return animals[Math.floor(Math.random() * animals.length)];
}

function getAnimalEmoji(animal) {
  return animalEmojis[animal] || "🎲";
}

// Đọc bằng giọng tiếng Việt (Google TTS nếu có)
function speakText(text) {
  const utterance = new SpeechSynthesisUtterance(text);
  const voices = speechSynthesis.getVoices();

  // Try to find a Google Vietnamese voice
  const vietnameseVoice = voices.find(v =>
    v.lang === "vi-VN" && v.name.toLowerCase().includes("google")
  );

  if (vietnameseVoice) {
    utterance.voice = vietnameseVoice;
  } else {
    // fallback if no Google Vietnamese voice is found
    utterance.lang = "vi-VN";
  }

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

// Nút Xóc
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
    resultDisplay.textContent = "Kết quả: " + rolledAnimals.join(", ");
    launchMultiConfetti(rolledAnimals);
  }, 6000);
});

// Nút Chúc mừng
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

// ✅ Put this at the very bottom of script.js
function listVoices() {
  const voices = speechSynthesis.getVoices();
  voices.forEach((voice, i) => {
    console.log(i + ": " + voice.name + " (" + voice.lang + ")");
  });
}

// Voices may load asynchronously
speechSynthesis.onvoiceschanged = listVoices;
