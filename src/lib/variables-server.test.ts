import { saveUserVariables, getUserVariables } from './variables-server';

jest.mock('@/firebase/fireBaseAdmin', () => {
  const mockSet = jest.fn();
  const mockGet = jest.fn();
  const mockDoc = jest.fn(() => ({
    set: mockSet,
    get: mockGet,
  }));
  const mockCollection = jest.fn(() => ({
    doc: mockDoc,
  }));

  return {
    db: {
      collection: mockCollection,
    },
    __mock__: {
      mockSet,
      mockGet,
      mockDoc,
      mockCollection,
    },
  };
});

describe('variables-server', () => {
  let mockSet: jest.Mock;
  let mockGet: jest.Mock;
  let mockDoc: jest.Mock;
  let mockCollection: jest.Mock;

  beforeEach(() => {
    const { __mock__ } = require('@/firebase/fireBaseAdmin');
    mockSet = __mock__.mockSet;
    mockGet = __mock__.mockGet;
    mockDoc = __mock__.mockDoc;
    mockCollection = __mock__.mockCollection;

    jest.clearAllMocks();
  });

  it('saves user variables to Firestore', async () => {
    const uid = 'user123';
    const variables = { userId: '123' };

    await saveUserVariables(uid, variables);

    expect(mockCollection).toHaveBeenCalledWith('variables');
    expect(mockDoc).toHaveBeenCalledWith(uid);
    expect(mockSet).toHaveBeenCalledWith(variables);
  });

  it('returns variables if document exists', async () => {
    const uid = 'user123';
    const mockData = { userId: '123' };

    mockGet.mockResolvedValueOnce({
      exists: true,
      data: () => mockData,
    });

    const result = await getUserVariables(uid);
    expect(result).toEqual(mockData);
  });

  it('returns empty object if document does not exist', async () => {
    mockGet.mockResolvedValueOnce({
      exists: false,
      data: () => undefined,
    });

    const result = await getUserVariables('user123');
    expect(result).toEqual({});
  });
});
