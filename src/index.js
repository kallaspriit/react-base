import styles from './gfx/main.scss';

// TODO add support for multiple html files
require(`./index.html`);

/*
const htmlFiles = require.context("./", true, /^\.\/.*\.html$/);

if (module.hot) {
    htmlFiles.keys().forEach((filename) => {
        console.log('dynamic require context', filename);

        module.hot.accept(filename, () => {
            console.log(`require ${filename}`);

            const contents = require(`bundle!${filename}`);

            console.log(`reloading ${filename}`, contents);

            // document.body.innerHTML = contents;

            return false;
        });
    });
}
*/

// reload HTML files
if (module.hot) {
    module.hot.accept("./index.html", () => {
        const contents = require('./index.html');

        console.log('reloading index.html', contents, arguments);

        document.body.innerHTML = contents;

        return false;
    });
}
