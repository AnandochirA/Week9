// Each answer is worth 1-4 points (data-answer). Total ranges from 4 to 16.
const RESULTS = [
  {
    maxScore: 6,
    emoji: "🧭",
    title: "The Explorer",
    description: "You're curious and adventurous. You love new experiences and never turn down a chance to see what's around the corner.",
  },
  {
    maxScore: 9,
    emoji: "🎨",
    title: "The Artist",
    description: "You're imaginative and expressive. You see the world differently and turn your feelings into something beautiful.",
  },
  {
    maxScore: 12,
    emoji: "👑",
    title: "The Leader",
    description: "You're confident and decisive. People naturally look to you to organize, motivate, and get things done.",
  },
  {
    maxScore: 16,
    emoji: "🧠",
    title: "The Thinker",
    description: "You're analytical and thoughtful. You dig deep, weigh your options, and always have a well-reasoned take.",
  },
];

const questionBlocks = document.querySelectorAll(".question-block");
const showResultsBtn = document.getElementById("show-results");
const resultContainer = document.getElementById("result-container");

// Maps question number -> points of the selected answer
const selectedAnswers = {};

function selectAnswer(block, clickedBtn) {
  const buttons = block.querySelectorAll(".answer-btn");
  for (const btn of buttons) {
    btn.classList.remove("selected");
  }
  clickedBtn.classList.add("selected");
  selectedAnswers[block.dataset.question] = Number(clickedBtn.dataset.answer);
}

function getResult(score) {
  return RESULTS.find((result) => score <= result.maxScore);
}

function displayResult() {
  if (Object.keys(selectedAnswers).length < questionBlocks.length) {
    resultContainer.innerHTML = `
      <div class="alert alert-warning">Please answer all ${questionBlocks.length} questions first.</div>`;
    return;
  }

  const score = Object.values(selectedAnswers).reduce((sum, points) => sum + points, 0);
  const result = getResult(score);

  resultContainer.innerHTML = `
    <div class="card result-card shadow-sm">
      <div class="card-body">
        <div class="result-emoji">${result.emoji}</div>
        <h2 class="card-title">You are ${result.title}!</h2>
        <p class="card-text">${result.description}</p>
        <p class="text-muted mb-0">Your score: ${score}</p>
      </div>
    </div>`;
}

questionBlocks.forEach((block) => {
  block.querySelectorAll(".answer-btn").forEach((btn) => {
    btn.addEventListener("click", () => selectAnswer(block, btn));
  });
});

showResultsBtn.addEventListener("click", displayResult);
