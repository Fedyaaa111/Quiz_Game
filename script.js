const startBtn = document.querySelector('.strat-btn');
const popupInfo = document.querySelector('.popup-info');
const exitBtn = document.querySelector('.exit-btn');
const main = document.querySelector('.main');
const contiuneBtn = document.querySelector('.contiune-btn');
const quizSection = document.querySelector('.section-quiz');
const quizBox = document.querySelector('.quiz-box');
const resultBox = document.querySelector('.result-box');
const timeCount = document.querySelector('.timerBox');











startBtn.onclick = () => {
    popupInfo.classList.add('active');
    main.classList.add('active');
}
exitBtn.onclick = () => {
    popupInfo.classList.remove('active');
    main.classList.remove('active');
}
contiuneBtn.onclick = () => {
    quizSection.classList.add('active');
    popupInfo.classList.remove('active');
    main.classList.remove('active');
    quizSection.classList.add('active');

    showQuestions(0);
    questionCounter(1);
    headerScore();
    startTimer(15);
}





let questionCout = 0;
let questionNumb = 1;
let userScore = 0;






const nextBtn = document.querySelector('.next-btn');

nextBtn.onclick = () => {
    if (questionCout < questions.length - 1) {
        questionCout++;
        showQuestions(questionCout);
        questionNumb++;
        questionCounter(questionNumb);
        nextBtn.classList.remove('active')
        clearInterval(counter);
        startTimer(timeValue);
    } else {
        showResultBox();
    }
}

const optionList = document.querySelector('.option-list');

function showQuestions(index) {
    const questionText = document.querySelector('.question-text');
    questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

    let optionTag =
        `<div class="option"><span>${questions[index].options[0]}</span></div>` +
        `<div class="option"><span>${questions[index].options[1]}</span></div>` +
        `<div class="option"><span>${questions[index].options[2]}</span></div>` +
        `<div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute('onclick', 'optionSelected(this)');
    }
}


function optionSelected(answer) {
    clearInterval(counter);
    let userAnswer = answer.textContent;
    let correctAnswer = questions[questionCout].answer;
    let allOptions = optionList.children.length;

    if (userAnswer == correctAnswer) {
        answer.classList.add('correct');
        userScore += 1
        headerScore();
    }
    else {
        answer.classList.add('incorrect');
        for (let i = 0; i < allOptions; i++) {
            if (optionList.children[i].textContent === correctAnswer) {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    }
    for (let i = 0; i < allOptions; i++) {
        optionList.children[i].classList.add('disabled');
    }
    nextBtn.classList.add('active');
}



function questionCounter(index) {
    const questionTotal = document.querySelector('.question-total');
    questionTotal.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore() {
    const headerScoreText = document.querySelector('.header-score');
    headerScoreText.textContent = `Score: ${userScore} / ${questions.length}`;
}


function showResultBox() {
    resultBox.classList.add('active');
    quizBox.remove();

    const scoreText = document.querySelector('.score-text');
    scoreText.textContent = `Your Score ${userScore} out of ${questions.length}`

    const circularProgress = document.querySelector('.circular-progress');
    const progressValue = document.querySelector('.progress-value');
    let progressStartValue = -1;
    let progressEndValue = (userScore / questions.length) * 100;
    let speed = 20;
    let progress = setInterval(() => {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        circularProgress.style.background = `conic-gradient(#c40094 ${progressStartValue * 3.6}deg, rgba(255,255,255,.1)0deg)`;
        if (progressStartValue == progressEndValue) {
            clearInterval(progress);
        }
    }, speed)
}


let counter;
let timeValue = 15;

function startTimer(time){
    counter = setInterval(timer, 1000);
    function timer(){
        timeCount.textContent = time;
        time--;
        if(time < 0){
           clearInterval(counter);
           timeCount.textContent = '0';
           quizBox.remove();
           quizSection.classList.add('active');
           quizSection.innerHTML = 'Your Lose';
           quizSection.style.fontSize = '50px';
        }
    }
}