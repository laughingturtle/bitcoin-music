const express = require('express');
var bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(__dirname + '/../dist/'));
//app.get('/', (req,res) => res.send('What up?!'));



app.listen(port, () => console.log(`Example app listening on port ${port}!`));
