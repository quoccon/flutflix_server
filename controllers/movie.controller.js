const myMdMovie = require('../model/movie');
var msg = "";
exports.getAllMovie = async (req, res) => {
    try {
        const movies = await myMdMovie.movieModel.find();
        if (!movies) {
            msg = "Danh sách phim trống";
        } else {
            res.render('../views/home/home.ejs', { movies: movies });
        }
    } catch (error) {
        console.log("Đã có lỗi khi lấy danh sách phim : " + error);
    }

}

exports.addMovie = async (req, res) => {
    try {
        const { movie_name, genre, image_movie, year, director, description, trailer } = req.body;

        // Kiểm tra xem phim đã tồn tại trong cơ sở dữ liệu chưa
        const existingMovie = await myMdMovie.movieModel.findOne({ movie_name: movie_name });
        if (existingMovie) {
            msg = "Phim đã tồn tại trong cơ sở dữ liệu";
            // Trả về thông báo hoặc xử lý phù hợp với trường hợp này
        } else {
            // Nếu phim chưa tồn tại, thêm mới vào cơ sở dữ liệu
            const newMovie = new myMdMovie.movieModel({
                movie_name,
                genre,
                image_movie,
                year,
                director,
                description,
                trailer
            });
            await newMovie.save();
            msg = "Thêm phim thành công";
            // Trả về thông báo hoặc xử lý phù hợp với trường hợp này
        }
    } catch (error) {
        console.log("Đã có lỗi khi thêm phim mới: " + error);
    }
}
