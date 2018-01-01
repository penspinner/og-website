<?php require_once("../includes/session.php"); ?>

<?php $title = "OP"; $active_page = "Home"; $stylesheets = array("/css/MainStyle.css", "/css/TicTacToeStyle.css");
			$extras = "<script src=\"/js/TicTacToe.js\"></script>"?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/layouts/header.php"); ?>

	<header>
			<h1><!-- <canvas id="canvas" style="width:126px; height:50px;"></canvas> --><a href="/">Steven Liao</a></h1>
			<?php echo navigation("tictactoe"); ?>
	</header>

	<!-- Main content of the resume page -->
	<main id="content">
		<canvas id="canvas" width="300" height="300"></canvas>
		<div>
			<br><span id="player_status"></span>
			<br><span id="game_status"></span>
			<br><span id="current_wins"></span>
		</div>
	</main>
	
<?php include("../includes/layouts/footer.php"); ?>
