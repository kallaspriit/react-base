# React application base
**Minimalistic react application structure with development server and build system.**

## Technologies
- ES2015+ (Babel)
- React
- Redux
- GraphQL server & client
- SASS (SCSS)
- Webpack + hot loader
- ESLint


## Features
- ES2015 codebase.
- Built-in GraphQL server.
- React components and reducers hot reload.
- GraphQL schema hot-reload in development.
- Production build system and server providing both the static application as well as GraphQL server.
- View generator and indexer in dev mode.
- Linting (ESLint).


## Setup
- run `npm install` to install all dependencies.
- run `npm start` to start the development server or `npm build` to build the production version in */dist* directory.
- open [http://localhost:3000](http://localhost:3000) in your browser (if it didn't open automatically).


## Command line
- `npm start` - start the development server along with the GraphQL endpoint on port 3000 (provides hot-reload, generators).
- `npm run build` - build the production version in */dist* directory.
- `npm run production` - serves the production version along with the GraphQL endpoint from the */dist* directory (build it first!).
- `npm run lint` - check your code for issues and style rules.


## Configuring
[node config](https://github.com/lorenwest/node-config) is used to manage application configuration.
- base configuration is defined in `config/default.json`.
- one can create environment-specific configurations such as `config/production.json`.
- one can also create host-specific configurations such as `config/example.json` for http://example.com.
- the additional configuration files are merged with default config, overriding existing values.
- add `config/local.json` to set/override developer-specific options (don't check this file into version control).
- there are [more options](https://github.com/lorenwest/node-config/wiki/Configuration-Files), read the manual.

For example to change the development server port, create `config/local.json` with the following contents:
```json
{
	"dev": {
		"port": 8080
	}
}

```

## Directory & files structure

### TL;DR version
- `src/` contains your application source code.
  - `src/views` contains the application views.
  - `src/components` contains reusable components that can be used by several views.
  - `src/gfx` contains visual resources (styles, images, icons, fonts etc).
- `build/` contains code and configuration for operating the development server and building production version.
- `server/` contains simple graphql server.
- `config/` contains application configuration.

### Detailed version
- `src/` contains your application source code.
  - `src/index.js` is the webpack application entry point - everything starts from there.
  - `src/reducer.js` defines the root reducer.
  - `src/index.html` is the html template used to generate the index page sent to the client.
  - `src/App.js` is the root React component which contains the root routes and dev-tools logic.
  - `src/views` contains the application views. Each view resides in a separate directory and follows naming convention that *create user* directory contains *CreateUserView.js*. The directory can contains additional files such as stylesheets (.scss), sub-views, components etc.
    - `src/views/index.js` is an automatically-generated views index file used for dev-tools menu and routes. This file can be safely deleted and will be regenerated when starting the development server or building production application. This file should not be checked into version control.
  - `src/components` contains reusable components that can be used by several views and follows naming convention that *main-menu* directory contains *MainMenu.js*. Each component resides in a separate directory and may contain additional files as needed. View-specific components should be placed in the given view directory (for example *src/views/create-user/components/user-form/UserForm.js*).
  - `src/gfx` contains all resources related to how the application looks (styles, images, icons, fonts etc).
    - `src/gfx/main.scss` is the main styles entry-point and should only contain imports of other resources listed below. Additional logical files can be added.
    - `src/gfx/vars.scss` contains only variables that are common for the entire application (colors etc).
    - `src/gfx/reset.scss` contains baseline rules to reset/normalize styles across browsers.
    - `src/gfx/typography.scss` contains global typography-related rules such as default font, heading appearance etc.
    - `src/gfx/layout.scss` contains global layout-related rules such as grid system.
  - `src/services` contains various application-specific functionality used by views and components such as making low-level REST API requests.
  - `src/constants` - contains application-specific constants. Avoid using string literals when possible.
    - `src/constants/shapes.js` - contains reusable React PropTypes validation shapes.
  - `src/api` contains drivers for talking to various APIs. Each driver should reside in a separate directory and may contain additional files. Any kind of client-side API mocking should be implemented in this level. This directory can be removed if the application does not integrate with any APIs.
- `build/` contains code and configuration for operating the development server and building production version.
  - `build/paths.js` contains map of various paths used by the system that can be references by the subsystems.
  - `build/scripts` contains the scripts executed by the *npm run ...* commands (script name matches the command name). These are processed by babel as well.
    - `build/scripts/dev` starts the development server.
    - `build/scripts/build` builds the production version.
    - `build/scripts/serve` serves the production version.
  - `build/webpack` contains the webpack configurations.
    - `build/webpack/webpack.base.js` is the base webpack configuration shared by others extending it.
    - `build/webpack/webpack.dev.js` is the base webpack configuration used by the development server.
    - `build/webpack/webpack.build.js` is the base webpack configuration used to build the production version.
  - `build/services` contains various scripts used by the build system and development server.
  - `build/templates` contains the JavaScript template strings based templates used to generate resources by the dev-tools server.
- `config/` contains application configuration.
- `dist/` is generated by the *npm run build* command and contains the production version of the application. This directory can safely be deleted and regenerated at any time and should not be checked into version control.
- `server/` contains simple graphql server code
- `node_modules` contains the application dependencies. This directory is generated by the *npm install* command and should not be checked into version control.
- `README.md` is the file you're currently reading.
- `package.json` contains the list of application dependencies and references to the scripts (*npm run build* etc).
- `.babelrc` contains the babel configuration.
- `.eslintrc` contains the ESLint linter configuration.
- `.eslintignore` contains the list of directories the linter should ignore.
- `.gitignore` contains the list of directories the git version control should ignore.
- `yarn.lock` stores the exact installed versions of dependencies, automatically managed by yarn. This file should be checked into version control.
- `LICENCE` contains this software package's license agreement.

## Development tools
Because **DX** (development experience) matters too!
- The development server uses hot-reload to update changed views and components on the fly without even losing state.
- Application dev-tools
  - The development-version of the application includes an additional component *src/components/dev-tools/DevTools.js* in the root element that renders a simple user interface normally hidden out of view.
  - To show this, hover your mouse on the right edge of the screen for a second, a drawer slides out.
  - This contains automatically-generated links to each of the views in the system, useful for prototyping (automatic route */view/view-name* is also added).
  - It also contains a simple form for generating new views. Simply enter a view name such as *"user info"* and the view file *views/user-info/UserInfoView.js* is automatically generated by the dev-server based on template from *build/templates/view.tpl*.
  - The views index file *src/views/index.js* is automatically generated and contains references to all of the views.
  - Components relying on this index file are automatically hot-reloaded when a new view is added or existing one is removed.
- React dev-tools
  - Get [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en) for Google Chrome browser.
  - Get [Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en) for Google Chrome browser.
- Apollo dev-tools
  - Get [Apollo Client Development tools](https://chrome.google.com/webstore/detail/apollo-client-developer-t/jdkknkkbebbapilgoeccciglkfbmbnfm/related) for Google Chrome browser.
- Linting
  - Configure your IDE to show ESLint errors.
  - run `npm run lint` before checking your code into version control to check for issues.

## Creating views & components
Please follow the naming convention that *register-user* view resides in *src/views/register-user/RegisterUserView.js* and the root element has `className="register-user-view"` etc.

Components follow the same logic as views.

### Simple stateless view example
This would be located in *src/views/user-view/UserView.js*.
```js
import React from 'react';

export default () => (
	<div className="user-view">
		<h1>User view</h1>
	</div>
);
```

### Stateful view example
This would be located in *src/views/counter-view/CounterView.js*.
```js
import React, { Component } from 'react';

export default class CounterView extends Component {

	state = {
		counter: 0,
	};

	render = () => (
		<div className="counter-view">
			<h1>Counter</h1>
			<p>Counter: {this.state.counter}</p>
			<button onClick={this.handleIncrementCounter}>Increment counter</button>
		</div>
	);

	handleIncrementCounter = () => {
		this.setState({
			counter: this.state.counter + 1,
		});
	}
}
```

## Task list
- Figure out business logic and authentication layers.
- Integrate `dataloader` for batching.
- Replace graphql-express with graphql-server-express by Apollo.
- Add GraphQL mutation example.
- Implement GraphQL server authentication example.
- Integrate testing.
- Implement server side logging (Winston, Bunyan, debug, ...)?
- Implement client side logging (Winston, Bunyan, debug, ...)?
- Integrate error tracking service.
- Document pm2 usage.
- Setup CI for testing and automatic deploy.

## Future ideas
- Generate classes based on GraphQL schema to be used by models?
- Consider decorators for defining the component queries.
- Render GraphQL errors in development mode?
- Add stateless/stateful view generator option?
- Consider flow, at least for the server?
- Add component generating?
- Linting GraphQL type definitions?
- Add custom Graphiql view.
- Implement indexing reducers?
- Handle SVG backgrounds?
- Add REST API example?
- Implement https proxy?

## Learn & Resources
### GraphQL
- Libraries
  - [graphql](https://github.com/graphql/graphql-js) - provides base query resolving logic.
  - [graphql-server-express](https://github.com/apollographql/graphql-server) - `graphql-server-express` provides express server middleware.
  - [react-apollo](https://github.com/apollographql/react-apollo) - provides client-side React integration.
  - [graphql-tools](https://github.com/apollographql/graphql-tools) - opinionated tools for building executable schemas.
  - [graphiql](https://github.com/graphql/graphiql) - provides GraphQL exploring GUI in browser.
- Learning
  - [GraphQL.org learn](http://graphql.org/learn/) - getting started.
  - [GraphQL.org schema](http://graphql.org/learn/schema/) - learn the schema language.
  - [GraphQL.org code](http://graphql.org/code/) - getting started with code.
  - Authentication [part 1](https://dev-blog.apollodata.com/a-guide-to-authentication-in-graphql-e002a4039d1), [part 2](https://dev-blog.apollodata.com/auth-in-graphql-part-2-c6441bcc4302) - some ideas for implementing authentication.
  - [Apollo React docs](http://dev.apollodata.com/react/) - documentation for using the Apollo React client.
  - [Apollo server docs](http://dev.apollodata.com/tools/graphql-server/index.html) - documentation for using the Apollo server.
  - [Let's learn GraphQL](https://learngraphql.com/) - interactive learning tool.
- Example applications
  - [Apollo GitHunt](https://github.com/apollographql/GitHunt-API) - server organizing example.
- Videos & talks
  - [Apollo - Managing GraphQL Development At Scale](https://www.youtube.com/watch?v=XOM8J4LaYFg).
  - [How Facebook organizes their GraphQL code](https://www.youtube.com/watch?v=etax3aEe2dA).
