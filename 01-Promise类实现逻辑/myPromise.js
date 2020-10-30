const PENDING = "pending";
const FULLFILLED = "fullfilled";
const FAILED = "failed";

class MyPromise {
  constructor(exec) {
    try {
      exec(this.resolve, this.reject);
    } catch (e) {
      this.reject(e);
    }
  }

  status = PENDING;
  value = undefined;
  reason = undefined;

  successCallback = [];
  failCallback = [];

  resolve = value => {
    if (this.status !== PENDING) return;
    this.status = FULLFILLED;
    this.value = value;
    while (this.successCallback.length) {
      this.successCallback.shift()();
    }
  };

  reject = reason => {
    if (this.status !== PENDING) return;
    this.status = FAILED;
    this.reason = reason;
    while (this.failCallback.length) {
      this.failCallback.shift()();
    }
  };

  then = (successCallback, failCallback) => {
    successCallback = successCallback ? successCallback : value => value;
    failCallback = failCallback
      ? failCallback
      : reason => {
          throw reason;
        };
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULLFILLED) {
        // 要判断返回的值x是promise,还是普通值
        // 如果是普通值，直接返回resolve
        // 如果是promise, 查看结果返回resolve or reject
        setTimeout(() => {
          try {
            let x = successCallback(this.value);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else if (this.status === FAILED) {
        setTimeout(() => {
          try {
            let x = failCallback(this.reason);
            resolvePromise(promise2, x, resolve, reject);
          } catch (e) {
            reject(e);
          }
        }, 0);
      } else {
        this.successCallback.push(() => {
          setTimeout(() => {
            try {
              let x = successCallback(this.value);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
        this.failCallback.push(() => {
          setTimeout(() => {
            try {
              let x = failCallback(this.reason);
              resolvePromise(promise2, x, resolve, reject);
            } catch (e) {
              reject(e);
            }
          }, 0);
        });
      }
    });
    return promise2;
  };

  static all = array => {
    let result = [];
    let i = 0;

    return new MyPromise((resolve, reject) => {
      function addValueToResult(index, value) {
        result[index] = value;
        i++;
        if (i === array.length) {
          resolve(result);
        }
      }
      array.forEach((item, index) => {
        if (item instanceof MyPromise) {
          item.then(
            value => addValueToResult(index, value),
            reason => reject(reason)
          );
        } else {
          addValueToResult(index, item);
        }
      });
    });
  };
}

function resolvePromise(promise2, x, resolve, reject) {
  if (promise2 === x) {
    return reject(new TypeError("chain error"));
  }
  if (x instanceof MyPromise) {
    x.then(resolve, reject);
  } else {
    resolve(x);
  }
}

module.exports = MyPromise;
