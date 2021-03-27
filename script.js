

const inquirer = require('inquirer');
const fs = require('fs');

const generateHTML = (answers) =>
  `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
  <title>Team Members</title>
</head>

<body>
  <div class="container-fluid">
    <div class="row">
      <div class = "col-12 team-heading">
        <h1 class = "text-center"> Team Members </h1>
      </div>
    </div>
  </div>
  
  <div class = "container">
    <div class = "row">
      <div class = "team-area col-12 justufy-content-center">
        <div class = "card employee-card">

  <div class = "card-header">
    <h2 class= "card-title"> Name:${answers.name} </h2>
  </div>

  <div class = "card-body">
    <ul class = "list-group">
      <li class = "list-group-item"> ID: ${answers.id} </li>
      <li class = "list-group-item"> Email: ${answers.email} </li>
      <li class = "list-group-item"> Office Number: ${answers.office} </li>
    </ul>
  </div>

  <div class = "card-header">
    <h2 class= "card-title"> Name:${answers.intern} </h2>
  </div>

  <div class = "card-body">
    <ul class = "list-group">
      <li class = "list-group-item"> ID: ${answers.internId} </li>
      <li class = "list-group-item"> Email: ${answers.emailI} </li>
      <li class="list-group-item">GitHub: ${answers.githubI}</li>
    </ul>
  </div>




</div>
</body>
</html>`;

inquirer
  .prompt([
    {
      type: 'input',
      name: 'name',
      message: 'Who is the Manager?',
    },
    {
      type: 'input',
      name: 'id',
      message: 'ID number of Manager?',
    },
    {
      type: 'input',
      name: 'email',
      message: 'Manager Email?',
    },

    {
      type: 'input',
      name: 'office',
      message: 'Manager office number?',
    },

    {
      type: 'list',
      message: 'Woul you like to add a team member?',
      name: 'addMember',
      choices: ['Yes', 'No'],
    },

    {
      type: 'list',
      message: 'Is this member an Intern or an Engineer?',
      name: 'addMemberType',
      choices: ['Intern', 'Engineer'],
    },

    {
      type: 'input',
      name: 'intern',
      message: 'Name of the intern',
    },

    {
      type: 'input',
      name: 'internId',
      message: 'ID of the intern',
    },

    {
      type: 'input',
      name: 'emailI',
      message: 'email of the intern',
    },


   

    {
      type: 'input',
      name: 'githubI',
      message: 'Intern GitHub profile name',
    },
    
  ])
  .then((answers) => {
    const htmlPageContent = generateHTML(answers);

    fs.writeFile('index.html', htmlPageContent, (err) =>
      err ? console.log(err) : console.log('Successfully created index.html!')
    );
  });
