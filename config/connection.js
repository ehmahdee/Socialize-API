const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:2701//socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = mongoose.connection;