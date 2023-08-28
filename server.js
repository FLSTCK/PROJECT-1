const express = require("express");
const { connect, Schema, model } = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// 몽고DB 연결 설정
connect("mongodb://localhost/rankingDB", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

app.use(express.json());

// app.get("/api/ranking", (req,res) => {
//     res.json(rankingData);
// });

// app.get('/', (req, res) => {
//   res.send('Hello, World!');
// });

// 스키마 정의
const rankingSchema = new Schema({
    nickname: String,
    score: Number
});

// 모델 생성
const Ranking = model("Ranking", rankingSchema);

app.use(bodyParser.json());

// 게임 종료 시 호출되는 함수
async function endGame(username, score) {
    const newRanking = new Ranking({ nickname: username, score });

    try {
        await newRanking.save();
        console.log('Ranking saved');
        // 랭킹 정보 표시 로직 추가
        displayRankings();
      } catch (err) {
        console.error('Error saving ranking:', err);
      }
  }
// newRanking
//   .save()
//   .then(() => {
//     console.log('Ranking saved');
//     displayRankings(); // 랭킹 정보 표시
//   })
//   .catch((err) => {
//     console.error('Error saving ranking:', err);
//   });


// 랭킹 정보 조회 후 화면에 표시하는 함수
function displayRankings() {
    Ranking.find()
    .sort({ score: -1 })
    .limit(10)
    .then((rankings) => {
        console.log('Top 10 rankings:', rankings);
        // 화면에 랭킹 정보를 표시하는 로직 추가
    })
      .catch((err) => {
        console.error('Error fetching rankings:', err);
      });
}

// 랭킹 정보 요청에 응답하는 API 엔드포인트 추가
app.get("/api/ranking", async (req, res) => {
    try {
      const ranking = await Ranking.find().sort({ score: -1 }).limit(10);
      res.json(ranking);
    } catch (error) {
      console.error("Error fetching ranking:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});

// 랭킹 정보 추가 요청에 응답하는 API 엔드포인트 추가
app.post("/api/ranking", async (req, res) => {
    try {
        const { nickname, score } = req.body;
        const newRanking = new Ranking({ nickname, score });
        await newRanking.save();
        res.status(201).json({ message: "Ranking added successfully" });
    } catch (error) {
        console.error("Error adding ranking:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

const userSchema = new Schema({
    username: String,
    email: String
});

const User = model("User", userSchema);

// 모델 사용 예시
const newUser = new User({ username: 'john', email: 'john@example.com' });
newUser.save()
  .then(() => {
    console.log('User saved');
  })
  .catch((err) => {
    console.error('Error saving user:', err);
});

Ranking.find().sort({ score: -1 }).limit(10)
  .then((rankings) => {
    console.log('Top 10 rankings:', rankings);
// 화면에 랭킹 정보 표시하는 로직 추가
  })
  .catch((err) => {
    console.error('Error fetching rankings:', err);
  });