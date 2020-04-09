// Record utlity type - This will allow us to easily create type
// for all the properties that have the same type
export const Record = (propType) => (...properties) => {
  return properties.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = propType;
    return accumulator;
  }, {});
};
