const {connect, connection } = reqquire('mongoose')

const connectionString = process.env.MONGODB_URI || 'mongod://127.0.0.1:27017/socialNetworkDB';

connect(connectionString, {
    userNewUrlParser: true,
    useUnifiedTopology: true,
})

module.exports = connection;