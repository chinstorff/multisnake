Game.Play = function (game) { };

var time;
var turnCount;

Game.Play.prototype = {
    create: function () {
	grid = new Array(columns);
	for (var i = 0; i < columns; i++) {
	    grid[i] = new Array(rows);
	}

	players = new Array(1);
	players[0] = { color: '#f5f5f5', snakeHead: [0, 0], snakePath: new Array(), direction: Directions.Right, addSquare: false };

	squares = game.add.group();

	players[0].snakePath.push([0,0]);
	players[0].snakePath.push([-1,0]);
	players[0].snakePath.push([-2,0]);
	players[0].snakePath.push([-3,0]);


	// controls
	cursors = game.input.keyboard.createCursorKeys();
	cursors.up.onDown.add(function () { players[0].direction = Directions.Up }, this);
	cursors.down.onDown.add(function () { players[0].direction = Directions.Down }, this);
	cursors.left.onDown.add(function () { players[0].direction = Directions.Left }, this);
	cursors.right.onDown.add(function () { players[0].direction = Directions.Right }, this);

	time = game.time.now;
	turnCount = 0;

	this.paint();
  
    },

    update: function () {
	if (Math.floor((game.time.now - time) / 200) > turnCount) {
	    this.advanceTurn();
	    console.log(players[0].snakePath);

	    this.paint();
	}

    },

    advanceTurn: function () {
	this.move(players[0]);

	turnCount++;
    },

    move: function (player) {
	if (player.addSquare) {
	    player.addSquare = false;
	}
	else {
	    player.snakePath.pop();
	}

	switch (player.direction) {
	case Directions.Up:
	    player.snakeHead[1] -= 1;
	    break;
	case Directions.Down:
	    player.snakeHead[1] += 1;
	    break;
	case Directions.Left:
	    player.snakeHead[0] -= 1;
	    break;
	case Directions.Right:
	    player.snakeHead[0] += 1;
	    break;
	}

	player.snakePath.unshift([player.snakeHead[0], player.snakeHead[1]]);
    },

    setLoc: function (x, y, obj) {
	obj.x = this.gridLoc(x);
	obj.y = this.gridLoc(y);
    },

    setDirection: function (dir, player) {
	player.direction = dir;
    },

    gridLoc: function (pre) {
	return 20 * pre + 1;
    },

    paint: function () {
	console.log('inside paint()');

	squares.removeAll();

	for (var i = 0; i < players.length; i++) {
	    console.log('player ' + i);
	    this.paintPlayer(players[i]);
	}
    },

    paintPlayer: function (player) {
	console.log('inside paintPlayer()');
	for (var i = 0; i < player.snakePath.length; i++) {
	    this.createSquare(player.snakePath[i][0], player.snakePath[i][1], player.color);
	}
    },

    createSquare: function (x, y, color) {
	console.log('inside createSquare()');
	square = squares.create(this.gridLoc(x), this.gridLoc(y), 'square_green');
	square.scale.setTo(18, 18);
    }
};
