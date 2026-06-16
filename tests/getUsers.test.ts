import { getUsersQuerySchema } from '../src/schemas/getUsers.schema';

describe('getUsersQuerySchema', () => {
  it('defaults limit to 20 when not provided', () => {
    const parsed = getUsersQuerySchema.parse({});
    expect(parsed.limit).toBe(20);
    expect(parsed.lastUserId).toBeUndefined();
  });

  it('coerces lastUserId from string to number', () => {
    const parsed = getUsersQuerySchema.parse({ lastUserId: '42' });
    expect(parsed.lastUserId).toBe(42);
  });

  it('rejects a non-positive lastUserId', () => {
    expect(() => getUsersQuerySchema.parse({ lastUserId: '0' })).toThrow();
  });

  it('rejects a limit above the maximum', () => {
    expect(() => getUsersQuerySchema.parse({ limit: '500' })).toThrow();
  });
});
