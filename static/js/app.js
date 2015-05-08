require('./components/angular/angular');
require('./components/angular-route/angular-route');
require('./components/angular-scroll-glue/src/scrollglue');
var _ = require('./components/underscore/underscore');
var path = require('path');
var fs = require('fs');

var toxin = angular.module('toxin', ['ngRoute', 'toxin.services', 'luegg.directives']);

require('./js/routes');
require('./js/controllers');
require('./js/services');
