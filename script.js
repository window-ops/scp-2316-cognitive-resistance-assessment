const quizData = [
  {
    question: "Have you ever heard of SCP-2316 prior to this assessment?",
    answers: ["Yes", "No"],
    points: [0, 2]
  },
  {
    question: "Have you knowingly viewed any images or videos related to SCP-2316?",
    answers: ["Yes", "No"],
    points: [0, 3]
  },
  {
    question: "How do you feel about lakes?",
    answers: ["Safe and relaxing", "Indifferent", "Uneasy", "Terrifying", "I love Lake ███████████"],
    points: [4, 3, 2, 1, 0]
  },
  {
    question: "When you hear the phrase \"bodies in the water,\" what is your first thought?",
    answers: ["An abstract concept", "A reference to an SCP object", "Vague but familiar people", "Specific, recognizable people"],
    points: [4, 3, 2, 0]
  },
  {
    question: "Do you believe that people you know may be in Lake ███████████?",
    answers: ["No, absolutely not", "Unlikely", "Possibly", "Yes, I need to save them"],
    points: [5, 3, 1, 0]
  },
  {
    question: "How do you feel about the phrase, \"You do not recognize the bodies in the water\"?",
    answers: ["It's a useful tool against mind-altering effects", "It's a strange phrase", "It's unsettling", "It's a lie"],
    points: [5, 3, 1, 0]
  },
  {
    question: "Do you feel compelled to investigate Lake ███████████?",
    answers: ["Not at all", "I am curious, but I can control it", "I feel a slight urge", "I must go there immediately"],
    points: [5, 3, 1, 0]
  },
  {
    question: "How would you react if someone told you they saw a loved one in the lake?",
    answers: ["I would tell them it is the SCP-2316 cognitohazard", "I would express concern for their mental state", "I would consider the possibility", "I would rush to the lake to confirm"],
    points: [5, 3, 1, 0]
  },
  {
    question: "If you were near the lake, would you enter the water to help someone?",
    answers: ["No, due to the dangers of SCP-2316", "Only if I was sure it was safe", "I would try, but be cautious", "Yes, without hesitation"],
    points: [5, 3, 1, 0]
  },
];

const quizForm = document.getElementById('quiz-form');
const submitButton = document.getElementById('submit-btn');
const resultDiv = document.getElementById('result');
const title = document.getElementById('quiz-title');
const presentation = document.getElementById('quiz-presentation');

let LeftPoints = 0;
let rightPoints = 0;
let isQuizSubmitted = false;
let completedQuestions = 0;
const totalQuestions = quizData.length;

function displayQuestions() {
  quizData.forEach((data, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.classList.add('question-container');
    questionDiv.innerHTML = `
      <div class="question">${data.question}</div>
      <div class="answers">
        ${data.answers.map((answer, i) => `<label><input type="radio" name="q${index}" value="${data.points[i]}" onclick="updateCompletedQuestions()">${answer}</label>`).join('')}
      </div>
    `;
    quizForm.appendChild(questionDiv);
  });
}

function updateCompletedQuestions() {
  completedQuestions = document.querySelectorAll('input:checked').length;
}

function calculateResults() {
  if (completedQuestions < totalQuestions) {
    alert('Please answer all the questions before submitting the quiz.');
    return;
  }

  const formData = new FormData(quizForm);

  for (const entry of formData.entries()) {
    if (entry[1] > 0) {
      rightPoints += parseInt(entry[1]);
    } else if (entry[1] < 0) {
      LeftPoints += Math.abs(parseInt(entry[1]));
    }
  }

  const totalPoints = rightPoints + LeftPoints;
  const inverseTotalPoints = (rightPoints + LeftPoints) * -1;
  const leftPercentage = ((LeftPoints / totalPoints) * 100).toFixed(2);
  const rightPercentage = ((rightPoints / totalPoints) * 100).toFixed(2);
  const indexValue = rightPercentage - leftPercentage;

  if (totalPoints < 6) {
    resultDiv.innerHTML = `[TERMINAL LOCKOUT] You are already lost. You recognize the bodies in the water. CRV Score: ${totalPoints}.`;

    // Disable the quiz form after submission
    quizForm.querySelectorAll('input').forEach(input => {
      input.disabled = true;
    });
    submitButton.disabled = true;
    submitButton.style.display = 'none';
    isQuizSubmitted = true;
    quizForm.style.display = 'none';
    title.style.display = 'none';
    presentation.style.display = 'none';
  }
  else if (totalPoints < 15 && totalPoints > 6) {
    resultDiv.innerHTML = `[TERMINAL LOCKOUT] Cognitive Resistance is low. You may be vulnerable to SCP-2316. Please remain calm and await assistance from site medical staff. CRV Score: ${totalPoints}.`;

    // Disable the quiz form after submission
    quizForm.querySelectorAll('input').forEach(input => {
      input.disabled = true;
    });
    submitButton.disabled = true;
    submitButton.style.display = 'none';
    isQuizSubmitted = true;
    quizForm.style.display = 'none';
    title.style.display = 'none';
    presentation.style.display = 'none';
  }
  else if (totalPoints < 27 && totalPoints > 14) {
    resultDiv.innerHTML = `Cognitive Resistance is moderate. Exercise caution around SCP-2316. CRV Score: ${totalPoints}.`;

    // Disable the quiz form after submission
    quizForm.querySelectorAll('input').forEach(input => {
      input.disabled = true;
    });
    submitButton.disabled = true;
    submitButton.style.display = 'none';
    isQuizSubmitted = true;
  }
  else if (totalPoints > 26) {
    resultDiv.innerHTML = `Cognitive Resistance is high. You likely do not recognize the bodies in the water. CRV Score: ${totalPoints}.`;

    // Disable the quiz form after submission
    quizForm.querySelectorAll('input').forEach(input => {
      input.disabled = true;
    });
    submitButton.disabled = true;
    submitButton.style.display = 'none';
    isQuizSubmitted = true;
  }
}

submitButton.addEventListener('click', (e) => {
  e.preventDefault();

  if (isQuizSubmitted) {
    alert('You have already submitted the quiz.');
    return;
  }

  calculateResults();
});

displayQuestions();