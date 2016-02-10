/**
 * Created by vimukthi on 2/10/16.
 */

/**
 *
 */

'use strict';

const noflo = require("noflo");
const _ = require("lodash");

class PostmenCustomsParams extends noflo.Component {

    constructor() {
        super();
        this.description = "This component receives a Postmen label request on its input and " +
            "outputs each key separately to be mapped";
        this.paramKeys = [
            "customs.importer_address.contact_name",
            "customs.importer_address.phone",
            "customs.importer_address.fax",
            "customs.importer_address.email",
            "customs.importer_address.company_name",
            "customs.importer_address.street1",
            "customs.importer_address.street2",
            "customs.importer_address.street3",
            "customs.importer_address.city",
            "customs.importer_address.state",
            "customs.importer_address.postal_code",
            "customs.importer_address.country",
            "customs.importer_address.type",
            "customs.importer_address.tax_id",
            "customs.purpose",
            "customs.terms_of_trade",
            "customs.billing.paid_by",
            "customs.billing.method.type",
            "customs.billing.method.account_number"
        ];

        this.inPorts.postmen_request = new noflo.Port('all');
        this.inPorts.postmen_request.on('data', (value) => {
            return this.sendParams(value);
        });

        for (let i = 0; i < this.paramKeys.length; i++) {
            this.outPorts.add(this.paramKeys[i], { datatype: 'all' });
        }
    }

    sendParams(req) {
        for (let i = 0; i < this.paramKeys.length; i++) {
            this.outPorts[this.paramKeys[i]].send(_.get(req, this.paramKeys[i]));
        }
        return ;
    }
}

exports.getComponent = () => {
    return new PostmenCustomsParams();
};