import { sendUniversalRequest } from '@/lib/api-request';
import { decodeToString } from '@/lib/utils';

import { getResponse } from './action';

jest.mock('@/lib/api-request', () => ({
  sendUniversalRequest: jest.fn(),
}));
jest.mock('@/lib/utils', () => ({
  decodeToString: jest.fn(),
}));

describe('getResponse', () => {
  const mockUrl = 'aHR0cDovL2V4YW1wbGUuY29t';
  const mockMethod = 'GET';
  const mockHeadersBase64 = btoa(JSON.stringify({ Authorization: 'token' }));
  const mockBodyBase64 = btoa('body content');

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns response when request succeeds', async () => {
    (decodeToString as jest.Mock).mockImplementation((val) => atob(val));
    (sendUniversalRequest as jest.Mock).mockResolvedValue({ status: 200, body: 'OK' });

    const result = await getResponse({
      urlInBase64: mockUrl,
      method: mockMethod,
      headersBase64: mockHeadersBase64,
      bodyBase64: mockBodyBase64,
    });

    expect(result).toEqual({ status: 200, body: 'OK' });
    expect(sendUniversalRequest).toHaveBeenCalledWith(
      'http://example.com',
      mockMethod,
      { Authorization: 'token' },
      'body content'
    );
  });

  it('returns error object when request fails', async () => {
    (decodeToString as jest.Mock).mockImplementation((val) => atob(val));
    (sendUniversalRequest as jest.Mock).mockRejectedValue(new Error('Network error'));

    const result = await getResponse({
      urlInBase64: mockUrl,
      method: mockMethod,
      headersBase64: mockHeadersBase64,
      bodyBase64: mockBodyBase64,
    });

    expect(result).toEqual({ status: 0, body: 'Network error' });
  });
});
