export const PassType = {
  VEHICLE: 'vehicle',
  INDIVIDUAL: 'individual',
};

export const PassTypeLabel = {
  [PassType.VEHICLE]: {
    display: 'Plate Number',
    templateLabel: 'bulk-upload-vehicle-template',
  },
  [PassType.INDIVIDUAL]: {
    display: 'Contact Number',
    templateLabel: 'bulk-upload-individual-template',
  },
};
