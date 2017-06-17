try {
var tasks = {
    [Symbol.iterator] () {
        let steps = this.actions.slice();
        function *gen () {
            for ( let step of steps ) {
                yield step();
            }
        }
        return gen();
    },
    actions: []
};


tasks.actions.push(
    () => {
        document.writeln("step 1: ");
        return 2;
    }, 
    () => {
        document.writeln("step 2: ");
        return 4;
    }, 
    () => {
        document.writeln("step 3: ");
        return 6;
    }
);

var it = tasks[Symbol.iterator]();
document.writeln(tasks.actions.length);
document.writeln(it.next().value);
document.writeln(it.next().value);
document.writeln(it.next().value);
} catch ( e ) {
    document.writeln(e);
}