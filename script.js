




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
                if (moreMembers === "yes") {
                    addMember();
                } else {
                    finishHtml();
                }
            });
            
        });
    });
}

