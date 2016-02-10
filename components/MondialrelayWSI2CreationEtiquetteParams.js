/**
 * Created by vimukthi on 2/10/16.
 */
/*
 "Enseigne": "BDTEST13",
 "ModeCol": "REL",
 "ModeLiv": "24R",
 "NDossier": "ujj",
 "Expe_Langage": "FR",
 "Expe_Ad1": "FirstName",
 "Expe_Ad3": "Rue Lepic",
 "Expe_Ville": "Paris",
 "Expe_CP": "75001",
 "Expe_Pays": "FR",
 "Expe_Tel1": "+33153418303",
 "Dest_Langage": "FR",
 "Dest_Ad1": "ConsigneeFirstname",
 "Dest_Ad3": "A55 autoroute",
 "Dest_Ville": "London",
 "Dest_CP": "75001",
 "Dest_Pays": "FR",
 "Poids": "111.19",
 "NbColis": "1",
 "CRT_Valeur": "0000000",
 "COL_Rel_Pays": "FR",
 "COL_Rel": "062049",
 "LIV_Rel_Pays": "FR",
 "LIV_Rel": "062049",
 ======
 Enseigne
 ModeCol
 ModeLiv
 NDossier
 Expe_Langage
 Expe_Ad1
 Expe_Ad3
 Expe_Ville
 Expe_CP
 Expe_Pays
 Expe_Tel1
 Dest_Langage
 Dest_Ad1
 Dest_Ad3
 Dest_Ville
 Dest_CP
 Dest_Pays
 Dest_Tel1
 Poids
 NbColis
 CRT_Valeur
 */
'use strict';

const noflo = require("noflo");
const md5 = require("md5");

const NUM_PARAMS = 24;

class MondialrelayWSI2CreationEtiquetteParams extends noflo.Component {

    constructor() {
        super();
        this.description = "This component receives parameter values for WSI2CreationEtiquette on its input and " +
            "outputs the json object for soap request";
        this.paramKeys = [
            'Enseigne',
            'ModeCol',
            'ModeLiv',
            'NDossier',
            'Expe_Langage',
            'Expe_Ad1',
            'Expe_Ad3',
            'Expe_Ville',
            'Expe_CP',
            'Expe_Pays',
            'Expe_Tel1',
            'Dest_Langage',
            'Dest_Ad1',
            'Dest_Ad3',
            'Dest_Ville',
            'Dest_CP',
            'Dest_Pays',
            'Dest_Tel1',
            'Poids',
            'NbColis',
            'CRT_Valeur'
        ];
        this.params = {};
        this.keyTracker = {};
        this.inPorts = {};
        this.Private_Key = '';

        for (let i = 0; i < this.paramKeys.length; i++) {
            this.params[this.paramKeys[i]] = null;
            this.inPorts[this.paramKeys[i]] = new noflo.Port('string');
            this.inPorts[this.paramKeys[i]].on('data', (value) => {
                this.params[this.paramKeys[i]] = value;
                this.keyTracker[this.paramKeys[i]] = 1;
                if (Object.keys(this.keyTracker).length === NUM_PARAMS) {
                    this.keyTracker = {};
                    return this.sendParams();
                }
            });
        }
        this.inPorts.Private_Key = new noflo.Port('string');
        this.inPorts.Private_Key.on('data', (value) => {
            this.Private_Key = value;
            if (Object.keys(this.keyTracker).length === NUM_PARAMS) {
                this.keyTracker = {};
                return this.sendParams();
            }
        });

        this.outPorts.add('jsonrequest', { datatype: 'all' });
    }

    sendParams() {
        let securityString = '';
        for (let i = 0; i < this.paramKeys.length; i++) {
            let param = this.params[this.paramKeys[i]];
            if (param === null || param === '') continue;
            securityString += param;
        }
        this.params['Security'] = md5(securityString + this.Private_Key).toUpperCase();
        return this.outPorts.jsonrequest.send(this.params);
    }
}

exports.getComponent = () => {
    return new MondialrelayWSI2CreationEtiquetteParams();
};