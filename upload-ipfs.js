const fs = require('fs');
//const IPFS = require('ipfs');
const pdfparse = require('pdf-parse');
const ipfsClient = require('ipfs-http-client');
async function uploadIPFS(PATH){
   await pdfparse(PATH).then(function (data) {
        console.log(data.text);
    })
    try{
        var node = await ipfsClient(PATH);
        for await (const file of await node.add({
            path: PATH,
            content: fs.readFileSync(PATH)
        })){
            return file.cid.toString();
        }
      
    }catch(err){
        console.log(err);
        return false;
    }
    return true;
}
module.exports = uploadIPFS;