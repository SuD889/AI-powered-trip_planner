import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function getAIPlan(destination, budget) {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                { role: "system", content: "You are a travel planning assistant." },
                { role: "user", content: `Create a detailed travel itinerary for ${destination} with a budget of $${budget}. Include daily activities, recommended places, and estimated costs.` }
            ],
            max_tokens: 1000,
            temperature: 0.7,
        });

        return {
            success: true,
            plan: completion.choices[0].message.content
        };
    } catch (error) {
        console.error('OpenAI API Error:', error);
        throw {
            success: false,
            error: 'Failed to generate travel plan. Please try again later.'
        };
    }
}