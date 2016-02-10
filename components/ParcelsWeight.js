/**
 * Created by vimukthi on 2/10/16.
 */
'use strict'

var noflo = require("noflo");

/**
 * Calculate total price of items
 * @param  {Object} items - an array of items
 * @return {Number} total_price - total price
 */
function shipmentItemsPrice(items) {
    if (!Array.isArray(items)) items = _.cloneDeep([items]);
    let total_price = 0;
    for (let i = 0; i < items.length; i++) {
        total_price += items[i].price.amount * items[i].quantity;
    }
    return total_price;
}

/**
 * Calculate total price of parcels
 * @param  {Object} parcels - an array of parcels
 * @return {Number} total_price - total price
 */
function shipmentParcelsPrice(parcels) {
    if (!Array.isArray(parcels)) parcels = _.cloneDeep([parcels]);
    let total_price = 0;
    for (let i = 0; i < parcels.length; i++) {
        total_price += shipmentItemsPrice(parcels[i].items);
    }
    return total_price;
}

exports.getComponent = () => {
    var component = new noflo.Component;
    component.description = "This component receives shipment.parcels on input and returns its weight on output";

    // Register ports and event handlers
    component.inPorts.add('in', { datatype: 'all' }, (event, payload) => {
        switch (event) {
            case 'data':
                // Forward data when we receive it.
                // Note: send() will connect automatically if needed
                return component.outPorts.out.send(shipmentParcelsPrice(payload));
            case 'disconnect':
                // Disconnect output port when input port disconnects
                return component.outPorts.out.disconnect();
        }
    });
    component.outPorts.add('out', { datatype: 'all' });

    return component; // Return new instance
};