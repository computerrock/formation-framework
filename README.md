# @computerrock/formation-framework

Application framework based on React, Redux & redux-saga by Computer Rock's Javacript Technology Team.

This monorepo project contains collection of packages that make up the current state of framework. Consider it work in progress.

## Development builds (TODO update)

In folder for each of the web applications you first need to create `.env.development` files (see `.env.example`
for reference).

After, you can install dependencies and run project as described:

```shell
# Installation process starts in monorepo project root folder:
$ npm install # to install monorepo supporting packages
$ npm install -g lerna # to install lerna globally
$ lerna bootstrap # to install node modules in each of the packages and link dependent packages
$ lerna bootstrap -- --legacy-peer-deps # this command should be used instead; during JS
                                        # ecosystem transition period to Node v16 & NPM v7

# For web application, additional installation step for installing ArcGIS assets, like fonts and images,
# is required. This step also applies for ArcGIS dependency upgrades 
$ cd app-folder-name
$ npm run copy-arcgis-assets

# to run packages configured for rollup bundling:
$ npm run start-packages # starts rollup with watcher for all configured packages, or 
$ npm run build-packages # builds all configured packages (eg. for debugging)

# to run Storybook for `@ace-de/ui-components` package:
$ cd ./packages/ui-components
$ npm run storybook # starts Storybook on localhost:11073 with watcher

# to run any of the apps, in each app folder:
$ cd app-folder-name
$ npm start # starts the web app with development environment settings
$ npm test # runs Jest test suite (in separate terminal)

# to publish all packages run:
$ lerna publish --force-publish

```
