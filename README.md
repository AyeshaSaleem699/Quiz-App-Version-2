# Quiz-App-Version-2
Simple Quiz app that has 3 question pages, 1 introduction and 1 result page. 
It uses sample.jade file as templeting engine to render all the 5 pages. 
Server.js contains all the routes

# New additions/changes from version 1:
* Basic css styling
* Introduction page
* Questions, options and answers stored in a Json file
* Initially empty html pages are rendered from sample.jade file
* app.js that adds questions and options on runtime and checks for answers
* New Page is only displayed if all questions are answered.
* If all questions are not answered, user is prompted with an alert.
* result.json file that is initially empty and changes when options form each page are submitted
* server.js file that handles routing and populates result.json file
* Result is displayed with total question, correctly answered question, correct options, selected options for each page and total marks of the quiz
* Once comleting the quiz it can be retaken again.
