export default async function handler(req, res) {
    const apiKey = process.env.OPENAI_API_KEY;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify(req.body)
    });

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
        const assistantMessage = data.choices[0].message.content;

        if (assistantMessage.toLowerCase().includes("booking request")) {
            res.status(200).json({ 
                choices: [{ message: { content: showBookingForm() } }] 
            });
        } else {
            res.status(200).json(data);
        }
    } else {
        res.status(500).json({ error: 'Failed to get a response from OpenAI' });
    }
}
