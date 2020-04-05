export const PassType = {
  VEHICLE: 'vehicle',
  INDIVIDUAL: 'individual',
};

export const PassTypeLabel = {
  [PassType.VEHICLE]: {
    display: 'Plate Number',
  },
  [PassType.INDIVIDUAL]: {
    display: 'Contact Number',
  },
};
