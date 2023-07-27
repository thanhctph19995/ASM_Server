const express = require('express');
const SanPhamModel = require('../models/SanPham');
const SanPham = require('../models/SanPham');
const app = express();

app.post('/sanpham', async(req,res)=>{
    const sp = new SanPhamModel(req.body);
    try{
        await sp.save();
        res.send(sp);
    } catch(error){
        res.status(500).send(error);
    }
});

app.get('/list', async(req,res)=>{
    const sanphams = await SanPhamModel.find({});
    try{
        res.send(sanphams);
    }catch(error){
        res.status(500).send(error);
    }
});

app.patch('/sanpham/:id', async(req, res)=>{
    try{
        const sanpham = await SanPhamModel.findByIdAndUpdate(req.params.id, req.body);
        await SanPhamModel.save();
        res.send(sanpham);
    }catch(error){
        res.status(500).send(error);
    }
}); 
app.delete('/sanpham/:id', async(req, res)=>{
    try{
        const sanpham = await SanPhamModel.findByIdAndDelete(req.params.id, req.body);
        if(!sanpham) res.status(404).send("No Item found");
        res.status(200).send();
    }catch(error){
        res.status(500).send(error);
    }
}); 
module.exports =app;