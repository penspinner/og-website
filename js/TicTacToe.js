
var canvas;
var canvas2D;
var grid;
var unitSize;
var offset;
var finishLineOffset;
var human;
var computer;
var turnsPlayed;
var currentWins = 0;

function init()
{
	canvas = document.getElementById("canvas");
	canvas2D = canvas.getContext("2d");
	canvas2D.lineWidth = 5;
	
	// Offsets to draw the X/O and the crossing line for winner
	offset = 50;
	finishLineOffset = 25;
	
	// Size of each box on the grid
	unitSize = canvas.width / 3;
	
	currentWins = 0;
	document.getElementById("current_wins").innerHTML = "Current wins: " + currentWins;
	
	resetGame();
}

function resetGame()
{
	// Grid that shows which spaces are used (0 - open space, 1 - X, 2 - O)
	grid = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
	
	turnsPlayed = 0;
	
	// 1 - X, 2 - O
	human = Math.round(Math.random() + 1);
	computer = human == 1 ? 2 : 1;

	canvas.removeEventListener("mouseup", resetGame);
	
	canvas2D.clearRect(0, 0, canvas.width, canvas.height);
	startGame();
}

function startGame()
{
	canvas.addEventListener("mouseup", humanPlay);
	
	// Render the grid
	drawGrid();
	
	// Decide if computer AI goes first or not
	if (Math.random() > 0.50)	computerPlay();

	if (human == 1) 
		document.getElementById("player_status").innerHTML = "You: X - Comp: O";
	else 
		document.getElementById("player_status").innerHTML = "You: O - Comp: X";

	document.getElementById("game_status").innerHTML = "Start!";
}

function humanPlay(event)
{
	var canvasMousePos = getCanvasMousePos(event);
	var successfulDrawn = drawXorO(canvasMousePos);
	if (successfulDrawn)
	{
		turnsPlayed++;
		
		// Check the board for winner or tie
		var result = checkWinner(human);
		if (result != -1)
		{
			canvas.removeEventListener("mouseup", humanPlay);
			endGame(result);
		} else
		{
			computerPlay();
		}
	}
}

function computerPlay()
{
	// document.getElementById("game_status").innerHTML = "Computer's turn!";
	var randomIndexX, randomIndexY;
	
	// Make sure the AI chooses an open space
	do
	{
		randomIndexX = Math.round(Math.random() * 2);
		randomIndexY = Math.round(Math.random() * 2);
	} while(grid[randomIndexX][randomIndexY] != 0);
	
	var cellX = randomIndexX * unitSize;
	var cellY = randomIndexY * unitSize;
	
	draw(computer, cellX + offset, cellY + offset);
	// Set grid to computer's piece
	grid[randomIndexX][randomIndexY] = computer;
	
	turnsPlayed++;

	// Check the board for winner or tie
	var result = checkWinner(computer);
	if (result != -1)
	{
		canvas.removeEventListener("mouseup", humanPlay);
		// End game
		endGame(result);
	}
}

// -1 - no winner, 0 - draw, 1/2 = win
function checkWinner(player)
{
	// Make sure at least 3 pieces are played
	if (turnsPlayed >= 3)
	{
		canvas2D.beginPath();
		if (grid[0][0] == player && grid[0][1] == player && grid[0][2] == player)
		{
			// Vertical line from top left ot bottom left
			canvas2D.moveTo(0 + offset, finishLineOffset);
			canvas2D.lineTo(0 + offset, 2 * unitSize + offset + finishLineOffset);
			canvas2D.stroke();
			return player;
		} else if (grid[1][0] == player && grid [1][1] == player && grid[1][2] == player)
		{
			// Vertical line from top middle to bottom middle
			canvas2D.moveTo(1 * unitSize + offset, finishLineOffset);
			canvas2D.lineTo(1 * unitSize + offset, 2 * unitSize + offset + finishLineOffset);
			canvas2D.stroke();
			return player;
		} else if (grid[2][0] == player && grid[2][1] == player && grid[2][2] == player)
		{
			// Vertical line from top right to bottom right
			canvas2D.moveTo(2 * unitSize + offset, finishLineOffset);
			canvas2D.lineTo(2 * unitSize + offset, 2 * unitSize + offset + finishLineOffset);
			canvas2D.stroke();
			return player;
		}
		else if (grid[0][0] == player && grid[1][1] == player && grid[2][2] == player)
		{
			// Diagonal line from top left to bottom right
			canvas2D.moveTo(finishLineOffset, finishLineOffset);
			canvas2D.lineTo(2 * unitSize + offset + finishLineOffset, 2 * unitSize + offset + finishLineOffset);
			canvas2D.stroke();
			return player;
		} else if (grid[2][0] == player && grid[1][1] == player && grid[0][2] == player)
		{
			// Diagonal line from top right to bottom left
			canvas2D.moveTo(2 * unitSize + offset + finishLineOffset, finishLineOffset);
			canvas2D.lineTo(finishLineOffset, 2 * unitSize + offset + finishLineOffset);
			canvas2D.stroke();
			return player;
		}
		else if (grid[0][0] == player && grid[1][0] == player && grid[2][0] == player)
		{
			// Horizontal line from top left to top right
			canvas2D.moveTo(finishLineOffset, offset);
			canvas2D.lineTo(2 * unitSize + offset + finishLineOffset, 0 + offset);
			canvas2D.stroke();
			return player;
		} else if (grid[0][1] == player && grid[1][1] == player && grid[2][1] == player)
		{
			// Horizontal line from middle left to middle right
			canvas2D.moveTo(finishLineOffset, 1 * unitSize + offset);
			canvas2D.lineTo(2 * unitSize + offset + finishLineOffset, 1 * unitSize + offset);
			canvas2D.stroke();
			return player;
		} else if (grid[0][2] == player && grid[1][2] == player && grid[2][2] == player)
		{
			// Horizontal line from bottom left to bottom right
			canvas2D.moveTo(finishLineOffset, 2 * unitSize + offset);
			canvas2D.lineTo(2 * unitSize + offset + finishLineOffset, 2 * unitSize + offset);
			canvas2D.stroke();
			return player;
		} else if (turnsPlayed >= 9)
			return 0;
	}
	return -1;
}

