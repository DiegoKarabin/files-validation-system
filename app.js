var express = require('express')
var multer = require('multer')
var upload = multer({dest: 'uploads/'})
var uploadIPFS = require('./upload-ipfs')
var app = express()



app.get('/', async (req,res)=> {

        res.sendFile(__dirname + '/index.html');

});

const PATH = 'uploads/';

app.post('/file', upload.single('doc'), async function(req,res,next){
    try{
        console.log(req.file);
        const file = req.file;
        if(!file){
            res.status(400).send({status:false,
            data: 'No file is selected'});

        }else{
            //send response
           
            res.send({status: true,
                message: 'File is uploaded.',
                data:{
                    name: file.originalname,
                    mimetype: file.mimetype,
                    size: file.size
                }
            }); var HASH = await uploadIPFS(PATH + req.file.filename);
            console.log(HASH);
        }
    }catch(err){
        res.status(500).send(err);
    }
})

const port = 8888;
app.listen(port,()=>
console.log('Server is listening on port:',port));