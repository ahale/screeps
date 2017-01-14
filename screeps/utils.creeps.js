
module.exports = {
    loadCreepCounts: function() {
        console.log('todo: write load creep counts into memory');
    },

    harvest: function(creep) {
        var src = Game.getObjectById(creep.room.memory.sources[creep.memory.src].id);
        if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
            creep.moveTo(src);
            creep.memory.work.move += 1;
        } else {
            creep.memory.work.harvest += 1;
        }
    },

    filterConstructionSites(creep, targets) {
        if(creep.memory.build_type) {
            if(creep.memory.build_type == 'road') {
                targets = _.filter(targets, (site) => site.structureType == 'road').length;
            } else {
                targets = _.filter(targets, (site) => site.structureType != 'road').length;
            }
        }
        return targets;
    },
}