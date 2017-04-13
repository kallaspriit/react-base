/* eslint-disable no-console */

import glob from 'glob';
import path from 'path';
import fs from 'fs';
import changeCase from 'change-case';
import 'colors';
import paths from '../../config/paths';

export function generateViewsIndex(callback) {
	// glob for view directories
	glob(`${paths.views}/*/*View.js`, (globError, files) => {
		if (globError) {
			console.error(`${'indexer glob failed'.red} (${globError})`);

			callback(globError, false);

			return;
		}

		// map the directories to an array of objects containing view info
		const views = files.map((filename) => {
			const viewName = path.basename(filename, '.js');
			const viewDirectory = path.basename(path.dirname(filename));
			// const viewDirectory = path.basename(directory);
			// const viewName = `${changeCase.pascalCase(viewDirectory)}View`;

			return {
				name: viewName,
				directory: viewDirectory,
			};
		});

		// start the index file contents
		const filename = path.join(paths.views, 'index.js');
		let contents = '';

		// build the imports
		views.forEach((view) => {
			contents += `import ${view.name} from './${view.directory}/${view.name}';\n`;
		});

		// add a newline before export
		contents += '\n';
		contents += 'export default {\n';

		// build the exports
		views.forEach((view) => {
			contents += `\t'${view.directory}': ${view.name},\n`;
		});

		contents += '};\n';

		fs.readFile(filename, 'utf8', (readError, existingContents) => {
			if (!readError && contents === existingContents) {
				// console.log(`index ${filename.bold} was not changed`);

				if (callback) {
					callback(readError, false);
				}

				return;
			}

			fs.writeFile(filename, contents, (writeError) => {
				if (writeError) {
					console.error(`writing index ${filename.bold} failed (${writeError})`);

					if (callback) {
						callback(writeError, false);
					}

					return;
				}

				if (callback) {
					callback(null, true);
				}

				console.log(`generated views index: ${filename.bold}`);
			});
		});
	});
}
