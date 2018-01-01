<?php require_once("../includes/session.php"); ?>

<?php $title = "OP"; $active_page = "Home"; $stylesheets = array("/css/MainStyle.css", "/css/ContactMeStyle.css"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/layouts/header.php"); ?>

	<header>
			<h1><!-- <canvas id="canvas" style="width:126px; height:50px;"></canvas> --><a href="/">Steven Liao</a></h1>
			<?php echo navigation("contact"); ?>
	</header>

	<!-- Main content of the resume page -->
	<main id="content">
		<form action="email.php" method="post">
			<fieldset>
			  <legend><b>Contact Me</b></legend>
        <p>Holler at me if you want to get in touch.</p>
				<input type="text" name="cf_name" placeholder="Name" required autofocus>
				<input type="email" name="cf_email" placeholder="Email" required>
				<textarea name="cf_message" placeholder="Message" required></textarea>
				<input type="submit" value="Send">
			</fieldset>
		</form>
	</main>
	
<?php include("../includes/layouts/footer.php"); ?>
