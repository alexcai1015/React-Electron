import * as faker from 'faker';
import { APPROVAL_STATUS } from '../listTable/ListRowActions';

const approvalStatus = Object.values(APPROVAL_STATUS)

function createData({ company, name, aporType, idType, idNumber, status }) {
  return { company, name, aporType, idType, idNumber, status };
}

export const tableData = [
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
  createData({
    company: faker.company.companyName(),
    name: faker.name.findName(),
    aporType: 'Medical',
    idType: 'PRC ID',
    idNumber: `#${faker.random.number(100000)}`,
    status: faker.random.arrayElement(approvalStatus)
  }),
];
