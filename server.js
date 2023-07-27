const express =  require('express');
const mongoose = require('mongoose');
const bodyParser =  require('body-parser');
const exphdbs = require('express-handlebars');
// const SPRouter = require('./routes/SPRoutes');
const sanPhamController = require('./controllers/sanPhamController');
const url = "mongodb+srv://thanhct:main0607@cluster0.rdak5hj.mongodb.net/dbSanPham?retryWrites=true&w=majority ";

const app = express();
app.use(bodyParser.urlencoded({
    extended:true
}));
app.use(bodyParser.json());
app.engine('.hbs', exphdbs.engine({extname: '.hbs'}));
app.set('view engine','.hbs');
app.use(express.json());

mongoose.connect(url,{useUnifiedTopology:true, useNewUrlParser: true});

// app.use(SPRouter);
app.use('/sanpham',sanPhamController);
app.listen(8000,()=>{console.log('server is running');
})