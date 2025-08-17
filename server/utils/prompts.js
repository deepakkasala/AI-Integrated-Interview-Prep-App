// const questionAnswerPrompt = (
//   role,
//   experience,
//   topicsToFocus,
//   numberOfQuestions
// ) => `
//     You are an AI, trained to generate technical interview questions and answers.

//     Task:
//     -Role: ${role},
//     -Candidate Experience: ${experience},
//     -Focus Topics: ${topicsToFocus},
//     -Write ${numberOfQuestions} interview questions.
//     -For each question, provide a simple and detailed answer explanation but beginner friendly answer.
//     -If answer needs code example, add a small code block inside.
//     -Keep formatting very clean and readable.
//     -Return a pure JSON array like:
//     [
//       {
//         "question": "Question Here",
//         "answer": "Answer Here"
//       },
//       {
//         "question": "Question Here",
//         "answer": "Answer Here"
//       }
//       ....
//     ]
//       Important: Do not return any other or extra text, only return valid JSON.
//     `;

// const conceptExplanationPrompt = (question) => `
//     You are an AI, trained to generate explanations for a given interview question.

//     Task:
//     Explain the following interview question and its concept in depth, as if you are teaching a beginner developer
//     -Question: ${question}
//     -After explanation, provide a short and clear title that summarizes the concept for the article or page header.
//     -If explanation needs code example, add a small code block inside.
//     -Keep formatting very clean and readable.
//     -Return a pure JSON object like below format:
//     {
//         "title": "Title Here"
//       "explanation": "Explanation Here",
//     }
//       Important: Do not return any other or extra text, only return valid JSON.`;

// module.exports = {
//   questionAnswerPrompt,
//   conceptExplanationPrompt,
// };

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
