import { collection, getDocs, query, where, limit, addDoc } from 'firebase/firestore';
import { NextRequest } from 'next/server';

import { db } from '@/firebase/firebase';

import { GET, POST } from './route';

jest.mock('firebase/firestore', () => ({
  collection: jest.fn(),
  getDocs: jest.fn(),
  query: jest.fn(),
  where: jest.fn(),
  limit: jest.fn(),
  addDoc: jest.fn(),
}));

jest.mock('@/firebase/firebase', () => ({
  db: {},
}));

jest.mock('next/server', () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      json: () => Promise.resolve(data),
      status: options?.status || 200,
    })),
  },
}));

describe('History API', () => {
  const mockUid = 'test-uid-123';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('GET handler', () => {
    it('should return 400 error when UID is missing', async () => {
      const mockReq = {
        nextUrl: {
          searchParams: {
            get: jest.fn().mockReturnValue(null),
          },
        },
      } as unknown as NextRequest;

      const response = await GET(mockReq);
      const result = await response.json();

      expect(result).toEqual({ error: 'Missing UID' });
      expect(response.status).toBe(400);
    });

    it('should return history data when UID is provided', async () => {
      const mockHistoryData = [
        { id: '1', data: () => ({ test: 'data1' }) },
        { id: '2', data: () => ({ test: 'data2' }) },
      ];

      (getDocs as jest.Mock).mockResolvedValueOnce({
        docs: mockHistoryData,
      });

      (collection as jest.Mock).mockReturnValueOnce('mock-collection');
      (where as jest.Mock).mockReturnValueOnce('mock-where');
      (limit as jest.Mock).mockReturnValueOnce('mock-limit');
      (query as jest.Mock).mockReturnValueOnce('mock-query');

      const mockReq = {
        nextUrl: {
          searchParams: {
            get: jest.fn().mockReturnValue(mockUid),
          },
        },
      } as unknown as NextRequest;

      const response = await GET(mockReq);
      const result = await response.json();

      expect(collection).toHaveBeenCalledWith(db, 'history');
      expect(where).toHaveBeenCalledWith('uid', '==', mockUid);
      expect(limit).toHaveBeenCalledWith(50);
      expect(query).toHaveBeenCalledWith('mock-collection', 'mock-where', 'mock-limit');
      expect(getDocs).toHaveBeenCalledWith('mock-query');

      expect(result).toEqual([
        { id: '1', test: 'data1' },
        { id: '2', test: 'data2' },
      ]);
    });

    it('should return 500 error when Firestore throws an error', async () => {
      (getDocs as jest.Mock).mockRejectedValueOnce(new Error('Firestore error'));

      (collection as jest.Mock).mockReturnValueOnce('mock-collection');
      (where as jest.Mock).mockReturnValueOnce('mock-where');
      (limit as jest.Mock).mockReturnValueOnce('mock-limit');
      (query as jest.Mock).mockReturnValueOnce('mock-query');

      const mockReq = {
        nextUrl: {
          searchParams: {
            get: jest.fn().mockReturnValue(mockUid),
          },
        },
      } as unknown as NextRequest;

      const response = await GET(mockReq);
      const result = await response.json();

      expect(result).toEqual({ error: 'Internal Server Error' });
      expect(response.status).toBe(500);
    });
  });

  describe('POST handler', () => {
    it('should return 400 error when UID is missing', async () => {
      const mockReq = {
        nextUrl: {
          searchParams: {
            get: jest.fn().mockReturnValue(null),
          },
        },
        json: jest.fn(),
      } as unknown as NextRequest;

      const response = await POST(mockReq);
      const result = await response.json();

      expect(result).toEqual({ error: 'Missing UID' });
      expect(response.status).toBe(400);
    });

    it('should return 400 error when body is invalid', async () => {
      const mockReq = {
        nextUrl: {
          searchParams: {
            get: jest.fn().mockReturnValue(mockUid),
          },
        },
        json: jest.fn().mockResolvedValue('invalid-body'),
      } as unknown as NextRequest;

      const response = await POST(mockReq);
      const result = await response.json();

      expect(result).toEqual({ error: 'Invalid body format' });
      expect(response.status).toBe(400);
    });

    it('should add document to Firestore when UID and valid body are provided', async () => {
      (addDoc as jest.Mock).mockResolvedValueOnce({ id: 'new-doc-id' });
      (collection as jest.Mock).mockReturnValueOnce('mock-collection');

      const mockBody = { test: 'data' };
      const mockReq = {
        nextUrl: {
          searchParams: {
            get: jest.fn().mockReturnValue(mockUid),
          },
        },
        json: jest.fn().mockResolvedValue(mockBody),
      } as unknown as NextRequest;

      const response = await POST(mockReq);
      const result = await response.json();

      expect(collection).toHaveBeenCalledWith(db, 'history');
      expect(addDoc).toHaveBeenCalledWith('mock-collection', {
        ...mockBody,
        uid: mockUid,
      });

      expect(result).toEqual({ success: true });
    });

    it('should return 500 error when Firestore throws an error', async () => {
      (addDoc as jest.Mock).mockRejectedValueOnce(new Error('Firestore error'));
      (collection as jest.Mock).mockReturnValueOnce('mock-collection');

      const mockBody = { test: 'data' };
      const mockReq = {
        nextUrl: {
          searchParams: {
            get: jest.fn().mockReturnValue(mockUid),
          },
        },
        json: jest.fn().mockResolvedValue(mockBody),
      } as unknown as NextRequest;

      const response = await POST(mockReq);
      const result = await response.json();

      expect(result).toEqual({ error: 'Internal Server Error' });
      expect(response.status).toBe(500);
    });
  });
});
