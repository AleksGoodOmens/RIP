import { db, auth } from './fireBaseAdmin';

jest.mock('firebase-admin/app', () => {
  const initializeApp = jest.fn();
  const cert = jest.fn((s) => s);
  const getApps = jest.fn(() => []);
  return { initializeApp, cert, getApps };
});

jest.mock('firebase-admin/auth', () => ({
  getAuth: jest.fn(() => 'mocked-auth'),
}));

jest.mock('firebase-admin/firestore', () => ({
  getFirestore: jest.fn(() => 'mocked-db'),
}));

describe('fireBaseAdmin', () => {
  it('initializes Firebase app if not already initialized', () => {
    const { initializeApp, cert, getApps } = require('firebase-admin/app');
    const { getAuth } = require('firebase-admin/auth');
    const { getFirestore } = require('firebase-admin/firestore');

    expect(getApps).toHaveBeenCalled();
    expect(initializeApp).toHaveBeenCalledWith({
      credential: cert(expect.any(Object)),
    });
    expect(getAuth).toHaveBeenCalled();
    expect(getFirestore).toHaveBeenCalled();
  });

  it('exports db and auth instances', () => {
    expect(db).toBe('mocked-db');
    expect(auth).toBe('mocked-auth');
  });
});
