export default async function handler(req, res) {
  try {
    if (req.method !== "POST") {
      return res.status(405).json({ error: "Method not allowed" });
    }

    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({ error: "API key not configured" });
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
            content: "You are a helpful college staff assistant. Give clear, short, structured answers about attendance, leave, exams, and rules."
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    if (!response.ok) {
      return res.status(500).json({ error: "AI API failed" });
    }

    const data = await response.json();

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      return res.status(500).json({ error: "No response from AI" });
    }

    res.status(200).json({ reply });

  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
}
