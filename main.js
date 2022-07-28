// Select Elements
let countSpan = document.querySelector(".count span");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit-button");
let bulletsSec = document.querySelector(".bullets");

let currentIndex = 0;
let rightAnswers = 0;

function getQuestions() {
  let myRequest = new XMLHttpRequest();

  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      let questionsObject = JSON.parse(this.responseText);
      let qCount = questionsObject.length;

      // create bullets  + set question count
      createBullets(qCount);
      // Add Question Data
      addQuestionData(questionsObject[currentIndex], qCount);

      submitButton.onclick = () => {
        let theRightAnswer = questionsObject[currentIndex].right_answer;
        currentIndex++;

        checkAnswer(theRightAnswer, qCount);

        quizArea.innerHTML = "";
        answersArea.innerHTML = "";
        addQuestionData(questionsObject[currentIndex], qCount);

        handleBullets();
        showResults(qCount);
      };
    }
  };

  myRequest.open("GET", "html_questions.json", true);
  myRequest.send();
}
getQuestions();

function createBullets(num) {
  countSpan.innerHTML = num;
  // create spans
  for (let i = 0; i < num; i++) {
    let span = document.createElement("span");
    if (i === 0) {
      span.className = "on";
    }
    bulletsSpanContainer.appendChild(span);
  }
}

function addQuestionData(obj, count) {
  if(currentIndex < count ){
      // create H3 Title Of Question
  let questionTitle = document.createElement("h3");

  // Create Question Text
  let questionTitleText = document.createTextNode(obj.title);
  // Append Text to H3
  questionTitle.appendChild(questionTitleText);
  // Append H3 to Html
  quizArea.appendChild(questionTitle);

  // Add Question To Html

  for (let i = 1; i <= 4; i++) {
    let answerDiv = document.createElement("div");
    answerDiv.className = "answer";

    let radioInput = document.createElement("input");
    radioInput.name = "question";
    radioInput.type = "radio";
    radioInput.id = `answer_${i}`;
    radioInput.dataset.answer = obj[`answer_${i}`];

    if (i === 1) {
      radioInput.checked = true;
    }
 
    let theLabel = document.createElement("label");
    theLabel.htmlFor = `answer_${i}`;
    let labelText = document.createTextNode(obj[`answer_${i}`]);
    theLabel.appendChild(labelText);

    answerDiv.appendChild(radioInput);
    answerDiv.appendChild(theLabel);

    answersArea.appendChild(answerDiv);
  }
  }
}

function checkAnswer(rightAnswer, count) {
  let answers = document.getElementsByName("question");
  let chosenAnswer;
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      chosenAnswer = answers[i].dataset.answer;
    }
  }
  if (chosenAnswer === chosenAnswer) {
    rightAnswers++;
  }
}

function handleBullets() {
  let bulletsSpans = document.querySelectorAll(".bullets .spans span");
  let arrayOfSpans = Array.from(bulletsSpans);
  arrayOfSpans.forEach((span, index) => {
    if (index === currentIndex) {
      span.className = "on";
    }
  });
}

function showResults(count){
    let theResult  ; 
if(currentIndex === count){
 quizArea.remove();
 answersArea.remove();
 submitButton.remove();
 bulletsSec.remove();
}
}