document.addEventListener("DOMContentLoaded", async () => {
    // const rankingDiv = document.getElementById("ranking");
    const rankingList = document.getElementById("ranking-list");
    const confettiCanvas = document.getElementById('confetti');
    const popupContainer = document.getElementById("popup-container");
    const nicknameInput = document.getElementById("nickname-input");
    const startButton = document.getElementById("start-button");
    const nicknameDisplay = document.getElementById("nickname-display");

    async function fetchAndDisplayRanking() {
        try {
          const response = await fetch(`/api/ranking`);
          const rankingData = await response.json();
      
          // 가져온 랭킹 정보를 화면에 표시합니다.
          rankingList.innerHTML = "";
          rankingData.forEach((entry, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `<span>${index + 1}. ${entry.nickname}</span><span>${entry.score}</span>`;
            rankingList.appendChild(listItem);
          });
        } catch (error) {
          console.error("Error fetching ranking:", error);
        }
    }

    // 팝업을 표시하는 함수
    function showPopup() {
        popupContainer.style.display = "flex";
    }

    function setNickname() {
        const nickname = nicknameInput.value.trim();
        if (nickname !== "") {
            localStorage.setItem("userNickname", nickname);
            updateNicknameDisplay();
            popupContainer.style.display = "none";
        }
    }

    function getUserNickname() {
        const savedNickname = localStorage.getItem("userNickname");
        return savedNickname || "Guest";
    }

    function updateNicknameDisplay() {
        const userNickname = getUserNickname();
        nicknameDisplay.textContent = `Nickname: ${userNickname}`;
    }

    startButton.addEventListener("click", setNickname);

    const closeButton = document.getElementById("close-button");
    
    closeButton.addEventListener("click", () => {
        // popupContainer.style.display = "none";
        const nickname = nicknameInput.value.trim();
        if (nickname !== "") {
            localStorage.setItem("nickname", nickname);
            closePopup();
    
            getRandomQuestion();
    
            startGame(nickname);
        }
    });

    let confettiContext;

    if (confettiCanvas) {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
        confettiContext = confettiCanvas.getContext("2d");
    }

    const canvasWidth = confettiCanvas.width;
    const canvasHeight = confettiCanvas.height;

        function animateConfetti() {

            confettiContext.clearRect(0, 0, canvasWidth, canvasHeight);
            // 콘페티 랜덤으로 그리기
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * canvasWidth;
                const y = Math.random() * canvasHeight;
                const size = Math.random() * 5 + 2;
    
                confettiContext.fillStyle = "rgba(255, 215, 0, 0.8)";
                confettiContext.fillRect(x, y, size, size);
            }
            requestAnimationFrame(animateConfetti);
        }
        window.addEventListener("load", () => {
            fetchAndDisplayRanking();
            updateNicknameDisplay();
            animateConfetti();
        });
    });

    async function fetchRanking() {
        try {
            const response = await fetch("/api/ranking");
            const rankingData = await response.json();

            rankingList.innerHTML = "";
            rankingData.forEach((entry, index) => {
              const listItem = document.createElement("li");
              listItem.textContent = `${index + 1}. ${entry.nickname} - ${entry.score}`;
              rankingList.appendChild(listItem);
            });
        } catch (error) {
          console.error("Error fetching ranking:", error);
        }
    }

    //fetchRanking();

    function initializeAndShowPopup() {
        const savedNickname = localStorage.getItem("nickname");
        if (!savedNickname || savedNickname.trim() === "") {
            showPopup();
        } else {
            startGame(savedNickname);
        }
    }

    document.addEventListener("DOMContentLoaded", initializeAndShowPopup);

    startButton.addEventListener("click", () => {
        const nickname = nicknameInput.value.trim();
        if (nickname !== "") {
            localStorage.setItem("nickname", nickname);
            closePopup();

            getRandomQuestion();

            startGame(nickname);
        }
    });

    // 팝업을 닫는 함수
    function closePopup() {
        popupContainer.style.display = "none";
    }

