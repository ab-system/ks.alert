angular
    .module("ks.alert", ["ui.bootstrap"])
	.factory("alertFactory", [
        "$modal",
        function ($modal) {
            var api = {
                ALERT_TYPE: {
                    WARNING: "W",
                    SUCCESS:
                        "S",
                    ERROR:
                        "E",
                    INFO:
                        "I"
                },
                alert: function (options) {
                    options.isAlert = true;
                    return api.confirm(options);
                },
                confirm: function (options) {
                    var headerClass = "";
                    var header = options.header || "";
                    if (!options.message)
                        throw "Нужно сообщение";

                    switch (options.alertType) {
                        case api.ALERT_TYPE.WARNING:
                            header = header || "Внимание";
                            headerClass = "alert alert-warning";
                            break;
                        case api.ALERT_TYPE.SUCCESS:
                            header = header || "Успешно";
                            headerClass = "alert-success";
                            break;
                        case api.ALERT_TYPE.ERROR:
                            header = header || "Ошибка";
                            headerClass = "alert-danger";
                            break;
                        case api.ALERT_TYPE.INFO:
                            header = header || "Информация";
                            headerClass = "alert alert-info";
                            break;
                    }

                    return $modal.open($.extend({}, options,
                    {
                        template:
                            "<div class=\"modal-header " + headerClass + "\">" +
                                "<button type=\"button\" class=\"close\" data-dismiss=\"modal\" ng-click=\"$dismiss(reason)\">" +
                                "<span aria-hidden=\"true\">&times;</span>" +
                                "<span class=\"sr-only\">Close</span>" +
                                "</button>" +
                                "<h4 class=\"modal-title\">" + header + "</h4>" +
                                "</div>" +
                                "<div class=\"modal-body\">" +
                                "<p>" + options.message + "</p>" +
                                "</div>" +
                                "<div class=\"modal-footer\">" +
                                "<button type=\"button\" class=\"btn btn-primary\" ng-click=\"$close(reason)\" data-dismiss=\"modal\">Ок</button>" +
                                (options.isAlert ? "" : ("<button type=\"button\" class=\"btn btn-default\" ng-click=\"$dismiss(reason)\" data-dismiss=\"modal\">Отмена</button>")) +
                                "</div>"
                    })).result.then(options.confirmed, options.canceled);
                }
            };
            return api;
        }
    ])