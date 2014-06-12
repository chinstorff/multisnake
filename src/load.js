Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen
	game.stage.backgroundColor = '#222222';

	// load everything
	game.load.image('square-green', 'assets/img/square-green.png');
	game.load.image('square-blue', 'assets/img/square-blue.png');
	game.load.image('square-orange', 'assets/img/square-orange.png');
	game.load.image('square-purple', 'assets/img/square-purple.png');
	game.load.image('square-pink', 'assets/img/square-pink.png');
	game.load.image('square-lime', 'assets/img/square-lime.png');
	
	game.load.image('food-green', 'assets/img/food-green.png');
	game.load.image('food-blue', 'assets/img/food-blue.png');
	game.load.image('food-orange', 'assets/img/food-orange.png');
	game.load.image('food-purple', 'assets/img/food-purple.png');
	game.load.image('food-pink', 'assets/img/food-pink.png');
	game.load.image('food-lime', 'assets/img/food-lime.png');

	game.load.image('keys-wasd', 'assets/img/keys-wasd.png');
	game.load.image('keys-arrows', 'assets/img/keys-arrows.png');

	game.load.image('background', 'assets/img/background.png');
    },

    create: function () {
	game.state.start('Menu');
    }
};
