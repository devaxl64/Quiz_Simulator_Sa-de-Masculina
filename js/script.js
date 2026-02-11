let questions = [];
let current = 0;
let score = 0;

fetch('data/questions.json')
  .then(r => r.json())
  .then(data => questions = data);

function setDoctor(imageName) {
  document.querySelectorAll('.doctor').forEach(img => {
    img.src = `assets/${imageName}`;
  });
}

function show(id) {
  ['intro', 'quiz', 'feedback', 'result'].forEach(p =>
    document.getElementById(p).classList.add('hidden')
  );
  document.getElementById(id).classList.remove('hidden');
}

function startGame() {
  current = 0;
  score = 0;
  loadQuestion();
  show('quiz');
}

function loadQuestion() {
  document.getElementById('question-text').innerText =
    questions[current].question;

  setDoctor('doctor-normal.png');
}


function answer(value) {
  const q = questions[current];
  const correct = value === q.answer;

  if (correct) {
    score++;
    setDoctor('doctor-happy.png');
  } else {
    setDoctor('doctor-sad.png');
  }

  document.getElementById('feedback-title').innerText =
    correct ? 'Você acertou!' : 'Você errou!';

  document.getElementById('feedback-text').innerText =
    q.info;

  show('feedback');
}


function next() {
  current++;
  if (current < questions.length) {
    loadQuestion();
    show('quiz');
  } else {
    showResult();
  }
}

// function showResult() {
//   document.getElementById('score').innerText =
//     `Pontuação: ${score} / ${questions.length}`;

//   let msg = '';
//   if (score <= 3)
//     msg = 'Baixo desempenho. Informação é o primeiro passo.';
//   else if (score <= 5)
//     msg = 'Você passou, mas pode melhorar!';
//   else if (score <= 7)
//     msg = 'Bom resultado! Continue se cuidando.';
//   else if (score <= 9)
//     msg = 'Excelente desempenho!';
//   else
//     msg = 'Perfeito! Consciência total sobre a saúde do homem.';

//   document.getElementById('final-message').innerText = msg;
//   show('result');
// }

function showResult() {
  document.getElementById('score').innerText =
    `Pontuação: ${score} / ${questions.length}`;

  let msg = '';

  if (score <= 3)
    msg = 'Baixo desempenho. Informação é o primeiro passo.';
  else if (score <= 5)
    msg = 'Você passou, mas pode melhorar!';
  else if (score <= 7)
    msg = 'Bom resultado! Continue se cuidando.';
  else if (score <= 9)
    msg = 'Excelente desempenho!';
  else
    msg = 'Perfeito! Consciência total sobre a saúde do homem.';

  document.getElementById('final-message').innerText = msg;

  // 👇 ALTERAÇÃO DO DOUTOR FINAL
  if (score >= 7) {
    setDoctor('doctor-final.png');
  } else {
    setDoctor('doctor-sad.png');
  }

  show('result');
}


function restart() {
  show('intro');
}
