/* globals Ui:false*/
/* globals angular: true*/
/* globals $: true*/
var Ui = {
    config: {},
    getApp: function () {
        return angular.module("siren");
    }
};

Ui.app = angular.module("siren", ['ngRoute'])
    .constant('config', Ui.config)
    .config(function ($interpolateProvider, $routeProvider, $sceDelegateProvider) {
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
    .controller("_rootController", ["$scope", "$rootScope", "config", async function ($scope, $rootScope, config) {
        $scope.app = {};
        $scope.$on('MESSAGE.INFO', function (event, data) {
            $scope.showMessage('info', data);
        });

        $scope.$on('MESSAGE.WARN', function (event, data) {
            $scope.showMessage('warn', data);
        });

        $scope.$on('MESSAGE.ERROR', function (event, data) {
            $scope.showMessage('error', data);
        });

        // inject constants into any scope
        $rootScope.config = config;

        $rootScope.init = function () {
            console.log("init");
        };
        $rootScope.players = await $.getJSON("/player/players");

        function start_stop(id) {
            let element = $("#soundfile_" + id + " .playbutton");
            if (element.hasClass("playing")) {
                $.post("/player/stop/" + id, "start", function (res) {}).then(() => {
                    element.removeClass("playing");
                    element.removeClass("btn-primary");
                    element.addClass("btn-secondary");
                });
            } else {
                let vol = $("#soundfile_" + id + " input[type=range]").val();
                let settings = {
                    volume: vol
                };
                $.post("/player/start/" + id, settings, function (res) {}).then(() => {
                    element.addClass("playing");
                    element.addClass("btn-primary");
                    element.removeClass("btn-secondary");
                });
            }
        }
        $rootScope.start_stop = start_stop;

        function vol(id, val) {
            $.post("/player/setVolume/" + id + "/" + val, "start", function (res) {});
        }
        $rootScope.vol = vol;
        $(".audio").on('dragover', function (e) {
            console.log(e);
        });
        $("#filetree").jstree({
            "core": {
                "animation": 0,
                "check_callback": true,
                "themes": {
                    "stripes": false,
                    "variant":"large",
                    "responsive": true,
                    icons: true
                },
                'data': {
                    'url' : 'player/filetree',
                    'data' : function (node) {
                        return { 'id' : node.id };
                    }
                }
            },
            "types": {
                "#": {
                    "max_depth": 4,
                    "valid_children": ["root"]
                },
                "root": {
                    "valid_children": ["folder"]
                },
                "folder": {
                    "valid_children": ["folder", "file"],
                    "icon": "glyphicon glyphicon-folder-open"
                },
                "file": {
                    "valid_children": [],
                    "icon": "glyphicon glyphicon-file"
                }
            },
            'sort' : function(a, b) {
                let a1 = this.get_node(a);
                let b1 = this.get_node(b);
                if (a1.icon == b1.icon){
                    return (a1.text > b1.text) ? 1 : -1;
                } else {
                    return (a1.icon < b1.icon) ? 1 : -1;
                }
            },
            "plugins": [
                "contextmenu", "dnd", 
                "state", "types","sort"
            ]
        });
        function addTrack(id, path) {
            $.post("/player/addtrack/" + id, {path : path}, function(e) {
                console.log(e);
            });
        }
        $(document)
            .on('dnd_move.vakata', function (e, data) {
                var t = $(data.event.target);
            })
            .on('dnd_stop.vakata', function (e, data) {
                var t = $(data.event.target);
                let player = t.closest('.audio');
                if(player.length === 0) return;
                let path = data.data.obj.attr("path");
                let id = player.attr("data");
                addTrack(id, path);
            });
        $rootScope.addTrack = addTrack;
        $rootScope.save = function() {
            $.post('/player/save',{}, function(e, data) {
                console.log(data);
            });

        };
        $rootScope.$apply();

    }]);