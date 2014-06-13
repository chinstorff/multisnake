Game = {};

// initialize variables
var w = 300;
var h = 400;

var grid = [];
var columns = 13;
var rows = 13;

var players = [{}, {}];

var Directions = { Up: 0, Right: 1, Down: 2, Left: 3 };

var colors = ['blue', 'green', 'lime', 'purple', 'orange', 'pink'];
var hexColors = ['#aaccff', '#aaffcc', '#ccffaa', '#ccaaff', '#ffccaa', '#ffaacc'];

Game.Boot = function (game) { };

Game.Boot.prototype = {
    preload: function () {
	// load images for loading screen
    },

    create: function () {
	game.state.start('Load');
    }
};
