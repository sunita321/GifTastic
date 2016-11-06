// begin document.ready function
$(document).ready(function() 
{
	// Initial array of celebrities
	var celebrities = ['kanye west', 'jennifer lawrence', 'mindy kaling', 'arnold schwarzenegger'];


	function renderButtons(){ 
		// Deletes the movies prior to adding new movies (this is necessary otherwise you will have repeat buttons)
		$('#gifView').empty();
		// Loops through the array of movies
		for (var i = 0; i < celebrities.length; i++){
			// Then dynamicaly generates buttons for each movie in the array
			// Note the jQUery syntax here... 
		    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
		    a.addClass('star'); // Added a class 
		    a.attr('data-name', celebrities[i]); // Added a data-attribute
		    a.text(celebrities[i]); // Provided the initial button text
		    $('gifView').append(a); // Added the button to the HTML
		}
	}

//Generic function for displaying movie data 
// displayCelebrityGif function now re-renders the HTML to display the appropriate content. 
//function displayCelebrityGif()
//{
	var celebrity = $(this).attr('data-name');
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + "kanye+west" + "&api_key=dc6zaTOxFJmzC&limit=1&offset=0";
	// http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC&limit=1&offset=0



	$.ajax({url: queryURL, method: 'GET'})
	.done(function(response) 
	{

		// Creates a generic div to hold the celebrity
			var celebrityDiv = $('<div class="celebrity">');
	     console.log(response);
	     for (i=0; i < response.data.length; i++) 
	     {
	     	var stillImage = response.data[i].images.fixed_height_still.url;
	     	console.log(stillImage);

	     	var rating = response.data[i].rating;

	     	console.log(rating);
	     	var image = $("<img>").attr("src", stillImage);

	     	celebrityDiv.append(image);

	     	// Puts the entire celebrity above the previous celebrities.
			$('#gifView').prepend(celebrityDiv);


	
	};

})

});

	