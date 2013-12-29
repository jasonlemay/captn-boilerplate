module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    //'js/libs/*.js',
                    'assets/js/global.js'
                ],
                dest: 'assets/build/js/global.js',
            }
        },

        uglify: {
            build: {
                src: 'assets/build/js/global.js',
                dest: 'assets/build/js/global.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'assets/build/img/'
                }]
            }
        },

        less: {
            development: {
                options: {
                    paths: ["assets/less"],
                    cleancss: false
                },
                files: {
                    "assets/build/css/style.css": "assets/less/style.less"
                }
            },
            production: {
                options: {
                    paths: ["assets/less"],
                    cleancss: true
                },
                files: {
                    "assets/build/css/style.min.css": "assets/less/style.less"
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['concat', 'uglify', 'imagemin', 'less']);

};