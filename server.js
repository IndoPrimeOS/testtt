const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

// Ganti dengan API key kamu
const API_KEY = "jg-207376f9eea872657e34996ffbeba0d9e679c3044cc81ecb5d44d960b6bdf308";

app.post("/chat", async (req, res) => {
  try {
    const userMessage = req.body.message || "Hello!";

    const response = await axios.post(
      "https://gate.joingonka.ai/v1/chat/completions",
      {
        model: "MiniMaxAI/MiniMax-M2.7",
        messages: [{ role: "user", content: userMessage }]
      },
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.json(response.data);
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong" });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`AI Proxy running on port ${PORT}`);
});
