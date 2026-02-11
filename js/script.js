const questions = [
  { text: "Cuidar da saúde do homem significa ir ao posto mesmo sem estar doente.", answer: true },
  { text: "Homens só devem procurar a UBS quando sentem dor.", answer: false },
  { text: "A saúde do homem inclui corpo, mente e vida social.", answer: true },
  { text: "O uso de camisinha ajuda a prevenir ISTs.", answer: true }
];

let current = 0;
let score = 0;

function startQuiz() {
  showScreen("quiz");
  loadQuestion();
}

function loadQuestion() {
  document.getElementById("questionText").innerText = questions[current].text;
  document.getElementById("doctorImg").src = "assets/doctor-normal.png";
}

function answer(choice) {
  const correct = questions[current].answer === choice;
  const doctor = document.getElementById("doctorImg");

  if (correct) {
    score++;
    doctor.src = "assets/doctor-happy.png";
  } else {
    doctor.src = "assets/doctor-sad.png";
  }

  setTimeout(() => {
    current++;
    if (current < questions.length) {
      loadQuestion();
    } else {
      finishQuiz();
    }
  }, 1000);
}

function finishQuiz() {
  showScreen("end");
  document.getElementById("scoreText").innerText =
    `Você acertou ${score} de ${questions.length} perguntas!`;
}

function restart() {
  current = 0;
  score = 0;
  showScreen("start");
}

function showScreen(id) {
  document.querySelectorAll(".screen").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}
