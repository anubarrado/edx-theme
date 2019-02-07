/*!
 * ASP.NET SignalR JavaScript Library v2.0.3
 * http://signalr.net/
 *
 * Copyright Microsoft Open Technologies, Inc. All rights reserved.
 * Licensed under the Apache 2.0
 * https://github.com/SignalR/SignalR/blob/master/LICENSE.md
 *
 */

/// <reference path="..\..\SignalR.Client.JS\Scripts\jquery-1.6.4.js" />
/// <reference path="jquery.signalR.js" />
(function ($, window, undefined) {
    /// <param name="$" type="jQuery" />
    "use strict";

    if (typeof ($.signalR) !== "function") {
        throw new Error("SignalR: SignalR is not loaded. Please ensure jquery.signalR-x.js is referenced before ~/signalr/js.");
    }

    var signalR = $.signalR;

    function makeProxyCallback(hub, callback) {
        return function () {
            // Call the client hub method
            callback.apply(hub, $.makeArray(arguments));
        };
    }

    function registerHubProxies(instance, shouldSubscribe) {
        var key, hub, memberKey, memberValue, subscriptionMethod;

        for (key in instance) {
            if (instance.hasOwnProperty(key)) {
                hub = instance[key];

                if (!(hub.hubName)) {
                    // Not a client hub
                    continue;
                }

                if (shouldSubscribe) {
                    // We want to subscribe to the hub events
                    subscriptionMethod = hub.on;
                } else {
                    // We want to unsubscribe from the hub events
                    subscriptionMethod = hub.off;
                }

                // Loop through all members on the hub and find client hub functions to subscribe/unsubscribe
                for (memberKey in hub.client) {
                    if (hub.client.hasOwnProperty(memberKey)) {
                        memberValue = hub.client[memberKey];

                        if (!$.isFunction(memberValue)) {
                            // Not a client hub function
                            continue;
                        }

                        subscriptionMethod.call(hub, memberKey, makeProxyCallback(hub, memberValue));
                    }
                }
            }
        }
    }

    $.hubConnection.prototype.createHubProxies = function () {
        var proxies = {};
        this.starting(function () {
            // Register the hub proxies as subscribed
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, true);

            this._registerSubscribedHubs();
        }).disconnected(function () {
            // Unsubscribe all hub proxies when we "disconnect".  This is to ensure that we do not re-add functional call backs.
            // (instance, shouldSubscribe)
            registerHubProxies(proxies, false);
        });

        proxies.myHub = this.createHubProxy('myHub'); 
        proxies.myHub.client = { };
        proxies.myHub.server = {
            actualizaridalumno: function (idalumno, idfaseoportunidadportal) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["actualizaridalumno"], $.makeArray(arguments)));
             },

            asesorConectado: function (name, pass) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["AsesorConectado"], $.makeArray(arguments)));
             },

            changeStatus: function (online) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["ChangeStatus"], $.makeArray(arguments)));
             },

            closeChat: function (id) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["CloseChat"], $.makeArray(arguments)));
             },

            crearofflinechat: function (mensaje, idprograma, pais) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["crearofflinechat"], $.makeArray(arguments)));
             },

            engageVisitor: function (connectionId) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["EngageVisitor"], $.makeArray(arguments)));
             },

            enviar: function (clase) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["Enviar"], $.makeArray(arguments)));
             },

            getPing: function () {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["getPing"], $.makeArray(arguments)));
             },

            getUsuariosConectados: function (clase) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["getUsuariosConectados"], $.makeArray(arguments)));
             },

            joinRoom: function (roomName) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["JoinRoom"], $.makeArray(arguments)));
             },

            leaveRoom: function (roomName) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["LeaveRoom"], $.makeArray(arguments)));
             },

            logVisit: function (page, referrer, city, region, country, cookie, idprograma, pais, estadologueo, nombres, apellidos, correo, celular, paiscontacto, regioncontacto, idalumno, idcampania) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["LogVisit"], $.makeArray(arguments)));
             },

            notificaragenda: function (from, mensaje) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["notificaragenda"], $.makeArray(arguments)));
             },

            nuevaActividadParaEjecutar: function (idOportunidad, idAsesor) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["nuevaActividadParaEjecutar"], $.makeArray(arguments)));
             },

            obtenerChatActivos: function () {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["ObtenerChatActivos"], $.makeArray(arguments)));
             },

            opSend: function (id, data) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["OpSend"], $.makeArray(arguments)));
             },

            ping: function (estado, id, nombres) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["ping"], $.makeArray(arguments)));
             },

            requestChat: function (message) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["RequestChat"], $.makeArray(arguments)));
             },

            send: function (data) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["Send"], $.makeArray(arguments)));
             },

            startCall: function (idActividad, idAsesor) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["startCall"], $.makeArray(arguments)));
             },

            toRoomActividadEjecutada: function (idAsesor, idActividadEjecutada) {
                return proxies.myHub.invoke.apply(proxies.myHub, $.merge(["toRoomActividadEjecutada"], $.makeArray(arguments)));
             }
        };

        return proxies;
    };

    signalR.hub = $.hubConnection("/signalr", { useDefaultPath: false });
    $.extend(signalR, signalR.hub.createHubProxies());

}(window.jQuery, window));