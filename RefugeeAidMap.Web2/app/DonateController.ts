/// <reference path="../typings/googlemaps/google.maps.d.ts" />
/// <reference path="../typings/angularjs/angular.d.ts" />
module Donate {
    export interface IMarkerInfo {
        title: string,
        lat: number,
        lng: number,
        groupLink: string,
        postcode: string,
        locale: string
    }
    export class Controller {
        message: string;
        markers: IMarkerInfo[]
        currentMarker: IMarkerInfo;
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
                    var infoWindow = new google.maps.InfoWindow({
                        content: document.getElementById('infoWindowContent')
                    });
                    this.markers.forEach(m=> {
                        var mapMarker = new google.maps.Marker({
                            position: new google.maps.LatLng(m.lat, m.lng),
                            title: m.title
                        });
                        mapMarker.addListener('click', () => {
                            infoWindow.close();
                            this.currentMarker = m;
                            $scope.$apply();
                            infoWindow.open(this.map, mapMarker);
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
