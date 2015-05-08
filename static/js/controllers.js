toxin.controller('HomeCtrl', ['$scope', '$interval', function($scope, $interval) {
  var tips = [
    'Toxin is just as free and open-source as Tox',
    'Tox is encrypted. Messages are only readable by you',
    'Want to help? Visit our GitHub repository',
    'Spotted a bug? Create an issue on GitHub',
    'Have a great idea? Create an issue on GitHub',
    'Toxin is developed for free. Consider donating'
  ];
  $scope.tip = tips[Math.floor((Math.random() * tips.length))];

  $interval(function()
  {
    $scope.tip = tips[Math.floor((Math.random() * tips.length))];
  }, 5000);
}]);
toxin.controller('SelfCtrl', ['$scope', 'Me', function($scope, me) {
  $scope.name = me.name;
  $scope.message = me.message;
  $scope.status = me.status;

  $scope.close = function() {
    require('ipc').send('quit');
  }
  $scope.setName = function() {
    me.setName($scope.name);
  }
  $scope.setMessage = function() {
    me.setMessage($scope.message);
  }
}]);
toxin.controller('ContactCtrl', ['$scope', 'Friend', function($scope, friend) {
  $scope.contacts = friend.all();

  $scope.status = function(contact) {
    return friend.status(contact.status);
  }

  $scope.add = function() {
    friend.add($scope.user);
    $scope.user = '';
  }
}]);

toxin.controller('ChatCtrl', ['$scope', '$routeParams', 'Chat', function($scope, $routeParams, chat) {
  // TODO More elegant solution?
  $scope.messages = [];
  $scope.$watch(
    function() {
      return chat.messages($routeParams.id);
    },
    function(newVal) {
      $scope.messages = chat.messages($routeParams.id);
    },
    true
  );

  $scope.sendMessage = function() {
    chat.send($routeParams.id, $scope.message);

    $scope.message = '';
  }
}]);
