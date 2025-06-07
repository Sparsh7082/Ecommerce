const app = require('./app')
const connectDataBase = require('./db/dataBase')

connectDataBase()

const server = app.listen((process.env.PORT),() => {
    console.log(`server running on ${process.env.PORT}`);
    
})

process.on('unhandledRejection',(err) => {
    console.log('shutting down server for',err.message)
    console.log('shutting down the server')

    process.close(() => {
        process.exit(1)
    })
    
})
