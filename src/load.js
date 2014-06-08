Game.Load = function (game) { };

Game.Load.prototype = {
    preload: function () {
	// create loading screen
	game.stage.backgroundColor = '#fca';

	// load everything
	game.load.image('square_green', 'assets/img/green.png');
    },

    create: function () {
	game.state.start('Menu');
    }
};
