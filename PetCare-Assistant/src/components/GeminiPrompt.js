import { GoogleGenerativeAI } from "@google/generative-ai";

const getRecommendations = async (prompt) => {
  try {
    const genAI = new GoogleGenerativeAI("AIzaSyDaYFh_n9WVsA62klkxIcS9aBLnn2NOAWc"); // Replace with your actual API key
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const defaultPrompt = "Provide exercise, playtime, diet recommendations, and care tips for: ";
    const finalPrompt = `${defaultPrompt}${prompt}`;

    const result = await model.generateContent(finalPrompt);
    const text = result.response.text();

    // Clean up the text (you may modify this as needed)
    const cleanedText = text.replace(/\*/g, "");
    
    return cleanedText; // Return cleaned recommendations
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw new Error('An error occurred while fetching recommendations.');
  }
};

export default getRecommendations;