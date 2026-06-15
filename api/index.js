//server.js
import express from "express";
import path from "path";
import bodyParser from "body-parser";
import { dirname } from "path"; 
import { fileURLToPath } from "url";
import qr from 'qr-image';

//let switch_=0;
const port=process.env.PORT ||3000;
const app=express();
//app.use(express.static("../public"));

const __dirname = dirname(fileURLToPath(import.meta.url));
app.set("views", path.join( __dirname , "../views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',(req,res)=>{
    res.render("index",{
       image: "",
       text: "QR Code image will appear here"

    });
})

function convertToImage(urlInput){
    var qr_png = qr.imageSync(urlInput, { type: 'png' });
    const qr_base64 = qr_png.toString('base64');
    return qr_base64;
}

app.post('/submit',(req,res)=>{
   // switch_=1;
    console.log(req.body);
    const urlInput=req.body.urlInput;
    res.redirect(`/result?text=${encodeURIComponent(urlInput)}`);
   // urlInput="";
    })

app.get('/result',(req,res)=>{
   
        console.log(req.query);
        const urlInput=req.query.text;
        const qr_base64=convertToImage(urlInput);
       
        res.render("index", {
            image: qr_base64,
            text: urlInput
        });
    
    // else if(switch_==0){
    //     res.redirect("/");
    // }

})

app.get('/export',(req,res)=>{
const urlInp=req.query.text;
const img= qr.imageSync(urlInp, { type: 'png' });
res.setHeader('Content-Type', 'image/png');
res.setHeader('Content-Disposition', 'attachment; filename="qrcode.png"');
res.send(img);
})

app.listen(port,()=>{
    console.log(`Server has started on port: ${port}`);
})

export default app;
