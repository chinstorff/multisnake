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
	players[0] = { color: '#f5f5f5', snake_head: [0, 0], snake_path: new Array(), direction: Directions.Right };

	players[0].snake_path.push(players[0].snake_head);

	head = game.add.sprite(0, 0, 'square_green');
	head.scale.setTo(18, 18);
	this.moveTo(1, 1, head);


	// controls
	cursors = game.input.keyboard.createCursorKeys();
	cursors.up.onDown.add(function () { players[0].direction = Directions.Up }, this);
	cursors.down.onDown.add(function () { players[0].direction = Directions.Down }, this);
	cursors.left.onDown.add(function () { players[0].direction = Directions.Left }, this);
	cursors.right.onDown.add(function () { players[0].direction = Directions.Right }, this);

	time = game.time.now;
	turnCount = 0;
    },

    update: function () {
	if (Math.floor((game.time.now - time) / 700) > turnCount) {
	    this.advanceTurn();
	    console.log(game.time.now);
	}
    },

    advanceTurn: function () {
	this.move(players[0].direction, head);
	turnCount++;
    },

    move: function (dir, obj) {
	switch (dir) {
	case Directions.Up:
	    obj.y -= 20;
	    break;
	case Directions.Down:
	    obj.y += 20;
	    break;
	case Directions.Left:
	    obj.x -= 20;
	    break;
	case Directions.Right:
	    obj.x += 20;
	    break;
	}
    },

    moveTo: function (x, y, obj) {
	obj.x = this.gridLoc(x);
	obj.y = this.gridLoc(y);
    },

    setDirection: function (dir, player) {
	player.direction = dir;
    },

    gridLoc: function (pre) {
	return 20 * pre + 1;
    }
};
