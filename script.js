document.addEventListener("DOMContentLoaded", async () => {
    const rankingDiv = document.getElementById("ranking");
    const submitButton = document.getElementById("submit");

    // 서버에서 랭킹 정보를 가져와서 표시하는 함수
    async function fetchAndDisplayRanking() {
        try {
            const response = await fetch("/api/ranking");
            const rankingData = await response.json();

            // 랭킹 정보를 HTML로 변환하여 표시
            const rankingHTML = rankingData.map((entry, index) => {
                return `<p>${index + 1}. ${entry.nickname} - Score: ${entry.score}</p>`;
            }).join("");

            rankingDiv.innerHTML = rankingHTML;
        } catch (error) {
            console.error("Error fetching ranking:", error);
        }
    }

const scoreInput = document.getElementById("score");

submitButton.addEventListener("click", async () => {
    const nickname = nicknameInput.value.trim();
    const score = parseInt(scoreInput.value);

    if (nickname && !isNaN(score)) {
        try {
            await fetch("/api/ranking", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nickname, score })
            });
            fetchAndDisplayRanking(); // 랭킹 정보 업데이트
            nicknameInput.value = "";
            scoreInput.value = "";
        } catch (error) {
            console.error("Error adding ranking:", error);
        }
    }
});

document.addEventListener("DOMContentLoaded", function () {
const submitButton = document.getElementById("submit");
    
const answerInput = document.getElementById("answer");
    
const resultMessage = document.getElementById("result-message");
    
const scoreDisplay = document.getElementById("score");
    
const questionDisplay = document.getElementById("quiz");
    
const nicknameDisplay = document.getElementById("nickname");
// 문제&답 설정
const questions = [
    {question: "How do you call a man without a body and a nose?", answer: "nobodynose"},
    {question: "What did the nose tell the finger?", answer: "stop picking on me"},
    {question: "What do you call a sick lemon? (includes -)", answer: "lemon-aid"},
    {question: "What do you call a toothless bear? (without article)", answer: "gummy bear"}
    // etc
]


//닉네임 설정
const nicknameInput = document.getElementById("nickname-input");
const setNicknameButton = document.getElementById("confirm");

if (setNicknameButton) {
    setNicknameButton.addEventListener("click", function() {
        setNicknameButton.addEventListener("click", function() {
            const nickname = nicknameInput.value.trim();
            if (nickname !== "") {
                nicknameDisplay.textContent = `Nickname: ${nickname}`;
                nicknameInput.value = "";
            }
        });
    });
}

function getCurrentQuestion() {
    if (currentQuestionIndex < remainingQuestions.length) {
        return remainingQuestions[currentQuestionIndex];
    } else {
        return null;
    }
}  

let score = 0;
let remainingQuestions = [];
let currentQuestionIndex = 0;
let correctAnswer;

function getRandomQuestion() {
    if (remainingQuestions.length === 0) {
    remainingQuestions = [...questions];
    }

const randomIndex = Math.floor(Math.random() * remainingQuestions.length);
const randomQuestion = remainingQuestions.splice(randomIndex, 1)[0];
    return randomQuestion;
}
    
function loadNextQuestion() {
    currentQuestionIndex++;
    const currentQuestion = getCurrentQuestion();

    if (currentQuestion) {
        questionDisplay.textContent = currentQuestion.question;
        answerInput.value = "";
        resultMessage.textContent = "";
        correctAnswer = currentQuestion.answer;
    } else {
        questionDisplay.textContent = "Over!";
        answerInput.disabled = true;
        submitButton.disabled = true;
    }
}

function initializeQuiz() {
    remainingQuestions = [...questions]
    currentQuestionIndex = 0;
    score = 0;
    questionDisplay.textContent = "";
    document.getElementById("quiz").textContent = "";
    answerInput.value = "";
    scoreDisplay.textContent = `score: ${score}`;
    resultMessage.textContent = "";
    
    loadNextQuestion();
}

document.addEventListener("DOMContentLoaded", () => {
    initializeQuiz();
    
//정답 로직
submitButton.addEventListener("click", async () => {
    const userAnswer = answerInput.value.trim();
    const currentQuestion = getCurrentQuestion();
    
    if (submitAnswer(userAnswer, currentQuestion.answer)) {
        resultMessage.textContent = "Correct!";
        resultMessage.style.fontSize = "24px";
        resultMessage.style.color = "green";
        score += 10;
    } else {
        resultMessage.textContent = "Incorrect. There is no again.";
        resultMessage.style.fontSize = "24px";
        resultMessage.style.color = "red";
        score -= 30;
        getRandomQuestion();
    }    
    scoreDisplay.textContent = `Score: ${score}`;
    loadNextQuestion();
});

score = Math.max(score, -1000);
    
answerInput.value = "";
scoreDisplay.textContent = `Score: ${score}`;
    
const nextAnswer = loadNextQuestion();
    if (nextAnswer === null) {
        resultMessage.textContent = "Over.";
        submitButton.disabled = true;
    }

//결과 메시지 ?초 후 지움
setTimeout(function() {
    resultMessage.textContent = "";
    }, 1500);
});
    
function getRandomQuestion() {
    currentQuestionIndex++;
    const currentQuestion = getRandomQuestion(); // 이 부분 수정

    if (currentQuestion) {
        questionDisplay.textContent = currentQuestion.question;
        answerInput.value = "";
        resultMessage.textContent = "";
        correctAnswer = currentQuestion.answer;
    } else {
        questionDisplay.textContent = "Over!";
        answerInput.disabled = true;
        submitButton.disabled = true;
    }
}
    
// 함수 정의
function submitAnswer(userAnswer, correctAnswer) {
    return userAnswer.toLowerCase() === correctAnswer.toLowerCase();
} 
    
// 엔터 키 => 제출 버튼
answerInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        submitButton.click();
    }
    });
});
    
// const score = parseInt(document.getElementById("score").value);
// const rankingList = document.getElementById("ranking-list");

async function fetchRanking() {
    try {
        const response = await fetch("/api/ranking");
        const rankingData = await response.json();

        if (response.ok) {
            displayRanking(rankingData);
        } else {
            console.error("Error fetching ranking");
        }
    } catch (error) {
        console.error("Error fetching ranking:", error);
    }
}

function displayRanking(rankingData) {
    // rankingData 배열에 서버로부터 받은 랭킹 정보가 들어있습니다.
    // 필요한 로직 추가 (예: 화면에 랭킹 정보 표시)
    const rankingHTML = rankingData.map((entry, index) => {
        return `<p>${index + 1}. ${entry.nickname} - Score: ${entry.score}`;
    }).join("");

    rankingDiv.innerHTML = rankingHTML;
}

// 페이지 로드 시 초기 랭킹 정보를 가져와 표시합니다.
document.addEventListener("DOMContentLoaded", fetchRanking);
});