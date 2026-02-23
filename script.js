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

// ✅ Google Cloud TTS function
async function getVietnameseTTS(text) {
  const response = await fetch(
    "https://texttospeech.googleapis.com/v1/text:synthesize?key=AIzaSyAYGCAQcHUS5TmnOXXzWqq11MtbtevceCY",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: { text: text },
        voice: { languageCode: "vi-VN", name: "vi-VN-Wavenet-F" },
        audioConfig: { audioEncoding: "MP3" }
      })
    }
  );

  const data = await response.json();
  if (data.audioContent) {
    const audio = new Audio("data:audio/mp3;base64," + data.audioContent);
    audio.play();
  } else {
    console.error("TTS error:", data);
  }
}

function rollDie() {
  return animals[Math.floor(Math.random() * animals.length)];
}

function getAnimalEmoji(animal) {
  return animalEmojis[animal] || "🎲";
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
      getVietnameseTTS(animal); // ✅ use Google Cloud TTS
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
  getVietnameseTTS(message); // ✅ use Google Cloud TTS
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.6 }
  });
});
