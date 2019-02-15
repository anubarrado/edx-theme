var estadotemp = '0';
var dispositivomovil = false;
var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

var LCSKChat = (function () {

    var chatKey = 'lcsk-chatId';
    var requestChat = false;
    var chatId = '';
    var chatEditing = false;
    var idProgramageneral = 7520;
    var longitudglobalcelular = 9;//por defecto 9


    var correoalmacenado = '';
    var Nombresalmacenado = '';
    var Apellidosalmacenado = '';
    var CelularAlmacenado = '';
    var EstadoAsesorAlmacenado = '';
    var idpaisvalidarAlmacenado = '';

    var estadoLogeo = '3';
    //se llena despues de validar los datos del contacto
    var idalumno = 0;
    var idcampania = "00000000-0000-0000-0000-000000000000";

    var nombreasesorglobal = 'Desconocido';
    var correoasesorglobal = 'bsginstitute.com';
    var primerchat = true;
    var primervisualizar = true;
    var primerchatconfiguracion = true;
    var primerveztoggle = true;
    var primerinserttiempochat = true;
    var nombres = '';
    var apellidos = '';
    var correo = '';
    var celular = '';
    //280618
    var cookiecontaco = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
				var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
				return v.toString(16);
			});
    //chat paises pruebas 040718
    
    //fin chat paises pruebas 040718


    var options = [];

    function setDefaults() {
        //options.position = 'fixed';
        options.placement = 'bottom-right';

        //options.headerPaddings = '10px 10px 10px 10px';
        //options.headerBackgroundColor = '#0376ee';
        //options.headerTextColor = 'white';
        //options.headerBorderColor = '#0354cb';
        options.headerGradientStart = '#d4206b';//configuracionpanelchat.ColorFondoHeader;
        options.headerGradientEnd = '#d4206b';//configuracionpanelchat.ColorFondoHeader;
        options.headertextocolor = '#ffffff';//configuracionpanelchat.ColorTextoHeader;
        options.headertextonotificacion = '&#191;Necesitas ayuda?             Chatea con un asesor especializado';//configuracionpanelchat.TextoHeaderNotificacion;
        options.headerFont = 'font-family: Arial, Helvetica, sans-serif;';//configuracionpanelchat.TextoHeaderFuente;//font-family: Verdana,Verdana, Geneva, Tahoma, sans-serif;
        //options.headerFontSize = '15px';

        //options.boxBorderColor = '#0376ee';
        //options.boxBackgroundColor = '#fff';
        options.TiempoVisualizar = 3;//configuracionpanelchat.VisualizarTiempo;
        options.textoheader = 'Chat con un Asesor en L&#237;nea';//configuracionpanelchat.TextoHeader;//'Contactanos';

        options.onlineTitle = '¿Necesita ayuda?';
        options.offlinetextosatisfaccion = 'Tu mensaje fue enviado, nos contactaremos contigo a la brevedad.';//configuracionpanelchat.TextoSatisfaccionOffline;
        options.offlinetextoheader = 'D&#233;janos tu Mensaje';//configuracionpanelchat.TextoOffline;
        options.visualizartextoinicial = 1;//configuracionpanelchat.MuestraTextoInicial;
        options.textoInicial = '&#161;Hola! Bienvenido, &#191;Tienes alguna consulta con la que te pueda ayudar?';//configuracionpanelchat.TextoInicial;//Buenos dias,mucho gusto,¿tiene alguna consulta con la que le pueda ayudar?

        options.colorFondoasesor = '#ecedef';//configuracionpanelchat.ColorFondoAsesor;
        options.colorTextoasesor = '#000000';//configuracionpanelchat.ColorTextoAsesor;
        options.colorFondointeresado = '#feeefd';//configuracionpanelchat.ColorFondoInteresado;
        options.colorTextointeresado = '#000000';//configuracionpanelchat.ColorTextoInteresado;
        options.textochatFont = 'font-family: Arial, Helvetica, sans-serif;';//configuracionpanelchat.TextoChatFuente;

        options.colorFondoempezarchat = '#f69336';//configuracionpanelchat.ColorFondoEmpezarChat;
        options.colorTextoempezarchat = '#ffffff';//configuracionpanelchat.ColorTextoEmpezarChat;

        options.textoFormularioFont = 'font-family: Verdana, Geneva, sans-serif;';//configuracionpanelchat.TextoFormularioFuente;

        options.Titlemobile = 'Chat';

        options.waitingForOperator = '<p style="width:100%;font:normal;font-family:serif;font-size:medium;line-height:normal;text-align: center;">Gracias, danos  1 minuto para aceptar tu chat...</p>';
        options.emailSent = '<p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;word-wrap: break-word;line-height: 1.42857143">' + options.offlinetextosatisfaccion + '</p>';
        options.emailFailed = 'Ohh. Tu correo no pudo ser enviado.<br /><br />Lo sentimos.';

        //cookiecontaco = "00000000-0000-0000-0000-000000000000";
    }

    function _config(args) {
        setDefaults();

        if (args != null) {
            for (key in options) {
                if (args[key]) {
                    options[key] = args[key];
                }
            }
        }
    }
    function getPlacement() {
        if (options.placement == 'bottom-right') {
            return 'bottom:0px;right:0px;';
        }
        return '';
    }


    function _carganotificacionmovil() {
        if (primervisualizar == true) {

            primervisualizar = false;
            $("#chat-box-headermobile").css('height', '5.5%');
            $("#chat-box-headermobile").css('font-weight', 'normal');
            $("#chat-box-headermobile").css('font-size', '16px');
            $("#chat-box-headermobile").css('line-height', '1.0');


            $('#chat-box-headermobile').html(options.headertextonotificacion);
            //sonido de chat portal
            var snd = new Audio('https://bsginstitute.com/Content/sounds/sonidochat.mp3');
            snd.play();

        }

    }


    function _carganotificacion() {

        if (primervisualizar == true) {
            primervisualizar = false;
            $("#chat-box-header").css('height', '180px');
            $("#chat-box-header").css('font-weight', 'normal');
            $("#textoheaderpc").css('font-size', '25px');
            $("#textoheaderpc").css('line-height', '1.65');

            $('#botonminimizarheaderpc').css('display', 'none');
            $('#imgnotificacion').css('display', 'flex');
            $('#notificacionshow').css('display', 'inline-flex');
            $('#notificacionshow').css('width', '90%');


            $('#textoheaderpc').html(options.headertextonotificacion);
            var snd = new Audio('https://bsginstitute.com/Content/sounds/sonidochat.mp3');
            snd.play();
        }

    }

    function _init() {

        if (isMobile.any()) {
            dispositivomovil = true;
        }
        else {
            dispositivomovil = false;
        }

        if (dispositivomovil) {
			$('body').append(

                '<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"  style="width:100%;background:rgba(0,0,0,.5);">' +
                '<div class="modal-dialog" role="document" style="width:90.5%">' +
                '<div class="modal-content">' +
                '<div class="modal-header" style="font-size:12px; font-weight:bold;color: ' + options.headertextocolor + ';background: ' + options.headerGradientEnd + ';padding: 7px;border-top-left-radius: 5px;border-top-right-radius: 5px;">' +
                '<div id="chat-box-headermobileheader" style="' + options.headerFont + ';" >' +
                '<div>' +
                '<button type="button" id="botonminimizarheadermovil" class="close" data-dismiss="modal" aria-label="Close">' +
                '<span style="line-height: 0.5;color: white;" aria-hidden="true"></span>' +
                '</button>' +
                '<h5 class="modal-title"  id="exampleModalLabel" style="text-align:center;" >' + options.textoheader +
                '</h5>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '<div class="modal-body" style="padding:0px 0px 0px 0px;">' +
                '<div id="chat-box">' +
                '<div id="formulario">' +

                '<div class="form-group" style="text-align:center;">' +
                '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-email" value="' + correo + '" style="height:30px;padding:0px 5px; width:93%;font:unset;display:unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Email" />' +
                '<span id="dangeremail" style="float: left; font-size:10px; padding-top:5px; color:red; font-style: italic; display:none">E-mail invalido</span>' +
                '</div>' +
                '<div class="form-group" style="text-align:center;">' +
                '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-nombres" value="' + nombres + '" style="height:30px; padding:0px 5px; width:93%;font:unset;display:unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Nombres" />' +
                '</div>' +
                '<div class="form-group" style="margin-bottom: 25px;text-align:center;">' +
                '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-apellidos" value="' + apellidos + '" style="height:30px; padding:0px 5px; width:93%;font:unset;display:unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Apellidos" />' +
                '</div>' +
                '<div class="form-group" style="margin-bottom: 20px;text-align:center;">' +
                '<input class="form-control" id="phonechat"value="' + celular + '" type="tel" placeholder="Número de Teléfono Móvil" style="height:30px; width:93%;font:unset;display:unset;">' +
                '<span id="dangertelefono" style="float: left; font-size:10px; padding-top:5px; color:red; font-style: italic; display:none; ">Telefono invalido</span>' +
                '</div>' +
                '<div style="text-align:center;"><input type="button" id="chat-box-recargar" value="[No soy yo]" style="height:30px;' + options.textoFormularioFont + ';" class="btn btn-link"/></div>' +
                '<input type="text" class="hidden" id="chat-box-estadoasesor" value="' + estadotemp + '"/>' +
                '<p style ="margin:15px;"><input type="button" style="font-weight:unset;height:34px;letter-spacing: 0;text-transform: none;box-shadow: inset 0 0 0 0;text-shadow: 0 0px 0px;font-size: 14px;width: 100%;background: ' + options.colorFondoempezarchat + ';color:' + options.colorTextoempezarchat + ';border-color:' + options.colorFondoempezarchat + ';' + options.textoFormularioFont + ';" class="btn btn-warning btn-block"  id="chat-box-crear" value="Empezar a chatear ahora"/>' +
                '</div>' +
                '<div id="mensajes">' +
                '<div id="chat-box-info" style="height:40px;overflow:hidden;line-height:1;text-align:left;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#c5c1c1;background:whitesmoke;">' +
                '<img src="https://bsginstitute.com/img-web/chat/bsginstitute.png" class="pruebasMovil">' +
                '<div id="cabeceranombreasesor" style="padding-top:3px;margin-left: 25%;font-weight:bold;' + options.textochatFont + ';font-size: 12px;"><b>' + nombreasesorglobal + '</b></div>' +
                '<div id="cabeceracorreoasesor" style="margin-left:25%;padding-top:3px;' + options.textochatFont + ';font-size: 12px;">' + correoasesorglobal + '</div>' +
                '</div>' +
                '<div id="chat-box-msg" style="height:260px;overflow:hidden;line-height:1;text-align:left; overflow-y:scroll;width:98%;">' +
                '</div>' +
                '<div id="chat-box-input" style="height:40px; margin-top: 30px;background:whitesmoke;text-align:center;border-bottom-left-radius:5px;border-bottom-right-radius:5px;"><input id="chat-box-textinput" style="width:93%;margin-top:5px;background:white;" class="mytext" placeholder="Escribe tu mensaje aquí " /></div>' +
                '</div>' +
                '<div id="desconectado" style="text-align:center;">' +
                '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';">E-mail</p><input type="text" class="form-control" style="' + options.textoFormularioFont + '; width:93%;font:unset;background: #eee;" id="chat-box-emailoffline" value="' + correo + '" readonly />' +
                '<p style ="margin:15px;' + options.textoFormularioFont + ';">Tu Mensaje</p><div style="padding:10px;"><textarea placeholder="Por ahora no nos encontramos en línea, por favor deja tu mensaje indicando tu número telefónico, para poder comunicarnos contigo a la brevedad." id="chat-box-cmt" cols="25" rows="7" class="form-control" style="font:unset;width:100%;height:auto;padding: 6px 6px;border-radius: 3px;' + options.textoFormularioFont + ';font-size:small;line-height:normal;"></textarea></div>' +
                '<p style ="margin:10px;"><button type="button" id="chat-box-send" style="background: ' + options.colorFondoempezarchat + ';color: ' + options.colorTextoempezarchat + ';border-color:' + options.colorFondoempezarchat + ';' + options.textoFormularioFont + ';" class="btn btn-warning btn-block"><span class="glyphicon glyphicon-envelope">   Enviar</span></button></p>' +
                '</div>' +
                '<div id="gracias">' +
                '<p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;word-wrap: break-word;">' + options.offlinetextosatisfaccion + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>' +
                //fin nuevo modal

                '<div class="us_floating us_mobile_hide">' +
                '<div class="us_floating_outer_wrapper" style="display: block;position: fixed;top: 226px;">' +
                '<div class="us_wrapper us_share_buttons us_tac us_skin_default">' +
                '<div id="chat-box-headermobile" class="chatboxheaderclassmobile" style="' + options.headerFont + ';filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + options.headerGradientStart + '\', endColorstr=\'' + options.headerGradientEnd + '\');background: -webkit-gradient(linear, left top, left bottom, from(' + options.headerGradientStart + '), to(' + options.headerGradientEnd + '));background: -moz-linear-gradient(top,  ' + options.headerGradientStart + ',  ' + options.headerGradientEnd + ');" ><span class="glyphicon glyphicon-comment" style="line-height: 0.5;" aria-hidden="true"></span><span style="line-height:0.5;"><strong>' + options.textoheader + '</strong></span></div > ' +
                '</div>' +
                '</div>' +
                '</div>'
            );


            $('#chat-box-headermobile').hide();
            $('#chat-box-input').hide();
            $('#chat-box-msg').hide();
            $('#formulario').show();
            $('#mensajes').hide();
            $('#gracias').hide();
            $('#desconectado').hide();
            
        }
        else {
            $('body').append(
                '<div class="us_floating us_mobile_hide">' +
                '<div class="us_floating_outer_wrapper" style="display: block;position: fixed;top: 226px;">' +
                '<div class="us_wrapper us_share_buttons us_tac us_skin_default">' +
                '<div id="chat-box-header" class="chatboxheaderclass" style="box-sizing: border-box;-moz-box-sizing: border-box;' + options.headerFont + ';color:' + options.headertextocolor + '; filter: progid:DXImageTransform.Microsoft.gradient(startColorstr=\'' + options.headerGradientStart + '\', endColorstr=\'' + options.headerGradientEnd + '\');background: -webkit-gradient(linear, left top, left bottom, from(' + options.headerGradientStart + '), to(' + options.headerGradientEnd + '));background: -moz-linear-gradient(top,  ' + options.headerGradientStart + ',  ' + options.headerGradientEnd + ');" > ' +
                '<div>' +
                '<button id="botonminimizarheaderpc" style="display:none;float:right;padding:1px 6px;font-size:21px;line-height:1;opacity:0.2;margin-top:8px;" type="button" class="close" >' +
                '<span style="line-height: 0.5;color: white;" aria-hidden="true"></span>' +
                '</button>' +
                '<div id="notificacionshow">' +
                '<h5 class="modal-title"  id="textoheaderpc" style="color: white;text-align:center;width:90%;font-family:Arial,Helvetica,sans-serif;">' + options.textoheader +
                '</h5>' +
                '<div id="imgnotificacion" style="display: none; width: 20%;justify-content: center;align-content: center;flex-direction: column;">' +
                '<img src="https://bsgrupo.com/img-web/chat/NotificacionImg1.png" height="65" width="65" style="float: right;">' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div > ' +
                '<div id="chat-box" class="chatboxclass" style="box-sizing:unset"></div>' +
                '</div>' +
                '</div>' +
                '</div>'
            );
            $('#chat-box-header').hide();
        }


        _conectarSocket();

        $('body').on({
            click: function () {
                toggleChatBox();
            }
        }, '#chat-box-header');

        $('body').on({
            click: function () {
                toggleChatBoxmobile();
            }
        }, '#chat-box-headermobile');
        $('body').on({
            click: function () {
                toggleChatBoxmobile();
            }
        }, '#chat-box-headermobileheader');
        $('#chat-box').on({
            keydown: function (e) {
                var msg = $(this).val();
                if (e.keyCode == 13 && msg != '') {
                    e.preventDefault();
                    e.stopPropagation();

                    if (chatId == null || chatId == '') {
                        _integraProxy.server.requestChat(msg);
                        estadoLogeo ="1";
                    }
                    else {
                        _integraProxy.server.send(msg);
                    }
                    $('#chat-box-textinput').val('');

                }
            }
        }, '#chat-box-textinput');

        $('#chat-box').on({
            keydown: function () {
                chatEditing = true;
            }
        }, '.chat-editing');

        $('#chat-box').on({
            keypress: function (e) {

                $('#chat-box-email').css("border", "solid 1px #ccc");

                emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

                if (emailRegex.test($('#chat-box-email').val())) {//valida formato correo
                    $('#chat-box-email').css("border", "solid 1px #ccc");
                    $('#dangeremail').css("display", "none");
                }
                else {
                    $('#chat-box-email').css("border", "solid 1px #FA5858");
                    $('#dangeremail').css("display", "block");
                }

            },
            keydown: function (e) {

                $('#chat-box-email').css("border", "solid 1px #ccc");

                emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

                if (emailRegex.test($('#chat-box-email').val())) {//valida formato correo
                    $('#chat-box-email').css("border", "solid 1px #ccc");
                    $('#dangeremail').css("display", "none");
                }
                else {
                    $('#chat-box-email').css("border", "solid 1px #FA5858");
                    $('#dangeremail').css("display", "block");
                }

            },
            keyup: function (e) {

                $('#chat-box-email').css("border", "solid 1px #ccc");

                emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

                if (emailRegex.test($('#chat-box-email').val())) {//valida formato correo
                    $('#chat-box-email').css("border", "solid 1px #ccc");
                    $('#dangeremail').css("display", "none");
                }
                else {
                    $('#chat-box-email').css("border", "solid 1px #FA5858");
                    $('#dangeremail').css("display", "block");
                }

            }

        }, '#chat-box-email');

        //VALIDA SOLO NUMEROS
        $('#chat-box').on({

            keypress: function (e) {
                var charCode = (e.which) ? e.which : e.keyCode
                return !(charCode > 31 && (charCode < 48 || charCode > 57));
            }
        }, '#phonechat');
        //VALIDA SOLO LETRAS
        $('#chat-box').on({

            keypress: function (e) {
                var charCode = (e.which) ? e.which : e.keyCode
                return ((charCode > 31 || charCode == 8) && (charCode < 48 || charCode > 57));
            }
        }, '#chat-box-nombres');
        $('#chat-box').on({

            keypress: function (e) {
                var charCode = (e.which) ? e.which : e.keyCode
                return ((charCode > 31 || charCode == 8) && (charCode < 48 || charCode > 57));
            }
        }, '#chat-box-apellidos');





        $('#chat-box').on({
            click: function () {

                emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;

                if ($('#chat-box-email').val().length <= 0 || !emailRegex.test($('#chat-box-email').val())) {//si esta vacio o mal formato
                    $('#chat-box-email').css("border", "solid 1px #FA5858");
                    $('#chat-box-email').focus();
                    $('#dangeremail').css("display", "block");
                }
                else {
                    $('#dangeremail').css("display", "none");

                    var numberType = intlTelInputUtils.numberType[thiscarlos.options.placeholderNumberType], placeholder = thiscarlos.selectedCountryData.iso2 ? intlTelInputUtils.getExampleNumber(thiscarlos.selectedCountryData.iso2, thiscarlos.options.nationalMode, numberType) : "";
                    //carlos nuevo para el chat 050718
                    placeholder = thiscarlos._beforeSetNumber(placeholder);
                    placeholder = placeholder.replace(/[^a-zA-Z 0-9.]+/g, '');
                    for (i = 0; i < 4; i++) {
                        placeholder = placeholder.replace(' ', '');
                    }
                    longitudglobalcelular = placeholder.length;


                    if ($('#phonechat').val().length <= 0 || $('#phonechat').val().length != longitudglobalcelular)//valido el numero con longitud
                    {
                        $('#dangertelefono').css("display", "block");
                    }
                    else {
                        $('#dangertelefono').css("display", "none");

                        //valido si el id pais es difertnte de null o ""

                        var idpaisvalidar = thiscarlos.selectedCountryData.dialCode;

                        if (idpaisvalidar == 51) {
                            CelularAlmacenado = $('#phonechat').val();
                        }
                        else {
                            CelularAlmacenado = '00' + idpaisvalidar.toString() + $('#phonechat').val();
                        }

                        //LLama al signal y crea la oportunidad

                        //Correo: $('#chat-box-email').val(), Nombres: $('#chat-box-nombres').val(), Apellidos: $('#chat-box-apellidos').val(), Celular: CelularAlmacenado, Cookie: cookiecontaco, Estadoasesor: $('#chat-box-estadoasesor').val(), pais: idpaisvalidar.toString(), programagid: idProgramageneral/*, pais: $('#ATR_VAR_PAIS_CHATS').val(), region: $('#ATR_VAR_REGION_CHATS').val()*/

                        _integraProxy.server.crearOportunidadEDX($('#chat-box-email').val(),$('#chat-box-nombres').val(),$('#chat-box-apellidos').val(),CelularAlmacenado, idpaisvalidar.toString());

                        //Fin LLama al signal y crea la oportunidad


                        estadoLogeo = "1";
                        //almaceno los datos guardados
                        correoalmacenado = $('#chat-box-email').val();
                        Nombresalmacenado = $('#chat-box-nombres').val();
                        Apellidosalmacenado = $('#chat-box-apellidos').val();
                        CelularAlmacenado = CelularAlmacenado;
                        EstadoAsesorAlmacenado = $('#chat-box-estadoasesor').val() === "1" ? true : false;
                        idpaisvalidarAlmacenado = idpaisvalidar.toString();
                        //fin almaceno los datos guardados

                        chatRefreshState(EstadoAsesorAlmacenado, estadoLogeo, $('#chat-box-nombres').val(), $('#chat-box-apellidos').val(), $('#chat-box-email').val(), CelularAlmacenado, cookiecontaco);

                    }
                }

            }
        }, '#chat-box-crear');

        $('#chat-box').on({
            click: function () {
                var estado = $('#chat-box-estadoasesor').val() == '1' ? true : false;
                chatRefreshState(estado, '3', '', '', '', '', cookiecontaco);
            }
        }, '#chat-box-recargar');

        $('#chat-box').on({
            click: function () {
                var idpais = thiscarlos.selectedCountryData.dialCode;//$('#SelectPais').find(':selected').data('value');

                _integraProxy.server.crearofflinechat($('#chat-box-cmt').val(), idProgramageneral.toString(), idpais.toString());
                if (dispositivomovil)//si es movil
                {
                    $('#formulario').hide();
                    $('#desconectado').hide();
                    $('#mensajes').hide();
                    $('#gracias').show();
                }
                else {
                    $('#chat-box').html(options.emailSent);
                }
                chatEditing = false;
                estadoLogeo = "1";
            }
        }, '#chat-box-send');

    }
    function toggleChatBox() {
        var elm = $('#chat-box-header');
        if ($('#chat-box').hasClass('chat-open')) {
            $('#chat-box').removeClass('chat-open');
            elm.css('bottom', '0px');

            $('#botonminimizarheaderpc').css('display', 'none');


        } else {
            if (primerveztoggle) {
                if (primervisualizar == true)//que todavia no se ha mostrado la notificacion
                {
                    var y = 351 + elm.height() - 15;
                    primerveztoggle = false;
                    primervisualizar = false;
                    $('#botonminimizarheaderpc').css('display', 'block');
                }
                else {
                    var y = 351 + elm.height() - 120 - 40;
                    elm.css('height', '35px');
                    elm.css('font-weight', 'bold');
                    $("#textoheaderpc").css('font-size', '12px');
                    //elm.css('line-height', '1.5');
                    $("#textoheaderpc").css('line-height', '1.4');
                    elm.css('padding', '10px 10px 10px 10px');
                    $('#textoheaderpc').html(options.textoheader);
                    primerveztoggle = false;
                    $('#botonminimizarheaderpc').css('display', 'block');

                    $('#imgnotificacion').css('display', 'none');
                    $('#notificacionshow').css('display', 'block');
                    $('#notificacionshow').css('width', '100%');

                    //elm.css('font-size', '12px');

                }

            }
            else {
                var y = 351 + elm.height() - 15;
                $('#botonminimizarheaderpc').css('display', 'block');
            }

            $('#chat-box').addClass('chat-open');

            elm.css('bottom', y);
            //when the chat client opens the chat box
            //set the focus to the text area, this
            //avoids having to mouse over to it and click it.
            var $el = $("#chat-box");
            setTimeout(function () {
                $el.find('textarea').focus();
            }, 0);


        }
        $('#chat-box').slideToggle();
    }
    function toggleChatBoxmobile() {
        if ($('#chat-box').hasClass('chat-open')) {
            $("#exampleModal").modal('hide');
            $('#chat-box').removeClass('chat-open');

            //lo aparecemos
			$("#chat-box-headermobile").css('line-height', '1.5');
            $('#chat-box-headermobile').css('display', 'block');
            //desaparecemos el gion de mobile
            //$('#botonminimizarheadermovil').css('display', 'none');

        } else {

            if (primerveztoggle) {
                if (primervisualizar == true) {//toavia no se ha mostrado la notificacion
                    $('#chat-box').addClass('chat-open');
                    $("#exampleModal").modal('show');
                    //lo desvanecemos
                    $('#chat-box-headermobile').css('display', 'none');
                    primerveztoggle = false;
                    primervisualizar = false;

                    $('#chat-box').addClass('chat-open');
                    $("#exampleModal").modal('show');
                    //lo desvanecemos
                    //$('#chat-box-headermobile').css('display', 'none');
                }
                else {

                    $("#chat-box-headermobile").css('height', '5.5%');
                    $("#chat-box-headermobile").css('font-weight', 'bold');
                    $("#chat-box-headermobile").css('font-size', '15px');
                    $("#chat-box-headermobile").css('line-height', '1.5');
                    primerveztoggle = false;

                    $('#chat-box-headermobile').html(options.textoheader);

                    $('#chat-box').addClass('chat-open');
                    $("#exampleModal").modal('show');
                    //lo desvanecemos
                    $('#chat-box-headermobile').css('display', 'none');
                }
            }
            else {
                $('#chat-box').addClass('chat-open');
                $("#exampleModal").modal('show');
                //lo desvanecemos
                $('#chat-box-headermobile').css('display', 'none');
            }



        }
    }


    var _conectarSocket = function () {

        $.connection.hub.url = "https://integrab.bsgrupo.com/signalr";
        if (!$.connection.myHub) {
            _conexionFallida();
            return;
        }
        $.connection.myHub.connection.qs = "usuarioId=" + 11 + ";rooms=" + 633 + ";usuarioNombre=Anonimo";

        _integraProxy = $.connection.myHub;

        //obtengo el pais codigo iso PE,CO,CH
        //var idpais = $('#SelectPais option:selected').val();
        var idpais = 51;//$('#SelectPais').find(':selected').data('value');
        //obtengo la cookie por ajax

        //reconected
        $.connection.hub.reconnected(function () {
        });
        $.connection.hub.disconnected(function () {

            setTimeout(function () {
                $.connection.hub.start()
                    .done(function () {
                        _conexionEstablecida();
                        var existingChatId = getExistingChatId(chatKey);

                        _integraProxy.server.logVisit(document.location.href, document.referrer, "", "", "", cookiecontaco, idProgramageneral, idpais, estadoLogeo, nombres, apellidos, correo, celular, 0, 0, idalumno, idcampania);
                    })
                    .fail(function () {
                        chatRefreshState(false);
                        
                    });
            }, 10000);
            _conexionFallida();

        });


        $.connection.hub.start()
            .done(function () {
                _conexionEstablecida();
                var existingChatId = getExistingChatId(chatKey);

                _integraProxy.server.logVisit(document.location.href, document.referrer, "", "", "", cookiecontaco, idProgramageneral, idpais, estadoLogeo, nombres, apellidos, correo, celular, 0, 0, idalumno, idcampania);
            })
            .fail(function () {
                chatRefreshState(false);
                _conexionFallida();
            });
       

        _integraProxy.client.configuracion = function (estado) {
            if (estado == false) {//quitamos todo el nuevo chat carlos

                $('#chat-box-header').hide();
                $('#chat-box').hide();
                $('#chat-box-headermobile').hide();

                $('#chat-box-input').hide();
                $('#chat-box-msg').hide();
                $('#formulario').hide();
                $('#mensajes').hide();
                $('#gracias').hide();
                $('#desconectado').hide();
            }
            else {

            }
        }
        _integraProxy.client.onlineStatus = function (status, estadologueo, nombreso, apellidoso, correoo, celularo, cookieo, paiso, regiono, nombreasesor, correoasesor) {
            //caso de que el asesor se conecte despues del visitante

            $('#chat-box-header').show();

            if (($('#chat-box-headermobile').css('display') == 'none') && primerchatconfiguracion == true) {
                $('#chat-box-headermobile').show();
            }
            else {
                if (($('#chat-box-headermobile').css('display') == 'none')) {

                }
                else {
                    $('#chat-box-headermobile').show();
                }

            }

            if (status == true) {

                nombreasesor = nombreasesor == 'Carmen del Rosario Cantoral  Cantoral' ? 'Carmen Cantoral' : nombreasesor;
                var nombreasesorglobaltemp = nombreasesor.split(" ", 2);

                nombreasesorglobal = '';

                nombreasesorglobaltemp.forEach(function (da) {
                    nombreasesorglobal = nombreasesorglobal + ' ' + da;
                })
                correoasesorglobal = correoasesor;
                //nombreasesorglobal = nombreasesorglobal[0] +' '+ nombreasesorglobal[1];
            }

            if (estadologueo == null) {
                estadologueo = estadoLogeo;
                nombreso = Nombresalmacenado;
                apellidoso = Apellidosalmacenado;
                correoo = correoalmacenado;
                celularo = CelularAlmacenado;
                cookieo = cookiecontaco;
            }

            chatRefreshState(status, estadologueo, nombreso, apellidoso, correoo, celularo, cookieo);
        };
		 _integraProxy.client.Actualizaralumno = function (idalumno) {
            if (idalumno === "ERROR") {
                //no se creo bien el alumno
                //_integraProxy.server.actualizaridalumno(0, "00000000-0000-0000-0000-000000000000");
            }
            else
            {
                _integraProxy.server.actualizaridalumno(parseInt(idalumno), "00000000-0000-0000-0000-000000000000");
            }
        };
        _integraProxy.client.addMessageP = function (from, msg, flagfrom) {
            if (estadoLogeo == '1') {//valida que ya este logueado o ya lleno el formulario

                var date = formatAMPM(new Date());

                if (flagfrom == 2)//es asesor
                {
                    $('#chat-box-msg').append('<div class="msj macro" style="color:' + options.colorTextoasesor + ';">' +
                        '<div class="avatar" style="padding:15px 15px 15px 0px;"><img class="rounded" style="width:100%;border-radius: 5px;" src="https://bsginstitute.com/img-web/chat/bsginstitute.png" /></div>' +
                        '<div class="text text-l" style="background:' + options.colorFondoasesor + ';">' +
                        '<p style="text-align: left;color: ' + options.colorTextoasesor + ';font-size: 12px;' + options.textochatFont + ';"><b>' + nombreasesorglobal + '</b><br/> ' + msg + '</p>' +
                        //'<p><small>' + date + '</small></p>' +
                        '</div>' +
                        '</div>');
                }
                if (flagfrom == 1)//es visitante
                {
                    $('#chat-box-msg').append('<div class="msj-rta macro" style="color:' + options.colorTextointeresado + ';">' +
                        '<div class="text text-r" style="background:' + options.colorFondointeresado + ';">' +
                        '<p style="margin-top: 0; color:' + options.colorTextointeresado + ';' + options.textochatFont + ';">' + msg + '</p>' +
                        //'<p><small>' + date + '</small></p>' +
                        '</div>' +
                        '<div class="avatar" style="padding:15px 0px 15px 15px;" ><img class="rounded" style="width:100%;border-radius: 5px;" src="https://bsgrupo.com/img-web/chat/interesado.png" /></div>' +
                        '</div>');

                }

                $("#chat-box-msg").scrollTop(($("#chat-box-msg")[0].scrollHeight));
            }
        }
        _integraProxy.client.eliminaridchat = function () {
            chatId = null;
        }
        //_integraProxy.client.leave = function (id) {
        //    _integraProxy.server.leaveChat(id);
        //};
        _integraProxy.client.setChat = function (id, agentName, existing) {
            chatId = id;
            requestChat = true;

            setChatId(chatId);

            if (existing) {
                if (!$('#chat-box').hasClass('chat-open')) {
                    toggleChatBox();
                }

                //$('#chat-box-msg').append('<br/><p style="width:100%;font:normal;font-family:serif;line-height:normal;text-align: center;;font-size:11px;color:#AAA;">Continua chateando con <strong>' + agentName + '</strong></p>');
            } else {
                //$('#chat-box-msg').append('<br/><p style="width:100%;font:normal;font-family:serif;line-height:normal;text-align: center;font-size:11px;color:#AAA;">Estas chateando con <strong>' + agentName + '</strong></p>');
            }
        };
        _integraProxy.client.openChatWindow = function () {
            if (!$('#chat-box').hasClass('chat-open')) {
                toggleChatBox();
            }
        }


    };

    var _conexionEstablecida = function () {
        //alert("Conexion establecida!");
    }
    var _conexionFallida = function () {
        //alert("Conexion Erronrea!");
    }
    function setChatId(chatId) {
        if (hasStorage()) {
            sessionStorage.setItem(chatKey, chatId);
        }
    }

    function formatAMPM(date) {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    function hasStorage() {
        return typeof (Storage) !== 'undefined';
    }
    function getExistingChatId() {
        if (hasStorage()) {
            return sessionStorage.getItem(chatKey);
        }
    }

    function chatRefreshState(state, estadologueo, nombres, apellidos, correo, celular, cookie) {
        //estadologueo = 3;
        primerchatconfiguracion = false;
        if (dispositivomovil)//es movil
        {
            estadotemp = (state == true) ? '1' : '0';
            $('#chat-box-estadoasesor').val(estadotemp);

            if (estadologueo == 1)//si ya esta logueado
            {
                if (state) {
                    horafin = Date.now();
                    $('#desconectado').hide();
                    $('#formulario').hide();
                    $('#gracias').hide();

                    if ($("#chat-box-headermobile").css('font-size') == '25px')//se mostro la notificacion pero todvia no se ha ocultado la notificaion 
                    {
                        // no puedo cambiar el texto
                    }
                    else {
                        $('#chat-box-headermobile').text('Asesor en línea');
                    }

                    $('#exampleModalLabel').text('Asesor en línea');
                    $('#cabeceranombreasesor').text(nombreasesorglobal);//carga el nombre en la cabecera
                    $('#cabeceracorreoasesor').text(correoasesorglobal);//carga el correo en la cabecera
                    $('#mensajes').show();
                    $('#chat-box-msg').show();
                    $('#chat-box-input').show();
                    if (primerchat) {//!requestChat
                        primerchat = false;
                        var date = formatAMPM(new Date());
                        //$('#mensajes').show();

                        $('#chat-box-msg').append('<p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;">Chat iniciado</p><p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;"> ' + nombreasesorglobal + ' se unió al Chat</p>');
                        $("#chat-box-msg").scrollTop(($("#chat-box-msg")[0].scrollHeight));

                        if (options.visualizartextoinicial == 1) {
                            //agrego el primer mensaje por defecto
                            $('#chat-box-msg').append('<div class="msj macro" style="color:' + options.colorTextoasesor + ';">' +
                                '<div class="avatar" style="padding:15px 15px 15px 0px;"><img class="rounded" style="width:100%;border-radius: 5px;" src="https://bsginstitute.com/img-web/chat/bsginstitute.png" /></div>' +
                                '<div class="text text-l" style="background:' + options.colorFondoasesor + ';" >' +
                                '<p style="text-align: left;color: ' + options.colorTextoasesor + ';font-size: 12px;' + options.textochatFont + '"><b>' + nombreasesorglobal + '</b><br/>' + options.textoInicial + '</p>' +
                                //'<p><small>' + date + '</small></p>' +
                                '</div>' +
                                '</div>');
                            //fin agrego el primer mensaje
                        }

                    }
                    else {
                        $('#formulario').hide();
                        $('#gracias').hide();
                        $('#mensajes').show();

                        $('#chat-box-msg').append('<p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;">Conectado</p><p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;"> ' + nombreasesorglobal + ' se unió al Chat nuevamente</p>');
                        $("#chat-box-msg").scrollTop(($("#chat-box-msg")[0].scrollHeight));
                    }



                } else {
                    horafin = Date.now();
                    $('#exampleModalLabel').html(options.offlinetextoheader);

                    if ($("#chat-box-headermobile").css('font-size') == '25px')//se mostro la notificacion pero todvia no se ha ocultado la notificaion 
                    {
                        // no puedo cambiar el texto
                    }
                    else {
                        $('#chat-box-headermobile').html(options.offlinetextoheader);
                    }
                    $('#chat-box-input').hide();
                    $('#chat-box-msg').hide();
                    $('#formulario').hide();
                    $('#mensajes').hide();
                    $('#gracias').hide();
                    $('#desconectado').show();
                    $('#chat-box-emailoffline').val(correo);
                }
            }
            else {
                var estado = (state == true) ? '1' : '0';
                if (estadologueo == 2)//precargar datos
                {
                    $('#chat-box-recargar').show();
                    $('#exampleModalLabel').html(options.textoheader);
                    if ($("#chat-box-headermobile").css('font-size') == '25px')//se mostro la notificacion pero todvia no se ha ocultado la notificaion 
                    {
                        // no puedo cambiar el texto
                    }
                    else {
                        $('#chat-box-headermobile').html(options.textoheader);
                    }
                    $('#chat-box-input').hide();
                    $('#desconectado').hide();
                    $('#chat-box-msg').hide();
                    $('#gracias').hide();
                    $('#formulario').show();

                    //fin se carga ciudad del contacto
                    $("#phonechat").intlTelInput({
                        onlyCountries: ['ar', 'bo', 'br', 'cl', 'co', 'cr', 'cu', 'ec', 'sv', 'gt', 'hn', 'mx', 'ni', 'pa', 'py', 'pe', 'do', 'uy', 've'],
                        placeholderNumberType: "MOBILE",
                        separateDialCode: true,
                        utilsScript: "https://bsginstitute.com/Content/Script/utils.js"
                    });
                }
                else// es nuevo
                {
                    $('#chat-box-recargar').hide();
                    $('#exampleModalLabel').html(options.textoheader);
                    $('#chat-box-headermobile').html(options.textoheader);
                    $('#chat-box-input').hide();
                    //limpiamos loa campos
                    $('#chat-box-email').val('');
                    $('#chat-box-nombres').val('');
                    $('#chat-box-apellidos').val('');
                    $('#phonechat').val('');

                    $('#telefonoMovilNumchat').val('');
                    $('#chat-box-celular').val('');

                    $('#desconectado').hide();
                    $('#gracias').hide();
                    $('#chat-box-msg').hide();
                    $('#formulario').show();

                    
                    $("#phonechat").intlTelInput({
                        onlyCountries: ['ar', 'bo', 'br', 'cl', 'co', 'cr', 'cu', 'ec', 'sv', 'gt', 'hn', 'mx', 'ni', 'pa', 'py', 'pe', 'do', 'uy', 've'],
                        placeholderNumberType: "MOBILE",
                        separateDialCode: true,
                        utilsScript: "https://bsginstitute.com/Content/Script/utils.js"
                    });
                }

            }
            setInterval(_carganotificacionmovil, (options.TiempoVisualizar * 1000));
        }
        else//es pc
        {
            if (estadologueo == 1)//si ya esta logueado
            {
                if (state) {
                    horafin = Date.now();
                    $('#desconectado').hide();
                    $('#formulario').hide();

                    if ($("#imgnotificacion").css('display') == 'flex')//se mostro la notificacion pero todvia no se ha ocultado la notificaion 
                    {
                        // no puedo cambiar el texto
                    }
                    else//aqui ya se cerro la notificacion o nunca se abrio la notifcacion
                    {
                        $('#textoheaderpc').text('Asesor en línea');
                    }

                    $('#exampleModalLabel').text('Asesor en línea');
                    $('#chat-box-msg').show();
                    $('#chat-box-input').show();
                    if (primerchat) {//!requestChat
                        primerchat = false;
                        var date = formatAMPM(new Date());
                        $('#chat-box').html(
                            '<div id="chat-box-info" style="height:40px;overflow:hidden;line-height:1;text-align:left;border-bottom-style:solid;border-bottom-width:1px;border-bottom-color:#c5c1c1;background:whitesmoke;">' +
                            '<img src="https://bsginstitute.com/img-web/chat/logo.png" style="position: absolute;top: -36px;transform: translateX(+11%);z-index:1;">' +
                            '<div style="padding-top:3px;margin-left: 25%;' + options.textochatFont + ';font-size: 12px;font-weight:bold;"><b>' + nombreasesorglobal + '</b></div>' +
                            '<div style="margin-left:25%;padding-top:3px;' + options.textochatFont + ';font-size: 12px;">' + correoasesorglobal + '</div>' +
                            '</div>' +
                            '<div id="chat-box-msg" style="height:260px;overflow:hidden;line-height:1;text-align:left; overflow-y:scroll">' +
                            '<p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;">Chat iniciado</p><p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;"> ' + nombreasesorglobal + ' se unió al Chat</p>' +
                            '</div>' +
                            //'<div id="chat-box-input" style="height:35px;"><textarea id="chat-box-textinput" style="width:100%;height: 32px;border:1px solid #0354cb;border-radius: 3px;font:normal;font-family:serif;font-size:medium;line-height:normal;" /></div>'

                            '<div id="chat-box-input" style="height:40px; margin-top: 10px;background:whitesmoke;"><input id="chat-box-textinput" style="width:93%;margin-top:5px;background:white;" class="mytext" placeholder="Escribe tu mensaje aquí " /></div>'
                        );
                        if (options.visualizartextoinicial == 1) {
                            //agrego el primer mensaje por defecto
                            $('#chat-box-msg').append('<div class="msj macro" style="color:' + options.colorTextoasesor + ';">' +
                                '<div class="avatar" style="padding:15px 15px 15px 0px;"><img class="rounded" style="width:100%;border-radius: 5px;" src="https://bsginstitute.com/img-web/chat/bsginstitute.png" /></div>' +
                                '<div class="text text-l" style="background:' + options.colorFondoasesor + ';">' +
                                '<p style="text-align: left;color: ' + options.colorTextoasesor + ';font-size: 12px;' + options.textochatFont + ';"><b>' + nombreasesorglobal + '</b><br/>' + options.textoInicial + '</p>' +
                                //'<p><small>' + date + '</small></p>' +
                                '</div>' +
                                '</div>');
                            //fin agrego el primer mensaje
                        }
                    }
                    else {
                        $('#formulario').hide();
                        $('#chat-box-msg').append('<p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;">Conectado</p><p style ="margin:30px;text-align:center;font-size:11px;color:#AAA;"> ' + nombreasesorglobal + ' se unió al Chat nuevamente</p>');
                        $("#chat-box-msg").scrollTop(($("#chat-box-msg")[0].scrollHeight));
                    }



                } else {
                    horafin = Date.now();
                    if (primerchat) {//!chatEditing
                        $('#textoheaderpc').html(options.offlinetextoheader);
                        $('#exampleModalLabel').html(options.offlinetextoheader);
                        $('#chat-box-input').hide();
                        $('#chat-box-msg').hide();
                        $('#formulario').hide();
                        $('#chat-box').append(
                            '<div id="desconectado">' +
                            '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';">E-mail</p><input type="text" class="form-control" style="' + options.textoFormularioFont + '; width:93%;font:unset;background: #eee;" id="chat-box-email" value="' + correo + '" readonly />' +
                            '<p style ="margin:15px;' + options.textoFormularioFont + ';">Tu Mensaje</p><div style="padding:10px;"><textarea placeholder="Por ahora no nos encontramos en línea, por favor deja tu mensaje indicando tu número telefónico, para poder comunicarnos contigo a la brevedad." id="chat-box-cmt" cols="25" rows="7" class="form-control" style="font:unset;width:100%;height:auto;padding: 6px 6px;border-radius: 3px;' + options.textoFormularioFont + ';font-size:small;line-height:normal; "></textarea></div>' +
                            '<p style ="margin:10px;"><button type="button" id="chat-box-send" style="letter-spacing:0;text-transform:none;box-shadow:inset 0 0 0 0;text-shadow:0 0px 0px;font-size:14px;width:100%;background: ' + options.colorFondoempezarchat + ';color:' + options.colorTextoempezarchat + ' ;border-color:' + options.colorFondoempezarchat + ';' + options.textoFormularioFont + ';" class="btn btn-warning btn-block"><span class="glyphicon glyphicon-envelope">   Enviar</span></button></p>' +
                            '</div>'
                        );
                    }
                    else {

                        if ($("#imgnotificacion").css('display') == 'flex')//se mostro la notificacion pero todvia no se ha ocultado la notificaion 
                        {
                            // no puedo cambiar el texto
                        }
                        else {
                            $('#textoheaderpc').html(options.offlinetextoheader);
                        }

                        $('#exampleModalLabel').html(options.offlinetextoheader);
                        $('#chat-box-input').hide();
                        $('#chat-box-msg').hide();
                        if ($('#desconectado').length) {//si existe
                            $('#desconectado').show();
                        }
                        else {
                            $('#chat-box').append(
                                '<div id="desconectado">' +
                                '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';">E-mail</p><input type="text" class="form-control" style="' + options.textoFormularioFont + '; width:93%;font:unset;background: #eee;" id="chat-box-email" value="' + correo + '" readonly />' +
                                '<p style ="margin:15px;' + options.textoFormularioFont + ';">Tu Mensaje</p><div style="padding:10px;"><textarea  placeholder="Por ahora no nos encontramos en línea, por favor deja tu mensaje indicando tu número telefónico, para poder comunicarnos contigo a la brevedad." id="chat-box-cmt" cols="25" rows="7" class="form-control" style="font:unset;width:100%;height:auto;padding: 6px 6px;border-radius: 3px;' + options.textoFormularioFont + ';font-size:small;line-height:normal;"></textarea></div>' +
                                '<p style ="margin:10px;"><button type="button" id="chat-box-send" style="letter-spacing:0;text-transform:none;box-shadow:inset 0 0 0 0;text-shadow:0 0px 0px;font-size:14px;width:100%; background: ' + options.colorFondoempezarchat + ';color:' + options.colorTextoempezarchat + ' ;border-color:' + options.colorFondoempezarchat + ';' + options.textoFormularioFont + ';" class="btn btn-warning btn-block"><span class="glyphicon glyphicon-envelope">   Enviar</span></button></p>' +
                                '</div>'
                            );
                        }

                    }
                }
            }
            else {
                var estado = (state == true) ? '1' : '0';
                if (estadologueo == 2)//precargar datos
                {
                    if ($("#imgnotificacion").css('display') == 'flex')//se mostro la notificacion pero todvia no se ha ocultado la notificaion 
                    {
                        // no puedo cambiar el texto
                    }
                    else//aqui ya se cerro la notificacion o nunca se abrio la notifcacion
                    {
                        $('#textoheaderpc').html(options.textoheader);
                    }

                    $('#exampleModalLabel').html(options.textoheader);
                    $('#chat-box-input').hide();
                    $('#chat-box').html(
                        '<div id="formulario">' +
                        '<div class="form-group" style="margin-bottom: 0px;">' +
                        '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-email" value="' + correo + '" style="padding:0px 5px;::10px;width:93%;font:unset;display: unset;' + options.textoFormularioFont + '; " class="form-control" placeholder="Email" />' +
                        '<span id="dangeremail" style="float: left; font-size:10px; padding-top:5px; color:red; font-style: italic; display:none; ">E-mail invalido</span>' +
                        '</div>' +
                        '<div class="form-group" style="margin-bottom: 0px;">' +
                        '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-nombres" value="' + nombres + '" style="padding:0px 5px; width:93%;font:unset;display: unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Nombres" />' +
                        '</div>' +
                        '<div class="form-group" style="margin-bottom: 20px;">' +
                        '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + '"></p><input type="text" id="chat-box-apellidos" value="' + apellidos + '" style="padding:0px 5px; width:93%;font:unset;display: unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Apellidos" />' +
                        '</div>' +
                        '<div class="form-group" style="margin-bottom: 0px;">' +
                        '<input class="form-control" id="phonechat" value="' + celular + '" type="tel" placeholder="Número de Teléfono Móvil" style="height:30px; width:93%;font:unset;display: unset;">' +
                        '<span id="dangertelefono" style="float: left; font-size:10px; padding-top:5px; color:red; font-style: italic; display:none; ">Telefono invalido</span>' +
                        '</div>' +
                        '<p style="margin:5px;"></p><input type="button" id="chat-box-recargar" value="[No soy yo]" style="height:30px;' + options.textoFormularioFont + '; " class="btn btn-link"/>' +
                        '<div style="margin-bottom:35px;"> </div>' +
                        '<input type="text" class="hidden" id="chat-box-estadoasesor" value="' + estado + '"/>' +
                        '<p style ="margin:15px;"><input type="button" style="font-weight:unset;height:30px;letter-spacing: 0;text-transform: none;box-shadow: inset 0 0 0 0;text-shadow: 0 0px 0px;font-size: 14px;width: 100%;background: ' + options.colorFondoempezarchat + ';color:' + options.colorTextoempezarchat + ';border-color:' + options.colorFondoempezarchat + ';' + options.textoFormularioFont + ';" class="btn btn-warning btn-block"  id="chat-box-crear" value="Empezar a chatear ahora"/>' +
                        '</div>'
                    );

                    $("#phonechat").intlTelInput({
                        onlyCountries: ['ar', 'bo', 'br', 'cl', 'co', 'cr', 'cu', 'ec', 'sv', 'gt', 'hn', 'mx', 'ni', 'pa', 'py', 'pe', 'do', 'uy', 've'],
                        placeholderNumberType: "MOBILE",
                        separateDialCode: true,
                        utilsScript: "https://bsginstitute.com/Content/Script/utils.js"
                    });
                }
                else// es nuevo
                {
                    $('#textoheaderpc').html(options.textoheader);
                    $('#exampleModalLabel').html(options.textoheader);
                    $('#chat-box-input').hide();
                    $('#chat-box').html(
                        '<div id="formulario" style="text-align:center">' +
                        '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-email" style="padding:0px 5px; width:93%;font:unset;display: unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Email"/>' +
                        '<span id="dangeremail" style="float: left; font-size:10px; padding-top:5px; color:red; font-style: italic;display:none; ">E-mail invalido</span>' +
                        '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-nombres" style="padding:0px 5px; width:93%;font:unset;display: unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Nombres" />' +
                        '<p class="parrafo-titulo" style="margin:0 0 10px;' + options.textoFormularioFont + ';"></p><input type="text" id="chat-box-apellidos" style="padding:0px 5px; width:93%;font:unset;display: unset;' + options.textoFormularioFont + ';" class="form-control" placeholder="Apellidos" />' +
                        '<div class="form-group" style="margin-bottom: 0px; margin-top:20px;">' +
                        '<input class="form-control" id="phonechat" type="tel" placeholder="Número de Teléfono Móvil" style="height:30px; width:93%;font:unset;display: unset;">' +
                        '<span id="dangertelefono" style="float: left; font-size:10px; padding-top:5px; color:red; font-style: italic;display:none; ">Telefono invalido</span>' +
                        '</div>' +
                        '<p style="margin:20px;"></p>' +
                       
                        '<div style="margin-bottom:70px;"> </div>' +
                        '<input type="text" class="hidden" id="chat-box-estadoasesor" value="' + estado + '"/>' +
                        '<p style ="margin:15px;"><input type="button" style="font-weight:unset;height:34px;letter-spacing: 0;text-transform: none;box-shadow: inset 0 0 0 0;text-shadow: 0 0px 0px;font-size: 14px;width: 100%;background: ' + options.colorFondoempezarchat + ';color:' + options.colorTextoempezarchat + ';border-color:' + options.colorFondoempezarchat + ';' + options.textoFormularioFont + ';" class="btn btn-warning btn-block"  id="chat-box-crear" value="Empezar a chatear ahora"/>' +
                        '</div>'
                    );
                    $("#phonechat").intlTelInput({
                        onlyCountries: ['ar', 'bo', 'br', 'cl', 'co', 'cr', 'cu', 'ec', 'sv', 'gt', 'hn', 'mx', 'ni', 'pa', 'py', 'pe', 'do', 'uy', 've'],
                        placeholderNumberType: "MOBILE",
                        separateDialCode: true,
                        utilsScript: "https://bsginstitute.com/Content/Script/utils.js"
                    });
                }

            }
            setInterval(_carganotificacion, (options.TiempoVisualizar * 1000));
        }
        if (thiscarlos != undefined) {
            thiscarlos._setFlag(thiscarlos.selectedCountryData.iso2)
        }

    };

    return {
        config: _config,
        init: _init
    }
})();


LCSKChat.config();
LCSKChat.init();

