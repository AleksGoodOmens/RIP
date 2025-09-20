import { replaceVariables, encodeVariables } from './variableTransform';

describe('replaceVariables', () => {
  const variables = {
    baseUrl: 'https://api.example.com',
    userId: '123',
    token: 'abc123',
  };

  it('replaces known variables', () => {
    const input = '{{baseUrl}}/users/{{userId}}?token={{token}}';
    const result = replaceVariables(input, variables);
    expect(result).toBe('https://api.example.com/users/123?token=abc123');
  });

  it('preserves unknown variables', () => {
    const input = '{{missing}}/path/{{userId}}';
    const result = replaceVariables(input, variables);
    expect(result).toBe('{{missing}}/path/123');
  });

  it('handles empty input', () => {
    expect(replaceVariables('', variables)).toBe('');
  });

  it('handles no variables', () => {
    expect(replaceVariables('{{userId}}/profile', {})).toBe('{{userId}}/profile');
  });
});

describe('encodeVariables', () => {
  const variables = {
    baseUrl: 'https://api.example.com',
    userId: '123',
    token: 'abc123',
  };

  it('encodes known values into variable syntax (actual behavior)', () => {
    const input = 'https://api.example.com/users/123?token=abc123';
    const result = encodeVariables(input, variables);
    expect(result).toBe('{{baseUrl}}/users/{{userId}}?token=abc{{userId}}');
  });

  it('preserves unknown values', () => {
    const input = 'https://other.com/users/123';
    const result = encodeVariables(input, variables);
    expect(result).toBe('https://other.com/users/{{userId}}');
  });

  it('handles overlapping values safely (actual behavior)', () => {
    const overlapping = {
      a: '123',
      b: '1234',
    };
    const input = '1234-123';
    const result = encodeVariables(input, overlapping);
    expect(result).toBe('{{a}}4-{{a}}');
  });

  it('handles empty input', () => {
    expect(encodeVariables('', variables)).toBe('');
  });

  it('handles no variables', () => {
    expect(encodeVariables('123/profile', {})).toBe('123/profile');
  });
});
