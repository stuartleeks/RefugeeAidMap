/// <reference path="../typings/angularjs/angular.d.ts" />
module Donate {
    export class Service {

        constructor(
            private $rootScope: ng.IRootScopeService,
            private $http : ng.IHttpService
            ) {
        }

        public loadMarkers() {
            this.$http.get('/TristanData.json')
                .success(data => this.$rootScope.$broadcast('markersLoaded', data));
        }
    }
}

angular.module('app')
    .service('donateService', Donate.Service);
