try {
    // feature test syntax
    // ES6 fat arrow function
    new Function("(() => {})");
    ARROW_FUNC_ENABLED = true;
}
catch ( err ) { 
    ARROW_FUNC_ENABLED = false;
}

// feature test api and polyfill
// feature test Number.isNaN api feature
if ( !Number.isNaN ) {
    Number.isNaN = function ( x ) { 
        return x !== x;
    }; 
}
