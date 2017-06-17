/*
{
    if (typeof a === "undefined") {
        document.writeln("cool");
    }

    if ( typeof b === "undefined" ) {
        // won't get here: TDZ error
        document.writeln("coolb");
    }
    
    let b
}
*/
var foo = () => "foo";

document.writeln(foo());
/*
var test = (...args) => document.writeln(...args);


test(1,2,3);*/

/*
var a = [2,3,4];
var b = [1,...a,5];
document.writeln(b);
var c = [1].concat(a, 5);
document.writeln(c);

var [a, b, c] = [1,2,3];
document.writeln(a, b, c);
var {x, y, z} = {x: 2, y: 3, z: 4};
document.writeln(x, y, z);
var d, e, f;
({x: d, y: e, z: f} = {x: 2, y: 3, z: 4});
document.writeln(d, e, f);
var o = {};
({x: o.a, y: o.b, z: o.c} = {x: 2, y: 3, z: 4});
document.writeln(JSON.stringify(o));
var ob = {a: [1]}
document.writeln(ob.a);
( { a: X, a: Y, a: [ Z ] } = { a: [ 1 ] } );

X.push(2); Y[0] = 10;
document.writeln(X, Y);
*/
var badAss = ({x = 10} = {}) => document.writeln(x);

badAss();

// ES6 Object extensions
var x = 2, 
    y = 3,
    prefix = "user", 
    o = {
          x, // concise property x: x
          y,
          foo () {return "foo";}, // concise method foo: function() {}
          [prefix + "bar"]: function () {return "bar";} // computed property name 
        };       
        
var o2 = {__proto__: o, x: 1, z: 2}; // setting prototype of o2 to o during declaration using __proto__ 
document.writeln(JSON.stringify(o));
document.writeln(o.userbar());
document.writeln(JSON.stringify(o2));
document.writeln(o2.y);
var o3 = {a: 4, b: 6, 
    foo() {
        super.foo() 
        return "o3: foo()";
    }
};
Object.setPrototypeOf(o3, o2); // setting prototype of o3 to o2 after declaration
document.writeln(JSON.stringify(o3));
document.writeln(o3.z);
document.writeln(o3.foo());

// Interpolated string literals [Template Literals]
var quality = "superhero";
var sentence = `Software developers are ${quality}s`;

document.writeln(sentence);

// Tagged String/Template Literal
var tag = function ( strings, ...values ) {   
    return strings.reduce(function(s, v, idx) {
        s += (idx > 0) ? values[idx-1]: "";
        return (s + v).toUpperCase(); 
    }, "");
};

var text = tag`Software developers are`;
document.writeln(text);
document.writeln(String.raw`hello\nworld`);

// for ... of loop
var a = [1,2,3,4];
for ( var val of a ) {
    document.writeln(val);
}
