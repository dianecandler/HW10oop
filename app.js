/* Global variables requiring library files.js*/
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const render = require('./lib/htmlRenderer');

/* Calling NPM packages*/
const inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');

/* Created the "output" directory to store our team.html*/

// Start here - above provided
// Diane Candler - Homework 11

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
// Set up questions with function to prompt inquirer followed by .then(functio with if, else if to query manager, intern, Engineer, NaN if completed to fill out HTML template)
// Switched from if, else to switch, case
// Add console.log("something went wrong") to capture errors
// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!
