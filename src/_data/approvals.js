import * as faker from 'faker';

function createData(company, name, type) {
  return { company, name, type };
}

export const rows = [
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Grocery'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Travel'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical'),
];
