/// <reference path="../typings/angularjs/angular.d.ts" />
var Donate;
(function (Donate) {
    var Service = (function () {
        function Service($rootScope, $http) {
            this.$rootScope = $rootScope;
            this.$http = $http;
        }
        Service.prototype.loadMarkers = function () {
            var _this = this;
            this.$http.get('/TristanData.json')
                .success(function (data) { return _this.$rootScope.$broadcast('markersLoaded', data); });
        };
        return Service;
    })();
    Donate.Service = Service;
})(Donate || (Donate = {}));
angular.module('app')
    .service('donateService', Donate.Service);

//# sourceMappingURL=DonateService.js.map