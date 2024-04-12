const db = require('./db');

const movieSchema = new db.mongoose.Schema({
    movie_name: { type: String, require: true },
    genre: { type: String, require: true },
    image_movie:{ type: String, require: true},
    year: { type: Number, require: true },
    director: { type: String, require: true },
    description: { type: String, require: true },
    traler:{ type: String, require: true}
}, {
    collection: 'movies',
});

let movieModel = db.mongoose.model('movieModel', movieSchema);
module.exports = { movieModel }