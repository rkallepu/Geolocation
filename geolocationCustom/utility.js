angular.module('utility',[]).directive('geolocation', function($q){
    //console.log('From the directive');
    return {
        restrict: 'A',
        compile: function(element, attributes){
            var loadPromise = $q.defer();

            function loadScriptUrl(url){
                console.log('Inside loadScriptURl');
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                document.body.appendChild(script);
            }
            loadScriptUrl('https://maps.googleapis.com/maps/api/js?v=3.exp&callback=loadedScript');
            window.loadedScript = function(){
                loadPromise.resolve();
            }
            function createNavigatePromise(){
                return new Promise(function(resolve, reject){
                    window.navigator.geolocation.getCurrentPosition(function(obj){
                        resolve(obj);
                    }, function(){
                        reject();
                    });
                });
            }
            return{
                pre: function(){},
                post: function(){
                    //var navigatePromise = $q.defer();
                    createNavigatePromise().then(function (obj){
                        console.log(obj);
                        var coords = obj.coords;
                        var map = new google.maps.Map(document.body,{
                            zoom: 16,
                            center: new google.maps.LatLng(coords.latitude, coords.longitude)
                        });
                        new google.maps.Marker({
                            position: new google.maps.LatLng(coords.latitude, coords.longitude),
                            map: map,
                            title: 'rashmika'
                        });
                    }, function(){
                        console.log('Error loading the data');
                    })
                }
            };
            //window.onload = loadScript;
        }
    }
});
