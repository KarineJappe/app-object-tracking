const express = require('express')
const bodyParser = require('body-parser')
const server = express()
const { rastro } = require('rastrojs');

server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())

server.get('/tracking/:id', async (req, res) => {
    try {
        // 'PS240323035BR'
        const response = await rastro.track(req.params.id)
        res.json({"message": response })
    }catch (error) {
        console.log(error)
    }
})

const port = process.env.PORT || 3000

server.listen(port, () => {
    console.log(`Server linsten port ${port}`)
})

