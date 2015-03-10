# generator-ferris-wheelpress

##NOTE: This is a [Yeoman](http://yeoman.io) generator and a work in progress!!! 
If you want a fully functional generator, then try [Marc Lloyd's: ](https://github.com/marclloyd77/generator-devpress) version.

This instance of devpress is for my own purposes, and will be broken many, many times, as I'm quite the noob, but by all means feel free to fork if you like, shit, even help a brother out with some functional code once in a blue moon, hey I'm not too proud to beg, lol...

Really though, I'm using it for my Ferris Wheelhouse & Code The web To Life website projects and ultimately to make life easier in the future when asked to create a website, these generators are extremely useful for automating your development environment.

##What I'm trying to add to this generator:
A simple prompt token for custom WordPress database prefix, e.g. something other than [ wp_ ]. Helps to have your own for better security. I told ya I was a noob! Also db details are tokenized.

Various plug-ins I want to include... Types: For custom post_types, fields and Taxonomies, Styles & Fourteen extended: For customizer panel additions for page / post styling, Dependency Minification, Script Logic, Post Head Includes, CDNJS, Yoast SEO, iWP Admin & Client, and many, many more. Cause I'm a whore!

Install option for third party themes by simply entering it's URL, and a Grunt task for compressing images, as well as a separate optional task for combining / minimization CSS & JavaScript files, if your not using a WordPress plug-in to do so.

##This generator should already do the following and more in the future:

* Setup Grunt (Copy package.json and Gruntfile.js to root folder)
* Download and unzip latest WordPress version into root.
* Download and install a third party theme if specified and rename it.
* Rename TwentyFourteen theme if no third party theme is specified.
* Download various WordPress Plug-Ins and unzip to plug-ins folder if requested.
* Update wp-config with DB and Prefix details.
* Update theme name in style sheet

## Getting Started

This Generator uses Marc Lloyd's generator-devpress as a base.
To install generator-devpress from npm, run:

```
$ npm install -g generator-ferris-wheelpress
```

Finally, initiate the generator:

```
$ yo ferris-wheelpress
```

## Grunt
```
$ grunt or grunt build
```
Running grunt or grunt build will compress your images before moving all of the files to a dist directory for deployment.

Note: I plan on creating a grunt task within the imagemin section of the Grunt file that compresses assets in the "wp-content/uploads" folder too.

```
$ grunt build2
```
Compresses and concatenates the CSS files in the /css folder of your theme. So you can work more modular.

For your JS to be compressed & concatenated it must be in the /js folder in your theme directory. 
Keep libraries like JQuery in the /libs folder, you don't want to screw with them unless you know what your doing, I recommend using their minified versions from their respected websites to begin with, 

Don't forget to include the scripts.js file in your project using wp_enqueue_scripts in your functions.php or including in the footer with script tags.

Note: I separated and modified this from Marc Lloyd's original devpress generator because I'm using the WordPress "Dependancy Minification" plug-in and wanted to give you the option to still use it for your local development staging processes. In the future I plan to patch this version with a method of compressing & concatenating the plug-in files as well.

##Final Words of Thought:
My main goal is to create something as useful as the original fork that this repo is based upon, but with my own funk added to the mix. Be easy everyone and thank you ahead of time for any help you bless upon me and my endeavors.

## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)
