var storedGames;
var selectedGame;
var sideBar;
var timer;

$(document).ready(function()
{
	initHBScore();
	
});

$(document).keydown(function(event) 
{
	if (event.ctrlKey || event.metaKey) 
	{
		switch (String.fromCharCode(event.which).toLowerCase()) 
		{
			case 's':
					event.preventDefault();
					saveGame();
					break;
		}
	}
});

function initHBScore()
{
	sideBar = $("#stored-scores");
	$("#t1Inc").click(incT1Score);
	$("#t1Dec").click(decT1Score);
	$("#t2Inc").click(incT2Score);
	$("#t2Dec").click(decT2Score);
	$("#t1UseTimeout").click(useT1Timeout);
	$("#t2UseTimeout").click(useT2Timeout);	
	$("#new_game").click(newGame);
	$("#reset_game").click(resetGame);
	$("#save_game").click(saveGame);
	$("#delete_game").click(deleteGame);
 
	//----- CLOSE
	$('[data-popup-close]').click(function(e)  
	{
		clearInterval(timer); timer = null;
		var targeted_popup_class = $(this).attr('data-popup-close');
		$('[data-popup="' + targeted_popup_class + '"]').fadeOut(350);
	});
	
	loadStoredGames();
	displayStoredGames();
	
}

function loadStoredGames()
{
	
	if (localStorage)
	{
		storedGames = JSON.parse(localStorage.getItem("Games"));
		if (storedGames == null)
			storedGames = {};
	}
}

function displayStoredGames()
{
	var sideBar = $("#stored-scores");
	var gameID, gameType, t1Names, t1Score, t2Names, t2Score, 
			t1Timeout, t2Timeout, winner, description;
	
	for (var tempGameID in storedGames)
	{
		var game = storedGames[tempGameID];
		// Init variables for easier testing
		gameID = game.gameID;
		gameType = game.gameType;
		t1Names = game.t1Names;
		t1Score = game.t1Score;
		t1Timeout = game.t1Timeout;
		t2Names = game.t2Names;
		t2Score = game.t2Score;
		t2Timeout = game.t2Timeout;
		winner = game.winner;
		description = game.description;
		
		// Prepend it to the sidebar
		prependToSidebar(gameID, game, t1Names, t2Names);
	}
	
		
}

function deselectGame()
{
	$("#" + selectedGame.gameID).removeClass("selected-item");
	selectedGame = null;
}

function Game(gameID, t1Names, t2Names, t1Score, t2Score, 
							 t1Timeout, t2Timeout, winner, description)
{
	this.gameID = gameID;
	this.t1Names = t1Names;
	this.t2Names = t2Names;
	this.t1Score = t1Score;
	this.t2Score = t2Score;
	this.t1Timeout = t1Timeout;
	this.t2Timeout = t2Timeout;
	this.winner = winner;
	this.description = description;
}

function generateGameID(n)
{
	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	var gameID = "";
	for (var i = 0; i < n; i++)
	{
		gameID += chars.charAt(Math.floor(Math.random() * chars.length));
	}
	return gameID;
}

function saveGame()
{
	var gameID = selectedGame == null ? generateGameID(8) : selectedGame.gameID;
	var t1Names = $("#t1Names").val();
	var t1Score = $("#t1Score").text();
	var t1Timeout = $("#t1Timeout").text();
	var t2Names = $("#t2Names").val();
	var t2Score = $("#t2Score").text();
	var t2Timeout = $("#t2Timeout").text();
	var description = $("#description").val();
	
	if (t1Names === "" || t2Names === "")
	{
		return;
	}
	
	var gameToSave = new Game(gameID, t1Names, t2Names, t1Score, t2Score, t1Timeout, t2Timeout, null, description);
	storedGames[gameID] = gameToSave;
	
	localStorage.setItem("Games", JSON.stringify(storedGames));
	
	if (selectedGame == null)
	{
		var prependedItem = prependToSidebar(gameID, gameToSave, t1Names, t2Names);
		prependedItem.addClass("selected-item");
		$("#delete_game").show();
	} else
	{
		$("#" + selectedGame.gameID).text(t1Names + " vs " + t2Names);
	}
	
	selectedGame = gameToSave;
	alert("Game saved!");
}

