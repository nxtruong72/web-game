export function isEmptyString(value: string): boolean {
  if (typeof value !== 'string') {
    return false;
  }
  return value.trim() === '';
}
