var precio;
//var url_base = 'http://localhost:34649/';
var url_base = 'https://apiedx.bsgrupo.com/';

// Called when token created successfully.
var successCallback = function (data) {
    var myForm = document.getElementById('myCCForm');

    // Set the token as the value for the token input
    myForm.token.value = data.response.token.token;

    // IMPORTANT: Here we call `submit()` on the form element directly instead of using jQuery to prevent and infinite token request loop.
    //myForm.submit();

    //var url_pago = url_base + 'Pagos/Procesar';
    var url_pago = url_base + 'api/Precio/Pagar';

    var data_token = $("#token").val();
    var data_card_holder_name = $("#card_holder_name").val();
    var data_email = $("#email").val();
    var data_phone = $("#phone").val();
    var data_pais = $("#pais").val();
    var data_curso_numero = $("#curso_numero").val();
    var data_curso_nombre = $("#curso_nombre").val();
    console.log(data_token + "-" + data_card_holder_name + "-" + data_email + "-" + data_phone);

    var parametros = {
        token: data_token,
        card_holder_name: data_card_holder_name,
        email: data_email,
        phone: data_phone,
        precio: precio,
        id_pais: data_pais,
        curso_numero: data_curso_numero,
        curso_nombre: data_curso_nombre
    };

    $.ajax({
        url: url_pago,
        //data: JSON.stringify(parametros),
        data: jQuery.param(parametros),
        //data: {
        //    token: data_token,
        //    card_holder_name: data_card_holder_name,
        //    email: data_email,
        //    phone: data_phone,
        //    precio: precio,
        //    id_pais: data_pais,
        //    curso_numero: data_curso_numero,
        //    curso_nombre: data_curso_nombre
        //},
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        type: "GET",
        //traditional: true,
        success: function (rpta) {
            console.log(rpta);

            //gestion de la respuesta
            $('#cuadroMensajes').removeClass('hidden');
            $('#mensajeUsuario').text(rpta.Mensaje);
            if (rpta.Estado === true) {
                $('#cuadroMensajes').addClass('alert-success');
                matricularAlumno();
            } else {
                $('#cuadroMensajes').addClass('alert-danger');
            }
        },
        error: function (result) {
            $('#cuadroMensajes').addClass('alert-danger');
            $('#mensajeUsuario').text(result.Mensaje);
            console.log(result);
        }
    }).always(function () {
        console.log('always');
        habilitar_botonPago();

    }).fail(function () {
        $('#cuadroMensajes').addClass('alert-danger');
        $('#mensajeUsuario').text("Ocurrió un error, favor intente nuevamente;");
        console.log('fail');
    });
};

// Called when token creation fails.
var errorCallback = function (data) {
    if (data.errorCode === 200) {
        tokenRequest();
    } else {
        alert(data.errorMsg);
    }
    habilitar_botonPago();
};

var tokenRequest = function () {
    // Setup token request arguments
    var args = {
        //sellerId: "901251864",
        //publishableKey: "D01C75F6-997C-4A18-A491-BD40C323E1D7",
        sellerId: "1506591",
        publishableKey: "3EDD18BF-210D-4400-8FD1-0F87593EDF15",
        ccNo: $("#ccNo").val(),
        cvv: $("#cvv").val(),
        expMonth: $("#expMonth").val(),
        expYear: $("#expYear").val()
    };

    // Make the token request
    TCO.requestToken(successCallback, errorCallback, args);
};

var bloquear_botonPago = function () {
    $('#botonPago').text("Procesando ...");
    $('#botonPago').prop('disabled', true);
};
var habilitar_botonPago = function () {
    $('#botonPago').text("Pagar");
    $('#botonPago').prop('disabled', false);
};

