export const arrayToDictionary = (keyExtractor) => (array = []) =>
  array.reduce((dictionary, currentValue) => {
    const dictionaryCopy = { ...dictionary };
    dictionaryCopy[keyExtractor(currentValue)] = currentValue;
    return dictionaryCopy;
  }, {});
