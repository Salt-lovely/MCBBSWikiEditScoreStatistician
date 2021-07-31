/**
 * 摊平一个数组
 * @param arr 需要被摊平的数组
 */
export function flat<T>(arr: T[][]): T[] {
  if (arr.length === 0) return [];
  const anchor = [...arr[0]];
  for (let i = 1; i < arr.length; i++) {
    anchor.push(...arr[i]);
  }
  return anchor;
}
