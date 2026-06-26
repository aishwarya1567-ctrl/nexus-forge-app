export default async function handler(req, res) {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a smart college staff assistant. Your job is to help staff by answering questions about attendance, leave policies, exam rules, and general college guidelines. Always give clear, short, and structured answers."
          },
          {
            role: "user",
            content: `Staff Question: ${message}`
          }
        ]
      })
    });

    const data = await response.json();

    res.status(200).json({
      reply: data.choices?.[0]?.message?.content || "No response from AI"
    });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
