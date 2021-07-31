import { DEBUG } from '../ENV';

export function _fetch(input: RequestInfo, init?: RequestInit | undefined, timeout = 15000): Promise<Response> {
  const promise = fetch(input, init);
  return new Promise<Response>((resolve, reject) => {
    const timeoutId = setTimeout(() => {
      if (DEBUG) console.log(`fetch ${input} , ${timeout}ms timeout`);
      reject(new Error(`fetch ${input}, ${timeout}ms timeout`));
    }, timeout);
    promise.then(
      (res) => {
        if (DEBUG) console.log(`fetch ${input} succeed`);
        clearTimeout(timeoutId);
        resolve(res);
      },
      (err) => {
        if (DEBUG) console.log(`fetch ${input} fail`);
        clearTimeout(timeoutId);
        reject(err);
      }
    );
  });
}
