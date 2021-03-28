




const inquirer = require("inquirer");
const fs = require("fs");

const Manager = require("./class/Manager");
const Engineer = require("./class/Engineer");
const Intern = require("./class/Intern");
const Employee = require("./class/Employee");
//creating the variables of the team members, refering to a class file

const employees = [];

function initApp() {
    startHtml();
    addMember();
}
//start and add member

function addMember() {
    inquirer.prompt([{
      //target inquirer
        message: "Enter the name of a team member",
        name: "name"
    },
    {
        type: "list",
        message: "Enter the role of the team member",
        choices: [
            "Engineer",
            "Intern",
            "Manager"
        ],
        name: "role"
    },
    {
        message: "Enter team member id",
        name: "id"
    },
    {
        message: "Enter the email address of the team member",
        name: "email"
    }])
    //questions to ask for info

    //function to ask based on role
    .then(function({name, role, id, email}) {
        let roleInfo = "";

        if (role === "Engineer") {
            roleInfo = "GitHub username";
        } 
        else if (role === "Intern") {
            roleInfo = "school name";
        } 
        else {
            roleInfo = "phone number";
        }

        inquirer.prompt([{
            message: `Enter team member role ${roleInfo}`,
            name: "roleInfo"
        },
        {
            type: "list",
            message: "Are there more team members?",
            choices: [
                "Yes",
                "No"
            ],
            name: "moreMembers"
        }])
        .then(function({roleInfo, moreMembers}) {
            let newMember;
            if (role === "Engineer") {
                newMember = new Engineer(name, id, email, roleInfo);
            } 
            else if (role === "Intern") {
                newMember = new Intern(name, id, email, roleInfo);
            } 
            else {
                newMember = new Manager(name, id, email, roleInfo);
            }

            employees.push(newMember);
            addHtml(newMember)
            .then(function() {
                if (moreMembers === "Yes") {
                    addMember();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}


//html portion

//generate html document
function startHtml() {
  const html = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <title>Team Profile</title>
  </head>

  <body>
      <div class="container">
          <div class="row">`;
  fs.writeFile('index.html', html, function(err) {
      if (err) {
          console.log(err);
      }
  });

  console.log("start");
}

//adding a member to the html document
function addHtml(member) {

  return new Promise(function(resolve, reject) {

      const name = member.getName();
      const role = member.getRole();
      const id = member.getId();
      const email = member.getEmail();

      let data = "";

      //eningeer needs a specific question, need to make an if statement for it 
      if (role === "Engineer") {
          const gitHub = member.getGithub();
          data = 
          `<div class="col-6">
          <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Engineer</h5>
              <ul class="list-group list-group-flush">
                  <li class="list-group-item">ID: ${id}</li>
                  <li class="list-group-item">Email Address: ${email}</li>
                  <li class="list-group-item">GitHub: ${gitHub}</li>
              </ul>
            </div>
          </div>`;

      } 
      //if statement for intern
      else if (role === "Intern") {
          const school = member.getSchool();
          data = 
          `<div class="col-6">
          <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Intern</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">School: ${school}</li>
              </ul>
            </div>
          </div>`;
      } 
      
      else {
          const officePhone = member.getOfficeNumber();
          data = `<div class="col-6">
          <div class="card mx-auto mb-3" style="width: 18rem">
            <h5 class="card-header">${name}<br /><br />Manager</h5>
              <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${id}</li>
                <li class="list-group-item">Email Address: ${email}</li>
                <li class="list-group-item">Office Phone: ${officePhone}</li>
              </ul>
            </div>
          </div>`
      }

      console.log("add")
      fs.appendFile('index.html', data, function (err) {
          if (err) {
              return reject(err);
          };
          return resolve();
      });
  });
}

function finishHtml() {
  const html = ` </div>
  </div>

  </body>
  </html>`;

  fs.appendFile('index.html', html, function (err) {
      if (err) {
          console.log(err);
      };
  });
  console.log("done")
}

initApp();



