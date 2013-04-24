/*
 * Flyt Javascript Framwork v1.0.0 by Rob Graham
 * http://www.rfgraham.net/
 *
 * Copyright 2012 rfgraham.net and other contributors
 * Released under the MIT license
 *
 * Date: Fri Dec 14 2012 08:20:33 GMT-0800 (Pacific Standard Time)
 */
function $(id) {var el; if (/^[.|#]/.test(id)) {el = document.querySelectorAll(id); if (el.length === 1) {return el[0]; } else {return toArray(el); } } else {el = document.getElementsByTagName(id); if (el.length === 1) {return el[0]; } else {return toArray(el); } } } 
function attr(id, attr){return id.getAttribute(attr)}
function html(id, html){ if(id instanceof NodeList) id = toArray(id); (id instanceof HTMLElement) ? id.innerHTML = html : id.forEach(function(el){el.innerHTML=html}) }
function toArray(obj) {  var array = [];  /* iterate backwards ensuring that length is an UInt32*/  for (var i = obj.length >>> 0; i--;) { array[i] = obj[i]; } return array; }
function addClass(obj, cls) { obj.classList.add(cls) }
function removeClass(obj, cls) { obj.classList.remove(cls) }
function removeClasses(obj) { obj.removeAttribute('class') }
function hasClass(obj, cls) { return obj.className && new RegExp("(^|\\s)" + cls + "(\\s|$)").test(obj.className); }
function hide(obj) { if(typeof(obj) === "string") obj=$(obj); obj.style.display = "none"; }
function show(obj) { if(typeof(obj) === "string") obj=$(obj); obj.style.display = "block" }
function cns(x){ console.log(x) }
function append(id, html) { if(id instanceof NodeList) id = toArray(id); (id instanceof HTMLElement) ? id.innerHTML += html : id.forEach(function(el){el.innerHTML+=html}) }
function prepend(id, html) { if(id instanceof NodeList) id = toArray(id); (id instanceof HTMLElement) ? id.innerHTML = html + id.innerHTML : id.forEach(function(el){el.innerHTML=html+el.innerHTML }) }
