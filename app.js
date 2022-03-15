const express = require('express')

const app = express()

const cookieParser = require('cookie-parser')

app.use(cookieParser())

app.set('view engine', 'ejs')

const fs = require('fs')

app.use(express.urlencoded({extended:true}))

app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/setname', (req, res)=>{
    const uname = req.body.username
    res.set("Set-Cookie", "username="+ uname)
    res.redirect('chat')
})

app.post('/message', (req, res)=>{
    const time= new Date(Date.now())
    const username = req.cookies.username
    const { umessage} = req.body
     const jsonData = fs.readFileSync('./data/message.json', {encoding: 'utf8'})
     const messages = JSON.parse(jsonData)
    messages.push({
        username, umessage, time
    })
    fs.writeFileSync('./data/message.json', JSON.stringify(messages))
    res.redirect('chat' )
})

app.get('/message-list',(req,res)=>{
     const jsonData = fs.readFileSync('./data/message.json', {encoding: 'utf8'})
     const messages = JSON.parse(jsonData)

    res.render('partials/message-list', {messages})
})


// app.get('/chat', (req, res)=>{
//     let ftime= req.query.time
//     const jsonData = fs.readFileSync('./data/message.json', {encoding: 'utf8'})
//      const messages = JSON.parse(jsonData)
//      let result = messages.filter(data=> data.time  == ftime)
//      res.render('partials/message-list', {messages: result})

// })
app.get('/chat', (req, res)=>{

    res.render('pages/chat')
})

app.listen(8000)