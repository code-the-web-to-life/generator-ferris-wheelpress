'use strict';

// 1) Setup Databases manually for now using CPANEL & WAMP w/ phpMyAdmin, and remember credentials for this generator's prompts.

// 2) Setup Grunt (Copy package.json and Gruntfile.js to root folder)
// 3) Download and unzip latest Wordpress version into root
// 4) Download and install a third party theme if specified and rename it. (Theme name taken from site name at prompt)
// 5) Rename TwentyFourteen theme if no third party theme is specified
// 6) Download various WordPress Plug-ins, extracts and moves to plugins folder if requested.
// 7) Update wp-config with DB details & prefix if requested.
// 8) Update theme name in stylesheet.

var util = require('util'),
    path = require('path'),
    yeoman = require('yeoman-generator'),
    shell = require('shelljs');


var FerrisWheelpressGenerator = module.exports = function FerrisWheelpressGenerator(args, options, config) {
    yeoman.generators.Base.apply(this, arguments);

    this.on('end', function () {
        this.installDependencies({ skipInstall: options['skip-install'] });
    });

    this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(FerrisWheelpressGenerator, yeoman.generators.Base);

FerrisWheelpressGenerator.prototype.askFor = function askFor() {
    var cb = this.async();

    // have Yeoman greet the user.
    console.log(this.yeoman);

    var prompts = [
        {
            type: 'input',
            name: 'siteTitle',
            message: 'Please enter the sites name/title'
        },
        {
            type: 'input',
            name: 'siteURL',
            message: 'The Site URL (e.g. 127.0.0.1/YourSiteDir or localhost/YourSiteDir)'
        },
        {
            type: 'input',
            name: 'adminUser',
            message: 'The wordpress admin username (Will be used to login to Wordpress)',
            default: 'admin'
        },
        {
            type: 'input',
            name: 'adminPassword',
            message: 'The wordpress admin password (Will be used to login to Wordpress)',
            default: 'password1234'
        },
        {
            type: 'input',
            name: 'adminEmail',
            message: 'The wordpress admin users email address'
        },
        {
            type: 'input',
            name: 'installCustomTheme',
            message: 'To install a third party theme URL. (Leave blank to use the TwentyFourteen theme).'
        },
        {
            when: function (response) {
                return response.installCustomTheme;
            },
            type: 'input',
            name: 'themeName',
            message: 'Enter a name for your theme',
            default: 'Ferris Devpress 2014'
        },
        {
            type: 'confirm',
            name: 'installAcf',
            message: 'Would you like to install the Advanced Custom Fields plugin?'
        },
        {
            type: 'confirm',
            name: 'installYoast',
            message: 'Would you like to install the Yoast SEO plugin?'
        },
        {
            type: 'input',
            name: 'dbName',
            message: 'Database Name',
            default: 'testdb'
        },
        {
            type: 'input',
            name: 'dbUser',
            message: 'Database Username',
            default: 'root'
        },
        {
            type: 'input',
            name: 'dbPass',
            message: 'Database Password',
            default: 'root'
        },
        {
            type: 'input',
            name: 'wpPrefix',
            message: 'Type in a custom WordPress database Prefix e.g. [ mysiteprefix_ ], using only numbers, letters, and underscores \n If you don\'t then the standard [ wp_ ] will be used!',
            default: 'tdb_'
        }        
    ];

    this.prompt(prompts, function (props) {
        this.siteTitle = props.siteTitle;
        this.siteURL = props.siteURL;
        this.adminUser = props.adminUser;
        this.adminPassword = props.adminPassword;
        this.adminEmail = props.adminEmail;
        this.installAcf = props.installAcf;
        this.installYoast = props.installYoast;


        this.installCustomTheme = props.installCustomTheme;
        this.dbName = props.dbName;
        this.dbUser = props.dbUser;
        this.dbPass = props.dbPass;
        this.wpPrefix = props.wpPrefix;
        this.themeName = props.themeName;

        if(!this.themeName){
            this.themeName = this.siteTitle.toLowerCase().replace(/ /g, '-');
        }

        cb();
    }.bind(this));
};

FerrisWheelpressGenerator.prototype.gruntFiles = function gruntFiles() {
    this.copy('_package.json', 'package.json');
    this.copy('_bower.json', 'bower.json');
    this.copy('_Gruntfile.js', 'Gruntfile.js');
    this.copy('wget.js', 'tasks/wget.js');
};

FerrisWheelpressGenerator.prototype.LatestWordpress = function LatestWordpress() {
    var cb   = this.async();

    this.log.writeln('\n*************************************************\n** Downloading the latest Version of Wordpress **\n*************************************************');
    this.tarball('http://wordpress.org/latest.zip', './', cb);
};


FerrisWheelpressGenerator.prototype.removeThemes= function removeThemes() {

    this.log.writeln('\n*******************************************\n** Deleting the default Wordpress themes **\n*******************************************');
    shell.rm('-rf', './wp-content/themes/*');

};

FerrisWheelpressGenerator.prototype.DevpressTheme = function DevpressTheme() {

    if( this.installCustomTheme ){
        var cb   = this.async();

        this.log.writeln('\n*********************************************************************\n** Downloading and installing your theme **\n********************************************************************');
        this.tarball(this.installCustomTheme, 'wp-content/themes/' + this.themeName, cb);
    }else{
        var cb   = this.async();

        this.log.writeln('\n*********************************************************************\n** Downloading and installing your theme **\n********************************************************************');
        this.tarball('https://downloads.wordpress.org/theme/twentyfourteen.zip', 'wp-content/themes/' + this.themeName, cb);
    }

};

FerrisWheelpressGenerator.prototype.acfWordpress = function acfWordpress() {

    if( this.installAcf ){
        var cb   = this.async();

        this.log.writeln('\n*****************************************************************************************************\n** Installing the latest Advanced Custom Fields **\n*****************************************************************************************************');
        this.tarball('https://github.com/elliotcondon/acf/archive/master.tar.gz', 'wp-content/plugins/advanced-custom-fields', cb);
    }
};

FerrisWheelpressGenerator.prototype.yoastWordpress = function yoastWordpress() {

    if( this.installYoast){
        var cb   = this.async();

        this.log.writeln('\n*******************************************************************************************************************\n** Installing Yoast **\n*******************************************************************************************************************');
        this.tarball('https://github.com/Yoast/wordpress-seo/archive/master.tar.gz', 'wp-content/plugins/wordpress-seo', cb);
    }
};

//update wp-config and move template to it's proper place.
FerrisWheelpressGenerator.prototype.updateWpConfig = function updateWpConfig() {
    shell.rm('-rf', './wp-config.php');
    this.log.writeln('\n*********************************\n** Updating the wp-config file **\n*********************************');
    this.copy('wp-config.php.tmpl', 'wp-config.php');
};

//move css template and update theme name
FerrisWheelpressGenerator.prototype.moveCss = function moveCss() {
    this.log.writeln('\n************************************\n** Adding theme name to style.css **\n************************************');
    shell.exec("sed -i -e 's/.*Theme Name.*/Theme Name: " + this.themeName + "/' ./wp-content/themes/" + this.themeName + "/style.css")
    shell.exec("rm -f -r ./wp-content/themes/" + this.themeName + "/style.css-e")
};

// Create Databases separately one remote and the other local using something like WAMP with it's included phpMyAdmin.

//Create database
//FerrisWheelpressGenerator.prototype.CreateDatabase = function CreateDatabase() {
//
//    this.log.writeln('\n***********************\n** Creating database **\n***********************');
//    shell.exec('mysql --user="' + this.dbUser + '" --password="' + this.dbPass + '" -e "create database ' + this.dbName + '"');
//};
//
//Install Wordpress
//FerrisWheelpressGenerator.prototype.InstallWordpress = function InstallWordpress() {
//
//    this.log.writeln('\n**************************\n** Installing Wordpress **\n**************************');
//    shell.exec('curl -d "weblog_title=' + this.siteTitle + '&user_name=' + this.adminUser + '&admin_password=' + this.adminPassword + '&admin_password2=' + this.adminPassword + '&admin_email=' + this.adminEmail + '" http://' + this.siteURL + '/wp-admin/install.php?step=2')
//};
//
//Update theme in database
//FerrisWheelpressGenerator.prototype.UpdateThemeInDb = function UpdateThemeInDb() {
//
//    this.log.writeln('\n********************************\n** Updating Theme in Database **\n********************************');
//
//    shell.exec('mysql --user="' + this.dbUser + '" --password="' + this.dbPass + '" -D ' + this.dbName + ' -e "UPDATE wp_options SET option_value = \'' + this.themeName + '\' WHERE option_name = \'template\'"');
//    shell.exec('mysql --user="' + this.dbUser + '" --password="' + this.dbPass + '" -D ' + this.dbName + ' -e "UPDATE wp_options SET option_value = \'' + this.themeName + '\' WHERE option_name = \'stylesheet\'"');
//    shell.exec('mysql --user="' + this.dbUser + '" --password="' + this.dbPass + '" -D ' + this.dbName + ' -e "UPDATE wp_options SET option_value = \'' + this.themeName + '\' WHERE option_name = \'current_theme\'"');
//
//};