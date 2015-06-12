angular.module('ui.bootstrap.dialogue', [
    'ui.bootstrap'
])
    .service('$dialogue', ['$modal', function ($modal) {
        return {
            confirm: function (message, callback) {
                if (typeof callback != 'function') {
                    throw "Error: $dialogue says provided callback for confirm() is not a function";
                    return;
                }

                $modal.open({
                    template: '<div class="modal-header"><h3 class="modal-title" ng-bind="ctrl.message"></h3></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ctrl.respond(true)">Ok</button><button class="btn btn-warning" ng-click="ctrl.respond(false)">Cancel</button></div>',
                    controller: function ($modalInstance) {
                        var ctrl = this;

                        ctrl.message = message;

                        ctrl.respond = function (response) {
                            response ? $modalInstance.close(response) : $modalInstance.dismiss(response);
                        };

                        $modalInstance.result.then(function () {
                            if (typeof callback === "function") {
                                callback(true);
                            }
                        }, function () {
                            if (typeof callback === "function") {
                                callback(false);
                            }
                        });

                    },
                    controllerAs: 'ctrl',
                    backdrop: true
                });
            },
            alert: function (message, callback) {
                $modal.open({
                    template: '<div class="modal-header"><h3 class="modal-title" ng-bind="ctrl.message"></h3></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ctrl.close()">Ok</button></div>',
                    controller: function ($modalInstance) {
                        var ctrl = this;

                        ctrl.message = message;

                        ctrl.close = function () {
                            $modalInstance.close();
                        };

                        $modalInstance.result.then(function () {
                            if (typeof callback === "function") {
                                callback();
                            }
                        });

                    },
                    controllerAs: 'ctrl',
                    backdrop: true
                });
            },
            prompt: function (message, callback) {
                $modal.open({
                    template: '<div class="modal-header"><h3 class="modal-title" ng-bind="ctrl.message"></h3></div><div class="modal-body"><p class="form-group"><input type="text" class="form-control" ng-model="ctrl.inputValue"/></p></div><div class="modal-footer"><button class="btn btn-primary" ng-click="ctrl.respond(ctrl.inputValue)">Ok</button><button class="btn btn-warning" ng-click="ctrl.dismiss()">Cancel</button></div>',
                    controller: function ($modalInstance) {
                        var ctrl = this;

                        ctrl.message = message;

                        ctrl.respond = function (response) {
                            $modalInstance.close(response);
                        };

                        ctrl.dismiss = function () {
                            $modalInstance.dismiss();
                        };

                        $modalInstance.result.then(function (response) {
                            if (typeof callback === "function") {
                                callback(response);
                            }
                        }, function () {
                            if (typeof callback === "function") {
                                callback(false);
                            }
                        });
                    },
                    controllerAs: 'ctrl',
                    backdrop: true
                });
            },
            dialog: function (options) {
                var sanitizeOptions = function (options) {
                    if (typeof options !== 'object' || angular.isArray(options)) {
                        throw new Error("dialog(): Please supply an object for options");
                    }

                    var sanitizedOptions = {};

                    var hasTitle = (typeof options.title === 'string');
                    var hasMessage = (typeof options.message === 'string');
                    if (!hasTitle && !hasMessage) {
                        throw new Error("dialog(): Please supply message and/or title")
                    } else {
                        sanitizedOptions.title = hasTitle ? options.title : null;
                        sanitizedOptions.message = hasMessage ? options.message : null;
                    }

                    if ((typeof options.buttons !== 'object' || angular.isArray(options.buttons)) && options.buttons) {
                        throw new Error("dialog():  Please supply an object for options.buttons")
                    } else {
                        sanitizedOptions.buttons = options.buttons;
                    }

                    return sanitizedOptions;
                };

                options = sanitizeOptions(options);

                var buttons = "";
                if (options.buttons) {
                    angular.forEach(options.buttons, function (btnOptions, name) {
                        var quotedName = "'" + name + "'";
                        var className = btnOptions.className || "btn-default";
                        buttons += ('<button class="btn ' + className + '" ng-click="ctrl.invokeCallback(' + quotedName + ')">' + btnOptions.label + '</button>');
                    });
                }

                var title = options.title ? '<div class="modal-header"><h3 class="modal-title" ng-bind="ctrl.title"></h3></div>' : "";
                var body = options.message ? '<div class="modal-body" ng-bind="ctrl.message"></div>' : "";
                var footer = buttons ? '<div class="modal-footer">' + buttons + '</div>' : "";
                var template = title + body + footer;

                var callbacks = {};
                angular.forEach(options.buttons, function (btnOptions, name) {
                    if (typeof btnOptions.callback === 'function') {
                        callbacks[name] = btnOptions.callback;
                    }
                });

                $modal.open({
                    template: template,
                    controller: function ($modalInstance) {
                        var ctrl = this;

                        ctrl.title = options.title;
                        ctrl.message = options.message;
                        ctrl.callbacks = callbacks;
                        ctrl.invokeCallback = function (btnName) {
                            var callback = ctrl.callbacks[btnName];
                            if (callback) {
                                var closeModal = callback();
                                if (typeof closeModal === 'undefined' || closeModal) {
                                    $modalInstance.close();
                                }
                            } else {
                                $modalInstance.close();
                            }
                        };
                    },
                    controllerAs: 'ctrl',
                    backdrop: true
                })
            }
        };
    }]);
