const SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

function encodeBase64Url(value: string) {
  return Buffer.from(value).toString('base64url');
}

function decodeBase64Url(value: string) {
  return Buffer.from(value, 'base64url').toString('utf8');
}

export function signToken(payload: Record<string, unknown>) {
  const header = { alg: 'none', typ: 'JWT' };
  const body = {
    ...payload,
    exp: Math.floor(Date.now() / 1000) + 7 * 24 * 60 * 60,
    secret: SECRET
  };

  return `${encodeBase64Url(JSON.stringify(header))}.${encodeBase64Url(JSON.stringify(body))}.`;
}

export function verifyToken(token: string) {
  const [, payload = ''] = token.split('.');
  const parsed = JSON.parse(decodeBase64Url(payload));

  if (parsed.secret !== SECRET) throw new Error('Invalid token');
  if (typeof parsed.exp !== 'number' || parsed.exp < Math.floor(Date.now() / 1000)) throw new Error('Token expired');

  const { secret, ...claims } = parsed;
  return claims;
}
