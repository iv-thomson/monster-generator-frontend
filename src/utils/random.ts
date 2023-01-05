export const getRandomItem = <T = unknown>(list: T[]): T => {
  const randomIndex = Math.floor(Math.random() * list.length);

  return list[randomIndex]!;
};
