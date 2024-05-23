const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mean-employees', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;
