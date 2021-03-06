/**
 * Created by vimukthi on 2/10/16.
 */
'use strict';

var noflo = require("noflo");

exports.getComponent = () => {
    var component = new noflo.Component;
    component.description = "This component receives data on a single input\
  port and sends the FR on output.. should be fixed";

    // Register ports and event handlers
    component.inPorts.add('in', { datatype: 'all' }, (event, payload) => {
        switch (event) {
            case 'data':
                // Forward data when we receive it.
                // Note: send() will connect automatically if needed
                return component.outPorts.out.send('FR');
            case 'disconnect':
                // Disconnect output port when input port disconnects
                return component.outPorts.out.disconnect();
        }
    });
    component.outPorts.add('out', { datatype: 'all' });

    return component; // Return new instance
};