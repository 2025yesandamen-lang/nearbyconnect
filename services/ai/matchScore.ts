export interface MatchScoreInput {
  distance: number;
  ageGap: number;
  commonInterests: number;
  responseRate: number;
}

export function calculateMatchScore(input: MatchScoreInput): number {
  const {
    distance,
    ageGap,
    commonInterests,
    responseRate,
  } = input;

  // Distance score (closer is better, max 2km)
  const distanceScore = Math.max(0, (2 - distance) / 2) * 30;

  // Age gap score (smaller gap is better, max 5 years)
  const ageScore = Math.max(0, (5 - ageGap) / 5) * 20;

  // Common interests score
  const interestScore = Math.min(commonInterests * 10, 30);

  // Response rate score
  const responseScore = Math.min(responseRate * 20, 20);

  const total = distanceScore + ageScore + interestScore + responseScore;

  return Math.round(Math.min(total, 100));
}
