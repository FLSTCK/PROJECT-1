// client.js
document.addEventListener("DOMContentLoaded", async () => {
    const rankingList = document.getElementById("ranking-list");
    const confettiCanvas = document.getElementById("confetti-canvas");
    let confettiContext;

        if (confettiCanvas) {
            confettiCanvas.width = window.innerWidth;
            confettiCanvas.height = window.innerHeight;
            confettiContext = confettiCanvas.getContext("2d");
        }

        async function fetchAndDisplayRanking() {
            try {
                const response = await fetch("/api/ranking");
                const rankingData = await response.json();

                rankingList.innerHTML = "";

                rankingData.forEach((entry, index) => {
                    const listItem = document.createElement("li");
                    listItem.innerHTML = `<span>${index + 1}. ${entry.nickname}</span><span>${entry.score}점</span>`;
                    rankingList.appendChild(listItem);
                });
            } catch (error) {
                console.error("Error fetching ranking:", error);
            }
        }
        fetchAndDisplayRanking();

        // 콘페티 애니메이션
        function animateConfetti() {
            if (confettiContext) {
            confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

            const topRankColors = ["gold", "silver", "bronze"];

            if (startButton) {
                startButton.addEventListener("click", () => {
                    const nicknameInput = document.getElementById("nickname-input");
                    const nickname = nicknameInput.value.trim();
                    showPopup();
                });
            }

            requestAnimationFrame(animateConfetti);
        }
    }

    animateConfetti();

    //닉네임 관련 기능

    const nicknameDisplay = document.getElementById("nickname-display");
    const popupContainer = document.getElementById("popup-container");
    const startButton = document.getElementById("start-button");
    const nicknameInput = document.getElementById("nickname-input");

    // 사용자 닉네임 가져오기
    function getUserNickname() {
        const savedNickname = localStorage.getItem("userNickname");
        return savedNickname || "Guest"; // 기본값: Guest
    }

    // 닉네임 표시 업데이트
    function updateNicknameDisplay() {
        const userNickname = getUserNickname();
        nicknameDisplay.textContent = `Nickname: ${userNickname}`;
    }

    function showPopup() {
        popupContainer.style.display = "flex";
    }

    startButton.addEventListener("click", async () => {
        const nickname = nicknameInput.value.trim();

        if (nickname !== "") {
            localStorage.setItem("userNickname", nickname);
            updateNicknameDisplay();
            popupContainer.style.display = "none";
        }
    });

    // 닉네임 설정 버튼 클릭 시 팝업 보여주기
    const setNicknameButton = document.getElementById("nickname-input");
    if (setNicknameButton) {
        setNicknameButton.addEventListener("click", () => {
            showPopup();
        });
    } else {
        console.error("setNicknameButton not found in the DOM");
    }
});

    async function loadRandomQuestion() {
        const randomQuestion = await getRandomQuestion();
        if (randomQuestion) {
            questionDisplay.textContent = randomQuestion.question;
            correctAnswer = randomQuestion.answer;
        } else {
            questionDisplay.textContent = "Over!";
            answerInput.disabled = true;
            submitButton.disabled = true;
        }
    }

