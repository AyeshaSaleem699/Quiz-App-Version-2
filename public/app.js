window.onload = function(){
    var pagename = document.getElementById("pagename").innerHTML;
    var pinstruction = document.getElementById("instruction");
    var mainContainer = document.getElementById("questions-list");
    if(pagename == "Instructions: "){
        var instruction = [
            "quiz contains 3 pages, 10 MCQ questions each.",
            "page 1 is about computer science fundamentals",
            "page 2 is about data structures and algorithms",
            "page 3 is about SQL",
            "Mark answers carefully, once moved to next page you cannot return to previous page"
        ]
    for(var i = 0; i < instruction.length; i++){
        var newinstruction = document.createElement("li");
        newinstruction.innerHTML = instruction[i];
        mainContainer.appendChild(newinstruction);
    }
    var wishluck = document.createElement("h4");
    wishluck.innerHTML = "GOOD LUCK!!!!!";
    mainContainer.appendChild(wishluck); 
    }
    else if(pagename == "Result: "){
        fetch('result.json')
        .then(function (response) 
        {
            return response.json();
        })
        .then(function (data) 
        {
            
            displayResults(data);
        })
        .catch(function (err) 
        {
            console.log(err);
        });
        function displayResults(data){
            var totalCorrectAnswerd = 0;
            var totalMarks = 0;
            for(var i=0;i<3;i++){
                var newReult = document.createElement("div");
                var pageNumber = data.table[i].page_Number;
                var correctAnswers = data.table[i].Correct_Answers_List;
                var selectedAnswers = data.table[i].Seleceted_Answers_List;
                var noOfCorrectAnswers = data.table[i].correctAnswerdQuestions;
                var noOfWrongAnswers = data.table[i].wrongAnswerdQuestions;
                totalCorrectAnswerd+=noOfCorrectAnswers;
                newReult.innerHTML = "<br><b>Page no:</b> "+pageNumber+"<br><b>Correct Answers:</b> <br>"+correctAnswers+"<br><b>Selected Answers: </b><br>"+selectedAnswers+"<br><b>No of Correct Answers:</b>"+noOfCorrectAnswers+"<br><b>No of Wrong Answers:</b>"+noOfWrongAnswers+"<br><br>";
                pinstruction.appendChild(newReult);
            }
            totalMarks = totalCorrectAnswerd;
            var finResult = document.createElement("div");
            finResult.innerHTML = "<br><b>Total Correct Answered Questions</b> "+totalCorrectAnswerd+"<br><b>Total Marks:</b>"+totalMarks+"/30"+"<br><br>";
            pinstruction.appendChild(finResult);
        }
    }
    else{
        var qdata;
        var pageno = parseInt(document.getElementById("pagename").innerHTML.substring(5, 6), 10) - 1;
        fetch('questions&answers.json')
        .then(function (response) 
        {
            return response.json();
        })
        .then(function (data) 
        {
            qdata = data;
            appendData(data);
        })
        .catch(function (err) 
        {
            console.log(err);
        });

    
        function appendData(data) 
        {
            for (var i = 0; i < data[pageno].length; i++) 
            {
                var newQuestion = document.createElement("li");
                newQuestion.innerHTML = data[pageno][i].question ;
                mainContainer.appendChild(newQuestion);
                for(var j = 0; j < 4; j++)
                {    
                    var option = document.createElement("input");
                    option.type = "radio";
                    option.name = "option"+i;
                    option.id = "optionradio"+i;
                    option.required = true;
                    var optionLabel = document.createElement("label");
                    optionLabel.for = "optionradio"+i;
                    optionLabel.innerHTML = data[pageno][i].options[j] + "<br>";
                    option.value = data[pageno][i].options[j];
                    mainContainer.appendChild(option);
                    mainContainer.appendChild(optionLabel);
                }
                var linebreak = document.createElement("div")
                linebreak.innerHTML = "<br>"
            mainContainer.appendChild(linebreak);  
            }
        }

        function allQuestionsAnswered()
        {
            for(var x = 0; x < 10; x++)
            {
                var Qno = document.getElementsByName("option"+x);
                if(!(Qno[0].checked || Qno[1].checked || Qno[2].checked || Qno[3].checked))
                {
                    alert("Question "+ (x+1) +" not answered...");
                }
            }
        }

        
        var nxtbtn = document.getElementById("btn");
        nxtbtn.addEventListener("click", allQuestionsAnswered);
    }
};

