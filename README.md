# Yogo

YoGo is a review based Yoga Studio Search Platform. The user can search for Yoga Studios on the bases of location, price, name, rating and level. The user can add, review and rate a studio. 

## Getting Started

After cloning this repository, a simple call to `npm i` or `yarn` will install many of the packages locally that you will need.

Next, a call to either `npm run start`  will get you started and run the express server and a separate server hosting the react app simultaneously and in development mode. By default, the express server will be accessible at `http://localhost:3000`.

## Prerequisites and Installation

1. First and foremost, you will need to have [Node.js and npm downloaded and installed](https://nodejs.org/en/download/)
  a. If you check the [`package.json`](package.json) file you'll notice that your major version of Node.js should be `8` and your major version of npm should be `5` (this is so you will have access to [`npx`](https://medium.com/@maybekatz/introducing-npx-an-npm-package-runner-55f7d4bd282b))
  b. _[Optional]_ If you find yourself switching between node versions often for various projects or repositories, consider using [nvm](https://github.com/creationix/nvm)
2. Once you have Node and npm installed at the right versions, run
    ```
    npm i -g nodemon
    ```
    to install `nodemon`, which will be used for development

## Built With

* [JavaScript](https://www.javascript.com/) - The front-end framework used
* [CSS] -Stylesheets
* [express `~4.16.4`](https://expressjs.com/en/4x/api.html) - The server-side framework used
* [Mongoose](http://mongoosejs.com/) - To help deal with object models
* [express-generator](https://expressjs.com/en/starter/generator.html) - To generate the express server-side

## Screenshots
Landing page
!["Landing_page"](https://github.com/suganthi05/ReviewBasedSearch-Yogo/blob/master/Screenshots/Landing_page1.png?raw=true)

Search page
!["Search_page"](https://github.com/suganthi05/ReviewBasedSearch-Yogo/blob/master/Screenshots/Home_page2.png?raw=true)

View search results
!["View_Results"](https://github.com/suganthi05/ReviewBasedSearch-Yogo/blob/master/Screenshots/View_results3.png?raw=true)

Filter search results
!["Filter_search"](https://github.com/suganthi05/ReviewBasedSearch-Yogo/blob/master/Screenshots/Filter_search4.png?raw=true)

View Studio and add review
!["Studio_page"](https://github.com/suganthi05/ReviewBasedSearch-Yogo/blob/master/Screenshots/View_studio6.png?raw=true)
