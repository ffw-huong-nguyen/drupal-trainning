#FFW Pattern Lab

##Getting started

###Prerequisites:

* [Composer](https://getcomposer.org/) – Dependency Manager for PHP,
* [Node.js](https://nodejs.org/en/) – The backbone of the framework. Node Package Manager takes care of installing all the dev dependencies. Currently, the source code still work well with node v10.24.1
* [Bower](http://bower.io/) – Bower manages all the front end packages and fetches them for, when we start a new project.
* [Gulp](http://gulpjs.com/) – Task manager and automation. Gulp is responsible for running all the small tasks like compiling SCSS and Twig templates, starting a web server and automatically reloading browsers.

###Starting a new project
So you got the prerequisites installed, and you're ready to get started? Great! Just follow the simple steps below:


1. Download a copy of the framework.

2. Open up the project folder in Terminal.

3. Navigate to the `.npm` folder then run below command to install all the required packages with Node Package Manager.

    ```
    npm install
    ```

4. Navigate to the `pattern-lab` folder then run below command to install vendor of pattern-lab
    ```
    M | composer install --no-dev;
    ```
Then copy .npm/pattern-lab/config.yml to pattern-lab/config/config.yml

5. Start up watches and local server, run below command in `.npm` folder.

    ```
    ./node_modules/.bin/gulp
    ```

6. For just compile style, run below command in `.npm` folder.

    ```
    ./node_modules/.bin/gulp sass-watch
