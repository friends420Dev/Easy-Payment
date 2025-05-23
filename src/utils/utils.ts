export const _findObjectOfArrayById = (
  array: { id: string | number; [key: string]: any }[],
  id: number | string
): { [key: string]: any } | null => {
  const obj = array.find((x) => x.id.toString() === id.toString());
  return !!obj ? obj : null;
};
export const _findObjectOfArrayByKeyName = (
  array: { [key: string]: any }[],
  value: number | string,
  keyName: string
): { [key: string]: any } | null => {
  const obj = array.find((x) => x[keyName] === value);
  return !!obj ? obj : null;
};

export const _findIndexOfArrayById = (
  array: { id: string | number; [key: string]: any }[],
  id: number | string
): number => {
  const index = array
    .map((x) => {
      return x.id;
    })
    .indexOf(id);
  return index > 0 ? index : 0;
};

export const isTokenExpired = (token: string) => {
  if (!token.length) return true;
  const payloadBase64 = token.split(".")[1];
  const decodedJson = Buffer.from(payloadBase64, "base64").toString();
  const decoded = JSON.parse(decodedJson);
  const exp = decoded.exp;
  const expired = Date.now() >= exp * 1000;
  return expired;
};
