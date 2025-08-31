class B {
    constructor(y1) {
        this.y = y1;
    }
}
class A extends B {
    constructor(x1, z) {
        super(z)   // lấy thuộc tính của cha ra sài
        // giống như this.y=z
        this.x = x1;
    }

    f1() {
        console.log(this.x);
    }

}

var teoem = new A("100", "kế thừa từ cha B");
console.log(teoem);
teoem.f1();