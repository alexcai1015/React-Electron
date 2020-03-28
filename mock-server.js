// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');

const APPROVAL_STATUS = {
  Pending: 'pending',
  Approved: 'approved',
  Denied: 'denied',

  // ? TODO: Cancelled: 'cancelled',
};

const approvalStatus = Object.values(APPROVAL_STATUS);

function createRecordData({ company, name, aporType, idType, idNumber, status }) {
  return { company, name, aporType, idType, idNumber, status };
}

function generateRecordsData(numberOfRecordToGenerate = 200) {
  const records = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < numberOfRecordToGenerate; i++) {
    records.push(
      createRecordData({
        company: faker.company.companyName(),
        name: faker.name.findName(),
        aporType: 'Medical',
        idType: 'PRC ID',
        idNumber: `#${faker.random.number(100000)}`,
        status: faker.random.arrayElement(approvalStatus),
      })
    );
  }

  return records;
}

module.exports = () => {
  const data = { records: generateRecordsData() };

  return data;
};
