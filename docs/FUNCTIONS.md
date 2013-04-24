## .attr() ##
Get the value of an attribute for the first element in the set of matched elements or set an attribute for every matched element.

**Get attribute value from element**

    .attr(attributeName(string))

**Find attribute in matched elements and update its value**

    .attr(attributeName(string), newValue(string)(optional))
   
<br/>

## .id() ##
Return the id attribute of the first element in the set of matched elements.

<br/>

## .html() ##
For each of the elements in a collection, update it's containing html with user specified value. If no value is passed, then it will return the HTML of the first element in the collection.

	.html(htmlValue(string))

<br/>

## .hasClass() ##
Rather self explanatory. It returns true or false if the element class matches the argument string. Tests the first element only if in a collection. 

	.hasClass(className(string))

<br/>

## .addClass() ##
Pass in a single class name or a comma delimited string to apply to all elements in the collection. 

	.addClass(className1,className2(string))

<br/>

## .removeClass() ##
Pass in a single class name or a comma delimited string to remove all matched classes in the elements collection. 

	.removeClass(className1,className2(string))

<br/>

## .toggle() ##
Pass in a single class name or a comma delimited string to toggle all matched classes in the elements collection. 

	.removeClass(className1,className2(string))

<br/>

## .append() ##
Add HTML to the end of each element in the collection. 

	.append(html(string))

<br/>

## .prepend() ##
Add HTML to the beginning of each element in the collection. 

	.prepend(html(string))

<br/>


## .after() ##
Add HTML after each element in the collection. 

	.after(html(string))

<br/>


## .before() ##
Add HTML before each element in the collection. 

	.before(html(string))

<br/>
>

## .css() ##
Change the css styling for each of the elements in the collection. i.e ```.css({"color":"blue", "margin":"20px"})```

	.css(styles(object))

<br/>

## .hide() ##
Hide all elements in the collection by applying inline css, display:none;.

	.hide()

<br/>

## .show() ##
Hide all elements in the collection by applying inline css, display:block;.

	.show()

<br/>

## .each() ##
Use the each function to manipulate all of the elements in the current collection by passing in a callback function.

	.each(callback(function))

<br/>

	_f("div").each(function(index, element){
		doSomething
	})

<br/>
>

## Flyt.each() ##
Flyt offers an exposed each function that allows you to iterate over any array, not necessarily a Flyt collection. Similar to the regular .each() function, the difference is you pass in the array.

	_f.each(array, callback(function))

<br/>

	var arr = ["some", "text", 2, 4];

	_f.each(arr, function(index, element){
		doSomething
	})

<br/>

## .event() ##
Event is used to apply events to all of the elements in a collection.

	.event(type(string), callback(function))

For example, we can initiate a click event.

	_f("#logo").event("click", function(e){
		e.doSomething;
	})

<br/>

## .find() ##
To use find, chain it off of an initial flyt selector, and pass in the element you'd like to find.

	_f("div").find("img")

This will return all images found in all divs. 

<br/>

## .eq() ##
The eq function stands for equals. It's used to get an element by its index in the current collection. For example, if we had 5 divs in our flyt object, and we wanted to get the second one in the collection, one would use:

	_f("div").eq(1);

<br/>

## .children() ##
The children function will return all of the child elements of the collection. 

	_f("div").children();

<br/>

## .parent() ##
The parent function will return all parent elements in the collection.

	_f("div").parent();