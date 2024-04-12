const myMD = require('../model/user');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: function(req,file,cb) {
        cb(null,'public/upload');
    },
    filename:function(req,file,cb) {
        cb(null,file.fieldname + '-' +Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage:storage,
    limits:{
        fieldSize: 1024 * 1024 * 5
    }
});

exports.register = async (req, res) => {
    try {
        const { username, email, phone, password } = req.body;

        if (!username || !email || !phone || !password) {
            return res.status(404).json({ message: "Vui lòng nhập đầy đủ thông tin" });
        } else if (password.length < 6) {
            return res.status(403).json({ message: "Mật khẩu tối thiểu phải đủ 6 ký tự" });
        }

        const user = await myMD.userModel.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "Người dùng đã được đăng ký" });
        } else {
            const newUser = new myMD.userModel({
                username,
                email,
                phone,
                avatar:req.file ? req.file.path : null,
                password,
            });

            await newUser.save();
            console.log("Đã đăng ký người dùng thành công :" + newUser);
            res.status(200).json(newUser);
        }
    } catch (error) {
        console.log("Đã có lỗi xảy ra khi đăng ký người dùng :" + error);
    }
}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            return res.status(403).json({ message:"Vui lòng nhập đầy đủ thông tin người dùng"});
        }
        const user = await myMD.userModel.findOne({email});
        if(!user){
            return res.status(404).json({message:"Người dùng không tồn tại"});
        }else if(user.password !== password){
            return res.status(404).json({message:"Mật khẩu không chính xác"});
        }
        
        return res.status(200).json({message:"Đăng nhập thành công",user});
    } catch (error) {
        console.log("Đã có lỗi khi đăng nhập :" + error);
    }
}