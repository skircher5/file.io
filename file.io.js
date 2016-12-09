/**
 *   @author Everett Kircher
 *   @version 0.0.2
 *   @summary Project 6
 *   @todo
 */

"use strict";
const PROMPT = require('readline-sync');
const IO = require('fs');  // For file I/O
const LOWEST_PIN = 1000, LARGEST_PIN = 9999;

let continueResponse;
let ATM = [];
let balance = 2000;

function main() {
    setContinueResponse();
    while (continueResponse === 1) {
        editAccount();
        setContinueResponse();

    }
}

main();

function setContinueResponse() {
    if (continueResponse) {
        continueResponse = -1;
        while (continueResponse !== 0 && continueResponse !== 1) {
            continueResponse = Number(PROMPT.question(`\nDo you want to continue? [0=no, 1=yes]: `));
        }
    } else {
        continueResponse = 1;
    }
}

function editAccount() {
    let choice, whichAccount;
    let pin = 1234;
    while (typeof choice === 'undefined' || choice !== 0 && choice !== 1) {
        choice = Number(PROMPT.question(`Do you want to manage an existing account or create a new one? [0=edit, 1=new]: `));
    }
    if (choice === 0) {
        while (typeof whichAccount === 'undefined' || whichAccount < pin || whichAccount > pin || isNaN(whichAccount)) {
            whichAccount = Number(PROMPT.question(`Please enter personal identification PIN number: `));
        }
        accountBalance();

    } else {
        let newAccount = ATM.length;
        insertIntoArray(newAccount);
    }
}

function accountBalance() {
    let money, choice;
    while (typeof choice === 'undefined' || choice !== 0 && choice !== 1) {
        choice = Number(PROMPT.question(`\nwould you like to withdraw or deposit money: [withdraw = 1, deposit = 0]`));
        if (choice === 0) {
            setDeposit();

        } else {
            setWithdraw();
        }
    }
}

function insertIntoArray(pin) {
    const COLUMNS = 2, ATM_MACHINE = 0;
    ATM[pin] = [];
    for (let i = 0; i < COLUMNS; i++) {
        if (i === ATM_MACHINE) {
            while (typeof ATM[pin][i] === 'undefined' || (ATM[pin][i]) < 1) {
                ATM[pin][i] = Number(PROMPT.question(`\nPlease enter account balance: `));
            }
        } else {
            while (typeof ATM[pin][i] === 'undefined' || isNaN(ATM[pin][i]) || ATM[pin][i] < LOWEST_PIN || ATM[pin][i] > LARGEST_PIN) {
                ATM[pin][i] = Number(PROMPT.question(`\nPlease enter personal identification PIN number: `));
                if (!isNaN(ATM[pin][i]) || ATM[pin][i] < LOWEST_PIN || ATM[pin][i] > LARGEST_PIN) {
                }
            }
        }
    }
}


function setDeposit() {
    let newBalance;
    while (typeof newBalance === 'undefined' || newBalance < 0 || newBalance > 10000) {
        newBalance = Number(PROMPT.question(`\nPlease insert cash:`));
        balance = newBalance + balance;
        console.log(`\n your new balance is: ${balance}`)
    }
}

function setWithdraw() {
    let withdraw;
    while (typeof withdraw === 'undefined' || withdraw < 0 || withdraw > 10000) {
        withdraw = Number(PROMPT.question(`\n how much would you like to withdraw:`));
        balance = balance - withdraw;
        console.log(`\nyour new balance is ${balance}`)

    }
}
