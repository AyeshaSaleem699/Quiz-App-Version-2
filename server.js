var express = require('express');
var app = express();
const fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

let rawdata = fs.readFileSync('public/questions&answers.json');
let QnAdata = JSON.parse(rawdata);

app.set("view engine","jade")

function getdata(page_no,req){
    let Seleceted_Answers_List = [];
    let Correct_Answers_List = [];
    var correctAnswerdQuestions = 0;
    var wrongAnswerdQuestions = 0;
    Seleceted_Answers_List.push(req.body.option0);
    Seleceted_Answers_List.push(req.body.option1);
    Seleceted_Answers_List.push(req.body.option2);
    Seleceted_Answers_List.push(req.body.option3);
    Seleceted_Answers_List.push(req.body.option4);
    Seleceted_Answers_List.push(req.body.option5);
    Seleceted_Answers_List.push(req.body.option6);
    Seleceted_Answers_List.push(req.body.option7);
    Seleceted_Answers_List.push(req.body.option8);
    Seleceted_Answers_List.push(req.body.option9);
   
    for(var j = 0; j<10;j++){     
        correctans = QnAdata[page_no][j].answer;
        Correct_Answers_List.push(correctans);
        if(Seleceted_Answers_List[j] == correctans){
            correctAnswerdQuestions++;
        }
    }
    wrongAnswerdQuestions = 10- correctAnswerdQuestions; 
    page_no += 1;
    if(page_no == 1){
        var obj = {table: []};
        var json = JSON.stringify(obj);
        fs.writeFile('public/result.json', json, 'utf8', (err) => {
            if (err) throw err;
        });
    }

    fs.readFile('public/result.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data); //now it an object
        obj.table.push({page_Number: page_no,
            Correct_Answers_List: Correct_Answers_List, 
            Seleceted_Answers_List: Seleceted_Answers_List,
            correctAnswerdQuestions: correctAnswerdQuestions,
            wrongAnswerdQuestions: wrongAnswerdQuestions}); //add some data
        json = JSON.stringify(obj,null, 2); //convert it back to json
        fs.writeFile('public/result.json', json, 'utf8', (err) => {
            if (err) throw err;
            //console.log('Data written to file');
        }); // write it back 
    }});
}

app.get("/",function(req,res){
    res.render('sample',{intro:"Instructions: ",getaction:"part1",getmethod:"post",getinstruction:"Read following instructions brfore starting the quiz",getvalue:"Start"});
});

app.post('/part1', function (req, res) {
    res.render('sample',{intro:"Part 1: Computer Fundamentals",getaction:"part2",getmethod:"post",getinstruction:"Select the option for the following questions.",getvalue:"Next"});
});

app.post('/part2', function (req, res) {
    getdata(0,req);
    res.render('sample',{intro:"Part 2: Data Structures and Algorithms",getaction:"part3",getmethod:"post",getinstruction:"Select the option for the following questions.",getvalue:"Next"});
});

app.post('/part3', function (req, res) {
    getdata(1,req);
    res.render('sample',{intro:"Part 3: SQL",getaction:"resultpage",getmethod:"post",getinstruction:"Select the option for the following questions.",getvalue:"Next"});
});

app.post('/resultpage', function (req, res) {
    getdata(2,req);
    res.render('sample',{intro:"Result: ",getaction:"/",getmethod:"get",getinstruction:"Your Scroreboard is as follows",getvalue:"Restart"});
});

var server = app.listen(5000, function () {
    console.log('Node server is running..');
});

