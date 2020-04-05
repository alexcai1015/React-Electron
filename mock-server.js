// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const approvalStatus = ['pending', 'approved', 'denied'];
const passTypes = ['INDIVIDUAL', 'VEHICLE'];
const aporTypes = ['AG', 'CA', 'BP', 'BA', 'FC', 'DO', 'MS'];
const idTypes = ['passport', 'PGB', 'DPL', 'COM', 'PHC', 'PRC', 'PersonalID'];
const sampleRemarks = ['Test Remarks', '', 'No remarks', 'Good day'];
const randomCapital = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));

const getPlateNumberLetters = () => {
  return [1, 2, 3].map(() => randomCapital());
};

const getRandomPlateNumber = () => {
  return `${getPlateNumberLetters()}-${faker.random.number(999)}`;
};

function createRecordData({
  passType,
  aporType,
  referenceId,
  controlCode,
  name,
  company,
  idType,
  identifierNumber,
  plateNumber,
  destName,
  destStreet,
  destCity,
  destProvince,
  status,
  validFrom,
  validUntil,
  remarks,
  id,
}) {
  return {
    passType,
    aporType,
    referenceId,
    controlCode,
    name,
    company,

    idType,
    identifierNumber,
    plateNumber,
    destName,
    destStreet,
    destCity,
    destProvince,
    status,
    validFrom,
    validUntil,
    remarks,
    id,
  };
}

function generateRecordsData(numberOfRecordToGenerate = 10000) {
  const records = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfRecordToGenerate; i++) {
    records.push(
      createRecordData({
        passType: faker.random.arrayElement(passTypes),
        aporType: faker.random.arrayElement(aporTypes),
        referenceId: `091${faker.random.number(99999999)}`,
        controlCode: faker.random.number(99999999),
        name: faker.name.findName(),
        idType: faker.random.arrayElement(idTypes),
        identifierNumber: faker.random.number(999999),
        plateNumber: getRandomPlateNumber(),
        destName: faker.name.findName(),
        destStreet: faker.address.streetAddress(),
        destCity: faker.address.city(),
        destProvince: faker.address.county(),
        status: faker.random.arrayElement(approvalStatus),
        validFrom: '2020-04-02T08:55:05.259644Z',
        validUntil: '2020-04-17T08:55:05.259644Z',
        remarks: faker.random.arrayElement(sampleRemarks),
        id: faker.random.number(99999999),
        company: faker.company.companyName(),
      })
    );
  }

  return records;
}

module.exports = () => {
  const data = { accessPasses: generateRecordsData() };

  return data;
};
