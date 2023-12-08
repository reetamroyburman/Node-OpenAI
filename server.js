const express = require('express')
const { OpenAI } = require('openai')
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = express()


dotenv.config("./.env");

//middlewares
app.use(express.json())
app.use(morgan("common"));

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

app.get('/getResponse', async (req, res) => {
    try {
        let input = req.body.prompt
        const response = await openai.chat.completions.create({
            messages: [{ role: 'user', content: input }],
            model: 'gpt-3.5-turbo',
        });
        res.json({
            Ques:req.body.prompt,
            Ans:response.choices[0].message.content
        });

    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});