const { GoogleGenAI } = require("@google/genai");
const {
  conceptExplanationPrompt,
  questionAnswerPrompt,
} = require("../utils/prompts");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

const generateInterviewQuestions = async (req, res) => {
  console.log("API HIT!!");

  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }
    const prompt = questionAnswerPrompt(
      role,
      experience,
      topicsToFocus,
      numberOfQuestions
    );

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text;
    // console.log("Raw text from AI model:", rawText);

    if (!rawText) {
      return res.status(500).json({
        message: "Failed to generate questions",
        success: false,
        error: "No text returned from AI model",
      });
    }
    //Method:1
    // const cleanedText = rawText
    //   .replace(/^```json\s*/, "")
    //   .replace(/```$/, "")
    //   .trim();
    // const data = JSON.parse(cleanedText);

    // Method: 2;
    const cleanedText = rawText.replace(/```json\s*|\s*```/g, "").trim();
    const data = JSON.parse(cleanedText);

    //Method:3
    // const cleanedText = rawText
    //   .replace(/^```json\s*/, "")
    //   .replace(/```$/, "")
    //   .trim();
    // const startIndex = cleanedText.indexOf("[");
    // const endIndex = cleanedText.lastIndexOf("]");

    // if (startIndex === -1 || endIndex === -1) {
    //   return res.status(500).json({
    //     message: "Invalid AI response format",

    //     success: false,
    //   });
    // }

    // const jsonString = cleanedText.slice(startIndex, endIndex + 1);

    // let data;

    // try {
    //   data = JSON.parse(jsonString);
    // } catch (err) {
    //   console.error("JSON parsing error:", err.message);
    //   return res.status(500).json({
    //     message: "Failed to parse AI response",
    //     success: false,
    //     error: err.message,
    //   });
    // }
    // console.log("DATA: ", data);

    res.status(200).json({
      message: "Interview questions generated successfully",
      success: true,
      questions: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};
const generateConceptExplanation = async (req, res) => {
  const { question } = req.body;
  if (!question) {
    return res.status(400).json({
      message: "Question is required",
      success: false,
    });
  }
  try {
    const prompt = conceptExplanationPrompt(question);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
    });

    let rawText = response.text;
    // console.log("Raw text from AI model:", rawText);

    if (!rawText) {
      return res.status(500).json({
        message: "Failed to generate explanation",
        success: false,
        error: "No text returned from AI model",
      });
    }
    const cleanedText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();
    const data = JSON.parse(cleanedText);
    res.status(200).json({
      message: "Concept explanation generated successfully",
      success: true,
      explanation: data,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

module.exports = {
  generateInterviewQuestions,
  generateConceptExplanation,
};
