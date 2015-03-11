module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        wget: {
            simple: {
               files: {
                 'salt/keys.txt': 'https://api.wordpress.org/secret-key/1.1/salt/'
               }
            }
        },

        copy: {
            main: {
                files: [
                    {
                        src: ['./**',
                        '!./node_modules/**',
                        '!./salt/keys.txt',
                        '!./Gruntfile.js',
                        '!./npm-debug.log',
                        '!./package.json',
                        '!./bower.json',
                        '!./dist/**',
                        './.htaccess',
                    ], dest: 'dist/'},


                ]
            }
        },

        imagemin: {
            png: {
                options: {
                    optimizationLevel: 7
                },
                files: [{
                    expand: true,
                    cwd: 'wp-content/themes/<%= themeName %>/images/',
                    src: ['**/*.png'],
                    dest: 'dist/wp-content/themes/<%= themeName %>/images/',
                    ext: '.png'
                }]
            },
            jpg: {
                options: {
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: 'wp-content/themes/<%= themeName %>/images/',
                    src: ['**/*.jpg'],
                    dest: 'dist/wp-content/themes/<%= themeName %>/images/',
                    ext: '.jpg'
                }]
            }
        },

        replace: {
           dist: {
              options: {
                 patterns: [
                 {
                    match: 'saltkeys',
                    replacement: '<%= grunt.file.read("salt/keys.txt") %>'
                 }]
              },
              files: [
              {
                 expand: true, 
                 flatten: true, 
                 src: ['dist/wp-config.php'], 
                 dest: 'dist/'
              }]
           }
        },

        uglify: {
            my_target: {
                files: {
                    'dist/wp-content/themes/<%= themeName %>/js/scripts.js': ['wp-content/themes/<%= themeName %>/js/*.js']
                }
            }
        },
        cssmin: {
            my_target: {
                files: {
                  'dist/wp-content/themes/<%= themeName %>/style.css': ['wp-content/themes/<%= themeName %>/style.css', 'wp-content/themes/<%= themeName %>/css/*.css']
                }
            }
        },
        // Deletes all .txt files in the root "keys" folder where cURL [HOPEFULLY] downloaded the salt.txt file.
        clean: {
             txt: ["salt/*.txt"]
        }
    });

    grunt.registerTask('build', [
        'wget',
        'copy',
        'imagemin',
        'replace',
        'clean:txt',
        
    ]);

    grunt.registerTask('build2', [
        'wget',
        'copy',
        'imagemin',
        'replace',
        'uglify',
        'cssmin',
        'clean:txt',
    ]);

    grunt.loadNpmTasks('grunt-wget');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.registerTask('default', ['build']);

};