function isNicknameSet() {
    const savedNickname = localStorage.getItem("nickname");
    return savedNickname !== null && savedNickname.trim() !== "";
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchRanking();
});

function checkNickname() {
    const savedNickname = localStorage.getItem("nickname");
    return !savedNickname || savedNickname.trim() === "";
}

// 팝업을 표시하는 함수
function showPopup() {
    const popupContainer = document.getElementById("popup-container");
    popupContainer.style.display = "flex";
}

// 팝업을 초기화하는 함수
function initializePopup() {
    const nicknameInput = document.getElementById("nickname-input");
    nicknameInput.value = "";
    showPopup();
}

// main.js 내에서 팝업 초기화를 호출하는 로직
if (checkNickname()) {
    initializePopup();
}

function isNicknameSet() {
    const savedNickname = localStorage.getItem("nickname");
    return savedNickname !== null && savedNickname.trim() !== "";
}

document.addEventListener("DOMContentLoaded", async () => {
    await fetchRanking();
});

fetchRanking();

function startGame() {

}

// 팝업 창 열기 조건 확인
if (!isNicknameSet()) {
    showPopup();
} else {
    const savedNickname = localStorage.getItem("nickname");
    startGame(savedNickname);
}

// 서버 API 엔드포인트 URL
const rankingApiUrl = "/api/ranking";

// 페이지 로드 시 초기 랭킹 정보를 가져와 표시합니다.
window.addEventListener("load", fetchRanking)

// 랭킹 정보 가져오기
fetch('/api/ranking')
    .then(response => response.json())
    .then(data => {
        rankingList.innerHTML = '';
        data.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${index + 1}. ${entry.nickname}</span><span>${entry.score}점</span>`;
            rankingList.appendChild(li);
        });
    })
    .catch(error => {
        console.error('Error fetching ranking:', error);


        // 팝업을 열기 위한 조건을 확인하는 함수
        function checkNickname() {
            const savedNickname = localStorage.getItem("nickname");
            if (savedNickname) {
                // 이미 닉네임이 설정된 경우
                return true;
            }
            return false;
        }
        // 페이지 로드 시 팝업 표시 여부 결정
        if (!checkNickname()) {
            showPopup();
        }
    });
  
if (!isNicknameSet()) {
    showPopup();
} else {
    const savedNickname = localStorage.getItem("nickname");
    startGame(savedNickname);
}

startButton.addEventListener("click", () => {
    const nickname = nicknameInput.value.trim();
    if (nickname !=="") {
        localStorage.setItem("nickname",nickname);
        closePopup();
        initializeQuiz();
    }
});

fetch('/api/ranking')
    .then(response => response.json())
    .then(data => {
        rankingList.innerHTML = '';
        data.forEach((entry, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span>${index + 1}. ${entry.nickname}</span><span>${entry.score}점</span>`;
            rankingList.appendChild(li);
        });

        // 팝업 시작 버튼 클릭 시 이벤트 처리
        const startButton = document.getElementById("start-button");
        startButton.addEventListener("click", () => {
            const nickname = nicknameInput.value.trim();
            if (nickname !== "") {
                localStorage.setItem("nickname", nickname);
                closePopup();

                getRandomQuestion();

                startGame(nickname);
            }
        });

        // 페이지 로드 시 팝업 표시 여부 결정
        if (!checkNickname()) {
            showPopup();
        }

        const confettiCanvas = document.getElementById('confetti');
        const confettiContext = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        function animateConfetti() {
            confettiContext.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
            // 콘페티 랜덤으로 그리기
            for (let i = 0; i < 100; i++) {
                const x = Math.random() * confettiCanvas.width;
                const y = Math.random() * confettiCanvas.height;
                const size = Math.random() * 5 + 2;
        
                confettiContext.fillStyle = "rgba(255, 215, 0, 0.8)";
                confettiContext.fillRect(x, y, size, size);
            }
            requestAnimationFrame(animateConfetti);
        }

        animateConfetti();
    })
    .catch(error => {
        console.error('Error fetching ranking:', error);
});

window.addEventListener("load", fetchRanking);