function endGame(result)
{
	if (result == 0)
	{
		document.getElementById("game_status").innerHTML = "DRAW!";
	} else if (result == human)
	{
		document.getElementById("game_status").innerHTML = "You win!";
		document.getElementById("current_wins").innerHTML = "Current wins: " + (++currentWins);
	} else if (result == computer)
	{
		document.getElementById("game_status").innerHTML = "You lose!";
	}
	canvas.addEventListener("mouseup", resetGame);
}

function drawXorO(pos)
{
	// These will hold the x and y coordinates of the actual cell that is clicked on.
	var cellX, cellY;
	var index;
	for (var x = 0; x < 3; x++)
	{
		for (var y = 0; y < 3; y++)
		{
			// Compute the cell coordinate by multiplying the for-loop variables with
			// the unitSize (100);
			cellX = x * unitSize;
			cellY = y * unitSize;
			
			// If the mouse click position is within the cell range
			if (isPosWithinRange(pos.x, pos.y, cellX, cellY))
			{
				index = getGridIndex(pos.x, pos.y);
				
				// If the cell isn't used
				if (grid[index.x][index.y] == 0)
				{
					// Render X or O 
					draw(human, cellX + offset, cellY + offset);
					
					// Update the grid
					grid[index.x][index.y] = human;
					return true;
				}
				
			}
		}
	}
	return false;
}

function draw(player, x, y)
{
	// Render X or O 
	if (player === 1)
		drawX(x, y);
	else
		drawO(x, y);
}

function getGridIndex(x, y)
{
	var xIndex = Math.floor(x / unitSize);
	var yIndex = Math.floor(y / unitSize);
	return {x: xIndex, y: yIndex};
}

function isPosWithinRange(x, y, cellX, cellY)
{
	if (x >= cellX && x <= cellX + unitSize &&
		y >= cellY && y <= cellY + unitSize)
	{
		return true;
	}
	return false;
}

function getCanvasMousePos(event)
{
	var rect = canvas.getBoundingClientRect();
	var canvasX = event.clientX - rect.left;
	var canvasY = event.clientY - rect.top;
	console.log("x: " + canvasX + ", y: " + canvasY);
	return {x: canvasX, y: canvasY};
}

function drawGrid()
{
	canvas2D.beginPath();
	
	// Draw vertical lines
	canvas2D.moveTo(100, 0);
	canvas2D.lineTo(100, 300);
	canvas2D.moveTo(200, 0);
	canvas2D.lineTo(200, 300);
	
	// Draw horizontal lines
	canvas2D.moveTo(0, 100);
	canvas2D.lineTo(300, 100);
	canvas2D.moveTo(0, 200);
	canvas2D.lineTo(300, 200);
	
	canvas2D.strokeStyle = "black";
	canvas2D.stroke();
}

function drawX(x, y)
{
	canvas2D.beginPath();
	canvas2D.strokeStyle = "#00EEFF"; // light blue
    
    canvas2D.moveTo(x - 20, y - 20);
    canvas2D.lineTo(x + 20, y + 20);
    canvas2D.stroke();

    canvas2D.moveTo(x + 20, y - 20);
    canvas2D.lineTo(x - 20, y + 20);
    canvas2D.stroke();
}

function drawO(x, y)
{
	canvas2D.beginPath();
	canvas2D.strokeStyle = "#00FF33"; // light green
	canvas2D.arc(x, y, 20, 0, 2 * Math.PI);
	canvas2D.stroke();
}

$(document).ready(init);
