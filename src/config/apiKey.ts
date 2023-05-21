import * as vscode from 'vscode';

declare const global: NodeJS.Global & {
    secretKey?: string;
};


export async function setSecretKey() {
    const userInput = await vscode.window.showInputBox({
        prompt: 'Enter Chat GPT secret key'
    });

    if (userInput) {
        global.secretKey = userInput;
        console.log('Secret key variable set:', global.secretKey);
    } else {
        console.log('User canceled the input');
    }
}

export async function editSecretKey() {
    const currentVariableValue = global.secretKey || '';
    const userInput = await vscode.window.showInputBox({
        prompt: 'Enter Chat GPT secret key',
        value: currentVariableValue
    });

    if (userInput !== undefined) {
        global.secretKey = userInput;
        console.log('Secretkey variable updated:', global.secretKey);
    } else {
        console.log('User canceled the input');
    }
}