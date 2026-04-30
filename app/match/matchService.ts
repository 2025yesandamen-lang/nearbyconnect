export function isMatch(userA: any, userB: any) {
  const distance =
    Math.sqrt(
      (userA.lat - userB.lat) ** 2 +
      (userA.lng - userB.lng) ** 2
    );

  return distance < 0.05;
}
