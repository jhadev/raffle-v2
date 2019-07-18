const scrollTop = () => {
  if (screen.width <= 768) {
    window.scrollTo(0, 0);
  }
};

const randomize = array => {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export { scrollTop, randomize, getRandomInt };
