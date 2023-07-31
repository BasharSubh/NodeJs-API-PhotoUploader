const mongoose = require('mongoose')

const connection = async () => {

    try {  
        const connect = await mongoose.connect(process.env.CONNECTION_DB)
        console.log(`database name: ${connect.connection.name} and the host: ${connect.connection.host}`)
        
    } catch (error) {
        console.log(error)
        process.exit(1)
        
    }

}

module.exports = connection