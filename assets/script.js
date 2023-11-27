const questions = [
  {
    question: "What is the primary purpose of JavaScript in web development??",
    answers: ["Styling", "Markup", "Behavior", "Layout"],
    correctAnswer: "Behavior"
  },
  {
    question: "Which keyword is used to declare variables that can be reassigned in JavaScript?",
    answers: ["const", "let", "var", "for"],
    correctAnswer: "let"
  },
  
  {
    question: "What does DOM stand for in the context of web development?",
    answers: ["Document Object Model", "Data Object Model", "Document Order Model", "Document Offset Model"],
    correctAnswer: "Document Object Model"
  },
  
  {
    question: "Which of the following methods is used to select an HTML element using its ID in JavaScript?",
    answers: ["getElementById()", "querySelector()", "getElementsByClassName()", "querySelectorAll()"],
    correctAnswer: "getElementById()"
  },
  
  {
    question: "What is the purpose of the addEventListener method in JavaScript?",
    answers: [" To create variables", "To manipulate the DOM", "To declare functions", "To handle events"],
    correctAnswer: "To handle events"
  },
  
  {
    question: "Which operator is used for strict equality comparison in JavaScript?",
    answers: ["==", "===", "=", "!="],
    correctAnswer: "==="
  },
  
  {
    question: "What is the role of a callback function in JavaScript?",
    answers: ["To handle errors", "To perform calculations", "To define variables", "To execute asynchronous code"],
    correctAnswer: "To execute asynchronous code"
  },
  
  {
    question: "What is the purpose of the JSON.stringify method in JavaScript?",
    answers: ["To parse JSON", "To fetch data from a server", "To create a JSON object", "To convert a JavaScript object to a JSON      string"],
    correctAnswer: "To convert a JavaScript object to a JSON string"
  },
  
  {
    question: "Which of the following is used to loop through the elements of an array in JavaScript?",
    answers: ["for (let i = 0; i < array.length; i++)", "foreach (item in array)", "for (item of array)", "while (item in array)"],
    correctAnswer: "for (item of array)"
  },
  
  {
    question: "What does the acronym AJAX stand for in web development?",
    answers: ["Advanced JavaScript and XML", "Asynchronous JavaScript and XML", "Asynchronous JSON and XML", "Advanced JSON and XML"],
    correctAnswer: "Asynchronous JavaScript and XML"
  },
  {
    question: "How can you prevent the default behavior of an HTML form submission using JavaScript",
    answers: ["stopPropagation()", "preventDefault()", "return false;", "stopSubmission()"],
    correctAnswer: "preventDefault()"
  },
  
  {
    question: "What is the purpose of the async keyword in a function declaration in JavaScript",
    answers: ["To declare asynchronous functions", "To define global variables", "To create a callback function", "To handle errors"],
    correctAnswer: "To declare asynchronous functions"
  },
  
  {
    question: "Which method is used to make an asynchronous HTTP request in JavaScript?",
    answers: ["fetch()", "ajax()", "get()", "sendRequest()"],
    correctAnswer: "fetch()"
  },
  
  {
    question: "In JavaScript, what is the significance of the this keyword?",
    answers: ["It refers to the current date and time", "It refers to the parent function", "It refers to the current HTML element", "It refers to the current object or context"],
    correctAnswer: "It refers to the current object or context"
  },
  
  {
    question: "What is the purpose of the splice method in JavaScript arrays?",
    answers: ["To remove elements from an array", "To add elements to an array", "To reverse the elements of an array", "To sort the elements of an array"],
    correctAnswer: "To remove elements from an array"
  },
  
  {
    question: "What is the difference between null and undefined in JavaScript?",
    answers: ["They are interchangeable and have the same meaning", "null is an object, and undefined is a type", "null represents the absence of a value, and undefined is the default value of uninitialized variables", "null is a keyword, and undefined is a function"],
    correctAnswer: "null represents the absence of a value, and undefined is the default value of uninitialized variables"
  },
  
  {
    question: "What does the acronym ES6 stand for in JavaScript?",
    answers: ["Extended Style 6", "ECMAScript 6", "Efficient Syntax 6", "Element Selector 6"],
    correctAnswer: "ECMAScript 6"
  },
  
  {
    question: "Which keyword is used to exit a loop prematurely in JavaScript?",
    answers: ["exit", "break", "return", "stop"],
    correctAnswer: "return"
  },
  
  {
    question: "How is prototypal inheritance implemented in JavaScript?",
    answers: ["Through classes and objects", "Through constructors and prototypes", "Through modules and namespaces", "Through functions and closures"],
    correctAnswer: "Through constructors and prototypes"
  },
  
  {
    question: "What is the purpose of the setTimeout function in JavaScript?",
    answers: ["To set a timer for asynchronous operations", "To delay the execution of a function", "To set the duration of an animation", "To measure the time elapsed during code execution"],
    correctAnswer: "To delay the execution of a function"
  },
];

// I plan to add a randomizer that will randomize the order of the questions.
// I will also get the restart game feature working (currently commented out).
// There are also minor cosmetic features I would like to add/change.

let currentQuestionIndex = 0;
let score = 0;
let timerCount = 40;
let timerInterval;

function startQuiz() {
  showQuestion();
  startTimer();
}

function showQuestion() {
  const questionContainer = document.getElementById("question-container");
  const answersContainer = document.getElementById("answers-container");
  const currentQuestion = questions[currentQuestionIndex];

  questionContainer.textContent = currentQuestion.question;
  answersContainer.innerHTML = "";

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.onclick = () => checkAnswer(answer);
    answersContainer.appendChild(button);
  });
}

function startTimer() {
  timerInterval = setInterval(() => {
    document.getElementById("timer-count").textContent = timerCount;
    if (timerCount === 0) {
      endQuiz();
    } else {
      timerCount--;
    }
  }, 1000);
}

function checkAnswer(selectedOption) {
  const currentQuestion = questions[currentQuestionIndex];
  if (selectedOption === currentQuestion.correctAnswer) {
    score++;
    document.getElementById("score-count").textContent = score;
  }

  nextQuestion();
}

function nextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    endQuiz();
  }
}

// Until I get the restart button to work properly, I have has removed this function
// function restartGame() {
//   currentQuestionIndex = 0;
//   score = 0;
//   timerCount = 40;
//   showQuestion();
//   startTimer();
//   document.getElementById("initials-container").style.display = "none";
// }

function endQuiz() {
  clearInterval(timerInterval);

  document.getElementById("initials-container").style.display = "block";
  // document.getElementById("action-button").textContent = "Restart Game";

  alert("All done! Your score is: " + score);
}


function submitScore() {
  const initials = document.getElementById("initials").value;
  if (initials.trim() !== "") {
    const scoreData = {
      initials: initials.toUpperCase(),
      score: score
    };

    const existingScores = JSON.parse(localStorage.getItem("quizScore")) || [];
    existingScores.push(scoreData);
    localStorage.setItem("quizScore", JSON.stringify(existingScores));
    alert("Score submitted! Initials: " + initials + ", Score: " + score);
  } else {
    alert("Please enter your initials.");
  }
}

startQuiz();