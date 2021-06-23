export function parseToken(token: string) {
  const tokenPart = token.split(' ')[1];
  const base64Url = tokenPart.split('.')[1];
  const base64 = base64Url.replace('-', '+').replace('_', '/');
  console.log(base64);
  return JSON.parse(atob(base64));
}
