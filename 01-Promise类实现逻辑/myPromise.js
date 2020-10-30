const PENDING = "pending";
const FULLFILLED = "fullfilled";
const FAILED = "failed";

class MyPromise {
  constructor(exec) {
    exec(this.resolve, this.reject);
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
      this.successCallback.shift()(value);
    }
    // this.successCallback && this.successCallback(value);
  };

  reject = reason => {
    if (this.status !== PENDING) return;
    this.status = FAILED;
    this.reason = reason;
    while (this.failCallback.length) {
      this.failCallback.shift()(reason);
    }
    // this.failCallback && this.failCallback(reason);
  };

  then = (successCallback, failCallback) => {
    let promise2 = new MyPromise((resolve, reject) => {
      if (this.status === FULLFILLED) {
        // 要判断返回的值x是promise,还是普通值
        // 如果是普通值，直接返回resolve
        // 如果是promise, 查看结果返回resolve or reject
        setTimeout(() => {
          let x = successCallback(this.value);
          resolvePromise(promise2, x, resolve, reject);
        }, 0);
      } else if (this.status === FAILED) {
        failCallback(this.reason);
      } else {
        this.successCallback.push(successCallback);
        this.failCallback.push(failCallback);
      }
    });
    return promise2;
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
