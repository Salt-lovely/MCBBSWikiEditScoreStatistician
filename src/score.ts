import { scoreMap } from './settings/scoreMap';
import { getDataByUid, getDataByUname } from './statistic';
import { getEmptyNSObj } from './utils/emptyNSObject';

interface userStatistician {
  score: number;
  editCount: { [ns in NameSpaceId]: number };
}

export function scoreCalc(datas: CachedDatas): userStatistician {
  const res = {
    score: 0,
    editCount: getEmptyNSObj(),
  };
  for (let data of datas) {
    const ns = data.ns;
    res.score += scoreMap[ns];
    res.editCount[ns]++;
  }
  return res;
}

/**
 * 根据用户 id 生成用户统计
 * @param uid 用户 id
 */
export function getUserScore(uid: number): userStatistician;
/**
 * 根据用户名生成用户统计
 * @param uname 用户名
 */
export function getUserScore(uname: string): userStatistician;
export function getUserScore(u: number | string): userStatistician {
  let data: CachedDatas;
  if (typeof u === 'number') {
    data = getDataByUid(u);
  } else if (typeof u === 'string') {
    data = getDataByUname(u);
  } else {
    data = [];
  }
  return scoreCalc(data);
}
