const MyPromise = require("./myPromise");

// let p = new MyPromise((resolve, reject) => {
//   // setTimeout(() => {
//   //   resolve("成功...");
//   // }, 2000);
//   resolve("chenggong");
//   // reject("失败");
// });

// function other() {
//   return new MyPromise((resolve, reject) => {
//     resolve("other");
//   });
// }

function p1() {
  return new MyPromise((resolve, reject) => {
    resolve("p1");
  });
}
function p2() {
  return new MyPromise((resolve, reject) => {
    setTimeout(() => {
      resolve("p2");
    }, 2000);
  });
}

MyPromise.all(["a", "b", p1(), p2(), "c"]).then(result => {
  console.log("result", result);
});
// p.then(
//   value => {
//     console.log(value);
//     return "aaa";
//   },
//   reason => {
//     console.log(reason.message);
//   }
// ).then(val => {
//   console.log(val);
// });
