/*
// CommonJs module definition 
// weekDay Module
let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 

exports.name = ( number ) => names[number]; 

exports.number = ( name ) => names.indexOf(name); */


// AMD module definition
// weekDay module
define([], function () {
    let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    return {
        name ( number ) {
            return names[number];
        },
        number ( name ) {
            return names.indexof(name);
        }
    };
});

// UMD module
(function UMD ( name, context, definition {
    // AMD 
    if ( typeof define === "function" && define.amd ) {
        define(definition);
    }
    // CommonJS
    else if ( typeof module !== "undefined" && module.exports ) {
        module.exports = definition();
    }
    else {
        context[name] = definition();
    }
}))("weekDay", this, function () {
    let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    return {
        name ( number ) {
            return names[number];
        },
        number ( name ) {
            return names.indexof(name);
        }
    }; 
});