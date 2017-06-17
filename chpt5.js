// ArrayBuffer (bit-bucket)
var buf = new ArrayBuffer(32); // binary buffer of length: 32-byte (256-bits) pre-initialized to 0's
document.writeln(buf.byteLength);

// TypedArray (view layered on buffer/bit-bucket)
// array of 16-bit unsigned integers
var arr = new Uint16Array(buf); // signature 1
// array can contain 16 elements.
// array length = 256 / 16 
document.writeln(arr.length);

// signature 2: creates a new view over a new buffer of "length"-byte
// var arr = new Uint16Array(length); // [constructor](length)

// signature 3: create a new view and buffer and copy the contents from typedArray views
// var arr = new Uint16Array(arr); // [constructor](typedArray)


// signature 4: create a new view and buffer and iterates over array-like or object "obj" to copy its content
// var arr = new Uint16Array(obj); // [constructor](obj)


// Multiple views layered on a single buffer
arr[0] = 3085;

var arr2 = new Uint8Array(buf); // new view
document.writeln(arr2[0]);
document.writeln(arr2[1]);

// byte swap
var temp = arr2[0];
arr2[0] = arr2[1];
arr2[1] = temp;

document.writeln(arr[0]);
document.writeln(arr2[0]);
document.writeln(arr2[1]);


// Endianess test
const littleEndian = (function() {
	   let buffer = new ArrayBuffer(2);
	   new DataView(buffer).setInt16(0, 256, true);
	   return new Int16Array(buffer)[0] === 256;
})();

document.writeln(littleEndian); // true on js engine running on a little Endian host envirnment


// TypedArray constructor optional arguments
// [constructor](buf [,byteOffset, [length]])


// TypedArray#sort defaults to sorting numerically
var arr3 = new Uint8Array(3);
arr3[0] = 100;
arr3[1] = 1;
arr3[2] = 12;

document.writeln(typeof arr3);
document.writeln(arr3 instanceof Uint8Array);
document.writeln(JSON.stringify(arr3.sort()));

// ES6 Maps
var m = new Map(); // constructor

var x = { id: 1 }, y = { id: 2 }; // keys
// set values
m.set(x, "foo"); 
m.set(y, "bar");
// get values
document.writeln(m.get(x)); 
document.writeln(m.get(y));

document.writeln(m.size); // number of keys in a map (length of the map)
m.delete(y); // delete an element from the map
m.clear(); // to clear the entire content of the map

// Map constructor can also receive iterable that returns a list of arrays
// where each array is for each element in the map
// each array will contain the element key as its first value 
// and element value as the second value
// this is used to make a copy of the map
//var m2 = new Map(m.entries);
// same as;
x = {id: 1};
y = {id: 2}
m.set(x, "foo");
m.set(y, "bar");
var m2 = new Map(m); // Map instance is an iterable by default
x = null;
y = null;
document.writeln(m.size);
var vals = [...m2.values()]; // returns an iterator for the map values
//that is consumed by the spread operator
document.writeln(vals);

var keys = [...m2.keys()];
document.writeln(JSON.stringify(keys));

// Set is a collection of unique values (duplicate values are ignored)
var s = new Set();
s.add({id: 1}).add({id: 2});
document.writeln(JSON.stringify([...s.keys()]));
document.writeln(JSON.stringify([...s.values()]));
document.writeln(JSON.srringify([...s.entries()]));

 