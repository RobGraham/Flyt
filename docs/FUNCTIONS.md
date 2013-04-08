## .attr() ##
Get the value of an attribute for the first element in the set of matched elements or set an attribute for every matched element.

**Get attribute value from element**

    .attr(attributeName(string))

**Find attribute in matched elements and update its value**

    .attr(attributeName(string), newValue(string)(optional))
   
 

## .id() ##
Return the id attribute of the first element in the set of matched elements.



## .html() ##
For each of the elements in a collection, update it's containing html with user specified value.

	.html(htmlValue(string))



## .hasClass() ##
Rather self explanatory. It returns true or false if the element class matches the argument string. Tests the first element only if in a collection. 

	.hasClass(className(string))



## .addClass() ##
Pass in a single class name or a comma delimited string to apply to all elements in the collection. 

	.addClass(className1,className2(string))



## .removeClass() ##
Pass in a single class name or a comma delimited string to remove all matched classes in the elements collection. 

	.removeClass(className1,className2(string))



## .append() ##
Add HTML to the end of each element in the collection. 

	.append(html(string) or (Node))



## .prepend() ##
Add HTML to the beginning of each element in the collection. 

	.prepend(html(string) or (Node))



## .css() ##
Change the css styling for each of the elements in the collection. i.e ```.css({"color":"blue", "margin":"20px"})```

	.css(styles(object))



## .hide() ##
Hide all elements in the collection by applying inline css, display:none;.

	.hide()



## .show() ##
Hide all elements in the collection by applying inline css, display:block;.

	.show()



## .each() ##
Use the each function to manipulate all of the elements in the current collection by passing in a callback function.

	.each(callback(function))

```_f("div").each(function(e){
		doSomething
})```



## .event() ##
Event is used to apply events to all of the elements in a collection.

	.event(type(string), callback(function))

For example, we can initiate a click event.

	_f("#logo").event("click", function(e){
		e.doSomething;
	})
