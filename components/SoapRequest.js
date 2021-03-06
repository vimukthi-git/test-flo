/**
 * Created by vimukthi on 2/10/16.
 */
'use strict';

var noflo = require("noflo");
var soap = require('soap');

class SoapRequest extends noflo.Component {

    constructor() {
        super();
        this.description = "This component receives a wsdl, webservice method and a wsdl on its input and " +
            "outputs the result of the call";
        this.client = null;
        this.method = null;
        this.payload = null;

        this.inPorts = {
            wsdl: new noflo.Port('string'),
            method: new noflo.Port('string'),
            payload: new noflo.Port('object')
        };

        this.outPorts.add('result', { datatype: 'all' });

        this.inPorts.wsdl.on('data', (wsdl) => {
            soap.createClient(wsdl, (err, client) => {
                if (err) throw err;
                this.client = client;
                if (!this.method || !this.payload) {
                    return;
                }
                this.client[this.method].apply(null, [this.payload, (err, result) => {
                    if (err) throw err;
                    return this.outPorts.result.send(result);
                }]);
            });
        });

        this.inPorts.method.on('data', (method) => {
            this.method = method;
        });

        this.inPorts.payload.on('data', (payload) => {
            this.payload = JSON.parse(payload);
        });
    }
}

exports.getComponent = () => {
    return new SoapRequest();
};