const nameSpaceMap: {
  [nsid in NameSpaceId]: string;
} = {
  0: '（主）',
  1: '讨论',
  2: '用户',
  3: '用户讨论',
  4: 'MCBBS Wiki',
  5: 'MCBBS Wiki讨论',
  6: '文件',
  7: '文件讨论',
  8: 'MediaWiki',
  9: 'MediaWiki讨论',
  10: '模板',
  11: '模板讨论',
  12: '帮助',
  13: '帮助讨论',
  14: '分类',
  15: '分类讨论',
  274: 'Widget',
  275: 'Widget talk',
  710: 'TimedText',
  711: 'TimedText talk',
  2300: 'Gadget',
  2301: 'Gadget talk',
  2302: 'Gadget definition',
  2303: 'Gadget definition talk',
  3100: '页面废存',
  3101: '页面废存讨论',
  [-1]: '特殊',
};
// 彻底封存
Object.freeze(nameSpaceMap);
export { nameSpaceMap };
