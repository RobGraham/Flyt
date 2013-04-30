/*!
 * Flyt Javascript Framework v2.2.1 by Rob Graham
 * http://www.rfgraham.net/
 *
 * Copyright 2013 rfgraham.net and other contributors
 * Released under the MIT license
 *
 * Date: Sat April 29 2013 1:46:40 GMT-0800 (Pacific Standard Time)
 */

(function(window){

	// Use the correct document
	var document = window.document,
		location = window.location;

	// Our Flyt Class
	function Flyt(selector) {

		// Handle: flyt(""), flyt(null), flyt(undefined), flyt(false)
		if ( !selector ) {

			return this;

		}

		// return a new flyt object if we're in the wrong scope
		if(window === this) {

			return new Flyt(selector);

		}

		// The exposed "el" property is our element storage in which we
		// will keep an array of DOM Nodes. 
		this.el = null;

		// Start detecting what type of selector/object was passed
		switch (true) {

			// We're in the correct object scope. Initialize our elements array.
			// If class/id/tag string is passed.
			case typeof selector === "string":

				this.el = this.toArray(document.querySelectorAll(selector));

				break;

			// Single Node element passed, feature detection
			case "nodeName" in selector:

				this.el = [selector];

				break;

			// NodeList is passed, feature detection
			case "item" in selector:

				this.el = this.toArray(selector);

				break;

			// Array was passed
			default:

				this.el = selector;

		}

		// Set a length to the object;
		this.length = this.el.length;

		// Bool for testing if we're dealing with more than 1 element (collection). 
		this.group = this.length > 1;

		// with the support of HTML5 classList, lets use this as a feature
		// test to see if we're running on IE10 or greater. This way we can 
		// utilize it's performance.
		this.hasClassList = "classList" in document.createElement('p');
			
		// Return Flyt instance.
		return this; 
		
	}

	// Start supported functions
	Flyt.prototype = {

		// Getter and Setter attributes
		attr: function (attr, val){
			
			if(!attr || typeof attr !== "string") return;

			// If attribute name and value passed, we're setting
			// new attribute values
			if(attr && val) {

				this.each(function(){

					this.setAttribute(attr, val);

				})

			} else {

				// Return requested attribute value from first element of collection
				return this.el[0].getAttribute(attr);

			}

		},

		id: function(){
			// Support only the first element in our element collection
			return this.el[0].id;

		},

		// Used to create arrays but most importantly
		// changing NodeList's into array collections.
		toArray: function (obj) {

			var arr = [],

				objL = obj.length,

				i = 0;

			for ( ; i < objL; i++) {

				arr.push(obj[i]);

			}
			
			return arr;

		},

		hasClass: function(className){

			// return if nothing was passed
			if(!className || typeof className !== "string") return;

			// HTML5 classList Support
			if(this.hasClassList) {
				// return first element if in collection
				return this.el[0].classList.contains(className);

			} else {

				// IE<10
				var pattern = new RegExp('(\\s|^)' + className + '(\\s|$)'),
					// return first element if in collection
					result = pattern.test(this.el[0].className);

				return result; 

			}
			
		},

		// INTERNAL USE ONLY
		// Our add and remove classes function.
		// No point creating two complete addClass and removeClass.
		// DRY!
		addRemoveClass: function(className, removingClass, toggle){

			if(!className || typeof className !== "string") return; 

			// If set true, we're removing class names
			removingClass = removingClass || false;

			// If true, we're toggling the passed className
			toggle = toggle || false;

			// Check if we're passing in multiple values;
			var classes = className.split(","),

				classesLength = classes.length, _class,

				i = 0,

				//====== IE<10 ======//
				pattern, // our regex container

				curClassSet, // our current class set

				// When flag is set true, lets set the elements class attribute, otherwise
			  	// we're left with empty class attributes on all elements, which
			  	// we don't want.
				flag; 

			// HTML5 classList Support
			if(this.hasClassList) {

				this.each(function(index,el){

					for(; i < classesLength; i++) { 

						_class = classes[i].trim();

						if(removingClass) {

							el.classList.remove( _class );

							continue;

						}  else if (toggle) {

							el.classList.toggle( _class );

							continue;

						} else {

							el.classList.add( _class );

						}
						
					}

					i = 0; // reset counter					

				})
				
			} else {

				// IE<10
				this.each(function(index,el){
					
					// Store all class values for current element.
					curClassSet = el.className;

					for(; i < classesLength; i++) {

						// IE8 doesn't support a trim() method so we must resort to regex to trim classes[i]
						_class = classes[i].replace(/^\s+|\s+$/g, '');
						
						pattern = new RegExp('(\\s|^)' + _class + '(\\s|$)');
						
						if(removingClass) {

							// If no match, lets skip to the next iteration
							if(!pattern.test(curClassSet)) continue;
							
							// Start storing the new class set	
							curClassSet = curClassSet.replace(pattern, "");

							flag = true;

						} else if (toggle) {
			
							if(pattern.test(curClassSet)) {

								// Start storing the new class set	
								curClassSet = curClassSet.replace(pattern, "");

							} else {

								// append our class
								curClassSet += " " + _class;

							}

							flag = true;

						} else {

							// If there is already the class name present, skip
							if(pattern.test(curClassSet)) continue;

							// append our class
							curClassSet += " " + _class;

							flag = true;

						}
						
					}

					// Set the elements class attribute with the new values
					if(flag) el.setAttribute("class", curClassSet);

					// reset
					curClassSet = flag = null; 

					i = 0;

				})

			}

		},

		addClass: function(className){ 

			this.addRemoveClass(className); 

			return this;

		},

		removeClass: function(className){ 

			this.addRemoveClass(className, true);

			return this;

		},

		// Toggle class name, on or off
		toggle: function(className) {

			this.addRemoveClass(className, false, true);

			return this;

		},

		html: function (html){

			// If no HMTL has been passed, return the HTML of the first
			// element in the collection.
			if(!html) return this.el[0].innerHTML;

			// Otherwise replace the HTML for each element in the collection
			this.insertHTML("innerHTML", html);

			return this;

		},

		append: function(html){

			this.insertHTML("beforeend", html);

			return this;

		},

		prepend: function(html){

			this.insertHTML("afterbegin", html);

			return this;

		},

		// Add HTML or Text before the specified elements
		before: function(html) {

			this.insertHTML("beforebegin", html);

			return this;

		},

		// Add HTML or Text after the specified elements
		after: function(html) {

			this.insertHTML("afterend", html);

			return this;

		},

		// The HTML lifter for append, prepend, before and after
		insertHTML: function(where, html) {

			// if no html string or node and location are passed, return;
			if(!(html && where)) return;

			// If our html variable is a string, use native functions
			// to add our text/html
			if(typeof html === "string") {

				// innerHTML relates to our html() function call
				if(where === "innerHTML") {

					this.each(function(i, el){

						el.innerHTML = html;

					})

				} else {

					// Leverage native positioning function
					// before, after, append, prepend types.
					this.each(function(i, el){

						el.insertAdjacentHTML(where, html);

					});

				}

			// An HTML node was passed	
			} else if (html.nodeType === 1) {

				switch(where) {

					case "innerHTML":

						this.each(function(i, el){

							// Check to see if what we're trying to insert is
							// already a child of the element. If so lets clone it
							// and insert, otherwise it will be deleted during
							// the process
							if(el.contains(html)) {

								// We must clear the elements current HTML
								el.innerHTML = "";

								// Add the HTML replacement
								el.appendChild(html.cloneNode(true));

							}  else {

								// We must clear the elements current HTML
								el.innerHTML = "";

								// Add the HTML replacement
								el.appendChild(html);

							}

						})

					break;

					// Append
					case "beforeend":

						this.each(function(i, el){

							el.appendChild(html);

						})

					break;

					// Before
					case "beforebegin":

						this.each(function(i, el){

							if(el.parentNode) {
							
								el.parentNode.insertBefore(html, el);
							
							}

						})

					break;

					// Prepend
					case "afterbegin":

						this.each(function(i, el){
							
							var child = el.firstChild;

							// If we have a first child in our element, insert our html
							// before that child, otherwise we have no children so just append
							// a new child with our html.
							child ? el.insertBefore(html, child) : el.appendChild(html);

						})

					break;

					// After
					case "afterend":

						this.each(function(i, el){
							
							var parent = el.parentNode;

							//if the parents lastchild is the target element
							if(parent.lastChild == el) {
								//add the new element after the target element.
								parent.appendChild(html);

							} else {
								// else the target has siblings, insert the new element between the target and it's next sibling.
								parent.insertBefore(html, el.nextSibling);

							}
							
						})

					break;

				}

			}
			
		},
		
		css: function(styles){
			// CSS styles must be passed in an object {"color":"blue"}
			if(!styles || typeof styles !== "object") return;

			// Iterate over each of the elements in flyt instance
			this.each(function(i, el){
				// Iterate over each css type:style
				for(var key in styles) {
					//Apply style
					el.style[key] = styles[key];

				}

			});

			return this;

		},

		hide: function() {

			this.each( function() { this.style.display = "none"; } )

			return this;

		},

		show: function(){

			this.each( function() { this.style.display = "block"; } )

			return this;
		},

		width: function(){
			// If flyt instance contains more than one el, do nothing.
			if(this.group) return;

			// Otherwise, return the elements full width.
			return this.el[0].offsetWidth;

		},

		height: function(){
			// If flyt instance contains more than one el, do nothing.
			if(this.group) return;

			// Otherwise, return the elements full height.
			return this.el[0].offsetHeight;

		},

		// Iterate over an array collection
		each: function(callback){
			// our forEach initiation passing our element collection
			// and user callback function.
			return this.forEach( this.el, callback );

		},

		// The forEach function is called directly for internal use only.
		forEach: function(obj, callback){

			var value,
				
				i = 0,
				
				length = obj.length;

			// Iterate over each object member
			for ( ; i < length; i++ ) {	

				// Fire our callback function if provided
				value = callback.call(obj[ i ], i, obj[ i ] );

				if ( value === false ) {

					break;

				}

			}

			return obj;

		},

		// Apply events to elements passing the event type and 
		// callback instructions
		event: function(type, callback) {

			// Both type and callback must exist for successful event binding
			if(!type || typeof type !== "string" || typeof callback !== "function") return;

			// iterate over each element and apply the event type. 
			this.each(function(i, el){

				el.addEventListener(type, callback);

			})

		},

		// Find all elements that match the passed selector
		// within the current collection
		find: function(selector) {

			if(!selector && typeof selector !== "string") return;
			
			var found = [];

			// Find all instances of the requested query from the collection.
			// Store all Nodes into an array to be passed as a new instance of Flyt.
			this.each(function(i,el) {
	
				found.push.apply( 

					found, Flyt.prototype.toArray(el.querySelectorAll(selector))

				) 

			})
			
			return new Flyt(found);

		},

		// Return the element in our array collection that matches the 
		// index number passed.
		eq: function(index){

			// Return the selected index of an element in current collection
			return new Flyt(this.el[index]);

		},

		// Find all children of elements in the collection
		children: function() {

			var found = [];

			// Collect all child nodes of the collection to an 
			// array and return a new instance of Flyt with the children.
			this.each(function(i,el){
	
				found.push.apply( found, Flyt.prototype.toArray(el.children) ) 

			})
			
			return new Flyt(found);

		},

		// Find all direct parents of elements in the collection 
		// and return a new instance of Flyt with the parents.
		parent: function() {

			var found = [];

			this.each(function(i,el){
	
				found.push( el.parentNode ) 

			})
			
			return new Flyt(found);
		},

		// Native contains function to check if the element
		// passed is a child of the first element in our collection
		// true / false
		contains: function(element){

			if(!element || element.nodeType !== 1) return;

			return this.el[0].contains(element);

		},

		// Remove the elements from the DOM but clone them
		// and return the new Flyt collection for manipulation
		detach: function(){

			var cloned = [];

			this.each(function(i,el){

				cloned.push(el.cloneNode(true));

				el.parentNode.remove(el);

			})

			return new Flyt(cloned);

		},

		// Remove the element(s) from the DOM
		remove: function( selector ) {

			// If we've passed a selector, find the elements within
			// our current collection, otherwise we're removing all 
			// elements in our collection
			var elems = selector ? this.find(selector).el : this.el;

				len = elems.length;

				i = 0;

			for ( ; i<len; i++ ) {
				
				if ( elems[i].parentNode ) {

					elems[i].parentNode.removeChild( elems[i] );

					// Future improvements to be added to remove the instance
					// from our Flyt collection for garbage collection. 

				}

			}

		},

		// Return first element in the collection
		first: function(){

			return new Flyt(this.el[0]);

		},

		// Return last element in the collection
		last: function(){

			return new Flyt(this.el[this.length-1]);

		}

	};


	// Our exposed each function which can be used
	// for any array, not specifically a Flyt collection
	Flyt.each = function(obj, callback){
		
		return new Flyt(obj).forEach( obj, callback );

	};

	// Expose flyt to the window
	window._f = window.flyt = Flyt;

})(window)