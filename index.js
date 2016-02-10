/**
 * Created by vimukthi on 2/10/16.
 */


console.log('test');

var soap = require('soap');
var url = 'http://www.mondialrelay.fr/webservice/Web_Services.asmx?WSDL';
var args = {
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
    "Security": "2CCBD6C58CE1D3BF088E7D527DAC2DA8"
};
soap.createClient(url, function(err, client) {
    client.WSI2_CreationEtiquette(args, function(err, result) {
        console.log(result);
    });
});