jQuery(function($){
    $.ajaxPost(SITE_URL + '/SiteUser/token', '', function(result){
        if (result.status) {
            Twilio.Device.setup(result.data.token);
            $.twilioInit();
        }
    });

    $.twilioInit = function() {
        Twilio.Device.ready(function(device) {
             console.log("Twilio.Device is now ready for connections");
        });

        Twilio.Device.error(function (error) {
            console.log('Twilio.Device ErrorCode: ' + error.code + ', message: ' + error.message);
        });

        Twilio.Device.connect(function (conn) {
            console.log('Successfully established call!');
        });

        Twilio.Device.connect(function (conn) {
            console.log('connect 2');
        });

        Twilio.Device.disconnect(function (conn) {
            console.log('Call ended.');
        });

        Twilio.Device.incoming(function (conn) {
            conn.accept();
            console.log('Incoming connection from ' + conn.parameters.From);
        });
    }

    $.twilioCall = function(id) {
        $.ajaxPost(SITE_URL + '/SiteUser/call', { user_id: id }, function(result){
            if (result.status) {
                Twilio.Device.connect({ LogId: result.data });
            }
        });
    }

    $.twilioSms = function(id) {
        var params = {
            userId: id
        };
        Twilio.Device.connect(params);
    }
});