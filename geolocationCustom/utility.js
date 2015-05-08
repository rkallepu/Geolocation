angular.module('utility',[]).directive('geolocation', function($q, $http){
    //console.log('From the directive');
    //var scope = $rootScope;
    //console.log(scope);
    return {
        restrict: 'A',
        compile: function(element, attributes){
            var map;
            var loadPromise = $q.defer();

            function loadScriptUrl(url){
                console.log('Inside loadScriptURl');
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.src = url;
                document.body.appendChild(script);
            }
            function loadMap() {
                map = new google.maps.Map(element[0], {
                    zoom: 16,
                    center: new google.maps.LatLng(22,104)
                });
            }
            loadScriptUrl('https://maps.googleapis.com/maps/api/js?v=3.exp&callback=loadedScript');
            window.loadedScript = function(){
                loadMap();
                loadPromise.resolve();
            };
            /*function createNavigatePromise(){
                return new Promise(function(resolve, reject){
                    window.navigator.geolocation.getCurrentPosition(function(obj){
                        resolve(obj);
                    }, function(){
                        reject();
                    });
                });
            }*/
            return{
                pre: function(){},
                post: function(scope, element, attribute){
                    console.log(element[0]);
                    var navigatePromise = $q.defer();
                    var city_name = 'san francisco';
                    $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city_name))
                        .success(function (data) {
                            navigatePromise.resolve(data);
                        }).error(function () {
                            navigatePromise.reject();
                        });

                    /*navigatePromise.promise.then(function(obj) {
                        console.log(obj);
                        console.log(element[0]);
                        var coords = obj.coord;
                        console.log(coords.lat, coords.lon);
                        var cityLatlon = new google.maps.La/!**!/tLng(coords.lat, coords.lon);
                        var map = new google.maps.Map(element[0], {
                            zoom: 16,
                            center: cityLatlon
                        });
                        var marker = new google.maps.Marker({
                            position: cityLatlon,
                            map: map,
                            title: 'san francisco'
                        });
                        map.setCenter(city_lat_lng);
                    });*/

                       $q.all([loadPromise.promise, navigatePromise.promise]).then(function (results) {
                            // add all the markers to the google map here ...
                            console.log(results);
                            var coords = results[1].coord;
                            var city_lat_lng = new google.maps.LatLng(coords.lat, coords.lon);
                            var marker = new google.maps.Marker({
                                position: city_lat_lng,
                                map: map,
                                title: city_name
                            });
                            map.setCenter(city_lat_lng);
                    });
                    /*createNavigatePromise().then(function (obj){
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
                    })*/
                }
            };
            //window.onload = loadScript;
        }
    }
});
