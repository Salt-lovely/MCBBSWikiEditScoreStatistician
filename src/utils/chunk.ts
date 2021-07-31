/** 将一个数组分为长度近似的多份 */
export function chunk<T>(arr: T[], parts: number): T[][] {
  if (parts < 2) return [arr];
  const res: T[][] = [];
  const size = arr.length / Math.floor(parts);
  let start = 0;
  let end = 0;
  for (let i = 0; i < Math.floor(parts); i++) {
    start = end;
    end += size;
    res.push(arr.slice(Math.round(start), Math.round(end)));
  }
  return res;
}