function prependToSidebar(gameID, game, t1Names, t2Names)
{
	var temp = $("<li></li>",
						{
							id: gameID,
							class: "score-item",
							text: t1Names + " vs " + t2Names
						});
	temp.click(function() 
	{
		if (selectedGame != null) deselectGame();
		loadGame(gameID);	
		temp.addClass("selected-item");
		console.log(this.className);
	});
	temp.longclick(500, function()
	{
		deleteGame(undefined, gameID);	
	});
	sideBar.prepend(temp);
	
	return temp;
}

function loadGame(gameID)
{
	selectedGame = storedGames[gameID];
	// Check if score already started
	
	// Display the game info
	$("#t1Names").val(selectedGame.t1Names);
	$("#t2Names").val(selectedGame.t2Names);
	$("#t1Score").text(selectedGame.t1Score);
	$("#t2Score").text(selectedGame.t2Score);
	$("t1Timeout").text(selectedGame.t1Timeout);
	$("t2Timeout").text(selectedGame.t12imeout);
	$("#description").val(selectedGame.description);
	$("#reset_game").show();
	$("#delete_game").show();
}

function incT1Score()
{
	$("#t1Score").text(parseInt($("#t1Score").text()) + 1);
}

function decT1Score()
{
	$("#t1Score").text(parseInt($("#t1Score").text()) - 1);
}

function incT2Score()
{
	$("#t2Score").text(parseInt($("#t2Score").text()) + 1);
}

function decT2Score()
{
	$("#t2Score").text(parseInt($("#t2Score").text()) - 1);
}

function useT1Timeout()
{
	if (confirm("Are you sure you want to use a timeout for team 1?"))
	{
		$("#t1Timeout").text(parseInt($("#t1Timeout").text()) + 1);
		openPopup();
		var t1Names = $("#t2Names").val();
		$("#timeout_header").text(t1Names + "'s Timeout");
		startTimer();
	}
		
}

function useT2Timeout()
{
	if (confirm("Are you sure you want to use a timeout for team 2?"))
	{
		$("#t2Timeout").text(parseInt($("#t2Timeout").text()) + 1);
		openPopup();
		var t2Names = $("#t2Names").val();
		$("#timeout_header").text(t2Names + "'s Timeout");
		startTimer();
	}
}

function openPopup()
{
	$('[data-popup="popup-1"]').fadeIn(350);
}

function startTimer()
{
	var seconds = 60;
	var timeObject = $("#time");
	timeObject.text(seconds);
	var currentTime;
	timer = setInterval(function()
	{
		currentTime = parseInt(timeObject.text());
		if (currentTime > 0)
			timeObject.text(currentTime - 1);
		else
		{
			clearInterval(timer); timer = null;
			timeObject.text("Time is up!")
		}
	}, 1000);
}

function newGame()
{
	if (selectedGame != null) deselectGame();
	resetGame();
}

function resetGame()
{
	$("#t1Names").val("");
	$("#t1Score").text(0);
	$("#t1Timeout").text(0);
	$("#t2Names").val("");
	$("#t2Score").text(0);
	$("#t2Timeout").text(0);
	$("#description").val("");
	$("#delete_game").hide();
}

function deleteGame(event, gameID)
{
	if (confirm("Are you sure you want to delete this game?"))
	{
		if (typeof(gameID) === "undefined")
			gameID = selectedGame.gameID;
		$("#" + gameID).remove();
		delete storedGames[gameID];
		localStorage.setItem("Games", JSON.stringify(storedGames));
		newGame();
	}
}

function clearGameStorage()
{
	localStorage.removeItem("Games");
}