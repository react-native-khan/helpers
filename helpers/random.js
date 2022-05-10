export const random = (array) =>
  array[Math.floor(Math.random() * array.length)];

export const randomNumber = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const shuffle = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
