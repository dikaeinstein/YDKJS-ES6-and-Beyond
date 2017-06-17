/*function *foo () {
    let x = yield 42; // state 0
    document.writeln(x); // state 1
} */


// Manual transpilation of foo generator capability to pre ES6 environment
var foo = function () {
    let state = 0, // used to manage state / keep track of currently paused execution context
        x,
        // used to transition to next state
        nextState = function ( v ) {
            switch ( state ) {
                case 0:
                    state += 1; 
                    return 42;
                case 1:
                    state += 1;
                    x = v;
                    document.writeln(x);
                    return;         
            }       
        };
    
    // foo iterator    
    return { 
        // make the iterator also an iterable
        [Symbol.iterator] () {
            return this;
        },
        // used to process and add logic to each step / state
        next (v) {
            return { value: nextState(v), done: (state == 2) };    
        },
        
        return () {
            return { value: undefined, done: true };
        }         
    };
}; 

var it = foo();
var ret = it.next().value;
document.writeln(ret);
it.next(100);    
document.writeln(it.next().done);
document.writeln(it.next().value);