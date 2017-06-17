// Fake Circular Inheritance
// set circular prototype of given obects
var setCircularPrototypeOf = function ( obj1, obj2 ) {
    let handlers = {
        // get 'trap' 
		      get ( target, key, context ) {
			         if ( Reflect.has(target, key) ) {
				            return Reflect.get(target, key, context);
			         }
			         // fake circular `[[Prototype]]`
			         else {
				            return Reflect.get(target[Symbol.for("[[Prototype]]")], key, context);
			         }
        }
    },
    // proxy obj
    obj3 = new Proxy(obj1, handlers),
    // object prototype linked to proxy object
    obj4 = Object.assign(Object.create(obj3), obj2);
    // fake circular `[[Prototype]]` link
    obj3[Symbol.for("[[Prototype]]")] = obj4;
    // return circular prototype linked objects
    return { obj3 , obj4 };
};


let obj1 = {
    name: "obj-1",
			foo() {
				   document.writeln("foo:", this.name);
			}
},
obj2 = {
    name: "obj-2",
		  bar() {
        document.writeln("bar:", this.name);
        this.foo();
    }
};

var { obj3, obj4 } = setCircularPrototypeOf(obj1, obj2);

obj3.foo();
obj4.foo();
obj3.bar();
