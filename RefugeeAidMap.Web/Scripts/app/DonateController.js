/// <reference path="../../typings/angularjs/angular.d.ts" />
var Donate;
(function (Donate) {
    var Controller = (function () {
        function Controller($scope) {
            $scope.greetingText = "Hello from TypeScript + AngularJS!!";
        }
        return Controller;
    })();
    Donate.Controller = Controller;
})(Donate || (Donate = {}));
angular.module('app')
    .controller('donateController', Donate.Controller);
