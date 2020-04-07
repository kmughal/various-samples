export default (req, res) => {
    const query = req.query
    if (query.username === "khurram" && query.password === "123") {
        res.statusCode = 200
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ message: 'welcome khurram' }))
        return
    } else {
        res.statusCode = 401
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify({ message: 'not authorized' }))
    }
}