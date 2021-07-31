const userIdMap: {
  [uid: number]: string;
} = {};
const idUserMap: {
  [user: string]: number;
} = {};

const CachedDatas: CachedDatas = [];

/** 通过 uid 获取用户名 */
export function getUserName(uid: number): string | undefined {
  return userIdMap[uid];
}

/** 通过用户名获取 uid */
export function getUserId(uname: string): number | undefined {
  return idUserMap[uname];
}

/** 缓存获取的数据 */
export function setData(datas: QueriedData[]) {
  for (let data of datas) {
    if (!data.query.pages) continue;
    const k = Object.keys(data.query.pages)[0];
    if (!k) continue;
    const revision = data.query.pages[k].revisions[0];
    // 只记录名字空间和uid
    CachedDatas[revision.revid] = {
      ns: data.query.pages[k].ns,
      uid: revision.userid,
    };
    // 记录 uid 与用户名间的映射关系
    if (!userIdMap[revision.userid]) userIdMap[revision.userid] = revision.user;
    if (!idUserMap[revision.user]) idUserMap[revision.user] = revision.userid;
  }
}

/** 获取某个 uid 下的所有编辑记录 */
export function getDataByUid(uid: number): CachedDatas {
  const res: CachedDatas = [];
  for (let data of CachedDatas) {
    if (data.uid === uid) res.push(Object.assign({}, data));
  }
  return res;
}

/** 获取某个用户的所有编辑记录 */
export function getDataByUname(uname: string): CachedDatas {
  const uid = getUserId(uname);
  if (!uid) return [];
  return getDataByUid(uid);
}
