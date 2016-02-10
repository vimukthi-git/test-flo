/**
 * Created by vimukthi on 2/10/16.
 */
'use strict';

var noflo = require("noflo");

function handleArray(func, args) {
    args = Array.prototype.slice.call(args);
    let result = [];
    for (let i = 0; i < args[0].length; i++) {
        let input = args[0][i];
        let func_args = args.slice(1);
        func_args.unshift(input);
        result.push(func.apply(this, func_args));
    }
    return result;
}

function defaulter(input, d) {
    if (_.isArray(input)) return handleArray(defaulter, arguments);
    return d;
}

exports.getComponent = () => {
    var component = new noflo.Component;
    component.description = "This component receives sets a default value for a request field";

    // Register ports and event handlers
    component.inPorts.add('in', { datatype: 'all' }, (event, payload) => {
        switch (event) {
            case 'data':
                // Forward data when we receive it.
                // Note: send() will connect automatically if needed
                return component.outPorts.out.send(defaulter(payload[0], payload[1]));
            case 'disconnect':
                // Disconnect output port when input port disconnects
                return component.outPorts.out.disconnect();
        }
    });
    component.outPorts.add('out', { datatype: 'all' });

    return component; // Return new instance
};