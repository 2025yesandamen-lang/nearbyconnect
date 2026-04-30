export function getRoomId(userA: string, userB: string) 
{ return [userA, userB].sort().join("_");

}
