const MyPromise = require("./myPromise");

let p = new MyPromise((resolve, reject) => {
  resolve("成功...");
  // reject("失败");
});

function other() {
  return new MyPromise((resolve, reject) => {
    resolve("other");
  });
}

let p1 = p.then(val => {
  console.log("val", val);
  return p1;
});

p1.then(
  value => {
    console.log(value);
  },
  reason => {
    console.log(reason.message);
  }
);
