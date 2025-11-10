export function calculateScore(data: any) {
  const { totalCasts, totalLikes, totalRecasts, totalReplies } = data;
  let score = totalCasts * 3 + totalLikes * 1 + totalRecasts * 2 + totalReplies * 3;
  if (totalCasts >= 5) score += 10;
  if (totalReplies >= 5) score += 5;
  return Math.min(score, 100);
}

export function getTitle(streak: number) {
  if (streak >= 15) return "Legendary Caster";
  if (streak >= 8) return "Cast Warrior";
  if (streak >= 4) return "Active Caster";
  return "Starter";
}

export function getMotivation(score: number, streak: number, prevHigh: number) {
  if (score >= 80 && streak >= 5) return "🔥 Amazing! Keep the streak alive!";
  if (score < 50 && streak === 0) return "😅 Don’t worry, today is a fresh start!";
  if (score < 50 && streak >= 1) return "💪 Consistency is key! Every cast counts!";
  if (score > prevHigh) return "🏅 New personal best! Celebrate your grind!";
  return "Keep casting and improving!";
}
