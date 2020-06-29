/* Global variables requiring library files.js*/
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const render = require('./lib/htmlRenderer');

/* Calling NPM packages*/
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

/* Creating the "output" directory to store our team.html*/
// const OUTPUT_DIR = path.resolve(__dirname, "output");
// const outputPath = path.join(OUTPUT_DIR, "team.html");

// Start here - above provided
// Set up questions like Readme with function to prompt inquirer followed by .then(functio with if, else if to query manager, intern, Engineer, NaN if completed to fill out HTML template)
// add console.log("something went wrong") to capture errors - have this follow the above if, else if with another else

function createTeam () {
	return inquirer
		.prompt([
			{
				name: 'employeeType',
				type: 'list',
				message: 'Please select an Employee type to add to your team',
				choices: [ 'Manager', 'Engineer', 'Intern' ]
			},
			{
				name: 'employeeName',
				type: 'input',
				message: 'What is the Employee name'
			},
			{
				name: 'employeeId',
				type: 'input',
				message: 'What is the Employee ID'
			},
			{
				name: 'employeeEmail',
				type: 'input',
				message: 'What is the Employee email?'
			}
		])
		.then(function (response) {
			const { employeeType } = response;

			switch (employeeType) {
				case 'Manager':
					createManager(response);
					break;
				case 'Engineer':
					createEngineer(response);
					break;
				case 'Intern':
					createIntern(response);
					break;
				default:
					break;
			}
		});
}

let employees = [];

function createManager (employeeInfo) {
	inquirer
		.prompt([
			{
				name: 'officeNumber',
				type: 'input',
				message: "What is the Manager's office number?"
			},
			{
				name: 'done',
				type: 'confirm',
				Message: 'We are done adding employees'
			}
		])
		.then(function (response) {
			const { employeeName, employeeId, employeeEmail } = employeeInfo;
			const { officeNumber } = response;

			let newManager = new Manager(employeeName, employeeId, employeeEmail, officeNumber);
			employees.push(newManager);
			if (response.done) {
				compileAllEmployees();
			}
			else {
				createTeam();
			}
		});
}

function createEngineer (employeeInfo) {
	inquirer
		.prompt([
			{
				name: 'github',
				type: 'input',
				message: "What is the Engineer's github account?"
			},
			{
				name: 'done',
				type: 'confirm',
				Message: 'Are we done adding employees?'
			}
		])
		.then(function (response) {
			const { employeeName, employeeId, employeeEmail } = employeeInfo;
			const { github } = response;

			let newEngineer = new Engineer(employeeName, employeeId, employeeEmail, github);
			employees.push(newEngineer);
			if (response.done) {
				compileAllEmployees();
			}
			else {
				createTeam();
			}
		});
}

function createIntern (employeeInfo) {
	inquirer
		.prompt([
			{
				name: 'school',
				type: 'input',
				message: "What is the Intern's school?"
			},
			{
				name: 'done',
				type: 'confirm',
				Message: 'Are we done adding employees?'
			}
		])
		.then(function (response) {
			const { employeeName, employeeId, employeeEmail } = employeeInfo;
			const { school } = response;

			let newIntern = new Intern(employeeName, employeeId, employeeEmail, school);
			employees.push(newIntern);
			if (response.done) {
				compileAllEmployees();
			}
			else {
				createTeam();
			}
		});
}

function compileAllEmployees () {
	fs.writeFile('output/team.html', render(employees), function (err, data) {
		console.log('Good job compiling your Team!');
	});
}

createTeam();

// add function prompt and call inquirer.prompt

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
