const mongoose = require('mongoose');
const SanPhamSchema = new mongoose.Schema({
    maSp:{
        type: String
    },
    tenSp:{
        type: String
    },
    loai:{
       type: String 
    },
    gia:{
        type: Number
    },
    anh:{
        type:String
    },
    mau:{
        type: String 
    }
});
const SanPham = mongoose.model('SanPham', SanPhamSchema);
module.exports = SanPham;