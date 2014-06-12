Game.Play = function (game) { };

var time;
var turnCount;
var foodArray;

Game.Play.prototype = {
    create: function () {
	players = new Array(1);
	players[0] = { color: 'purple', snakeHead: [0, 0], snakePath: new Array(), currentDirection: Directions.Down, nextDirection: Directions.Down, foodArray: [], addSquare: false, alive: true, shouldDie: false, keys: { } };
	players[1] = { color: 'green', snakeHead: [columns, 0], snakePath: new Array(), currentDirection: Directions.Down, nextDirection: Directions.Down, foodArray: [], addSquare: false, alive: true, shouldDie: false, keys: { } };

	players[0].snakePath.push([0, 0]);
	players[1].snakePath.push([columns, 0]);

	squares = game.add.group();

	this.generateFood(players[0]);
	this.generateFood(players[1]);

	background = game.add.sprite(0, 0, 'background');
	bgLeft = game.add.sprite(10, 300, 'square-' + players[0].color);
	bgRight = game.add.sprite(155, 300, 'square-' + players[1].color);
	bgLeft.scale.setTo(135 / 18, 90 / 18);
	bgRight.scale.setTo(135 / 18, 90 / 18);

	keysWasd = game.add.sprite(145, 390, 'keys-wasd');
	keysWasd.anchor.setTo(1, 1);
	keysArrows = game.add.sprite(155, 390, 'keys-arrows');
	keysArrows.anchor.setTo(0, 1);

	// controls
	this.addControls(Phaser.Keyboard.W, Phaser.Keyboard.S, Phaser.Keyboard.A, Phaser.Keyboard.D, players[0]);
	this.addControls(Phaser.Keyboard.UP, Phaser.Keyboard.DOWN, Phaser.Keyboard.LEFT, Phaser.Keyboard.RIGHT, players[1]);

	time = game.time.now;
	turnCount = 0;
	
	this.paint();				
    },

    update: function () {
	for (var i = 0; i < players.length; i++) {
	    this.updateControls(players[i]);
	}

	if (Math.floor((game.time.now - time) / 200) > turnCount) {
	    this.advanceTurn();

	    this.paint();
	}
    },

    advanceTurn: function () {
	for (var i = 0; i < players.length; i++) {
	    this.move(players[i]);
	}
	for (var i = 0; i < players.length; i++) {
	    if (players[i].shouldDie) {
		players[i].alive = false;
	    }
	}

	if (this.allDead()) {
	    this.endGame();
	}
	
	turnCount++;
    },

    move: function (player) {
	for (var i = 0; i < players.length; i++) {
	    if (players[i].snakeHead[0] === player.snakeHead[0] && players[i].snakeHead[1] === player.snakeHead[1] && players[i] !== player) {
		player.shouldDie = true;
	    }
	}

	switch (player.nextDirection) {
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

	if (!this.safeForSnake(player.snakeHead[0], player.snakeHead[1])) {
	    player.shouldDie = true;
	}
	else {
	    for (var i = 0; i < players.length; i++) {
		var foodIndex = this.arrayIndexOf(player.snakeHead, players[i].foodArray);
		if (foodIndex > -1) {
		    players[i].foodArray.splice(foodIndex, 1);
		    if (players[i] == player) {
			player.addSquare = true;
		    }
		    this.generateFood(players[i]);
		}
	    }

	    if (player.addSquare) {
		player.addSquare = false
	    }
	    else {
		player.snakePath.pop();
	    }
	}

	player.snakePath.unshift([player.snakeHead[0], player.snakeHead[1]]);
	player.currentDirection = player.nextDirection;
    },

    setLoc: function (x, y, obj) {
	obj.x = this.gridLoc(x);
	obj.y = this.gridLoc(y);
    },

    setDirection: function (dir, player) {
	player.direction = dir;
    },

    gridLoc: function (pre) {
	return 20 * pre + 11;
    },

    allDead: function () {
	anyAlive = false;
	for (var i = 0; i < players.length; i++) {
	    if (players[i].alive) {
		anyAlive = true;
	    }
	}

	return !anyAlive;
    },

    paint: function () {
	squares.removeAll();

	for (var i = 0; i < players.length; i++) {
	    this.paintPlayer(players[i]);
	}
    },

    paintPlayer: function (player) {
	if (player.alive) {
	    this.paintArr(player.snakePath, 'square-' + player.color);
	}
	this.paintArr(player.foodArray, 'food-' + player.color);
    },

    paintArr: function (arr, image) {
	for (var i = 0; i < arr.length; i++) {
	    this.createSquare(arr[i][0], arr[i][1], image);
	}
    },

    createSquare: function (x, y, image) {
	square = squares.create(this.gridLoc(x), this.gridLoc(y), image);
    },

    generateFood: function (player) {
	var success = false;
	while (!success) {
	    x = Math.floor(Math.random() * columns);
	    y = Math.floor(Math.random() * rows);

	    if (this.squareAt(x, y) == 'empty') {
		this.createSquare(x, y, 'food-' + player.color);
		player.foodArray.push([x,y]);
		success = true;
	    }
	}
    },

    safeForSnake: function (x, y) {
	if (x < 0 || x > columns || y < 0 || y > rows) {	    
	    return false;
	}

	if (this.squareAt(x, y) == 'empty' || this.squareAt(x, y).substring(0, 4) == 'food') {
	    return true;
	}

	return false;
    },

    squareAt: function (x, y) {
	for (var i = 0; i < players.length; i++) {
	    if (this.arrayIndexOf([x,y], players[i].foodArray) > -1) {
		return 'food' + i;
	    }

	    if (this.arrayIndexOf([x,y], players[i].snakePath) > -1 && players[i].alive) {
		return 'player' + i;
	    }
	}

	return 'empty';
    },

    arrayIndexOf: function (arr, arr2d) {
	for (var i = 0; i < arr2d.length; i++) {
	    if (arr2d[i][0] === arr[0] && arr2d[i][1] === arr[1]) {
		return i;
	    }
	}

	return -1;
    },

    addControls: function (up, down, left, right, player) {
	player.keys.up = game.input.keyboard.addKey(up);
	player.keys.down = game.input.keyboard.addKey(down);
	player.keys.left = game.input.keyboard.addKey(left);
	player.keys.right = game.input.keyboard.addKey(right);
    },

    updateControls: function (player) {
	if (player.keys.up.isDown && (player.currentDirection != Directions.Down)) {
	    player.nextDirection = Directions.Up;
	}
	else if (player.keys.down.isDown && (player.currentDirection != Directions.Up)) {
	    player.nextDirection = Directions.Down;
	}
	else if (player.keys.left.isDown && (player.currentDirection != Directions.Right)) {
	    player.nextDirection = Directions.Left;
	}
	else if (player.keys.right.isDown && (player.currentDirection != Directions.Left)) {
	    player.nextDirection = Directions.Right;
	}
    },

    endGame: function () {
	game.state.start('Menu');
    }
};
