/**
 * Created by vimukthi on 2/10/16.
 */

/**
 *
 */

'use strict';

const noflo = require("noflo");
const _ = require("lodash");

class PostmenShipperAccountParams extends noflo.Component {

    constructor() {
        super();
        this.description = "This component receives a Postmen label request on its input and " +
            "outputs each key separately to be mapped";
        this.paramKeys = [
            "shipper_account.slug",
            "shipper_account.description",
            "shipper_account.timezone",
            "shipper_account.address.contact_name",
            "shipper_account.address.company_name",
            "shipper_account.address.email",
            "shipper_account.address.street1",
            "shipper_account.address.street2",
            "shipper_account.address.city",
            "shipper_account.address.postal_code",
            "shipper_account.address.state",
            "shipper_account.address.country",
            "shipper_account.address.type",
            "shipper_account.credentials.merchant_id",
            "shipper_account.credentials.private_key",
            "shipper_account.credentials.language"
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
    return new PostmenShipperAccountParams();
};