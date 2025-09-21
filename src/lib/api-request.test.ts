import { sendUniversalRequest } from './api-request';
import { isValidJSON } from './utils';

jest.mock('./utils', () => ({
  isValidJSON: jest.fn(),
}));

global.fetch = jest.fn();

describe('sendUniversalRequest', () => {
  const uid = 'user-123';
  const base64 = { headers: 'encoded-headers', body: 'encoded-body' };
  const headers = { 'X-Custom': 'value' };
  const url = 'https://api.example.com/data';
  const method = 'POST';

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(performance, 'now')
      .mockImplementationOnce(() => 1000)
      .mockImplementationOnce(() => 1500);
  });

  it('sends request and returns parsed JSON response', async () => {
    const mockResponse = {
      status: 200,
      headers: {
        get: () => 'application/json',
      },
      text: async () => JSON.stringify({ success: true }),
    };

    (global.fetch as jest.Mock).mockResolvedValue(mockResponse);
    (isValidJSON as jest.Mock).mockReturnValue(true);

    const result = await sendUniversalRequest({
      url,
      method,
      headers,
      uid,
      base64,
      body: JSON.stringify({ foo: 'bar' }),
    });

    expect(result.status).toBe(200);
    expect(result.body).toEqual({ success: true });

    expect(global.fetch).toHaveBeenCalledWith(
      url,
      expect.objectContaining({
        method: 'POST',
        headers: expect.objectContaining({
          'Content-Type': 'application/json',
        }),
        body: JSON.stringify({ foo: 'bar' }),
      })
    );
  });
});
