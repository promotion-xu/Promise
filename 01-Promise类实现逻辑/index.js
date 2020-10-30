const MyPromise = require("./myPromise");

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功...");
  }, 2000);
  // reject("失败");
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve("other");
  });
}

p.then(
  value => {
    console.log(value);
    return "aaa";
  },
  reason => {
    console.log(reason.message);
  }
).then(val => {
  console.log(val);
});
