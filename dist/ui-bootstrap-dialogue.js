angular.module('ui.bootstrap.dialogue', [
        'ui.bootstrap'
    ])
.service('$dialogue', ['$modal', function($modal){

        return {
            confirm: function(message, callback){
                if (typeof callback != 'function') {
                    throw "Error: $dialogue says provided callback for confirm() is not a function";
                    return;
                }

                $modal.open({
                    template: '<div class="modal-header"><h3 class="modal-title" ng-bind="ctrl.message"></h3></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ctrl.respond(true)">Ok</button><button class="btn btn-warning" ng-click="ctrl.respond(false)">Cancel</button></div>',
                    controller: function($modalInstance){
                        var ctrl = this;

                        ctrl.message = message;

                        ctrl.respond = function(response){
                            response ? $modalInstance.close(response) : $modalInstance.dismiss(response);
                        };

                        $modalInstance.result.then(function(){
                            if (typeof callback === "function") {
                                callback(true);
                            }
                        }, function() {
                            if (typeof callback === "function") {
                                callback(false);
                            }
                        });

                    },
                    controllerAs: 'ctrl',
                    backdrop: true
                });
            },
            alert: function(message, callback){
                $modal.open({
                    template: '<div class="modal-header"><h3 class="modal-title" ng-bind="ctrl.message"></h3></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ctrl.close()">Ok</button></div>',
                    controller: function($modalInstance){
                        var ctrl = this;

                        ctrl.message = message;

                        ctrl.close = function(){
                            $modalInstance.close();
                        };

                        $modalInstance.result.then(function(){
                            if (typeof callback === "function") {
                                callback();
                            }
                        });

                    },
                    controllerAs: 'ctrl',
                    backdrop: true
                });
            },
            prompt: function(message, callback){
                $modal.open({
                    template: '<div class="modal-header"><h3 class="modal-title" ng-bind="ctrl.message"></h3></div><div class="modal-body"><p class="form-group"><input type="text" class="form-control" ng-model="ctrl.inputValue"/></p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ctrl.respond(ctrl.inputValue)">Ok</button><button class="btn btn-warning" ng-click="ctrl.dismiss()">Cancel</button></div>',
                    controller: function($modalInstance){
                        var ctrl = this;

                        ctrl.message = message;

                        ctrl.respond = function(response){
                            $modalInstance.close(response);
                        };

                        ctrl.dismiss = function(){
                            $modalInstance.dismiss();
                        };

                        $modalInstance.result.then(function(response){
                            if (typeof callback === "function") {
                                callback(response);
                            }
                        }, function() {
                            if (typeof callback === "function") {
                                callback(false);
                            }
                        });
                    },
                    controllerAs: 'ctrl',
                    backdrop: true
                });
            }
        };
    }]);
