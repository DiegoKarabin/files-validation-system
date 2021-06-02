var express = require('express')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var uploadIPFS = require('./upload-ipfs')
var app = express()


/*
app.get('/', async (req,res)=> {

        res.sendFile(__dirname + '/index.html');

});*/

const PATH = 'uploads/';
var URLl;
        
app.post('/file', upload.single('doc'), async function(req,res,next){
    try{
        //console.log(req.file);
        const file = req.file;
        if(!file){
            res.status(400).send({status:false,
            data: 'No file is selected'});

        }else{
            //send response
            var HASH = await uploadIPFS(PATH + req.file.filename);
            console.log(HASH);
            res.send({status: true,
                message: "https://ipfs.io/ipfs/"+HASH,
                data:{
                    name: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                }
            });
          
                //The variable to be returned
                
                //The variables containing the respective IDs
                
        
                //Forming the variable to return    
                URLl="https://ipfs.io/ipfs/"+HASH;
            
        
             
        }
    }catch(err){
        res.status(500).send(err);
    }
})


const port = 8545;
app.listen(port,()=>
console.log('Server is listening on port:',port));