import { resolve, join } from 'path';
import fs from 'fs';
import changeCase from 'change-case';
import sanitizeFilename from 'sanitize-filename';
import 'colors';
import template from './template';
import paths from '../../config/paths';

export default function({
	name,
}) {
	const safeName = sanitizeFilename(name);
	const directory = changeCase.paramCase(safeName);
	const className = `${changeCase.pascalCase(safeName)}View`;
	const basename = `${className}.js`;
	const path = resolve(paths.views, directory);
	const filename = join(path, basename);
	const viewExists = fs.existsSync(path);

	if (viewExists) {
		throw new Error(
			`View "${className}" directory "${path}" already exists, please choose another name` +
			'or delete existing directory',
		);
	}

	const scope = { // eslint-disable-line no-unused-vars
		name: safeName,
		directory,
		className,
		basename,
		path,
		filename,
	};

	const templateFilename = join(paths.buildTemplates, 'view.tpl');
	const viewContents = template(templateFilename, scope);

	fs.mkdirSync(path);
	fs.writeFileSync(filename, viewContents, 'utf8');

	console.log(`generated ${className.bold} in ${filename.bold}`);
}
