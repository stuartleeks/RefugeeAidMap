/// <reference path="../typings/googlemaps/google.maps.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
var Donate;
(function (Donate) {
    var Controller = (function () {
        function Controller(service, $scope) {
            var _this = this;
            this.service = service;
            this.$scope = $scope;
            this.message = 'Hello!';
            $scope.$on('markersLoaded', function (event, markers) {
                _this.markers = markers;
                var infoWindow = new google.maps.InfoWindow({
                    content: document.getElementById('infoWindowContent')
                });
                _this.markers.forEach(function (m) {
                    var mapMarker = new google.maps.Marker({
                        position: new google.maps.LatLng(m.lat, m.lng),
                        title: m.title
                    });
                    mapMarker.addListener('click', function () {
                        infoWindow.close();
                        _this.currentMarker = m;
                        $scope.$apply();
                        infoWindow.open(_this.map, mapMarker);
                    });
                    mapMarker.setMap(_this.map);
                });
            });
            this.service.loadMarkers();
            this.initMap('map-container'); // TODO - hook this up in a directive???
            this.geocoder = new google.maps.Geocoder();
        }
        ;
        Controller.prototype.initMap = function (mapElementId) {
            var _this = this;
            var mapElement = document.getElementById(mapElementId);
            var options = {
                center: new google.maps.LatLng(51.48, 0),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 5
            };
            this.map = new google.maps.Map(mapElement, options);
            if (navigator.geolocation) {
                this.message = 'Finding your location...';
                navigator.geolocation.getCurrentPosition(function (position) {
                    _this.$scope.$apply(function () { return _this.message = null; });
                    var pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    _this.map.setCenter(pos);
                    _this.map.setZoom(10);
                }, function (e) { return _this.message = 'Failed to get your location'; });
            }
        };
        Controller.prototype.searchClicked = function () {
            var _this = this;
            var searchValue = this.searchValue;
            this.message = 'Searching...';
            this.geocoder.geocode({ address: searchValue }, function (results, status) {
                if (status === google.maps.GeocoderStatus.OK) {
                    _this.map.setCenter(results[0].geometry.location);
                    _this.message = '';
                }
                else {
                    _this.message = "Couldn't find " + searchValue;
                }
                _this.$scope.$apply();
            });
        };
        Controller.$inject = ['donateService', '$scope'];
        return Controller;
    })();
    Donate.Controller = Controller;
})(Donate || (Donate = {}));
angular.module('app')
    .controller('donateController', Donate.Controller);

//# sourceMappingURL=DonateController.js.map