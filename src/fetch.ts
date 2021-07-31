import { chunk } from './utils/chunk';
import { flat } from './utils/flat';

/** 链接，查询包括用户名、用户id、编辑id等 */
const url = 'https://mcbbs-wiki.cn/api.php?action=query&format=json&prop=revisions&rvprop=user%7Cids%7Cuserid&revids=';
/** 出错时返回这个空数据 */
const badData: BadQueriedData = {
  batchcomplete: '',
  query: {
    badrevids: {},
  },
};

/**
 * 根据 rid 获取编辑信息
 * @param rid 编辑的 rid
 * @returns 获取到的数据
 */
export async function fetchRid(rid: number): Promise<QueriedData> {
  return await fetch(url + rid)
    .then((res) => res.json())
    .catch(() => badData);
}

/**
 * 批量查询
 * @param rids rid列表
 * @returns 查询到的数据
 */
export async function fetchRids(...rids: number[]): Promise<QueriedData[]> {
  const res: QueriedData[] = [];
  for (let rid of rids) {
    res.push(await fetchRid(rid));
  }
  return res;
}

/**
 * 多进程查询
 * @param rids rid列表
 * @param threads 进程数
 * @returns 查询到的数据
 */
export async function mutiThreadFetchRids(rids: number[], threads: number = 4): Promise<QueriedData[]> {
  const ridQueue = chunk(rids, threads);
  const taskQueue: Promise<QueriedData[]>[] = ridQueue.map((rids) => fetchRids(...rids));
  const threadsRuturn = await Promise.all(taskQueue);
  return flat(threadsRuturn);
}
