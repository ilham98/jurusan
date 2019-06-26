const mix = require('laravel-mix');

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

require('laravel-mix-eslint-config');	

mix.webpackConfig({
	resolve: {
		alias: {
			'@': __dirname + '/resources/js/components'
		}
	},
	module: {
      rules: [
        {
          test: /\.(jsx|js|vue)$/,
          loader: 'eslint-loader',
          enforce: 'pre',
          exclude: /(node_modules)/,
          options: {
            formatter: require('eslint-friendly-formatter')
          }
        }
      ]
    },
});

mix.react('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css');

