const axios = require("axios");
require("dotenv").config();

async function listModels() {
  try {
    const res = await axios.get(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`
    );

    console.log("AVAILABLE MODELS:");
    console.log(res.data);
  } catch (err) {
    console.log("ERROR:", err.response?.data || err.message);
  }
}

listModels();