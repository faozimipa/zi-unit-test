// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "zi-unit-test" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('zi-unit-test.createUnitTest', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		createUnitTest();
		vscode.window.showInformationMessage('createUnitTest from zi-unit-test!');
	});



	context.subscriptions.push(disposable);
}

export function createUnitTest() {
	const editor = vscode.window.activeTextEditor;
	if (editor) {
		const document = editor.document;
		const selection = editor.selection;

		// Get the word within the selection
		const word = document.getText(selection);
		const reversed = word.split('').reverse().join('');
		const result = word + '\n' +
			'// your reserved is here \n' +
			reversed;
		editor.edit(editBuilder => {
			editBuilder.replace(selection, result);
		});
	}
}
// This method is called when your extension is deactivated
export function deactivate() {}
