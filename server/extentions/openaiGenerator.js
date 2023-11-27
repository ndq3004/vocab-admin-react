const NodeCache = require('node-cache');
const mc = new NodeCache({ stdTTL: 3000 })

const { OpenAI } = require("openai");

export const generateExampleForWord = async (word) => {
    const openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
    });

    if (mc.has(word)) {
        console.log('has cache for ' + word);
        return mc.get(word);
    }

    console.log('No cache for ' + word);

    const res = await openai.chat.completions.create({
        messages: [{ role: 'user', content: `generate some examples for the word "${word}"` }],
        model: 'gpt-3.5-turbo',
    });
    if (res && res.choices){
        mc.set(word, res.choices);
    }

    console.log(res)

    return res ? res.choices : [];
}