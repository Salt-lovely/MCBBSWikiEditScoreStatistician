import { chunk } from './utils/chunk';
import { flat } from './utils/flat';
import { _fetch } from './utils/timeoutFetch';

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
 * @param timeout 超时时间
 * @returns 获取到的数据
 */
export async function fetchRid(rid: number, timeout = 15000): Promise<QueriedData> {
  return await _fetch(url + rid, undefined, timeout)
    .then((res) => res.json())
    .catch(() => badData);
}

/**
 * 批量查询
 * @param rids rid 列表
 * @param timeout 单次访问超时时间
 * @returns 查询到的数据
 */
export async function fetchRids(rids: number[], timeout = 15000): Promise<QueriedData[]> {
  const res: QueriedData[] = [];
  for (let rid of rids) {
    res.push(await fetchRid(rid, timeout));
  }
  return res;
}

/**
 * 多进程查询
 * @param rids rid 列表
 * @param timeout 单次访问超时时间
 * @param threads 进程数
 * @returns 查询到的数据
 */
export async function mutiThreadFetchRids(
  rids: number[],
  threads: number = 4,
  timeout = 15000
): Promise<QueriedData[]> {
  const ridQueue = chunk(rids, threads);
  const taskQueue: Promise<QueriedData[]>[] = ridQueue.map((rids) => fetchRids(rids, timeout));
  const threadsRuturn = await Promise.all(taskQueue);
  return flat(threadsRuturn);
}
