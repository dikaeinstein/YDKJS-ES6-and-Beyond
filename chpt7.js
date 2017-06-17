"use strict";
// Meta Programming
// name property of functions

var abc = function () { return "abc"; }
document.writeln(abc.name);
/*
var o = {
    foo() {},					// name: foo
	   *bar() {},					// name: bar
	   baz: () => {},				// name: baz
	   bam: function(){},			// name: bam
	   get qux() {},				// name: get qux
	   set fuz() {},				// name: set fuz
	   ["b" + "iz"]: function(){},			// name: biz
	   [Symbol( "buz" )]: function(){}			// name: [buz]
};
document.writeln(o.foo.name);
*/

// Meta Properties
// new.target: used to infer constructor that was directly called
// by new
class Parent {
    constructor () {
        if ( new.target === Parent ) {
            document.writeln("Parent instantiated");
        }
        else {
            document.writeln("Child instantiated");
        }
    }
}

class Child extends Parent {}
const p = new Parent();
const c = new Child();



function Dika () {
    if ( new.target === undefined ) {
         throw new Error("class Dika must be called with |new|");
    }
    this.name = "Solomon Okwa";
    this.alias = "Dikaeinstein";
    this.easterEgg = "metaprograming is the programming of the programming of the program";
}
try {
var solz = new Dika();
document.writeln(solz.easterEgg);

let err = Dika();
}
catch(e) { document.writeln(e); } 

// Well Known Symbols WKS
// Symbol.iterator: special location(property) 
// on any object that the language mechanism 
// automatically looks to find a method to construct an iterator instance for consuming the object values

// Symbol.toStringTag and Symbol.hasinstance: controlling the behaviour of Object.toString and instanceof

Dika.prototype[Symbol.toStringTag] = "Dika";
document.writeln(solz);

// Symbol.toPrimitive
var arr = [1,2,3,4,5];
document.writeln(arr + 10);				// 1,2,3,4,510

arr[Symbol.toPrimitive] = function ( hint ) {
    if ( hint == "default" || hint == "number" ) {
		// sum all numbers
		      return this.reduce((acc, curr) => acc + curr, 0);
	   }
	   else {
	       return this.join(",");
	   }
};

document.writeln(String(arr) + 10);	

// Symbol.isConcatSpreadable: used to modify the behavior of concat 
// setting it to true makes the object spreadable just like arrays when 
// as argument to Array#concat

const a = [1,2,3], b = [4,5,6];
let collection = {
    0: "Hello",
    1: "world",
    length: 2,
    [Symbol.isConcatSpreadable]: true
};
a.concat(b); // default beaviour: [1,2,3,4,5,6]

document.writeln(a.concat(collection)); // [1,2,3,hello,world]

// Proxy: an object that wraps or sit in front of an object
// trap: you register a trap on proxy objects to intercept meta programming tasks[operations] on an object

// normal object
const obj = { a: 1 };
var handlers = {
        get ( target, key, context ) {
            document.writeln("accessing a")
            return Reflect.get(target, key, context);
        }
    };

// creating the proxy object with 'get' trap in front of target: obj 
const proxObj = new Proxy(obj, handlers);

document.writeln(proxObj.a);


// proxy hacking the [[prototype]] chain 
// Circularly linked via '[[prototype]]' objects
var handlers = {
		  get ( target, key, context ) {
			     if ( Reflect.has(target, key) ) {
				        return Reflect.get(target, key, context);
			     }
			     // fake circular `[[Prototype]]`
			     else {
				        return Reflect.get(target[
						Symbol.for("[[Prototype]]")], key, context);
			     }
    }
};
const obj1 = new Proxy({
        name: "obj-1",
        foo () {
            document.writeln("foo:", this.name);
			    }
    }, handlers);
const obj2 = Object.assign(
           Object.create(obj1), { 
               name: "obj-2",
		             bar() {
                  document.writeln("bar:", this.name);
				               this.foo();
			            }
           });

// fake circular `[[Prototype]]` link
obj1[Symbol.for("[[Prototype]]")] = obj2;

obj1.bar(); // bar: obj-1 <-- through proxy faking [[Prototype]]
// foo: obj-1 <-- `this` context still preserved

obj2.foo(); // foo: obj-2 <-- through [[Prototype]]


// Fake multiple inheritance via prototype
const obj5 = {
		  name: "obj-1",	
		  foo () {
		      document.writeln("obj1.foo:", this.name);
		  }
}, 
    obj6 = {
        name: "obj-2",
        foo () {
            document.writeln("obj2.foo:", this.name);
        },
        bar () {
           document.writeln("obj2.bar:", this.name);
        }
    };
var handlers = {
        get ( target, key, context ) {
            if ( Reflect.has(target, key) ) {
                return Reflect.get(target, key, context);
            }
            // fake multiple 'prototype'
            else {
                for ( let P of target[Symbol.for("[[Prototype]]")] ) {
                    if ( Reflect.has(P, key) ) {
                        return Reflect.get(P, key, context);
                    }
                }
            }
        }
    };
const obj7 = new Proxy(
        {
            name: "obj-3",
            baz () {
                this.foo();
              		this.bar();
            }
        }, handlers);
    
    // fake multiple [[prototype]] links
    obj7[Symbol.for("[[Prototype]]")] = [ obj5, obj6 ];
    

obj7.baz();

// TCO
// other non-TCO optimization
// Trampolining
const trampolining = function ( res ) {
    "use strict";
    while ( typeof res == "function" ) {
        res = res();    
    }
    return res;
};

const factorial = function ( n, a=1 ) {
    "use strict";
    if ( n < 2) {
        return a;
    }
    return factorial(n-1, n*a);
}

document.writeln(trampolining( factorial(150)));
