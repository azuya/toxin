toxin.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/home', {
        templateUrl: 'partials/home.html',
        controller: 'HomeCtrl'
      }).
      when('/chat/:id', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl'
      }).
      when('/group/:id', {
        templateUrl: 'partials/chat.html',
        controller: 'ChatCtrl'
      }).
      otherwise({
        redirectTo: '/home'
      })
  }]);
