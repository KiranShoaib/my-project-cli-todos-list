#! /usr/bin/env node
import inquirer from "inquirer";
let todos = [];
let condition = true;
while (condition) {
    let optionAns = await inquirer.prompt({
        name: "option",
        type: "list",
        message: "Please select an option ",
        choices: ["add", "update", "view", "delete", "exit"]
    });
    if (optionAns.option === "add") {
        let addTodos = await inquirer.prompt({
            name: "add",
            type: "input",
            message: "What would you like to add in your todos? :",
            validate: function (input) {
                if (input.trim() === "") {
                    return "Please not enter an empty item.";
                }
                return true;
            }
        });
        if (addTodos.add.trim() !== "") {
            todos.push(addTodos.add);
            todos.forEach(todos => console.log(todos));
        }
    }
    else if (optionAns.option === "update") {
        let updateTodos = await inquirer.prompt({
            name: "update",
            type: "list",
            message: "What would you like to update in your todos?",
            choices: todos.map(item => item)
        });
        let addTodos = await inquirer.prompt({
            name: "add",
            type: "input",
            message: "What would you like to add in your todos? :"
        });
        let newTodos = todos.filter(val => val !== updateTodos.update);
        todos = [...newTodos, addTodos.add];
        todos.forEach(todos => console.log(todos));
    }
    else if (optionAns.option === "view") {
        todos.forEach(todos => console.log(todos));
    }
    else if (optionAns.option === "delete") {
        let deleteTodo = await inquirer.prompt({
            name: "delete",
            type: "list",
            message: "What would you like to delete in your todos?",
            choices: todos.map(item => item)
        });
        let newTodos = todos.filter(val => val !== deleteTodo.delete);
        todos = [...newTodos];
        todos.forEach(todos => console.log(todos));
    }
    else if (optionAns.option === "exit") {
        console.log("Exiting from Program ");
        condition = false;
    }
}
