import { fetchVariables, saveVariables } from './variables';

describe('variables API', () => {
  beforeEach(() => {
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('fetchVariables', () => {
    it('returns variables when fetch succeeds', async () => {
      const mockData = { var1: 'value1', var2: 'value2' };
      (fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockData),
      });

      const result = await fetchVariables('123');
      expect(result).toEqual(mockData);
      expect(fetch).toHaveBeenCalledWith('/api/variables?uid=123');
    });

    it('throws error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 500,
      });

      await expect(fetchVariables('123')).rejects.toThrow('Failed to load variables: 500');
    });
  });

  describe('saveVariables', () => {
    it('succeeds when fetch returns ok', async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: true });

      await expect(saveVariables('123', { var1: 'val' })).resolves.toBeUndefined();
      expect(fetch).toHaveBeenCalledWith('/api/variables?uid=123', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ var1: 'val' }),
      });
    });

    it('throws error when fetch fails', async () => {
      (fetch as jest.Mock).mockResolvedValue({ ok: false, status: 400 });

      await expect(saveVariables('123', { var1: 'val' })).rejects.toThrow(
        'Failed to save variables: 400'
      );
    });
  });
});
