
module.exports = {
    run: function(creep) {
        if(!creep.memory.init) { this.memory_init(creep); }
        if(creep.room.memory.mode == "container") { this.container(creep); };
        if(creep.room.memory.mode == "delivery") { this.delivery(creep); };
    },

    container: function(creep) {
    },

    delivery: function(creep) {
    },

    memory_init: function(creep) {
        creep.memory.init = true;
    }
}
