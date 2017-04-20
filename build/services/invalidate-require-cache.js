export default function(pattern) {
	Object.keys(require.cache).forEach((filename) => {
		const isMatch = pattern.test(filename);

		if (isMatch) {
			// console.log(`invalidated require cache for ${filename.bold}`);

			delete require.cache[filename];
		}
	});
}
