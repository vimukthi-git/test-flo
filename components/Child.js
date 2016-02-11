/**
 * Created by vimukthi on 2/10/16.
 */
/**
 * Created by vimukthi on 2/10/16.
 */
'use strict'

var noflo = require("noflo");

exports.getComponent = function() {
    var component = new noflo.Component;
    component.description = "This component receives data on a single input\
  port and sends the same data out to the output port";

    // Register ports and event handlers
    component.inPorts.add('in', { datatype: 'all' }, function(event, payload) {
        switch (event) {
            case 'data':
                // Forward data when we receive it.
                // Note: send() will connect automatically if needed
                return component.outPorts.out.send(payload);
            case 'disconnect':
                // Disconnect output port when input port disconnects
                return component.outPorts.out.disconnect();
        }
    });
    component.outPorts.add('out', { datatype: 'all' });

    return component; // Return new instance
};