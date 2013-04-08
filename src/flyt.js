/*!
 * Flyt Javascript Framework v2.1.3 by Rob Graham
 * http://www.rfgraham.net/
 *
 * Copyright 2013 rfgraham.net and other contributors
 * Released under the MIT license
 *
 * Date: Sat April 6 2013 10:26:33 GMT-0800 (Pacific Standard Time)
 */

(function(){

	// Our Flyt Class
	function Flyt(selector) {

		var elem;

		// Handle: flyt(""), flyt(null), flyt(undefined), flyt(false)
		if ( !selector ) {

			return this;
			
		}

		
		// return a new flyt object if we're in the wrong scope
		if(window === this) {

			return new Flyt(selector);

		}

		// We're in the correct object scope. Initialize our elements array.
		// If class/id/tag string is passed.
		if (typeof selector === "string") {

			elem = document.querySelectorAll(selector);

			// this.el is the array container for all Nodes
			// used throughout Flyt.
			this.el = this.toArray(elem);

		} else {
			// else Object is passed
			this.el = this.toArray(selector);

		}

		// Set a length to the object;
		this.length = this.el.length;

		// Bool for testing if we're dealing with more than 1 element. 
		this.group = this.length > 1;

		// with the support of HTML5 classList, lets use this as a feature
		// test to see if we're running on IE10 or greater. This way we can 
		// utilize it's performance.
		this.hasClassList = 'classList' in document.createElement('p');
		
		return this;
		
	};

	// Start supported functions
	Flyt.prototype = {

		// Getter and Setter attributes
		attr: function (attr, val){
			
			if(!attr || typeof attr !== "string" || typeof val !== "string") return;

			// If attribute name and value passed, we're setting
			// new attribute values
			if(attr && val) {

				this.each(function(el){ 

					el.setAttribute(attr, val)

				})

			} else {
				// Return requested attribute value from first element of collection
				return this.el[0].getAttribute(attr);

			}

		},

		id: function(){
			// Support only the first element in our element array
			return this.el[0].id;

		},

		html: function (html){
			
			if(!html) return;

			this.each(function(el){

				el.innerHTML = html;

			})

		},

		// Used to create arrays but most importantly
		// changing NodeList's into array collections.
		toArray: function (obj) {

			var arr = [],

				i = 0;

			for (i = obj.length >>> 0; i--;) {

				arr[i] = obj[i];

			}

			return arr;

		},

		hasClass: function(className){

			// return if nothing was passed
			if(!className || typeof className !== "string") return;

			// HTML5 classList Support
			if(this.hasClassList) {
				// return first element if in collection
				return this.el[0].classList.contains(className)

			} else {

				// IE<10
				var pattern = new RegExp('(\\s|^)' + className + '(\\s|$)'),
					// return first element if in collection
					result = pattern.test(this.el[0].className);

				return result; 

			}
			

		},

		// Our add and remove classes function.
		// No point creating two complete addClass and removeClass.
		// DRY!
		addRemoveClass: function(className, removingClass){

			if(!className || typeof className !== "string") return; 

			// If set true, we're removing class names
			removingClass = removingClass || false;

			// Check if we're passing in multiple values;
			var classes = className.split(","),

				classesLength = classes.length, _class,

				i = 0,

				//====== IE<10 ======//
				pattern, // our regex container

				curClassSet, // our current class set

				// When flag is set true, lets set the elements class, otherwise
			  	// we're left with empty class attributes on all elements;
				flag; 

			// HTML5 classList Support
			if(this.hasClassList) {

				this.each(function(el){
					
					try{

						for(; i < classesLength; i++) { 

							if(removingClass) {

								el.classList.remove( classes[i].trim());

								continue;

							} else {

								el.classList.add( classes[i].trim());

							}
							
						}

						i = 0; // reset counter

					} catch(e){}
					

				})
				
			} else {
				// IE<10
				this.each(function(el){
					
					// Store all class values for current element.
					curClassSet = el.className;

					try{

						for(; i < classesLength; i++) {

							// IE8 doesn't support a trim() method so we must resort to regex to trim classes[i]
							_class = classes[i].replace(/^\s+|\s+$/g, '')
							
							pattern = new RegExp('(\\s|^)' + _class + '(\\s|$)');
							
							if(removingClass) {

								// If no match, lets skip to the next iteration
								if(!pattern.test(curClassSet)) continue;
								
								// Start storing the new class set	
								curClassSet = curClassSet.replace(pattern, "");

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

					} catch(e){}

				})

			}

		},

		addClass: function(className){ 

			this.addRemoveClass(className); 

		},

		removeClass: function(className){ 

			this.addRemoveClass(className, true);	

		},

		append: function(html){

			if(!html) return; 

			this.each(function(el){

				el.innerHTML += html;

			})

		},

		preppend: function(html){

			if(!html) return; 

			this.each(function(el){

				el.innerHTML = html += el.innerHTML;

			})

		},

		css: function(styles){
			// CSS styles must be passed in an object {"color":"blue"}
			if(!styles || typeof styles !== "object") return;

			// Iterate over each of the elements in flyt instance
			this.each(function(el){
				// Iterate over each css type:style
				for(var key in styles) {
					//Apply style
					el.style[key] = styles[key];

				}

			})

		},

		hide: function() {

			this.each( function(el) { el.style.display = "none"; } )

		},

		show: function(){

			this.each( function(el) { el.style.display = "block"; } )
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

		each: function(callback){
			// our forEach initiation passing our element collection
			// and user callback function.
			return this.forEach( this.el, callback );

		},

		forEach: function(obj, callback){

			var value,
				
				i = 0,
				
				length = obj.length;

			// Iterate over each object member and fire the callback
			// if provided.
			for ( ; i < length; i++ ) {

				value = callback.call( obj[ i ], obj[ i ], i );

				if ( value === false ) {

					break;

				}

			}

			return obj;

		},

		event: function(type, callback) {

			// Both type and callback must exist for successful event binding
			if(!type || typeof type !== "string" || typeof callback !== "function") return;

			this.each(function(el){
				// e.g element.addEventListener("click", function(e){ doSomething })
				el.addEventListener(type, callback);

			})

		}

	};

	// WARNING: Unfinished and untested 
	Flyt.ajax = function(options){

		// If nothing was passed, or options isn't an object
		if(!options || typeof options !== "object") return;

		var con, // Connection

			url = options.url || document.location, // address or current page 

			data = options.data || "", // Data to send

			type = options.type || "xml", // Content type

			method = options.method || "GET", // GET / POST

			async = options.async || true,

			response;


		con = new XMLHttpRequest();

		con.onreadystatechange = function() {

			if (con.readyState==4 && con.status==200) {

				reponse = con.responseText;

			}

		}

		con.open(method, url, async);
		con.send();

		return response;

	};

	// Expose flyt to the window
	window._f = window.flyt = Flyt;

})()