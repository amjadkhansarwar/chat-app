setInterval( () =>{
    const response= fetch('/message-list')
    response.then( res => res.text())
    .then(content =>{
        document.querySelector('.messages').innerHTML =content
    })

}, 10)