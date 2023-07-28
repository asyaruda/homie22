const questionsContainer = document.getElementById('questions-container');
const checkButton = document.getElementById('check-btn');

fetch('/questions')
  .then(response => response.json())
  .then(questions => {
    questions.forEach((question, index) => {
      const questionElement = document.createElement('div');
      questionElement.innerHTML = `
        <p>${index + 1}. ${question.caption}</p>
        <label>
          <input type="radio" name="question${index}" value="true"> Так
        </label>
        <label>
          <input type="radio" name="question${index}" value="false"> Ні
        </label>
      `;
      questionsContainer.appendChild(questionElement);
    });

    const submitButton = document.getElementById('check-btn');
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    const resultElement = document.getElementById('result');

    submitButton.addEventListener('click', () => {
      const userAnswers = [];
      questions.forEach((question, index) => {
        const answer = document.querySelector(`input[name="question${index}"]:checked`);
        if (answer) {
          userAnswers.push(answer.value === 'true');
        }
      });

      fetch('/checkAnswers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userAnswers)
      })
        .then(response => response.json())
        .then(result => {
          resultElement.textContent = `Ваш результат: ${result.score} из ${questions.length}`;
        })
        .catch(error => console.error('Помилка при відправці відповідей:', error));
    });

    radioButtons.forEach(radioButton => {
      radioButton.addEventListener('change', () => {
        const allQuestionsAnswered = Array.from(radioButtons).every(button => button.checked);
        submitButton.disabled = !allQuestionsAnswered;
      });
    });
  })
  .catch(error => console.error('Помилка при отриманні питань:', error));