export const dictionaryToArray = (dictionary) =>
  Object.entries(dictionary).map(([, value]) => value);
