/**
 * Created by vimukthi on 2/10/16.
 */
'use strict';

var noflo = require("noflo");
var soap = require('soap');

class SoapClient extends noflo.Component {

    constructor() {
        super();
        this.description = "This component receives a wsdl, on its input and " +
            "outputs a soap client";
        this.client = null;
        this.method = null;
        this.inPorts = {
            wsdl: new noflo.Port('string'),
            method: new noflo.Port('string'),
            payload: new noflo.Port('object')
        };

        this.outPorts.add('out', { datatype: 'all' });

        this.inPorts.wsdl.on('data', (wsdl) => {
            soap.createClient(wsdl, (err, client) => {
                if (err) throw err;
                this.client = client;
            });
        });

        this.inPorts.method.on('data', (method) => {
            this.method = method;
        });

        this.inPorts.payload.on('data', (payload) => {
            if (!this.method || !this.client) {
                return;
            }

            this.client[this.method].apply(null, [payload, (err, result) => {
                if (err) throw err;
                return component.outPorts.out.send(result);
            }]);
        });
    }
}

exports.getComponent = () => {
    return new SoapRequest();
};