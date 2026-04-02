const { GoogleGenerativeAI } = require('@google/generative-ai');

// @desc    Chat with AI Study Buddy
// @route   POST /api/ai/chat
// @access  Private
const aiChat = async (req, res) => {
  try {
    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ message: 'Please provide a prompt' });
    }
    
    const API_KEY = process.env.GEMINI_API_KEY;
    if(!API_KEY || API_KEY === 'your_gemini_api_key_here') {
       return res.status(500).json({ message: 'Gemini API Key not configured properly on the server.' });
    }

    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });

    // Provide context to the AI about its role
    const systemInstruction = "You are an AI Study Buddy for a student. You explain topics simply, help with homework, and provide encouraging, positive study advice.";
    const fullPrompt = `${systemInstruction}\n\nStudent: ${prompt}\n\nStudy Buddy:`;

    const result = await model.generateContent(fullPrompt);
    const response = await result.response;
    const text = response.text();

    res.status(200).json({ reply: text });
  } catch (error) {
    console.error('AI Chat Error:', error);
    res.status(500).json({ message: 'Failed to communicate with AI service', error: error.message });
  }
};

module.exports = {
  aiChat,
};
