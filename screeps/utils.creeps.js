// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "builder", 'build_type': 'structure'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {"role": "builder", 'build_type': 'road'});

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
                targets = _.filter(targets, (site) => site.structureType == 'road');
            } else {
                targets = _.filter(targets, (site) => site.structureType != 'road');
            }
        }
        return targets;
    },
}
