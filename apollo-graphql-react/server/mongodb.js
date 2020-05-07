const fastifyPlugin = require('fastify-plugin')
const { MongoClient, ObjectID } = require('mongodb')

const url = "mongodb://localhost:27017"
const config = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}
let _client = null
let _db = null
let _collection = null

const init = async (fastify, options) => {
    if (_client) return _client
    _client = await MongoClient.connect(url, config)

    if (!_db) _db = _client.db("test")
    fastify.decorate('mongo', _db)
}

const getDbContext = async () => {
    if (!_client) await init()
    return _db
}

const getDefaultCollection = async () => {
    if (_collection) return _collection
    await getDbContext()
    _collection = _db.collection("test")
    return _collection
}

const toObjectId = idInString => new ObjectID(idInString)

exports.initMongodb = fastifyPlugin(init)
exports.toObjectId = toObjectId
exports.getDefaultCollection = getDefaultCollection