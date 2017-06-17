// Fake Multiple Inheritance
// sets the prototype of 'main' object to the rest multiple objects
// returns an object that is prototype linked to multiple objects
var setMultiplePrototypesOf = function ( main, ...args ) {
    let handlers = {
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
    main = new Proxy(main, handlers);
    // fake multiple [[prototype]] links
    main[Symbol.for("[[Prototype]]")] = args;
    return main;
};

var obj1 = {
		      name: "obj-1",	
		      foo () {
		          document.writeln("obj1.foo:", this.name);
		      }
    },
    obj2 = {
        name: "obj-2",
        foo () {
            document.writeln("obj2.foo:", this.name);
        },
        bar () {
           document.writeln("obj2.bar:", this.name);
        }
    },
    obj3 = {
        name: "obj-3",
        baz () {
            this.foo();
            this.bar();
        }
    };
    
    
var main = setMultiplePrototypesOf(obj3, obj1, obj2);

main.baz();
