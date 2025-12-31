const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Text Markup Language",
        b: "High Text Machine Language",
        c: "Hyperlinks Text Mark Language",
        d: "Home Tool Markup Language",
        correct: "a"
    },
    {
        question: "Which language is used for styling web pages?",
        a: "HTML",
        b: "JQuery",
        c: "CSS",
        d: "XML",
        correct: "c"
    },
    {
        question: "Which is a JavaScript framework?",
        a: "React",
        b: "Laravel",
        c: "Django",
        d: "Flask",
        correct: "a"
    },
    {
        question: "Inside which HTML element do we put JavaScript?",
        a: "<js>",
        b: "<script>",
        c: "<javascript>",
        d: "<code>",
        correct: "b"
    }
];

let currentQuiz = 0;
let score = 0;
let timeLeft = 15;
let timer;

const questionEl = document.getElementById("question");
const answersEls = document.querySelectorAll("input[name='answer']");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const nextBtn = document.getElementById("nextBtn");
const timeEl = document.getElementById("time");

loadQuiz();
startTimer();

function loadQuiz() {
    deselectAnswers();
    resetTimer();

    const currentData = quizData[currentQuiz];
    questionEl.innerText = currentData.question;
    a_text.innerText = currentData.a;
    b_text.innerText = currentData.b;
    c_text.innerText = currentData.c;
    d_text.innerText = currentData.d;
}

function deselectAnswers() {
    answersEls.forEach(answer => answer.checked = false);
}

function getSelected() {
    let answer;
    answersEls.forEach(ans => {
        if (ans.checked) {
            answer = ans.id;
        }
    });
    return answer;
}

nextBtn.addEventListener("click", () => {
    const answer = getSelected();
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            showResult();
        }
    }
});

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timeEl.innerText = timeLeft;

        if (timeLeft === 0) {
            currentQuiz++;
            if (currentQuiz < quizData.length) {
                loadQuiz();
            } else {
                showResult();
            }
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 15;
    timeEl.innerText = timeLeft;
    startTimer();
}

function showResult() {
    clearInterval(timer);
    document.getElementById("quiz").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");
    document.getElementById("scoreText").innerText =
        `You scored ${score} out of ${quizData.length}`;
}
