function carFactory(constr) {
    if (!carFactory.initiated) {
        function Car() {}
        Car.prototype.roll = function () {
            console.log('vroom');
        };
        carFactory.constructors = {
            'Audi': function Audi() {
                this.type = 'audi'; // relevant audi properties
            },
            'BMW': function BMW() {
                this.type = 'BMW';
            }
        };
        var fn;
        for (var prop in carFactory.constructors) {
            fn = carFactory.constructors[prop];
            fn.prototype = new Car();
            fn.prototype.constructor = fn;
        }
        carFactory.initiated = true;
    }
    return new carFactory.constructors[constr]();
}
var a6 = carFactory('Audi');
a6.roll();
console.log(a6.type);
console.log(a6.constructor);

/*
function carFactory(car){
    fucntion Cars(){

    }
    Cars.prototype.roll = function(){
        console.log('inside Cars Prototype method roll');
    };
    var carObj = Object.create(Cars);


}
carFactory.constructor = {
    'Audi': function (){
        this.type = 'Audi';
    },
    'Mercedes': function () = {
        this.type = 'Mercedes';
},
'BMW': function () = {
    this.type = 'BMW';
}
};*/
