export function calculateMatchScore(userA: any, userB: any) {
  let score = 0;

  // distance factor
  const distance = Math.abs(
    (userA.latitude || 0) - (userB.latitude || 0)
  );

  if (distance < 1) score += 40;
  else if (distance < 5) score += 20;

  // profile completeness
  if (userA.name && userB.name) score += 20;

  // activity boost (placeholder)
  score += Math.random() * 40;

  return Math.min(score, 100);
}