// Pure, tested scoring logic for the Olympiad Arena.
// score: +marks for correct, -negative for wrong, 0 for skipped. Server-side
// re-scoring must use the same rules (see supabase/migrations).
export function scoreAttempt(answers, questions, marking = { correct: 4, negative: 1 }) {
  let score = 0, correct = 0, wrong = 0, skipped = 0;
  for (const q of questions) {
    const a = answers[q.id];
    if (a === undefined || a === null || a === '') skipped++;
    else if (a === q.answer) { correct++; score += marking.correct; }
    else { wrong++; score -= marking.negative; }
  }
  return { score, correct, wrong, skipped, total: questions.length };
}
export function rankResults(results) {
  // Higher score first, then higher accuracy, then earlier submission.
  return [...results].sort((a, b) => b.score - a.score || b.accuracy - a.accuracy || new Date(a.submittedAt) - new Date(b.submittedAt));
}
