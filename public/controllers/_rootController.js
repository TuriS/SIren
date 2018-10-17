/* globals Ui:false*/
/* globals angular: true*/
/* globals $: true*/
var Ui = {
    config: {
    },
    getApp: function() {
        return angular.module("siren");
    }
};

Ui.app = angular.module("siren", ['ngRoute'])
    .constant('config', Ui.config)
    .config(function($interpolateProvider, $routeProvider, $sceDelegateProvider) {
        $interpolateProvider.startSymbol('[[');
        $interpolateProvider.endSymbol(']]');
        // $routeProvider
        //     .when('/', {
        //         templateUrl:'views/start.html'
        //     })
        //     .when('/:temp', {
        //         templateUrl : function(params) {
        //             return 'views/' + params.temp + '.html';
        //         }
        //     }).otherwise({
        //         redirectTo: "/"
        //     });
        // $sceDelegateProvider.resourceUrlWhitelist([
        //     // Allow same origin resource loads.
        //     'self',
        //     // Allow loading from our assets domain.  Notice the difference between * and **.
        //     'http://*.*.*/**'
        // ]);
    })
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

        $rootScope.init = function() {
            console.log("init");
        };
        $rootScope.players = await $.getJSON("/player/players");

        function start_stop(id) {
            let element = $("#soundfile_" + id + " .playbutton");
            console.log(element);
            if(element.hasClass("playing")) {
                $.post("/player/stop/" + id,"start", function(res) {}).then(()=> {
                    element.removeClass("playing");
                    element.removeClass("btn-primary");
                    element.addClass("btn-secondary");
                });
            } else {
                let vol = $("#soundfile_" + id + " input[type=range]").val();
                let settings = {
                    volume: vol
                };
                $.post("/player/start/" + id, settings, function(res) {}).then(()=> {
                    element.addClass("playing");
                    element.addClass("btn-primary");
                    element.removeClass("btn-secondary");
                });
            }
        }
        $rootScope.start_stop = start_stop;

        function vol(id, val) {
            $.post("/player/setVolume/" + id + "/" + val,"start", function(res) {});
        }
        $rootScope.vol = vol;

        $rootScope.$apply();
        // console.log($rootScope.players);

        //$rootScope.init();
    }]);
    

