Game.Play = function (game) { };

var time;
var turnCount;
var foodArray;

Game.Play.prototype = {
    create: function () {
				grid = new Array(columns);
				for (var i = 0; i < columns; i++) {
						grid[i] = new Array(rows);
				}

				players = new Array(1);
				players[0] = { color: 'pink', snakeHead: [0, 0], snakePath: new Array(), currentDirection: Directions.Right, nextDirection: Directions.Right, addSquare: false, alive: true, keys: { } };
				players[1] = { color: 'green', snakeHead: [14, 14], snakePath: new Array(), currentDirection: Directions.Left, nextDirection: Directions.Left, addSquare: false, alive: false, keys: { } };

				squares = game.add.group();

				players[0].snakePath.push([0,0]);

				players[1].snakePath.push([14,14]);
				players[1].snakePath.push([15,14]);
				players[1].snakePath.push([16,14]);
				players[1].snakePath.push([17,14]);

				foodArray = [];
				this.generateFood();

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

				turnCount++;
    },

    move: function (player) {
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

				var foodIndex = this.arrayIndexOf(player.snakeHead, foodArray);
				if ( false/* square contains part of any snake */) {

				}
				else if ( foodIndex > -1 ) {
						foodArray.splice(foodIndex, 1);
						player.addSquare = true;
						this.generateFood();
				}

				if (player.addSquare) {
						player.addSquare = false;
				}
				else {
						player.snakePath.pop();
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
				return 20 * pre + 1;
    },

    paint: function () {
				squares.removeAll();

				for (var i = 0; i < players.length; i++) {
						if (players[i].alive) {
								this.paintPlayer(players[i]);
						}
				}
				
				this.paintArr(foodArray, 'food');
    },

    paintPlayer: function (player) {
				this.paintArr(player.snakePath, player.color);
    },

		paintArr: function (arr, color) {
				for (var i = 0; i < arr.length; i++) {
						this.createSquare(arr[i][0], arr[i][1], color);
				}
		},

    createSquare: function (x, y, color) {
				square = squares.create(this.gridLoc(x), this.gridLoc(y), color);
    },

		generateFood: function () {
				var success = false;
				while (!success) {
						x = Math.floor(Math.random() * columns);
						y = Math.floor(Math.random() * rows);

						if (this.squareAt(x, y) == 'empty') {
								this.createSquare(x, y, 'food');
								foodArray.push([x,y]);
								success = true;
						}
				}
		},

		squareAt: function (x, y) {
				if (this.arrayIndexOf([x,y], foodArray) > -1) {
						return 'food';
				}
				
				for (var i = 0; i < players.length; i++) {
						if (this.arrayIndexOf([x,y], players[0].snakePath) > -1) {
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
    }
};
