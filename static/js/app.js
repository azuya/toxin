require('./components/angular/angular');
require('./components/angular-route/angular-route');
var _ = require('./components/underscore/underscore');
var path = require('path');

var toxify = angular.module('toxify', ['ngRoute', 'toxify.services']);

require('./js/routes');
require('./js/controllers');
require('./js/services');
