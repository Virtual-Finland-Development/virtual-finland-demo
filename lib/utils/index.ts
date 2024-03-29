import { format } from 'date-fns';
import { isPast, parseISO } from 'date-fns';
import jwt_decode from 'jwt-decode';
import lodash_groupby from 'lodash.groupby';
import { AppContextObj, Nace } from '@/types';
import type { LoggedInState } from '@/types';
import { baseAppContextObj } from '../constants';
import { LOCAL_STORAGE_AUTH_KEY } from '../constants';
import firstNames from '../fake-data/first-names.json';
import lastNames from '../fake-data/last-names.json';
import { JSONLocalStorage } from './JSONStorage';

export function generateAppContextHash(
  applicationContextObj?: Partial<AppContextObj>
) {
  const appContext: AppContextObj = {
    ...baseAppContextObj,
    ...(applicationContextObj || {}),
    redirectUrl: `${window.location.origin}/auth`,
  };
  const appContextBase64 = Buffer.from(JSON.stringify(appContext)).toString(
    'base64'
  );
  return encodeURIComponent(appContextBase64);
}

export function nullifyUndefinedValues<T extends object>(obj: T) {
  for (const [key, value] of Object.entries(obj)) {
    if (!!value && typeof value === 'object') {
      nullifyUndefinedValues(value);
    } else if (value === undefined) {
      obj[key as keyof T] = null as any;
    }
  }
  return obj;
}

export function pickRandomName(type: 'firstName' | 'lastName') {
  const list: string[] = type === 'firstName' ? firstNames : lastNames;
  return list[Math.floor(Math.random() * list.length)] || type;
}

export function generateRandomEmail() {
  const firstName = pickRandomName('firstName');
  const lastName = pickRandomName('lastName');
  return `${firstName}.${lastName}@email.com`;
}

export function pickRandomDateString() {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);
  return format(new Date(timestamp), 'yyyy-MM-dd');
}

export function removeTrailingSlash(str: string) {
  return str.endsWith('/') ? str.slice(0, -1) : str;
}

// get grouped nace codes in hierarchy-level
// only include nace codes that are part of data definition
// include dot-notaded version of code for each (data definition, nace-dot-notaded.json)
export function getGroupedNaceCodes(naceCodes: any) {
  const addChildren = (
    item: Nace,
    groupedByBroader: any,
    topLevelGroupCode: string
  ) => {
    if (item.children) {
      for (let i = 0; i < item.children.length; i++) {
        const child = item.children[i];

        if (groupedByBroader[child.codeValue]) {
          item.children[i] = {
            ...child,
            children: groupedByBroader[child.codeValue],
            topLevelGroupCode,
          };
          addChildren(item.children[i], groupedByBroader, topLevelGroupCode);
        } else {
          item.children[i] = {
            ...child,
            topLevelGroupCode,
          };
        }
      }
    }
  };

  const codes: Nace[] = naceCodes as Nace[];
  const topLevel = codes.filter(c => !c.broaderCode && c.codeValue !== 'X');

  const groupedByBroader = lodash_groupby(
    codes.reduce((acc: Nace[], c) => {
      if (c.broaderCode && c.dotNotationCodeValue) {
        acc.push(c);
      }
      return acc;
    }, []),
    item => item.broaderCode?.codeValue
  );

  const groupedNaces = topLevel.map(item => {
    if (groupedByBroader[item.codeValue]) {
      const newItem: Nace = {
        ...item,
        children: groupedByBroader[item.codeValue],
        topLevelGroupCode: item.codeValue,
      };
      addChildren(newItem, groupedByBroader, item.codeValue);
      return newItem;
    }
    return item;
  });

  return groupedNaces;
}

// recursive function to find nace code from hierarchived nace codes
export const findNace = (
  options: Nace[],
  identifier: string
): Nace | undefined => {
  const formattedId = identifier.replace('.', '');

  for (const item of options) {
    const result =
      item.codeValue === formattedId
        ? item
        : findNace(item.children || [], formattedId);

    if (result) return result;
  }
};

export function getValidAuthState() {
  const storedAuthState: LoggedInState | undefined = JSONLocalStorage.get(
    LOCAL_STORAGE_AUTH_KEY
  );
  const tokenNotExpired = storedAuthState?.expiresAt
    ? !isPast(parseISO(storedAuthState.expiresAt))
    : false;
  return {
    isValid: storedAuthState !== undefined && tokenNotExpired,
    storedAuthState: storedAuthState as LoggedInState,
  };
}

export function getUserIdentifier() {
  const token = JSONLocalStorage.get(LOCAL_STORAGE_AUTH_KEY).idToken;

  if (!token) {
    throw new Error('No token.');
  }

  const { sub }: { sub: string | undefined } = jwt_decode(token);
  return sub;
}
