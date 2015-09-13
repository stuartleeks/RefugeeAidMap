/// <reference path="../typings/googlemaps/google.maps.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module Donate {
    export interface IMarkerInfo {
    }
    export class Controller {
        message: string;
        markers: IMarkerInfo[]
        map: google.maps.Map;

        static $inject = ['donateService', '$scope'];

        constructor(
            private service: Service,
            private $scope: ng.IScope
            ) {
            this.message = 'Hello!';


            $scope.$on(
                'markersLoaded',
                (event, markers: IMarkerInfo[]) => {
                    this.markers = markers;
                }
                );


            this.service.loadMarkers();

            this.initMap('map-container'); // TODO - hook this up in a directive???
        };


        initMap(mapElementId: string) {
            var mapElement = document.getElementById(mapElementId);
            var options: google.maps.MapOptions = {
                center: new google.maps.LatLng(51.48, 0),
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                zoom: 5
            };
            this.map = new google.maps.Map(mapElement, options);


            if (navigator.geolocation) {
                this.message = 'Finding your location...';
                navigator.geolocation.getCurrentPosition(
                    position => {
                        this.$scope.$apply(() => this.message = null);

                        var pos = {
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        };

                        this.map.setCenter(pos);
                        this.map.setZoom(10);
                    },
                    e => this.message = 'Failed to get your location');
            }
        }
    }
}

angular.module('app')
    .controller('donateController', Donate.Controller);
