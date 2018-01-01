$(document).ready(function()									
{
	$("#steven_stocks_button").click(function()
	{
		$("#cse305_certificate").toggle();
		if ($(this).text() == "View certificate")
		{
			$(this).text("Hide certificate");
		} else
		{
			$(this).text("View certificate");	
		}
	});
	
	$("#handball_button").click(function()
 	{
		$("#handball_app_images").toggle();
		if ($(this).text() == "Show images")
		{
			$(this).text("Hide images");
		} else
		{
			$(this).text("Show images");	
		}
	});
});