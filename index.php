<?php require_once("includes/session.php"); ?>
<?php //require_once("includes/db_connection.php"); ?>
<?php $title = "OP"; $active_page = "Home"; $stylesheets = array("/css/MainStyle.css", "/css/HomePage.css"); ?>
<?php require_once("includes/functions.php"); ?>
<?php include("includes/layouts/header.php"); ?>

	<header>
			<h1><!-- <canvas id="canvas" style="width:126px; height:50px;"></canvas> --><a href="/">Steven Liao</a></h1>
			<?php echo navigation("home"); ?>
	</header>

	<!-- Main content of the home page -->
	<main id="content">
		<h1>
			NEW WEBSITE UNDER CONSTRUCTION
		</h1>
		<div id="aboutme" class="">
			<h2>About Me</h2><hr class="thick_line">
			<p>
				<img src="images/Self3.jpg">
				Hello! I graduated yesterday (July 8) from Stony Brook University with a bachelor of science in computer science.
				I grew up in New York City. As a kid, I've always liked
				to learn about how things work. The software field has inspired me to continuously learn about new technologies
				and the different things that can be done with those technologies. College has allowed me to enjoy
				various aspects of the computer science field and has taught me many ways to use this acquired knowledge to
				my advantage. As my college career ends, I would like to find an internship or a full time job related to the
				technology field. My ideal career is to be part of a team that is productive, intelligent, and innovative. I
				want to experience the real world and see what challenges would come to me so I can overcome them. 
				<br><br>
				I want to get better in basketball. #MambaMentality
				<br>
				<!-- Make a forum/survey/contact me/feedback. Leave name, company, textbox
				Blogs-->
			</p>
		</div>
		
		<div id="information" class="">
			<h2>Information</h2><hr class="thick_line">
			<p>
				Email: Stvnliao@yahoo.com<br>
				Phone Number: (646) 771-0843<br>
				GitHub: <a class="ext_link" href="https://www.github.com/penspinner" target="_blank">Penspinner</a><br>
				LinkedIn: <a class="ext_link" href="https://www.linkedin.com/in/stliao" target="_blank">Steven Liao</a><br>
				YouTube: <a class="ext_link" href="http://www.youtube.com/32309" target="_blank">2ezpz2plzme</a><br><br>
			</p>
		</div>
		
		<div id="interests" class="pointer">
			<h2>Interests and Hobbies (click to expand)</h2><hr class="thick_line">
			<div id="myInterests">
				<p>
					Anime/Manga/<a class="ext_link" href="//webtoons.com" target="_blank">Webtoons</a><br>
					Doing side programming projects<br>
					Basketball (on and off but back at it again now)<br>
					Handball (interest diminishing)<br>

					<h3>Speedcubing</h3>
					<iframe width="100%" height="480" src="https://www.youtube.com/embed/0bD1_oE8JSg" frameborder="0" allowfullscreen></iframe>

	<!-- 			<h3>Penspinning (retired)</h3>
					Below is a n-year old video of my penspinning skills. I used to be really bad at it, but I dedicated a lot of time to 
					learn and practice these tricks until I can do them smoothly and consistently. This shows that with hard work 
					and dedication pays off.<br>
					<iframe width="600" height="480" src="https://www.youtube.com/embed/oj8EhPw0oAg" frameborder="0" allowfullscreen></iframe> -->
				</p>
			</div>
			<script>
				var interests = $("#interests");
				var myInterests = $("#myInterests");
				interests.click(function() {myInterests.toggle(300);});
			</script>
		</div>
	</main>
	
<?php include("includes/layouts/footer.php"); ?>
