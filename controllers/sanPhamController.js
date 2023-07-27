const express = require('express');
const SanPhamModel = require('../models/SanPham');
const app = express();

// app.get('/',(req, res)=>{
//     res.render('sanpham/AddOrEdit.hbs',{ 
//         viewTitle:"Information"
//     });
// });

//add data
app.get('/add', async(req,res)=>{
        res.render('sanpham/AddOrEdit.hbs',{ 
            viewTitle:"Insert "
        });
});

app.post('/add', async(req,res)=>{
    const sp = new SanPhamModel(req.body);
    try{
        await sp.save();
        // res.send(sp);
        res.render('sanpham/AddOrEdit.hbs',{ 
            viewTitle:"Insert "
        });
    } catch(error){
        res.status(500).send(error);
    }
    
});

// app.post('/add', async(req,res)=>{
//     const sp = new SanPhamModel(req.body);
//     if(req.body.id== ''){
//         addRecord(req, res);
//     }else{
//         UpdateRecord(req, res);
//     }
    
// });

// async function addRecord(req, res){
//     const u = new SanPhamModel(req.body);
//     try{
//         await sp.save();
//         // res.send(sp);
//         res.render('sanpham/AddOrEdit.hbs',{ 
//             viewTitle:"Insert "
//         });
//     } catch(error){
//         res.status(500).send(error);
//     }
// }

// function UpdateRecord(req, res){
//     SanPhamModel.findByIdAndUpdate({_id:req.body,id}, req.body,{new:true},(err,doc)=>{
//         if(!err){
//             res.redirect('sanpham/list');
//         }else{
//             console.log(err);
//             res.render('sanpham/AddOrEdit.hbs',{
//                 viewTitle: "Error updated"
//             });
//         }
//     });
// }

app.get('/list',(req, res)=>{
    SanPhamModel.find({}).then(sanphams=>{
        res.render('sanpham/view-sanpham.hbs',{ 
            sanphams: sanphams.map(sanpham => sanpham.toJSON())
        });
    });
    
});
// app.get('/edit/:id',(req, res)=>{
//     res.render('sanpham/Edit.hbs',{ 
//         viewTitle:"Update",
//         sanpham:sanpham.toJSON()
//     });
// });

// app.get('/edit/:id',(req, res)=>{
//     SanPhamModel.findById(req.params.id,(err, sanpham)=>{
//         if(!err){
//             res.render('sanpham/AddOrEdit.hbs'),{
//                 sanpham:sanpham.toJSON()
//             }
//         }
//     });
// });

app.get('/delete/:id',async(req, res)=>{
    try{
        const sanpham = await SanPhamModel.findByIdAndDelete(req.params.id, req.body);
        if(!sanpham) res.status(404).send("No item found");
        else{
            res.redirect('/sanpham/list');
        }
        // res.status(200).send();
    }catch(error){
        res.status(500).send(error);
    }
});


 module.exports = app;