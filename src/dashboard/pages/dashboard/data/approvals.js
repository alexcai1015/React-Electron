import * as faker from 'faker';
import { APPROVAL_STATUS } from '../listTable/ListRowActions';

const approvalStatus = Object.values(APPROVAL_STATUS)

function createData(company, name, type, status) {
  return { company, name, type, status };
}

export const rows = [
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Grocery', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Travel', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
  createData(faker.company.companyName(), faker.name.findName(), 'Medical', faker.random.arrayElement(approvalStatus)),
];
