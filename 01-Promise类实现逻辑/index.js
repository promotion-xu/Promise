const MyPromise = require("./myPromise");

let p = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("成功");
  }, 2000);
  // reject("失败");
});

p.then(
  val => {
    console.log("val", val);
  },
  rea => {
    console.log("reason", reason);
  }
);
