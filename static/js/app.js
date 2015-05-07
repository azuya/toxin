require('./components/angular/angular');
require('./components/angular-route/angular-route');
require('./components/angular-scroll-glue/src/scrollglue');
var _ = require('./components/underscore/underscore');
var path = require('path');

var toxify = angular.module('toxify', ['ngRoute', 'toxify.services', 'luegg.directives']);

require('./js/routes');
require('./js/controllers');
require('./js/services');
