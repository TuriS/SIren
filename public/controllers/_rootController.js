/* globals Ui:false*/
/* globals angular: true*/
/* globals $: true*/
/* globals AmazonCognitoIdentity: true*/
var Ui = {
    config: {
    },
    getApp: function() {
        return angular.module("siren");
    }
};

Ui.app = angular.module("siren", ['ngRoute'])
    .constant('config', Ui.config)
    // .config(function($interpolateProvider, $routeProvider, $sceDelegateProvider) {
    //     $interpolateProvider.startSymbol('[[');
    //     $interpolateProvider.endSymbol(']]');
    //     $routeProvider
    //         .when('/', {
    //             templateUrl:'views/start.html'
    //         })
    //         .when('/:temp', {
    //             templateUrl : function(params) {
    //                 return 'views/' + params.temp + '.html';
    //             }
    //         }).otherwise({
    //             redirectTo: "/"
    //         });
    //     $sceDelegateProvider.resourceUrlWhitelist([
    //         // Allow same origin resource loads.
    //         'self',
    //         // Allow loading from our assets domain.  Notice the difference between * and **.
    //         'http://*.*.*/**'
    //     ]);
    // })
    .controller("_rootController", ["$scope", "$rootScope", "config", async function($scope, $rootScope, config) {
        $scope.app = {};
        $scope.$on('MESSAGE.INFO', function(event, data) {
            $scope.showMessage('info', data);
        });

        $scope.$on('MESSAGE.WARN', function(event, data) {
            $scope.showMessage('warn', data);
        });

        $scope.$on('MESSAGE.ERROR', function(event, data) {
            $scope.showMessage('error', data);
        });

        // inject constants into any scope
        $rootScope.config = config;
        let navlinks = $(".navi li");
        navlinks.click(function(event) {
            navlinks.removeClass("active");
            $(event.currentTarget).addClass("active");
        });


        $rootScope.Samsa = {};

        $rootScope.init = function() {
            console.log("init");
        };


        /*
        * Cognito User Pool functions
        */


        $rootScope.init();
    }])
    .controller("subscriptions", ["$scope", "$rootScope", "config", async function($scope, $rootScope, config) {
        console.log("thisworks");
    }]);
    

