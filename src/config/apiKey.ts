import * as vscode from 'vscode';

declare const global: NodeJS.Global & {
    secretKey?: string;
};

export function getSecretKey() {
    const config = vscode.workspace.getConfiguration('ziext');
    const secretKey = config.get<string>('secretKey');

    const result = secretKey;
    return result;
}

export async function setSecretKey() {
    const userInput = await vscode.window.showInputBox({
        prompt: 'Enter Chat GPT secret key'
    });

    if (userInput) {
        const config = vscode.workspace.getConfiguration('ziext');
        config.update('secretKey', userInput);
        console.log('Secret key variable set:', userInput);
    } else {
        console.log('User canceled the input');
    }
}

export async function editSecretKey() {

    const config = vscode.workspace.getConfiguration('ziext');
    const currentVariableValue:string|undefined = config.get('secretkey');
    const userInput = await vscode.window.showInputBox({
        prompt: 'Enter Chat GPT secret key',
        value: currentVariableValue
    });

    if (userInput !== undefined) {
        config.update('secretKey', userInput);
        console.log('Secretkey variable updated:', userInput);
    } else {
        console.log('User canceled the input');
    }
}