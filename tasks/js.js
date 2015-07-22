module.exports = function (grunt) {

    grunt.registerTask('copy_js_minimum', ['copy:requirejs']);

    grunt.config('uglify', {
        options: {
            mangle: true
        },
        my_target: {
            files: {
                'source/js/lib/news_special/iframemanager__host.min.js': ['source/js/lib/news_special/iframemanager__host.js']
            }
        }
    });

    grunt.registerTask('copyRequiredJs', function () {
        if (grunt.config.get('config').debug === 'true') {
            grunt.task.run('copy:jsAll');
        } else {
            grunt.task.run('copy_js_minimum');
        }
        grunt.task.run('uglify');
    });

    var applicationJS = ['requirejs:jquery1', 'requirejs:jquery2'];
    if (grunt.config.get('config').scaffoldLite === 'true') {
        applicationJS = ['requirejs:lite'];
    }

    grunt.config(['concurrent', 'js'], {
        tasks: ['jshint'].concat(applicationJS)
    });
    grunt.registerTask('js', ['overrideImagerImageSizes', 'requirejs:lite', 'concurrent:js', 'copyRequiredJs']);
};
