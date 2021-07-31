/** 搜索结果 */
interface QueriedData extends GoodQueriedData, BadQueriedData {}
/** 搜索结果中包含 user ids userid */
interface GoodQueriedData {
  batchcomplete: string;
  query: {
    pages: {
      [key: string]: {
        pageid: number;
        /** 页面的名字空间 */
        ns: NameSpaceId;
        title: string;
        revisions: [
          {
            revid: number;
            parentid: number;
            /** 用户名 */
            user: string;
            /** 用户ID */
            userid: number;
          }
        ];
      };
    };
  };
}
/** 搜索结果中包含 user ids userid */
interface BadQueriedData {
  batchcomplete: string;
  query: {
    badrevids: {
      [key: string]: {
        revid: number;
      };
    };
  };
}
type CachedDatas = CachedData[];
/** 储存的搜索结果 */
interface CachedData {
  /** 用户ID */
  uid: number;
  /** 名字空间 */
  ns: NameSpaceId;
}
/** ```
 * 0 主
 * 2 用户
 * 4 project
 * 6 文件
 * 8 MediaWiki
 * 10 模板
 * 12 帮助
 * 14 分类
 * 274 小部件
 * 710 timedText
 * 2300 小工具
 * 2302 小工具定义
 * 3100 页面废存
 * -1 特殊
 * ```
 */
type NameSpaceId =
  | -1
  | 0
  | 1
  | 2
  | 3
  | 4
  | 5
  | 6
  | 7
  | 8
  | 9
  | 10
  | 11
  | 12
  | 13
  | 14
  | 15
  | 274
  | 275
  | 710
  | 711
  | 2300
  | 2301
  | 2302
  | 2303
  | 3100
  | 3101;
