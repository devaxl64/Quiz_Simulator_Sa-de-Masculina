let questions = [];
let index = 0;
let score = 0;

fetch('data/questions.json')
  .then(r => r.json())
  .then(data => questions = data);

function show(id) {
  ['home','quiz','feedback','loading','result'].forEach(s =>
    document.getElementById(s).classList.add('d-none')
  );
  document.getElementById(id).classList.remove('d-none');
}

function startQuiz() {
  index = 0;
  score = 0;
  loadQuestion();
  show('quiz');
}

function loadQuestion() {
  document.getElementById('question').innerText =
    questions[index].question;
}

function answer(val) {
  const correct = val === questions[index].answer;
  if (correct) score++;

  document.getElementById('feedback').innerHTML = `
    <h4 class="${correct ? 'text-success' : 'text-danger'}">
      ${correct ? 'Resposta correta!' : 'Resposta incorreta'}
    </h4>
    <p>${questions[index].info}</p>
    <button class="btn btn-primary mt-3" onclick="next()">Continuar</button>
  `;

  show('feedback');
}

function next() {
  index++;
  if (index < questions.length) {
    loadQuestion();
    show('quiz');
  } else {
    show('loading');
    setTimeout(showResult, 600);
  }
}

function showResult() {
  let msg = '';
  if (score <= 3) msg = 'Baixo desempenho. Informação salva vidas.';
  else if (score <= 5) msg = 'Você passou, mas pode melhorar!';
  else if (score <= 7) msg = 'Bom resultado!';
  else if (score <= 9) msg = 'Excelente!';
  else msg = 'Perfeito!';

  document.getElementById('result').innerHTML = `
    <h2 class="text-primary">Resultado Final</h2>
    <p class="fs-4"><strong>${score}/10</strong></p>
    <p>${msg}</p>
    <button class="btn btn-outline-primary mt-3" onclick="show('home')">
      Reiniciar
    </button>
  `;

  show('result');
}
