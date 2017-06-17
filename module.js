/*var weekDay = (function ( exports ) { 
    let names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]; 
    exports.name = ( number ) => names[number]; 
    exports.number = ( name ) => names.indexOf(name); 
    return exports;
})({});*/

/*
document.writeln( weekDay.name(weekDay.number("Saturday")));
*/

var require = function ( name ) {
    if ( name in require.cache ) {
        return require.cache[name];
    } 
    
    let code = new Function("exports", "module", readFile(name)); 
    let exports = {}, 
        module = { exports }; // concise property
     
    code(exports, module); 
    require.cache[name] = exports;
    return module.exports; 
};

require.cache = Object.create(null);
