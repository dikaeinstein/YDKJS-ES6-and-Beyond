/* ES6 API additions */
// Arrays
// static function

// Array.of() 
// special form of creating array
var arr = Array.of(3); // creates array instance with given arguments as elements of the array
arr = Array.of(1,2,3,4,5);
document.writeln(arr);

// Array.from([arraylike/iterable, [map callback, [this binding]])

// if first arg is an iterable it uses it iterator to iterate over its values
// and copies it into a new array that is returned
var arr2 = Array.from(arr); 
document.writeln(arr2);

// if passed an arraylike obj, it simply behaves as Array#slice 
arr2 = Array.from({ length: 2, "0": 1, "1": 2 });
document.writeln(arr2);

arr2 = Array.from(arr, ( val, idx ) => val * val);
document.writeln(arr2);


// prototype methods

// Array#copyWithin is a mutator method
// arguments: target, start, end
var arr3 = arr2.copyWithin(3, 0, 2);
document.writeln(arr2);
arr3 = arr.copyWithin(0, -1);
document.writeln(arr3);


// Array#fill
// fills an Existing array
// arguments: value, start, end
arr3.fill(42);
document.writeln(arr3);
arr3.fill(52, 3, 4);
document.writeln(arr3);


// Array#find
// returns value if found or undefined if not
// argument: callback that determine the
// logic used to match the value
var val = arr3.find(v => v == 42);
document.writeln(val);

// Array#findIndex
// returns the index of value if found 
// or -1 if not
var index = arr2.findIndex((v) => v == 9);
document.writeln(index);

// Arrays are collections
// they have prototype methods: entries(), values(), and keys()
try {
var ar = [1,2,3];
//var vals = [...ar.values()];
var keys = [...ar.keys()];
var entries = [...ar.entries()];
var def = [...ar[Symbol.iterator]()];

//document.writeln([...ar.values()]);
document.writeln(keys);
document.writeln(entries);
document.writeln(def);
}
catch(e){ document.writeln(e); }


// Objects
// static functions
// Object.is(): Uses the ES6 'SameValue'
// algorithm which is similar to 'strict equals' "===" with 2 important exceptions
// (NaN === NaN and 0 === -0)
document.writeln(Object.is(4, NaN));
document.writeln(Object.is(NaN, NaN));
document.writeln(Object.is(0, -0));
// pre-ES6
document.writeln(NaN === NaN);
document.writeln(0 === -0);

// Object.getOwnPropertySymbols()
// Symbols primitive type are mostly 
// going to be used as special(meta) properties in an object
var o = {
    foo: 42,
    [ Symbol("bar") ]: "hello world",
    baz: true
};
var sym = Object.getOwnPropertySymbols(o);
//document.writeln(sym.toString());

// object.setPrototypeOf()
// sets the [[prototype]] of object for 
// behaviour delegation
var o2 = {
    foo () { 
        return "ima rocksta dev!";
    }
};
var o3 = {
    bar () {
        return "drop bars!";
    }
};

Object.setPrototypeOf(o3, o2);

// o3.foo() delegates to o2.foo()
document.writeln(o3.foo());

// alternate form
var o4 = Object.setPrototypeOf({
    baz () {
        return "sing in baz";
    }
}, o2);
document.writeln(o4.foo());

// Object.assign()
// ES6 simplified object copying algorithm
var o5 = Object.assign({}, o2, o3, o4);
document.writeln(o5.baz());
document.writeln(o5.bar());
document.writeln(o5.foo());

// alternate form of setting prototype
// leveraging on Object.assign
var o6 = Object.assign(Object.create(o2), o3, o4);
document.writeln(o6.foo());


// Math
// Math.cbrt(): cuberoot
document.writeln(Math.cbrt(27));

// Math.log10(): base 10log
document.writeln(Math.log10(100));

// Math.imul(): 32-bit integer multiplication
document.writeln(Math.imul(3.0, 3.5));

// Math.sign(): returns sign of the number
document.writeln(Math.sign(-27));

// Math.trunc(): returns only the integer part of a number
document.writeln(Math.trunc(27.5));

// Math.fround(): rounds and returns the nearest 
// 32-bit(Single precision) floating-point value
document.writeln(Math.fround(27.85));

// Number
// static properties
// Number.EPSILON: the minimum difference between any two numbers = 2^-52

// Number.MAX_SAFE_INTEGER: maximum integer number that can be "safely"
// represented unambigously in a JS number value = 2^53 - 1


// Number.MIN_SAFE_INTEGER: minimum 
// integer number that can be "safely"
// represented unambigously in a JS number value = -(2^53 - 1)

try {
// static functions
Number.isNaN(4); // false
Number.isNaN(NaN); // true
Number.isNaN("NaN"); // false no coercion allowed
Number.isFinite(4); // true
Number.isFinite(Infinity); // false
Number.isFinite("4"); // false no coercion allowed
Number.isInteger(4.5); // false
Number.isInteger(4.0); // true
Number.isInteger(Infinity); // false
Number.isInteger(NaN); // false

// string
// static functions
//String.fromCodePoint(0x1d49e);
//String.raw() // tag function: returns raw characters of escape sequence
// used mainly with template literals

// prototype methods
"foo".repeat(3); // foofoofoo
"e\u0301".normalize; // é combine character with adjacent diacritical mark

// string inspection functions
var palindrome = "step on no pets";
var reg = /step/;
reg[Symbol.match] = false;

document.writeln(palindrome.startsWith(reg));
document.writeln(palindrome.includes("step on"));
document.writeln(palindrome.search(/no pets/));
document.writeln(palindrome.split(/\s/));
}
catch(e) {document.writeln(e);}