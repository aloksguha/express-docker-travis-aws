let express = require('express');
let bodyParser = require('body-parser');
let app = express();

app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  



const port = 3000;

let users = [
    { id: '1xyz', name:'Alok'},
    { id: '2xyz', name:'Akshansh'},
    { id: '3xyx', name:'Neena'}
]
app.get('/', (req, res) => {
    res.json({message : 'Welcome to my user application'});
})


app.get('/users', (req,res) => {
    res.json(users.slice())
});

app.get('/users/:id', (req,res) => {
    let id = req.params.id;
    let user = users.find( (ele) => {
        return ele.id == id 
    });
    res.json(user);
});

app.post('/users', (req,res) => {
    if(req.body.name){
        users.push({
            id : Math.random().toString(36).substring(7),
            name : req.body.name
        });
        res.status(201).send();  
    }else{
        res.status(502).json({error:'name not found in supplied data'});
    }  
})

app.delete('/users/:id', (req, res) => {

})

app.listen(port,(success)=>{
 console.log('express server started at '+port);
})

module.exports = app;
