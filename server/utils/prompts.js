const questionAnswerPrompt = (
  role,
  experience,
  topicsToFocus,
  numberOfQuestions
) => `

You are an AI trained to generate technical interview questions and answers.

Instructions:
- Role: ${role}
- Candidate Experience: ${experience} years
- Focus Topics: ${topicsToFocus}
- Number of Questions: ${numberOfQuestions}

Requirements:
1. Generate exactly ${numberOfQuestions} interview questions and answers.
2. Each answer should be beginner-friendly but technically correct.
3. If the answer needs code, include a short code block (inside the JSON string, escaped properly).
4. Return ONLY a valid JSON array — no explanations, no markdown (\`\`\`), no extra text.

Strict Output Format:
[
  {
    "question": "Question text here",
    "answer": "Answer text here (with optional inline code in markdown style)."
  },
  {
    "question": "Another question",
    "answer": "Another answer"
  }
]
`;

const conceptExplanationPrompt = (question) => `

You are an AI trained to explain technical interview concepts.

Instructions:
- Question: ${question}

Requirements:

1. Provide a beginner-friendly but in-depth explanation.
2. Add a concise and clear title summarizing the concept.
3. If explanation needs code, include a short code block (inside the JSON string, escaped properly).
4. Return ONLY a valid JSON object — no explanations, no markdown (\`\`\`), no extra text.

Strict Output Format:

{
  "title": "Concise title here",
  "explanation": "Detailed explanation here (with optional inline code in markdown style)."
}
`;

module.exports = {
  questionAnswerPrompt,
  conceptExplanationPrompt,
};
