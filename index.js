#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
// Initialize user balance and pin code
let myBalance = 10000;
let myPin = 128934;
// Print welcome message
console.log(chalk.blueBright("\n \tAssalamu Alikum! Welcome to ATM Machine\n \t"));
let pinAnswer = await inquirer.prompt([
    {
        name: "pin",
        type: "number",
        message: chalk.greenBright("Enter your pin code:")
    }
]);
if (pinAnswer.pin === myPin) {
    console.log(chalk.yellowBright("\n \tYour pin is Correct, Login Successfully!\n \t"));
    let operationAns = await inquirer.prompt([
        {
            name: "operation",
            type: "list",
            message: chalk.greenBright("Select an operation:"),
            choices: ["Withdraw Amount", "Check Balance", "Transfer Money", "Add Money"]
        }
    ]);
    if (operationAns.operation === "Withdraw Amount") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "\nEnter the amount to withdraw:\n"
            }
        ]);
        if (amountAns.amount > myBalance) {
            console.log(chalk.red("Insufficient Balance"));
        }
        else {
            myBalance -= amountAns.amount;
            console.log(`${amountAns.amount} Withdraw Successfully`);
            console.log(`Your remaining Balance is: ${chalk.yellow(myBalance)}`);
        }
    }
    else if (operationAns.operation === "Check Balance") {
        console.log(`Your Account Balance is: ${chalk.yellow(myBalance)}`);
    }
    if (operationAns.operation === "Transfer Money") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "\nEnter Amount:\n"
            }
        ]);
        if (amountAns.amount > myBalance) {
            console.log(chalk.red(`You have insufficient balance. Please enter an amount less than Rs.: ${chalk.yellow(myBalance)}`));
        }
        else {
            amountAns.amount <= myBalance;
            console.log(`${amountAns.amount} Transfered Successfully`);
            console.log(`Your remaining Balance is: ${chalk.yellow(myBalance - amountAns.amount)}`);
        }
    }
    if (operationAns.operation === "Add Money") {
        let amountAns = await inquirer.prompt([
            {
                name: "amount",
                type: "number",
                message: "\nAdd Money:\n"
            }
        ]);
        if (amountAns.amount > myBalance) {
            console.log("Money Added Successfully");
        }
        else {
            amountAns.amount + myBalance;
            console.log(`${amountAns.amount} Added Successfully`);
            console.log(`Now your balance increased from 10000 to: ${chalk.yellow(myBalance + amountAns.amount)}`);
        }
    }
}
else {
    console.log(chalk.red("Sorry! you have entered an invalid PIN. Please try again"));
}
