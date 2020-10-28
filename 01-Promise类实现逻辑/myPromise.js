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

  resolve = value => {
    if (this.status !== PENDING) return;
    this.status = FULLFILLED;
    this.value = value;
  };

  reject = reason => {
    if (this.status !== PENDING) return;
    this.status = FAILED;
    this.reason = reason;
  };

  then = (successCallback, failCallback) => {
    if (this.status === FULLFILLED) {
      successCallback(this.value);
    } else if (this.status === FAILED) {
      failCallback(this.reason);
    } else {
    }
  };
}

module.exports = MyPromise;
