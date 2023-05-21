import * as vscode from 'vscode';

import { postApi } from './api/gptService';
import { editSecretKey, getSecretKey, setSecretKey } from './config/apiKey';
export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "zi-unit-test" is now active!');

	let setSecretKeyDis = vscode.commands.registerCommand('zi-unit-test.setSecretKey', () => {
		if (['', undefined, null].includes(getSecretKey())) {
			setSecretKey().then(() => {
				vscode.window.showInformationMessage('set Secret key from zi-unit-test!');
			});
		} else {
			vscode.window.showInformationMessage('Secret key is already exist from zi-unit-test!');
		}
	})
	context.subscriptions.push(setSecretKeyDis);

	let updateSecretKeyDis = vscode.commands.registerCommand('zi-unit-test.updateSecretKey', () => {
		if (['', undefined, null].includes(getSecretKey())) {
			setSecretKey().then(() => {
				vscode.window.showInformationMessage('Update Secret key from zi-unit-test!');
			});
		} else {
			editSecretKey().then(() => {
				vscode.window.showInformationMessage('Update Secret key from zi-unit-test!');
			});
		}
	})
	context.subscriptions.push(updateSecretKeyDis);


	let disposable = vscode.commands.registerCommand('zi-unit-test.createUnitTest', () => {
		if (['', undefined, null].includes(getSecretKey())) {
			vscode.window.showInformationMessage('Please set Secret key first from zi-unit-test!');
		} else {
			createUnitTest().then(res => {
				vscode.window.showInformationMessage('createUnitTest from zi-unit-test!');
			});
		}
	});
	context.subscriptions.push(disposable);
}

async function createUnitTest() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		const selection = editor.selection;

		const word = document.getText(selection);
		// const reversed = word.split('').reverse().join('');
		await postApi(word).then(response => {
			if (response.error) {
				const result = word;
				editor.edit(editBuilder => {
					editBuilder.replace(selection, result);
				});
			} else {
				const result = word + '\n' +
					'// this is some unit test \n' +
					response.data;
				editor.edit(editBuilder => {
					editBuilder.replace(selection, result);
				});
			}
		})
	}
}
// This method is called when your extension is deactivated
export function deactivate() { }
