const Groq = require("groq-sdk");

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

const generateContent = async (req, res) => {
    try {
        const { prompt } = req.body;

        if (!process.env.GROQ_API_KEY) {
            // MOCK RESPONSE if no API key
            const mockResponse = [
                {
                    "summary": "This is a mock summary for a Mid Level position. It demonstrates how the AI would return suggestions.",
                    "experience_level": "Mid Level"
                },
                {
                    "summary": "This is another mock summary for a Senior Level position. The backend is correctly mocking the AI behavior.",
                    "experience_level": "Senior Level"
                }
            ];
            return res.json({ result: JSON.stringify(mockResponse) });
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: "You are a helpful assistant. When asked to return JSON, return ONLY the raw JSON without any markdown formatting, code blocks, or additional text."
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            model: "qwen/qwen3-32b",
        });

        let text = chatCompletion.choices[0]?.message?.content || "";

        // Remove <think>...</think> tags (Qwen reasoning)
        text = text.replace(/<think>[\s\S]*?<\/think>/gi, '').trim();

        // Extract JSON from markdown code block if present
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)```/);
        if (jsonMatch) {
            text = jsonMatch[1].trim();
        }

        // Try to extract JSON array or object if still has extra text
        const jsonStartArray = text.indexOf('[');
        const jsonStartObject = text.indexOf('{');
        const jsonStart = jsonStartArray !== -1 && jsonStartObject !== -1
            ? Math.min(jsonStartArray, jsonStartObject)
            : Math.max(jsonStartArray, jsonStartObject);

        if (jsonStart > 0) {
            text = text.substring(jsonStart);
        }

        res.json({ result: text });

    } catch (error) {
        console.error('Groq API Error:', error);
        res.status(500).json({ error: 'AI generation failed', result: "Error generating content" });
    }
};

module.exports = {
    generateContent
};