var cargar_modal_inicial = function () {

    //obtencion de los datos del modal inicial
    var url_precio = url_base + 'api/Precio/GetActual';

    $.getJSON(url_precio)
        .done(function (data) {
            $('#TituloModal').text(data.TextoInicial);

            $('#Opcion1Label').text(data.Opcion1);
            $('#Opcion2Label').text(data.Opcion2);

            $('#botonMatriculaGratis').text(data.TextoBoton1);
            $('#botonPago').text(data.TextoBoton2);

            $('#TextoPrecio').text(data.Precio);
            

            //$('#ColorBoton1').text(data.ColorBoton1);
            //$('#ColorBoton2').text(data.ColorBoton1);

            if (data.Opcion1 != null && data.Opcion1 != '') {
                $('#Opcion1Label').text(data.Opcion1);
            }
            if (data.Opcion2 != null && data.Opcion2 != '') {
                $('#Opcion2Label').text(data.Opcion2);
            }

            precio = data.Precio;
            console.log(data);
        });

    //obtencion de los paises
    var url_precio = url_base + 'api/Precio/GetPaises';

    $.getJSON(url_precio)
        .done(function (data) {
            console.log(data);

            //$("#pais").append('<option value="">Seleccione un Material</option>');

            $.each(data, function (i, data) {
                //console.log(data);
                var selected = '';
                if (data.CodigoPais == 51) selected = 'selected';
                $("#pais").append('<option value="' + data.CodigoPais + '" ' + selected + '>' + data.NombrePais + '</option>');
            });
        });
};

var limpiarFormulario = function () {
    $('#card_holder_name').val("");
    $('#email').val("");
    $('#phone').val("");
    $('#ccNo').val("");
    $('#cvv').val("");

    //$('#expMonth').val("");
    //$('#expYear').val("");

    limpiarMensajeUsuario();
};

var limpiarMensajeUsuario = function () {
    $('#cuadroMensajes').addClass('hidden');
    $('#cuadroMensajes').removeClass('alert-danger');
    $('#cuadroMensajes').removeClass('alert-success');
    $('#mensajeUsuario').text('');
};

var mostrarMensajeUsuario = function (mensaje, tipo) {

    $('#mensajeUsuario').text('');
    if (tipo) {
        $('#cuadroMensajes').addClass('alert-success');
    } else {
        $('#cuadroMensajes').addClass('alert-danger');
    }

    $('#cuadroMensajes').removeClass('hidden');
    $('#mensajeUsuario').text(mensaje);
};

var matricularAlumno = function () {
    console.log("matricular ..");
    $("#class_enroll_form").submit();
    event.preventDefault();
};

var mostrarModal = function () {
    $("#ModalSeleccion").modal("show");
    $('#ContenedorMatriculaGratis').removeClass('hidden');
    $('#ContenedorFormulario').addClass('hidden');

    //clean radio button
    $('[name="SeleccionMatricula"]').removeAttr('checked');
    $("input[name=SeleccionMatricula][value=" + 0 + "]").prop('checked', true);

    limpiarFormulario();
    limpiarValidacionFormulario();
};

var limpiarValidacionFormulario = function () {

    $('#card_holder_name').removeClass("border-warning");
    $('#email').removeClass("border-warning");
    $('#phone').removeClass("border-warning");
    $('#ccNo').removeClass("border-warning");
    $('#expMonth').removeClass("border-warning");
    $('#expYear').removeClass("border-warning");
    $('#cvv').removeClass("border-warning");
};

var validarFormulario = function () {
    console.log("inici validacion");
    var validacion = true;
    limpiarMensajeUsuario();
    limpiarValidacionFormulario();

    if ($('#card_holder_name').val().trim() === '') {
        $('#card_holder_name').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su nombre", false);
    }
    if ($('#email').val().trim() === '') {
        $('#email').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su correo electrónico", false);
    }
    if ($('#phone').val().trim() === '') {
        $('#phone').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su nùmero de telefono", false);
    }
    if ($('#ccNo').val().trim() === '') {
        $('#ccNo').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su tarjeta", false);
    }
    if ($('#expMonth').val().trim() === '') {
        $('#expMonth').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Seleccione el mes", false);
    }
    if ($('#expYear').val().trim() === '') {
        $('#expYear').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Seleccione el año", false);
    }
    if ($('#cvv').val().trim() === '') {
        $('#cvv').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su código CVV", false);
    }

    //tarjeta de longitud minima
    if ($('#ccNo').val().length < 14) {
        $('#ccNo').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su número de tarjeta", false);
    }
    //tarjeta solo numeros
    if ($.isNumeric($('#ccNo').val()) === false) {
        $('#ccNo').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su número de tarjeta", false);
    }

    //tarjeta de longitud minima
    if ($('#cvv').val().length < 3) {
        $('#cvv').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su número de tarjeta", false);
    }
    //tarjeta solo numeros
    if ($.isNumeric($('#cvv').val()) === false) {
        $('#cvv').addClass("border-warning");
        validacion = false;
        //mostrarMensajeUsuario("Ingrese su número de tarjeta", false);
    }

    return validacion;
};

