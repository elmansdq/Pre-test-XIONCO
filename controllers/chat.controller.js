require("dotenv").config();
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

exports.sendMessage = async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    return res.json({
      reply: text,
    });
  } catch (error) {
    console.log("ERROR:", error);

    return res.status(500).json({
      reply: "AI error",
    });
  }
};
