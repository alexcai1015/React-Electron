export const createUniqueKeyFromAccessPass = (data, index) =>
  [String(index), String(data.identifierNumber), String(data.referenceId), String(data.status)]
    .join('')
    .toLowerCase();
