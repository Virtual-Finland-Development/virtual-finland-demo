import { AppContextObj } from '@/types';

export const baseAppContextObj: AppContextObj = {
  appName: 'living-in-finland',
  redirectUrl: '',
};

export const COMPANY_DATA_LABELS: Record<string, any> = {
  registrant: 'Registrant',
  givenName: 'Given name',
  lastName: 'Last name',
  email: 'Email',
  phoneNumber: 'Phone number',
  companyDetails: 'Company details',
  name: 'Name',
  alternativeName: 'Alternative name',
  foundingDate: 'Founding date',
  industrySector: 'Industry sector',
  shareCapital: 'Share capital',
  capitalCurrency: 'Capital currency',
  settlementDeposit: 'Settlement deposit',
  depositCurrency: 'Deposit currency',
  settlementDate: 'Settlement date',
  countryOfResidence: 'Country of residence',
  shareSeries: 'Share series',
  shareSeriesClass: 'Share series class',
  numberOfShares: 'Number of shares',
  shareValue: 'Share value',
  companyAddress: 'Company address',
  fullAddress: 'Full address',
  thoroughfare: 'Thoroughfare',
  locatorDesignator: 'Locator designator',
  locatorName: 'Locator name',
  addressArea: 'Address area',
  postCode: 'Post code',
  postName: 'Post name',
  poBox: 'Post box',
  adminUnitLevel1: 'Admin unit level 1',
  adminUnitLevel2: 'Admin unit level 2',
  managingDirectors: 'Managing directors',
  role: 'Role',
  middleNames: 'Middle names',
  dateOfBirth: 'Date of birth',
  nationality: 'Nationality',
  boardMembers: 'Board members',
  auditorDetails: 'Auditor details',
  companyName: 'Company name',
  nationalIdentifier: 'National identifier',
  votesPerShare: 'Votes per share',
  shareholders: 'Shareholders',
  shareOwnership: 'Share ownership',
  quantity: 'Quantity',
  signinRights: 'Signin rights',
  personalID: 'Personal ID',
  shareValueCurrency: 'Share value currency',
};

export const SHARE_SERIES_CLASS_OPTIONS = [
  {
    labelText: 'A',
    uniqueItemId: 'A',
  },
  {
    labelText: 'B',
    uniqueItemId: 'B',
  },
  {
    labelText: 'C',
    uniqueItemId: 'C',
  },
  {
    labelText: 'D',
    uniqueItemId: 'D',
  },
  {
    labelText: 'E',
    uniqueItemId: 'E',
  },
];

export const MANAGING_DIRECTORS_ROLE_OPTIONS = [
  { labelText: 'Director', uniqueItemId: 'director' },
  { labelText: 'Debuty director', uniqueItemId: 'debuty director' },
];

export const BOARD_MEMBERS_ROLE_OPTIONS = [
  { labelText: 'Chair person', uniqueItemId: 'chairperson' },
  { labelText: 'Member', uniqueItemId: 'member' },
  { labelText: 'Debuty member', uniqueItemId: 'debuty member' },
];

export const SIGNING_RIGHTS_ROLE_OPTIONS = [
  { labelText: 'Director', uniqueItemId: 'director' },
  { labelText: 'Debuty director', uniqueItemId: 'debuty director' },
  { labelText: 'Board member', uniqueItemId: 'board member' },
  { labelText: 'Debuty board member', uniqueItemId: 'deputy board member' },
  { labelText: 'Other', uniqueItemId: 'other' },
];
