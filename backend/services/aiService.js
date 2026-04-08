const Groq = require('groq-sdk');

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function generateHealthPlan(profile, dailyInput, recentProgress, pastRecommendations = []) {
  const pastRecap = pastRecommendations.slice(0, 3).map(rec => 
    `- ${new Date(rec.createdAt).toLocaleDateString()}: Breakfast: ${rec.meals.breakfast}, Tip: ${rec.tip}`
  ).join('\n');

  const prompt = `
    You are Tena-AI, an Ethiopian health assistant. You have deep knowledge of the user.

    USER PROFILE:
    - Age: ${profile.age}, Gender: ${profile.gender}
    - Weight: ${profile.weightKg} kg, Height: ${profile.heightCm} cm
    - Goal: ${profile.goal}, Conditions: ${profile.conditions || 'None'}

    TODAY'S CONTEXT:
    - Health: ${dailyInput.healthCondition}, Mood: ${dailyInput.mood}
    - Religious status: ${dailyInput.religiousStatus}
    - Available foods: ${dailyInput.availableFoods}
    - Economic status: ${dailyInput.economicStatus}
    - Gym access: ${dailyInput.canGoToGym ? 'Yes' : 'No'}
    - Activity level: ${dailyInput.activityLevel}

    RECENT PROGRESS (last 7 days):
    ${recentProgress.map(p => `- ${p.date.toDateString()}: weight ${p.weightKg}kg, mood ${p.mood}, activity ${p.activityCompleted ? 'done' : 'missed'}`).join('\n')}

    PAST RECOMMENDATIONS (last 3):
    ${pastRecap || 'None'}

    INSTRUCTIONS:
    - Use only Ethiopian foods (injera, shiro, kitfo, gomen, etc.).
    - Adapt to religious fasting (no animal products during fasting).
    - Respect economic status (low budget = cheap local staples).
    - If the user is sick, focus on rest and easy digestion.
    - If they have been consistent, praise them; if not, encourage small changes.
    - Avoid repeating the same meals as in past recommendations unless the user loves them.

    Return valid JSON:
    {
      "meals": { "breakfast": "...", "lunch": "...", "dinner": "..." },
      "activity": { "type": "...", "duration": "..." },
      "dailyActions": ["...", "..."],
      "tip": "...",
      "feedback": "..."
    }
  `;

  const response = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7,
    response_format: { type: "json_object" }
  });

  return JSON.parse(response.choices[0].message.content);
}

module.exports = { generateHealthPlan };