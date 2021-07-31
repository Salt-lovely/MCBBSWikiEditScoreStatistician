const EmptyNameSpaceObj: {
  [ns in NameSpaceId]: number;
} = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
  4: 0,
  5: 0,
  6: 0,
  7: 0,
  8: 0,
  9: 0,
  10: 0,
  11: 0,
  12: 0,
  13: 0,
  14: 0,
  15: 0,
  274: 0,
  275: 0,
  710: 0,
  711: 0,
  2300: 0,
  2301: 0,
  2302: 0,
  2303: 0,
  3100: 0,
  3101: 0,
  [-1]: 0,
};

/** 获取一个以**所有名字空间的数字ID**为键，值为 0 的对象 */
export function getEmptyNSObj(): {
  [ns in NameSpaceId]: number;
} {
  return Object.assign({}, EmptyNameSpaceObj);
}
