function Publisher(){
    this.Events = {
        'ngm':[]
    };
}
Publisher.prototype.publish = function(ngm){
    this.Events[ngm].forEach(function(fn){
       fn();
    });
};
function Subscriber(name){
    this.name = name;
}
Subscriber.prototype.subscribe = function (ng, ngm, fn){
    ng.Events[ngm].push(fn.bind(this));
};
//test case
var ng = new Publisher();
var Chris = new Subscriber('Chris');
var Rashmika = new Subscriber('Rashmika');
Chris.subscribe(ng,'ngm', function(){
    console.log('Posting Magazine to ' + this.name);
});
Rashmika.subscribe(ng,'ngm', function(){
    console.log('Posting Magazine to '+ this.name);
});
ng.publish('ngm'); // This Should Print "Posting Magazine to Chris"
