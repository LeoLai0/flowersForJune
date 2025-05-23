import { DateTime } from 'luxon';

const LOGIN_KEY = 'accessLevel';
const DATE_KEY = 'loggedInDate';

export type AccessLevel = 'none' | 'user' | 'config';

export const markLoginToday = (level: AccessLevel) => {
  const today = DateTime.now().setZone('Australia/Sydney').toFormat('yyyy-MM-dd');
  localStorage.setItem(DATE_KEY, today);
  localStorage.setItem(LOGIN_KEY, level);
};

export const getAccessLevel = (): AccessLevel => {
  const savedDate = localStorage.getItem(DATE_KEY);
  const today = DateTime.now().setZone('Australia/Sydney').toFormat('yyyy-MM-dd');
  const level = localStorage.getItem(LOGIN_KEY);

  if (savedDate === today) {
    return (level === 'config' || level === 'user') ? (level as AccessLevel) : 'none';
  }
  return 'none';
};