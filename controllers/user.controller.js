const myMd = require('../model/user');
var msg = ""

exports.register = async (req, res, next) => {
    const { username, email, phone, password } = req.body;
    try {
        const existingUser = await myMd.userModel.findOne({ email });

        if (existingUser) {
            msg = "Email đã được đăng ký";
        } else if (!username || !email || !phone || !password) {
            msg = "Vui lòng nhập đầy đủ thông tin";
        } else {
            const newUser = new myMd.userModel({
                username,
                email,
                phone,
                password,
                wishlist: [],
            });
            await newUser.save();
            msg = "Đăng ký người dùng thành công";
        }
    } catch (error) {
        console.log("Đã xảy ra lỗi khi xử lý yêu cầu của bạn! : " + error);
    }
    res.render('auth/register', { msg: msg });
}

exports.login = async (req, res, next) => {
    if (req.method === 'POST') {
        try {
            const { email, password } = req.body;
            const user = await myMd.userModel.findOne({ email: email });
            
            if (!user) {
                msg = "Người dùng không tồn tại";
            } else if (user.role === 'user') {
                msg = "Người dùng không có quyền truy cập";
            } else if (user.password !== password) {
                msg = "Sai mật khẩu, vui lòng thử lại";
            } else {
                console.log("Đã đăng nhập vào user " + user._id);
                setTimeout(() => {
                    res.redirect('/getAllMovie');
                }, 2000);
                return; // Tránh gửi nhiều phản hồi
            }
        } catch (error) {
            console.log("Đã xảy ra lỗi khi xử lý yêu cầu đăng nhập của bạn: " + error);
        }
    }
    res.render('auth/login', { msg: msg });
};

