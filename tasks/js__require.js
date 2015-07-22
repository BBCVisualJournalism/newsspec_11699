module.exports = function (grunt) {

    // *************************************************************************
    // REQUIRE PATHS
    // Add any paths here you want shortened. Relative to the 'js' dir.
    // *************************************************************************

    var amdModulePaths = {
        'pubsub': './lib/vendors/jquery/pubsub',
        'appInitData': 'empty:',
        'bump-3': 'empty:'
    };

    // *************************************************************************
    // GRUNT CONFIG
    // You shouldn't need to edit anything below here
    // *************************************************************************

    var _ = require('lodash-node'),
        requirePathsForJquery1build = _.merge({'jquery': './lib/vendors/jquery/jquery-1.9.1'}, amdModulePaths),
        requirePathsForJquery2build = _.merge({'jquery': './lib/vendors/jquery/jquery-2.0.3'}, amdModulePaths),
        requireJsDefaults = {
            options: {
                baseUrl: './source/js',
                optimize: 'uglify2',
                preserveLicenseComments: false,
            }
        },
        legacyIeConfig = _.merge({
                options: {
                    paths: requirePathsForJquery1build,
                    generateSourceMaps: false,
                    out: './content/<%= config.services.default %>/js/all-legacyie.js',
                    name: './app'
                }
            }, requireJsDefaults),
        allHtml5Config = _.merge({
                options: {
                    paths: requirePathsForJquery2build,
                    generateSourceMaps: true,
                    out: './content/<%= config.services.default %>/js/all-html5.js',
                    name: './app'
                }
            }, requireJsDefaults),
        liteConfig = _.merge({
                options: {
                    paths: requirePathsForJquery2build,
                    generateSourceMaps: false,
                    name: './lib/vendors/almond/almond',
                    out: './content/<%= config.services.default %>/js/lite.js',
                    include: ['app--lite'],
                    insertRequire: ['app--lite'],
                    wrap: true
                }
            }, requireJsDefaults),
        jasmineSpecPaths = _.merge(requirePathsForJquery1build, {'appInitData': './spec/appInitData'});

    grunt.config(['jasmineSpecPaths'], jasmineSpecPaths);
    grunt.config(['amdModulePaths'],       amdModulePaths);
    grunt.config(['requirejs', 'jquery1'], legacyIeConfig);
    grunt.config(['requirejs', 'jquery2'], allHtml5Config);
    grunt.config(['requirejs', 'lite'],    liteConfig);
};
