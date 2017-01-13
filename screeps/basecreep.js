var harvester = require('role.harvester');

module.exports = {
    run: function(creep) {
        console.log('todo: write generic creep stuff');
        var role = creep.memory.role;
        var res = [role].run(creep);
    }
}
