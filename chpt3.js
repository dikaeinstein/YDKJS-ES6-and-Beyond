var arr = [ 1, 2, 3, 4 ]; // arrays are iterables by default
// iterables contain an iterator

// retrieving the iterator instance from the iterable 
var it = arr[Symbol.iterator]();

//pre-ES6 for loop over an iterator
for ( var val, ret = it.next(); !ret.done; ret = it.next() ) {
    val = ret.value;
    document.writeln(val);
}

// strings are also iterables
var str = "software developers are cool ";
var it2 = str[Symbol.iterator]();
for ( var val2, ret2 = it2.next(); !ret2.done; ret2 = it2.next() ) {
    val2 = ret2.value;
    document.writeln();
    document.writeln(val2);
}

/* custom iterator: Infinite fibonacci series (iterable)
 * next(): iterator method that returns next iteratorResult object
 * return(): iterator method that signals completion of iterator
*/
var fib = {
    [Symbol.iterator]() {
        let n1 = 1, n2 =1;
        return {
            [Symbol.iterator]() {
                return this;
            },            
            next() {
                let current = n2;
                n2 = n1;
                n1 += current;
                return { value: current, done: false };
            },
            return(v) {
                document.writeln("fibonacci sequence is terminating");
                return { value: v, done: true };
            }
        };
    }, 
};

// consuming a conforming iterable using
// ES6 for...of loop
for ( let v of fib ) {
    if ( v > 50 ) {
        break;
    }
    document.writeln(v);
}

// task(iterable): a queue or series of actions/functions to execute sequentially using its iterator
var tasks = {
    [Symbol.iterator]() {
        let steps = this.actions.slice();   
        return {
            [Symbol.iterator]() { return this; },
            next(...args) {
                if ( steps.length > 0 ) {
                    let res = steps.shift()(...args);  
                    return { value: res, done: false };
                }
                else {
                    return { value: undefined, done: true };
                }
            },
            return(v) {
                steps.length = 0;
                return { value: v, done: true };
            }
        };
    },
    actions: [] // array of task to run
};

var tasks2 = {
    // using a generator
    *[Symbol.iterator] () {
        let steps = this.actions.concat();
        for ( let step of steps ) {
            yield step();
        }
    },
    actions: []
};

tasks.actions.push(
    ( x ) => {
        document.writeln("step 1: ", x);
        return x * 2;
    }, 
    ( y ) => {
        document.writeln("step 2: ", y);
        return y * 2;
    }, 
    ( z ) => {
        document.writeln("step 3: ", z);
        return z * 2;
    }
);

// retrieve iterator from tasks
var it3 = tasks[Symbol.iterator]();
document.writeln(tasks.actions.length);

// use iterator to run task from qeue one at a time
document.writeln(JSON.stringify(it3.next(2)));
document.writeln(JSON.stringify(it3.next(4)));
document.writeln(JSON.stringify(it3.next(6)));
document.writeln(JSON.stringify(it3.next(6)));


// ES class
class Foo {
    constructor ( x, y ) {
        this.x = x;
        this.y = y;
    }
    
    gimmeXY () {
        return this.x * this.y;
    }
}

class Bar extends Foo {
    constructor ( a, b, c ) {
        super(a, b);
        this.z = c;
    }
    gimmeXYZ () {
        return super.gimmeXY() * this.z;
    }
}

/*
// Manual transpilation of Foo class to pre-ES6 environment
let Foo = (function () {
    const Foo = function ( x, y ) {
        this.x = x;
        this.y = y;
    };
    
    Object.defineProperty(Foo.prototype, "gimmeXY", { enumerable: false, 
             writable: true,
             configurable: true,
             value: function () {
                 return this.x * this.y;
             }
    });
    return Foo
})(); 
*/

var f = new Foo(5, 15);
document.writeln(f.x);
document.writeln(f.y);
document.writeln(f.gimmeXY());
document.writeln(f.constructor);

var b = new Bar(4, 10, 16);
document.writeln(b.x);
document.writeln(b.y);
document.writeln(b.z);
document.writeln(b.gimmeXYZ());
document.writeln(b.constructor);

 