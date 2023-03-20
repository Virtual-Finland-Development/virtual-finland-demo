import Cookies from 'js-cookie';
import jwt_decode from 'jwt-decode';
import type {
  BenecifialOwners,
  CompanyBasicInformation,
  NonListedCompany,
  SignatoryRights,
} from '@/types';
import apiClient from '../api-client';
import { PRH_MOCK_BASE_URL, TESTBED_API_BASE_URL } from '../endpoints';

interface CompanyResponse {
  nationalIdentifier: string;
  data: NonListedCompany;
}

export async function getCompanies(): Promise<CompanyResponse[]> {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.get(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies`
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function getLatestModifiedCompany(): Promise<CompanyResponse> {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.get(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies:last-modified`
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function getCompany(
  nationalIdentifier: string
): Promise<NonListedCompany> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/Establishment`,
    { nationalIdentifier },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function createCompanyDirectlyToPRH(
  company: NonListedCompany
): Promise<string> {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.post(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies`,
      company
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function saveCompanyDirectlyToPRH(
  nationalIdentifier: string,
  payload: Partial<NonListedCompany>
) {
  const token = Cookies.get('idToken');

  if (!token) {
    throw new Error('No token.');
  }

  try {
    const { sub }: { sub: string | undefined } = jwt_decode(token);
    const { data } = await apiClient.patch(
      `${PRH_MOCK_BASE_URL}/users/${sub}/companies/${nationalIdentifier}`,
      payload
    );
    return data;
  } catch (error) {
    throw new Error('Invalid token.');
  }
}

export async function saveCompany(
  payload: Partial<NonListedCompany>
): Promise<NonListedCompany> {
  const { data } = await apiClient.post(
    `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/establishment`,
    payload
  );
  return data;
}

export async function getBeneficialOwners(
  nationalIdentifier: string
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post(
    `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/beneficial-owners`,
    { nationalIdentifier },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function saveBeneficialOwners(
  nationalIdentifier: string,
  beneficialOwners: Partial<BenecifialOwners>
): Promise<BenecifialOwners> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/BeneficialOwners/Write`,
    { nationalIdentifier, data: beneficialOwners }
  );
  return data;
}

export async function getSignatoryRights(
  nationalIdentifier: string
): Promise<SignatoryRights> {
  const { data } = await apiClient.post(
    `${TESTBED_API_BASE_URL}/testbed/productizer/non-listed-company/signatory-rights`,
    { nationalIdentifier },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
}

export async function saveSignatoryRights(
  nationalIdentifier: string,
  signatoryRights: Partial<SignatoryRights>
): Promise<SignatoryRights> {
  const { data } = await apiClient.post(
    `${PRH_MOCK_BASE_URL}/draft/NSG/Agent/LegalEntity/NonListedCompany/SignatoryRights/Write`,
    { nationalIdentifier, data: signatoryRights }
  );
  return data;
}

export async function getCompanyBasicInfo(payload: {
  nationalIdentifier: string;
  source: string;
}): Promise<CompanyBasicInformation> {
  const { nationalIdentifier, source } = payload;
  const { data } = await apiClient.post(
    `${TESTBED_API_BASE_URL}/testbed/productizer/nsg/basic-information?source=${source}`,
    { nationalIdentifier }
  );
  return data;
}
