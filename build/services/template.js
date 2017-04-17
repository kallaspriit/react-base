import fs from 'fs';
import changeCase from 'change-case';

export default function(templateFilename, data) {
	const caseVariants = [
		'camel',
		'constant',
		'dot',
		'header',
		'lower',
		'no',
		'param',
		'pascal',
		'path',
		'sentence',
		'snake',
		'swap',
		'title',
		'upper',
	];
	const scope = {
		...data,
	};

	Object.keys(scope).forEach((scopeKey) => {
		const original = scope[scopeKey];

		delete scope[scopeKey];

		scope[scopeKey] = {
			original,
		};

		caseVariants.forEach((caseVariant) => {
			scope[scopeKey][caseVariant] = changeCase[`${caseVariant}Case`](original);
		});
	});

	const templateContents = fs.readFileSync(templateFilename, 'utf8');

	// chill, only on dev server..
	return eval(`\`${templateContents}\``); // eslint-disable-line no-eval
}
