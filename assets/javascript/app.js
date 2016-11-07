// Wait for page to load
$(document).ready(function()
{
function swapGif()


{
	//Stop Image 
	var playImage = $(this).attr('playsrc');

	console.log(playImage);


	//Stop Image 
	var stopImage = $(this).attr('stopsrc');

	console.log(stopImage);
	
	



	if ($(this).attr('playsrc') == $(this).attr('src'))
	{
		//This changes the image src
		$(this).attr('src', stopImage);
	}

	else
	{
		$(this).attr('src', playImage);
	}
}


//Generic function for displaying gifs
function displaytopicGif()
{

	$('#gifView').empty();
	var topic = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=dc6zaTOxFJmzC&limit=10&offset=0";


	$.ajax({url: queryURL, method: 'GET'})
	.done(function(response) 
	{

		// Creates a generic div to hold the topic
		var topicDiv = $('<div class="topicImage">');
		console.log(response);
		for (i=0; i < response.data.length; i++) 
		{
			var stillImage = response.data[i].images.fixed_height_still.url;
			console.log(stillImage);

			var playImage = response.data[i].images.fixed_height_downsampled.url;
			console.log("Moving"+ playImage);

			//var rating = response.data[i].rating;

			//console.log(rating);
			var image = $("<img>").attr("src", stillImage);
			image.attr("playsrc", playImage);
			image.attr("stopsrc", stillImage);
			
			topicDiv.append(image);

			// Puts the entire topic above the previous celebrities.
			$('#gifView').append(topicDiv);

			image.addClass('playClickedGif'); // Added a class to image tag


		}	
	});
}


	
	// Initial array of topics
	var topics = ['The Simpsons', 'Bugs Bunny', 'Mickey Mouse', 'Sailor Moon', 'Tom and Jerry'];

	// Generic function for displaying topic data 
	function renderButtons()
	{
		// Deletes the topics prior to adding new topics (this is necessary otherwise you will have repeat buttons)
		$('#topicsView').empty();

		// Loops through the array of topics
		for (var i = 0; i < topics.length; i++)
		{

			// Then dynamicaly generates buttons for each topic in the array

			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('topicButton'); // Added a class 
		    a.attr('data-name', topics[i]); // Added a data-attribute
		    a.text(topics[i]); // Provided the initial button text
		    $('#topicsView').append(a); // Added the button to the HTML
		}
	}

	// ========================================================

	// This function handles events where one button is clicked
	$('#addTopic').on('click', function(){

		console.log('button clicked');

		// This line of code will grab the input from the textbox
		var topic = $('#topicInput').val().trim();

		console.log(topic);


		// The topic from the textbox is then added to our array
		topics.push(topic);
		
		// Our array then runs which handles the processing of our topic array
		renderButtons();

		// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
		return false;
	});

	// ========================================================

	// This calls the renderButtons() function
	renderButtons();

	// Generic function for displaying the movieInfo
	$(document).on('click', '.topicButton', displaytopicGif);
	$(document).on('click', '.playClickedGif', swapGif);


});

