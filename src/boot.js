Game = {};

// initialize variables
var w = 300;
var h = 400;

var grid = [];
var columns = 10;
var rows = 10;

var players;

var Directions = { Up: 0, Right: 1, Down: 2, Left: 3 };

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	// load images for loading screen
    },

    create: function () {
	game.state.start('Load');
    }
};
