Game.Menu = function (game) { };

var colorsAvailable;

Game.Menu.prototype = {
    create: function () {
	colorsAvailable = [0, 1, 2, 3, 4, 5];

	this.generateColorIds();
	this.updateColor();
	
	Game.Play.prototype.createBackground();

	this.addControls(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, players[0]);
	this.addControls(Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, players[1]);

	for (var i = 0; i < players.length; i++) {
	    players[i].ready = false;
	}
    },

    update: function () {
	Game.Play.prototype.updateBackground();

	// upon some input:
	if (this.allReady()) {
	    game.state.start('Play');
	}
    },

    allReady: function () {
	var ret = true;
	for (var i = 0; i < players.length; i++) {
	    if (players[i].ready === false) {
		ret = false;
	    }
	}
	return ret;
    },

    updateColor: function () {
	for (var i = 0; i < players.length; i++) {
	    players[i].color = colors[players[i].colorId];
	}
    },

    generateColorIds: function () {
	for (var i = 0; i < players.length; i++) {
	    if (!players[i].color) {
		var success = false;
		while (!success) {
		    var rand = Math.floor(Math.random() * 6);
		    if (colorsAvailable.indexOf(rand) > -1) {
			players[i].colorId = rand;
			colorsAvailable.splice(colorsAvailable.indexOf(rand), 1);
			success = true;
		    }
		}
	    }
	}
    },

    addControls: function (up, down, left, right, player) {
	player.keys = {};
	player.keys.up = game.input.keyboard.addKey(up);
	player.keys.down = game.input.keyboard.addKey(down);
	player.keys.left = game.input.keyboard.addKey(left);
	player.keys.right = game.input.keyboard.addKey(right);

	player.keys.up.onDown.add(
	    function () {
		player.ready = true;
	    }, this);
	player.keys.down.onDown.add(
	    function () {
		player.ready = false;
	    }, this);
	player.keys.left.onDown.add(
	    function () { 
		colorsAvailable.push(player.colorId);
		player.colorId = (player.colorId + colors.length - 1) % colors.length;
		while (colorsAvailable.indexOf(player.colorId) === -1) {
		    player.colorId = (player.colorId + colors.length - 1) % colors.length;
		}
		colorsAvailable.splice(colorsAvailable.indexOf(player.colorId), 1);
		this.updateColor() }, this);
	player.keys.right.onDown.add(
	    function () { 
		colorsAvailable.push(player.colorId);
		player.colorId = (player.colorId + 1) % colors.length; 
		while (colorsAvailable.indexOf(player.colorId) === -1) {
		    player.colorId = (player.colorId + 1) % colors.length;
		}
		colorsAvailable.splice(colorsAvailable.indexOf(player.colorId), 1);
		this.updateColor();
	    }, this);
    },
};
