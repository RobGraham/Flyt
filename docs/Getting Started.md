## Initiation ##

To create a new flyt instance, it's syntax is similar to other libraries, start by declaring flyt() or _f() and pass in your selector. For example, to achieve a collection of all div's on your page, one will write:

	_f("div");

Simple right? You can also pass in a previous collection of HTML elements. 

Say you had stored a div collection in a variable called "divs":

	var divs = document.getElementsByTagName("div");

You can pass this collection to a new flyt instance to take advantage of the functions flyt offers:

	_f(divs);

<br/>

## Indexed Elements ##
What if you wanted to get the stored elements or a specific element in the flyt collection. How would you do this? 
<br/>Call the "el" property to return the array of elements

	_f("div").el (returns the collection)

or 

	_f("div").el[0] (returns first element)

This will return the nodeList. You cannot chain Flyt functions to this elements directly. If you wish to, you must use the .eq() function.

<br/>

## Chaining ##
Flyt allows you to chain functions together for cleaner code. Some of those functions would be css(), hide(), show(), html(), addClass etc.

So, if one wished to change the html and class of a particular div in a collection, you could write:

	_f("div").eq(4).html("New Content").addClass("hello");


<br/>

## Available Functions ##
To see a list of available functions, please view the FUNCTIONS.md file.