const fs = require("fs");
const path = require("path");
const chalk = require("chalk");
const { parse } = require("react-docgen");
const chokidar = require("chokidar");

const paths = {
	examples: path.join(__dirname, "../src/docs", "examples"),
	components: path.join(__dirname, "../src", "components"),
	output: path.join(__dirname, "../config", "componentData.js")
};

const enableWatchMode = process.argv.slice(2).includes("--watch");
if (enableWatchMode) {
	chokidar
		.watch([paths.components, paths.examples])
		.on("change", (event, path) => build(paths));
} else build(paths);

function build(paths) {
	const errors = [];
	const componentData = getDirectories(paths.components).map(componentName => {
		try {
			return getComponentData(paths, componentName);
		} catch (e) {
			errors.push(
				`error occured in gettting ${componentName} , ${JSON.stringify(e)}`
			);
		}
	});

	writeFile(
		paths.output,
		`module.exports = ${JSON.stringify(errors.lenght ? errors : componentData)}`
	);
}

function getDirectories(filePath) {
	return fs
		.readdirSync(filePath)
		.filter(f => fs.statSync(path.join(filePath, f)).isDirectory());
}

function getComponentData(paths, name) {
	const code = readFile(path.join(paths.components, name, `${name}.js`));
	const info = parse(code);
  // console.log(JSON.stringify(info),paths.examples)
	var result = {
		name,
		description: info.description,
		code,
		examples: getExamplesData(paths.examples, name),
		props : info.props
	};

	return result;
}

function readFile(filePath) {
	return fs.readFileSync(filePath, { encoding: "utf-8" });
}

function getExamplesData(examplesPath, name) {
	console.log("example path" ,examplesPath)
 
	const examples = getExamplesFile(examplesPath, name);
	
	if (!Array.isArray(examples)) return [];
	return examples.map(file => {
		let filePath = path.join(examplesPath, name, file);
		let code = readFile(filePath);
		let info = parse(code);
		return {
			name: file.slice(0, -3),
			code,
			description: info.description
		};
	});
}

function getExamplesFile(examplesPath, name) {
	try {
		const exampleFiles = getFiles(path.join(examplesPath, name));
		return exampleFiles;
	} catch (e) {
		console.log(e);
		chalk.default.red(`no examples found for ${name} , path: ${examplesPath}`);
		return [];
	}
}

function getFiles(filePath) {

//	if (!fs.exists(filePath)) return [];
	return fs
		.readdirSync(filePath)
		.filter(f => fs.statSync(path.join(filePath, f)).isFile());
}

function writeFile(path, message) {
	fs.writeFileSync(path, message, err => {
		err ? chalk.default.red(err) : chalk.default.green("component saved!");
	});
}
