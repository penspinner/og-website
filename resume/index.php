<?php require_once("../includes/session.php"); ?>

<?php $title = "OP"; $active_page = "Home"; $stylesheets = array("/css/MainStyle.css", "/css/ResumeStyle.css"); ?>
<?php require_once("../includes/functions.php"); ?>
<?php include("../includes/layouts/header.php"); ?>

	<header>
			<h1><!-- <canvas id="canvas" style="width:126px; height:50px;"></canvas> --><a href="/">Steven Liao</a></h1>
			<?php echo navigation("resume"); ?>
	</header>

	<!-- Main content of the resume page -->
	<main id="content">
		<article id="resume">
			<h2>Education</h2><hr class="thick_line">
			<p>
				Stony Brook University (August 2012 - July 2016)<br>
				Bachelor of Science in Computer Science
			</p>
			<h2>Computer Science Courses at Stony Brook University</h2><hr class="thick_line">
			<p>
				User Interface Development<br>Software Engineering<br>Fundamentals of Computer Graphics<br>Analysis of Algorithms
				<br>Computer Networks<br> Principle of Database Systems<br>Computer Architecture<br>Mobile Apps Development (iOS)<br> Computer Music<br> 
				Computer Science III (Java apps)<br> Computer Science II (data structures)<br>Computer Science I (intro)<br>
				Foundations of Computer Science (discrete mathematics)
			</p>
			<h2>Skills</h2><hr class="thick_line">
			<p>
				<b>Coding:</b>
				Java, C, C++, HTML/CSS/JavaScript web development, PHP, Objective-C, MySQL, Python<br>
        <b>Operating Systems:</b>
				Mac OS, Windows, Linux Ubuntu<br>
				<b>Foreign Language:</b>
				Cantonese
			</p>
			<h2>Work Experience</h2><hr class="thick_line">
			<p>
				<b>Library Information Technology Student Worker (February 2015 - July 2016)</b><br>
				Frank Melville Jr. Memorial Library<br>
				<ul>
					<li>Successfully synchronized embedded Twitter feed with Totem Ticker JQuery plugin for library digital signage.</li>
          <li>Provide assistance for computer set-ups and library duties.</li>
          <li>Photograph and film library events for recordkeeping and public display.</li>
        </ul>
				<b>Social Worker's Assistant (July 2009 - August 2009)</b><br>
				Educational Alliance Project Contact<br>
				<ul>
          <li>Assist social workers with receptionist duties and paper work.</li>
          <li>Gained experience in executing receptionist duties such as meticulously organizing paper work chronologically.</li>
        </ul>
			</p>
			<a class="ext_link" href="/pdf/StevenLiao_Resume.pdf" target="_blank"><h2>Resume (PDF)</h2></a>
			<a class="ext_link" href="resume" target="_blank"><h2>Resume (HTML)</h2></a>
		</article>
	</main>
	
<?php include("../includes/layouts/footer.php"); ?>
