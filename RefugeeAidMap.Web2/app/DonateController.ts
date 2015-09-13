/// <reference path="../typings/googlemaps/google.maps.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module Donate {
    export interface IMarkerInfo {
        title: string,
        lat: number,
        lng: number
    }
    export class Controller {
        message: string;
        markers: IMarkerInfo[]
        currentMarker: IMarkerInfo;
        currentInfoWindow: google.maps.InfoWindow;
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
                    this.markers.forEach(m=> {
                        var mapMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(m.lat, m.lng),
                            title: m.title
                        });
                        var infoWindow = new google.maps.InfoWindow({
                            // TODO - template this in the view!
                            // TODO - sanitize content/encode content!!
                            content: '<b>' + m.title + '</b>'
                        });
                        mapMarker.addListener('click', () => {
                            if (this.currentInfoWindow != null) {
                                this.currentInfoWindow.close();
                            }
                            this.currentMarker = m;
                            infoWindow.open(this.map, mapMarker);
                            this.currentInfoWindow = infoWindow;
                        }); 
                        mapMarker.setMap(this.map);
                    });
                });

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
