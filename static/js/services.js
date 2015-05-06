angular.module('toxify.services', []).
  factory('Tox', function() {
    var tox = new (require('toxcore')).Tox({
      path: path.resolve(__dirname, '..', '..', 'libtoxcore.so')
    });

    var nodes = [
      { maintainer: 'saneki',
        address: '96.31.85.154',
        port: 33445,
        key: '674153CF49616CD1C4ADF44B004686FC1F6C9DCDD048EF89B117B3F02AA0B778' },
      { maintainer: 'Impyy',
        address: '178.62.250.138',
        port: 33445,
        key: '788236D34978D1D5BD822F0A5BEBD2C53C64CC31CD3149350EE27D4D9A2F9B6B' },
      { maintainer: 'sonOfRa',
        address: '144.76.60.215',
        port: 33445,
        key: '04119E835DF3E78BACF0F84235B300546AF8B936F035185E2A8E9E0A67C8924F' }
    ];

    nodes.forEach(function(node) {
      tox.bootstrapSync(node.address, node.port, node.key);
    });

    tox.setNameSync('Toxer');
    tox.setStatusMessageSync('Beautiful Tox');

    console.log(tox.getAddressHexSync());

    tox.start();

    return tox;
  }).
  factory('Friend', ['Tox', function(tox) {
    var service = {
      friends: [],
      requests: [],
      all: function() {
        return this.friends;
      },
      find: function(addr) {
        if(typeof addr == 'number') {
          // Search based on friend ID
          return _.find(this.friends, function(user) {
            return user.num == addr;
          });
        }

        // Search based on friend address
        return _.find(this.friends, function(user) {
          return user.address == addr.toUpperCase();
        });
      },
      add: function(addr) {
        if(typeof addr != 'string') {
          addr = addr.toHex().toString();
        }
        if(_.contains(this.requests, addr)) {
          var num = tox.addFriendNoRequestSync(addr)
          return;
        }

        var num = tox.addFriendSync(addr, 'Please add me.')

        this.friends.push({
          address: addr,
          name: addr,
          status: 'offline',
          message: '',
          num: num
        });
      },
      status: function(num) {
        return { online: 0, away: 1, busy: 2, offline: 3 }[num];
      },
      statusToString: function(num) {
        return [ 'online', 'away', 'busy', 'offline' ][num];
      }
    }

    tox.on('friendRequest', function(e) {
      service.requests.push(e.publicKeyHex());

      // TODO Friend request dialog
    });

    tox.on('friendName', function(e) {
      var friend = service.find(e.friend());
      if(friend) {
        friend.name = e.name();
      }
    });

    tox.on('friendStatusMessage', function(e) {
      var friend = service.find(e.friend());
      if(friend) {
        friend.message = e.statusMessage();
      }
    });

    tox.on('friendStatus', function(e) {
      var friend = service.find(e.friend());
      if(friend) {
        friend.status = service.statusToString(e.status());
      }
    });
    tox.on('friendConnectionStatus', function(e) {

      var friend = service.find(e.friend());
      if(friend) {
        friend.status = e.isConnected() ? 'online' : 'offline';
      }
    })

    return service;
  }]).
  factory('Me', ['Tox', function(tox) {
    function getStatus() {
      if(tox.getConnectionStatusSync()) {
        return 'offline';
      }

      return [ 'online', 'away', 'busy', 'offline' ][tox.getStatusSync()];
    }

    var service = {
      address: tox.getAddressHexSync(),
      name: tox.getNameSync(),
      message: tox.getStatusMessageSync(),
      status: getStatus()
    }

    return service;
  }]).
  factory('Chat', ['Tox', function(tox) {
    var service = {
      chats: [],
      groups: [],
      findChat: function(id) {
        return _.find(this.chats, function(chat) {
          return chat.id == id;
        });
      },
      messages: function(id) {
        if(!this.findChat(id)) {
          return null;
        }
        return this.findChat(id).messages;
      }
    };

    tox.on('friendMessage', function(e) {
      var chat = service.findChat(e.friend());
      if(!chat) {
        service.chats.push({
          id: e.friend(),
          messages: []
        });
        chat = service.findChat(e.friend());
      }

      chat.messages.push({
        action: e.isAction(),
        body: e.message(),
        me: false
      });
    });

    return service;
  }]);
