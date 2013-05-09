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
<br/>By simply calling Flyt, it will return an object with all the matching elements as indexed properties.

	_f("div") (returns the collection)

or 

	_f("div")[0] (returns first element)

If you do specify an index of the element, as shown in the example above "_f("div")[0]", this will return the element itself. You cannot chain Flyt functions directly in this manner. If you wish to, you must use the .eq() function. To learn more about the eq() function, please read the documentation. 

<br/>

## Chaining ##
Flyt allows you to chain functions together for cleaner code. Some of those functions would be css(), hide(), show(), html(), addClass etc.

So, if one wished to change the html and class of a particular div in a collection, you could write:

	_f("div").eq(4).html("New Content").addClass("hello");


<br/>

## Available Functions ##
To see a list of available functions, please view the FUNCTIONS.md file.