Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen
	game.stage.backgroundColor = '#222222';

	// load everything
	game.load.image('green', 'assets/img/green.png');
	game.load.image('blue', 'assets/img/blue.png');
	game.load.image('orange', 'assets/img/orange.png');
	game.load.image('purple', 'assets/img/purple.png');
	game.load.image('pink', 'assets/img/pink.png');
	game.load.image('lime', 'assets/img/lime.png');
	
//	game.load.image('food', 'assets/img/food-.png');

	game.load.image('keys-wasd', 'assets/img/keys-wasd.png');
	game.load.image('keys-arrows', 'assets/img/keys-arrows.png');

	game.load.image('background', 'assets/img/background.png');
    },

    create: function () {
	game.state.start('Menu');
    }
};
