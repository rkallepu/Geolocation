angular.module('utility',[]).directive('geolocation', function($q, $http){
    //console.log('From the directive');
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
                loadPromise.resolve();
            }
            loadScriptUrl('https://maps.googleapis.com/maps/api/js?v=3.exp&callback=loadedScript');
            window.loadedScript = function(){
                loadMap();
            };
            function loadCityWeather(city_name){
                var city_name = city_name || '';
                if(city_name) {
                    $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + encodeURIComponent(city_name))
                        .success(function (data) {
                            console.log(data);
                            var cityName = data.name;
                            var coords = data.coord;
                            var city_latlon = new google.maps.LatLng(coords.lat, coords.lon);
                            var marker = new google.maps.Marker({
                                position: city_latlon,
                                map: map,
                                title: cityName
                            });
                            map.setCenter(city_latlon);
                        }).error(function () {
                            console.log('Error retrieving data object');
                        });
                }
            }
            return{
                pre: function(){},
                post: function(scope, element, attribute){
                    scope.$watch('city', function(){
                        console.log(scope.city);
                        if(scope.city)
                            loadCityWeather(scope.city);
                        else
                            loadCityWeather('San Francisco');
                    });
                       $q.all([loadPromise.promise]).then(function () {
                            // add all the markers to the google map here ..
                    });
                }
            };

        }
    }
});
