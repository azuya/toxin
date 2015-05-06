toxify.controller('HomeCtrl', ['$scope', '$interval', function($scope, $interval) {
  var tips = [
    'Toxify is just as free and open-source as Tox',
    'Tox is encrypted. Messages are only readable by you',
    'Want to help? Visit our GitHub repository',
    'Spotted a bug? Create an issue on GitHub',
    'Have a great idea? Create an issue on GitHub',
    'Toxify is developed for free. Consider donating'
  ];

  $interval(function()
  {
    $scope.tip = tips[Math.floor((Math.random() * tips.length) +1 )];
  }, 5000);
}]);
toxify.controller('SelfCtrl', ['$scope', 'Tox', 'Me', function($scope, tox, me) {
  $scope.name = me.name;
  $scope.message = me.message;
  $scope.status = me.status;

  $scope.close = function() {
    require('ipc').send('quit');
  }
}]);
toxify.controller('ContactCtrl', ['$scope', 'Friend', function($scope, friend) {
  $scope.contacts = friend.all();

  $scope.status = function(contact) {
    return friend.status(contact.status);
  }

  $scope.add = function() {
    friend.add($scope.user);
    $scope.user = '';
  }
}]);

toxify.controller('ChatCtrl', ['$scope', '$routeParams', 'Tox', 'Me', 'Chat', function($scope, $routeParams, tox, me, chat) {
  // TODO Fix injection clutter
  // TODO More elegant solution?
  $scope.messages = chat.chats[$routeParams.id].messages;
}]);
