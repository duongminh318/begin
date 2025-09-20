// alert(1);
// normal function
function tong(a, b) {
    const c = a + b;
    return c;
}
const x = 4;
const y = 5;
console.log(tong(x, y));

// generator function
// đặc điểm là dấu * vào từ khoá yield
function* basicOperator(a, b) {
    console.log("Cộng: ");
    const c = a + b;
    yield c; // giống return c

    console.log("Trừ: ");
    const d = a - b;
    return d;
}
const m = 4;
const n = 7;
const interatorObj = basicOperator(m, n);   // chưa chạy dòng code nào
// trong hàm basicOperator
console.log(interatorObj);
// hàm next đùng để chạy code trong hàm đến yield
var obj = interatorObj.next(); //{value: 11, done: false}
// trong đó
//value là giá trị chỗ yield trong hàm, 
//thuộc tính done: hàm đã kết thúc chưa (false: chưa, true: rồi)
console.log(obj);

var obj2 = interatorObj.next(); ///{value: -3, done: true} 
// khi gặp return thì true
console.log(obj2);