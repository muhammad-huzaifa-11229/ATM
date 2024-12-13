import inquirer from "inquirer";
import chalk from "chalk";
let myBalance = 50000; // Dollars
let myPin = 4455;
console.log(chalk.underline.bgBlueBright("Welcome to ATM"));
async function main() {
    let pinAns = await inquirer.prompt([
        {
            name: "pin",
            type: "number",
            message: "Enter Your pin",
        },
    ]);
    if (pinAns.pin === myPin) {
        console.log(chalk.underline.bgBlue("Correct pin"));
        let operator = await inquirer.prompt([
            {
                name: "operation",
                type: "list",
                message: "Select operation",
                choices: ["Withdraw", "Check Balance", "Fast Cash", "Exit"],
            },
        ]);
        if (operator.operation === "Withdraw") {
            let amount = await inquirer.prompt([
                {
                    name: "myAmount",
                    type: "number",
                    message: "Enter Amount",
                },
            ]);
            if (myBalance >= amount.myAmount) {
                myBalance -= amount.myAmount;
                console.log(chalk.greenBright(`Remaining amount is: ${myBalance}`));
            }
            else {
                console.log(chalk.underline.redBright("Insufficient Balance"));
            }
        }
        else if (operator.operation === "Check Balance") {
            console.log(chalk.yellowBright(`Your Balance is: ${myBalance}`));
        }
        else if (operator.operation === "Fast Cash") {
            const selectedAmount = await selectAmount();
            if (myBalance >= selectedAmount) {
                myBalance -= selectedAmount;
                console.log(chalk.yellow(`Remaining amount is: ${myBalance}`));
            }
            else {
                console.log(chalk.underline.redBright("Insufficient Balance"));
            }
        }
        else if (operator.operation === "Exit") {
            console.log(chalk.underline.bgBlackBright("Thank You For Visiting."));
        }
    }
    else {
        console.log(chalk.italic.bgRedBright("Incorrect pin! Try Again."));
    }
}
// Function to select amount for Fast Cash
async function selectAmount() {
    const response = await inquirer.prompt([
        {
            name: "Select",
            type: "rawlist",
            message: "Please select amount",
            choices: ["5000", "10000", "15000", "20000"],
        },
    ]);
    // Convert the selected amount to a number and return it
    return parseInt(response.Select, 10);
}
main();
