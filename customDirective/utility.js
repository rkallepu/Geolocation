angular.module('utility',[]).directive('local', function(){
    return{
        restrict: 'A',
        templateUrl: '',
       /* link: function (scope, element, attributes){
            console.log(element[0].getAttribute('name'));
            var obj ={};
            element[0].addEventListener('keydown', function(event){
               //console.log(event.keyCode)
                if(event.keyCode === 13){
                    obj[this.getAttribute('name')] = this.value;
                    console.log(this.getAttribute('name'));
                    console.log(this.value);
                }
            });
            localStorage.setItem('localObj', obj);
            var Obj1 = localStorage.getItem('localObj');
            console.log(Obj1);
        }*/
        link: function (scope, element, attributes){
            var val =localStorage.getItem(attributes.name) || '';
            element.val(val);

            element[0].addEventListener('change', function(){
               localStorage.setItem(attributes.name, this.value);
            });
        }
    }
});
