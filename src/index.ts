#!/usr/bin/env electron

const d = new Date();
const logfile: string = `${__dirname}/log/log_${d.getDate()}.${
	d.getMonth() + 1
}.${d.getFullYear()}.txt`;

const watchClipboard = require('watchClipboard');
var readline = require('readline');

const fs = require('fs');

const chalk = require('chalk');

const { clipboard } = require('electron');

const yargs = require('yargs');
const { argv } = yargs;

let json;

fs.appendFileSync(
	`${logfile}`,
	`\n\n##--- PROGRAM START ---##\nDate & Time: ${new Date().toString()}\n#- OUTPUT BEGIN -#\n`
);

function run(json: any) {
	json = JSON.parse(json);

	if (typeof json.addebug_videoId != typeof undefined) {
		let output: string = `ID: ${json.addebug_videoId}
    Links:
        Player: https://www.youtube.com/watch?v=${json.addebug_videoId}
        Embed: https://www.youtube.com/embed/${json.addebug_videoId}`;

		fs.appendFileSync(`${logfile}`, output + '\n');

		return output;
	} else {
		throw new Error('No ID');
	}
}

if (argv['ඞ']) {
	//  i wanted to put an easter egg here but uhh shit died
	throw new Error(
		'Sorry, but the unicode symbol for the among us character (ඞ) aswell as all the other unicode characters for this are not supported in a terminal, therefor it doesnt work. Sorry!'
	);
} else if (argv.watch || argv.w) {
	let output = `Please copy the debug info. It will load it from your clipboard.
Since you specified the watch flag, it will auto-update to the latest information.
----------------------------------------------------------------`;
	console.log(output);
	fs.appendFileSync(`${logfile}`, output + '\n');
	process.stdout.write(`Current URL: None`);

	watchClipboard.watchChanges((data: string) => {
		let e = run(data);
		readline.clearLine(process.stdout);
		readline.cursorTo(process.stdout, 0);
		console.log(
			`${e}\n----------------------------------------------------------------`
		);
		fs.appendFileSync(
			`${logfile}`,
			`----------------------------------------------------------------` + '\n'
		);
		setTimeout(() => {
			json = JSON.parse(data);
			process.stdout.write(
				`Current URL: https://www.youtube.com/watch?v=${json.addebug_videoId}`
			);
		}, 1);
	});
} else {
	try {
		console.log(`${run(clipboard.readText())}`);
		process.exit(0);
	} catch (e) {
		console.log(
			'Please copy the debug info. It will load it from your clipboard.'
		);
		fs.appendFileSync(
			`${logfile}`,
			'Please copy the debug info. It will load it from your clipboard.' + '\n'
		);

		function retry() {
			try {
				fs.appendFileSync(
					`${logfile}`,
					'----------------------------------------------------------------' +
						'\n'
				);
				let x = run(clipboard.readText());
				console.log(
					`----------------------------------------------------------------\n${x}`
				);
				process.exit(0);
			} catch (e) {
				setTimeout(() => {
					retry();
				}, 250);
			}
		}
		setTimeout(() => {
			retry();
		}, 250);
	}
}

module.exports = {};
