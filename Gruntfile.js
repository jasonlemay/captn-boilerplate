module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            dist: {
                src: [
                    //'js/libs/*.js',
                    'www/assets/js/global.js'
                ],
                dest: 'www/assets/build/js/global.js',
            }
        },

        uglify: {
            build: {
                src: 'www/assets/build/js/global.js',
                dest: 'www/assets/build/js/global.min.js'
            }
        },

        imagemin: {
            dynamic: {
                files: [{
                    expand: true,
                    cwd: 'www/assets/img/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'www/assets/build/img/'
                }]
            }
        },

        less: {
            development: {
                options: {
                    paths: ["www/assets/less"],
                    cleancss: false
                },
                files: {
                    "www/assets/build/css/style.css": "www/assets/less/style.less"
                }
            },
            production: {
                options: {
                    paths: ["www/assets/less"],
                    cleancss: true
                },
                files: {
                    "www/assets/build/css/style.min.css": "www/assets/less/style.less"
                }
            }
        },

        watch: {
            options: {
                livereload: true,
            },
            scripts: {
                files: ['www/assets/js/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['www/assets/less/*.less'],
                tasks: ['less'],
                options: {
                    spawn: false,
                }
            },
            images: {
                files: ['www/assets/img/**/*.{png,jpg,gif}'],
                tasks: ['imagemin'],
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

    grunt.registerTask('default', 'watch');
    grunt.registerTask('imgs', 'imagemin');

};