/**
 * Created by vimukthi on 2/10/16.
 */
'use strict';

var noflo = require("noflo");

function child(input, x) {
    if (input && Array.isArray(input)) {
        return input[x];
    }
    return input;
}

exports.getComponent = () => {
    var component = new noflo.Component;
    component.description = "This component receives data and send nth child on output port";

    // Register ports and event handlers
    component.inPorts.add('in', { datatype: 'all' }, (event, payload) => {
        switch (event) {
            case 'data':
                // Forward data when we receive it.
                // Note: send() will connect automatically if needed
                return component.outPorts.out.send(child(payload[0], payload[1]));
            case 'disconnect':
                // Disconnect output port when input port disconnects
                return component.outPorts.out.disconnect();
        }
    });
    component.outPorts.add('out', { datatype: 'all' });

    return component; // Return new instance
};