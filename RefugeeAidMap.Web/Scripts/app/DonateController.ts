/// <reference path="../../typings/angularjs/angular.d.ts" />

module Donate {
    export interface Scope {
        greetingText: string;
    }

    export class Controller {
        constructor($scope: Scope) {
            $scope.greetingText = "Hello from TypeScript + AngularJS!!";
        }
    }
}

angular.module('app')
    .controller('donateController', Donate.Controller);