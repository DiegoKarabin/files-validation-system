const fs = require('fs');
//const IPFS = require('ipfs');
const pdfparse = require('pdf-parse');
const ipfsClient = require('ipfs-http-client');

async function uploadIPFS(PATH){
   //readding PDF
    await pdfparse(PATH).then(function (data) {
        console.log(data.text);
    })
    var result = [];
  
    try{
        var node = await ipfsClient({host:'ipfs.infura.io', port: '5001',protocol:'https'});//setting where to put it
        for await (var file of await node.add({
        
            content: fs.readFileSync(PATH)
        })){
            result.push(file);
        }
        
        
        console.log(result[0].hash);

        //example to download ==== https://ipfs.io/ipfs/+ "result[0].hash"
      //https://ipfs.io/ipfs/QmXqNyw6pvfAWVKbpdYM6vET1RWX7Se86DBWn2nhG1Z4T5
     
    }catch(err){
        console.log(err);
        return false;
    }
    return true;
}
module.exports = uploadIPFS;