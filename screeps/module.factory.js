
module.exports = {
    init: function(name) {
        if(!Game.rooms[name].memory.factoryInit) {
            // this.memoryInit(name);
        }
    },

    run: function(name) {
        // console.log('todo: write factory run loop');
        this.clear_expired_creeps();
    },

    build: function(meta) {
        console.log('todo: write factory build function');
    },

    clear_expired_creeps() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    }
}
