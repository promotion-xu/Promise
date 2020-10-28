const MyPromise = require("./myPromise");

let p = new MyPromise((resolve, reject) => {
  resolve("成功");
  reject("失败");
});

p.then(
  val => {
    console.log("val", val);
  },
  rea => {
    console.log("reason", reason);
  }
);