$(function () {
    //console.log($("#curso_numero").val());
    //console.log($("#curso_nombre").val());

    // Pull in the public encryption key for our environment
    //TCO.loadPubKey('sandbox');
    TCO.loadPubKey('production');

    $("#myCCForm").submit(function (e) {
        e.preventDefault();
        console.log("enviar");
        // Call our token request function

        jQuery.validator.setDefaults({
            debug: true,
            success: "valid"
        });

        //var form = $("#myCCForm");
        //form.validate();

        //    alert("Valid: " + form.valid());



        tokenRequest();

        // Prevent form from submitting
        return false;
    });

    //$("form").validate({
    //    // Specify validation rules
    //    rules: {
    //        card_holder_name: "required",
    //        //lastname: "required",
    //        email: {
    //            required: true,
    //            // Specify that email should be validated
    //            // by the built-in "email" rule
    //            email: true
    //        }
    //        //,
    //        //password: {
    //        //    required: true,
    //        //    minlength: 5
    //        //}
    //    },
    //    // Specify validation error messages
    //    messages: {
    //        card_holder_name: "Please enter your firstname",
    //        //lastname: "Please enter your lastname",
    //        //password: {
    //        //    required: "Please provide a password",
    //        //    minlength: "Your password must be at least 5 characters long"
    //        //},
    //        email: "Porfavor ingresar uns dirección de válida"
    //    },
    //    // Make sure the form is submitted to the destination defined
    //    // in the "action" attribute of the form when valid
    //    submitHandler: function (form) {
    //        form.submit();
    //    }
    //});

    $('#modal-opciones-matricula').click(function (e) {
        //e.preventDefault();
        //$('#opciones-matricula').popUpWindow({
        //    action: "open", // open or close
        //    modal: true, // modal mode
        //    size: "large"
        //});
    });

    $("#botonPago").click(function (e) {
        e.preventDefault();
        console.log("pago");

        limpiarMensajeUsuario();

        var resultado_validacion = validarFormulario();
        console.log(resultado_validacion);

        //jQuery.validator.setDefaults({ debug: true, success: "valid" });
        //var form = $("#myCCForm");
        //form.validate();
        //form.valid()

        if (resultado_validacion) {
            console.log("valido");
            bloquear_botonPago();
            // Call our token request function
            tokenRequest();
        } else {
            console.log("no valido");
        }

        // Prevent form from submitting
        return false;
    });


    cargar_modal_inicial();

    $('#modal-opciones-matricula').click(function (e) {
        //e.preventDefault();
        //$('#opciones-matricula').popUpWindow({
        //    action: "open", // open or close
        //    modal: true, // modal mode
        //    size: "large"
        //});
    });

    $('input[name="SeleccionMatricula"]').change(function (e) {
        e.preventDefault();

        //valida si es gratis
        if (this.value == 0) {
            $('#ContenedorMatriculaGratis').removeClass('hidden');
            $('#ContenedorFormulario').addClass('hidden');
        } else {
            $('#ContenedorMatriculaGratis').addClass('hidden');
            $('#ContenedorFormulario').removeClass('hidden');
            limpiarFormulario();
        }
    });

    $('#botonMatriculaGratis').click(function (e) {
        e.preventDefault();

        matricularAlumno();
    });

    $('#boton-modal').click(function (e) {
        e.preventDefault();

        mostrarModal();
    });

});

