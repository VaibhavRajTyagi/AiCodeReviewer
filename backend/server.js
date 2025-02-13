require('dotenv').config()
const app = require('./src/app')

const def_port = process.env.port || 3000;

app.listen(def_port, () => {
    console.log('Server is running on http://localhost:3000')
})