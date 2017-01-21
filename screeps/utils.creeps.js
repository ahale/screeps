
var utils = require('utils.utils');
// var factory = require('module.factory');
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'builder', 'build_type': 'structure'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'builder', 'build_type': 'road'});
// Game.spawns['Spawn1'].createCreep([WORK,CARRY,MOVE], undefined, {'flavour': 'repairer'});

module.exports = {
    check_creep_counts: function(name) {
        this.check_no_creeps(name);
        if(Game.rooms[name].memory.mode == 'delivery') {
            this.calculate_delivery_creep_count(name);
            return;
        }
        if(Game.rooms[name].memory.mode == 'container') {
            this.calculate_container_creep_count(name);
            return;
        }
        this.calculate_default_creep_count(name);
    },

    calculate_default_creep_count: function(name) {
        var blah = 'default'
        if(Game.rooms[name].memory.mode === 'harvest') {
            return;
        }

        var creep_count_data = Memory.creep_counts[blah];
        for(var flavour in creep_count_data) {
            var count_data = creep_count_data[flavour];
            var min = creep_count_data[flavour].min;
            var max = creep_count_data[flavour].max;
            if(flavour === 'miner') {
                for(var source in Memory.rooms[name].sources) {
                    if(Memory.rooms[name].sources[source].active) {
                        var assigned_miners = _.filter(Game.creeps, (creep) => (creep.memory.flavour == flavour && creep.memory.room == name && creep.memory.src == source));
                        if(!utils.is_queued(name, flavour) && assigned_miners.length < max && assigned_miners.length < Memory.rooms[name].sources[source].accesspoints) {
                            var build_data = {'flavour': flavour, 'src': source};
                            this.enqueue(name, build_data);
                        }
                    }
                }
            }
            else {
                var current_count =  _.filter(Game.creeps, (creep) => (creep.memory.flavour == flavour && creep.memory.room == name && !creep.memory.generic)).length;
                if(!utils.is_queued(name, flavour) && current_count < max) {
                    var build_data = {'flavour': flavour};
                    this.enqueue(name, build_data);
                }
            }
        }
    },

    calculate_delivery_creep_count: function(name) {

    },

    calculate_container_creep_count: function(name) {

    },

    get_part_info: function(flavour, name, generic) {
        if(generic) {
            return ['work', 'carry', 'move'];
        }

        if(Game.rooms[name].memory.mode == 'harvest' || Game.rooms[name].memory.mode == 'miner' || Game.rooms[name].memory.mode == 'container') {
            var part_info = false;
            if(flavour === 'harvester' || flavour == 'upgrader' || flavour == 'builder') {
                part_info = {'base': ['work', 'carry', 'move'], 'add': ['work', 'carry', 'move']}
            }
            if(flavour === 'miner') {
                part_info = {'base': ['move', 'work', 'work'], 'add': ['work']}
            }
            if(flavour === 'transporter') {
                part_info = {'base': ['move', 'carry'], 'add': ['move', 'carry']}
            }
            if(flavour === 'repairer') {
                part_info = {'base': ['work', 'carry', 'move'], 'add': ['move']}
            }
        }
        return part_info;
    },

    get_parts: function(name, flavour, generic) {
        var room_spawn = utils.get_room_spawn(name);
        if(!room_spawn) { return false; }
        if(generic) { return this.get_part_info(flavour, name, generic); }
        var room_energy = Game.rooms[name].energyCapacityAvailable;
        if(Memory.parts[flavour] == undefined) { Memory.parts[flavour] = {}; }
        if(Memory.parts[flavour][room_energy] != undefined) {
            return Memory.parts[flavour][room_energy];
        }
        var part_info = this.get_part_info(flavour, name, generic);
        var parts = part_info['base'];
        var add_parts = part_info['add'];
        var last_parts = false;

        for(i = 0; i < 10; i++) {
            var cost = 0;
            for(var n in parts.concat(add_parts)) {
                cost += BODYPART_COST[parts.concat(add_parts)[n]];
            }
            if(cost <= room_energy) {
                parts = parts.concat(add_parts);
            } else { break; }
        }
        Memory.parts[flavour][room_energy] = parts;
        return parts;
    },

    check_no_creeps: function(name) {
        var flavours = ['harvester', 'upgrader'];
        for(var n in flavours) {
            var flavour = flavours[n];
            var count = _.filter(Game.creeps, (creep) => (creep.memory.flavour == flavour));
            if(!count.length && !utils.is_queued(name, flavour)) {
                Game.rooms[name].memory.queues.spawnqueue.push({'flavour': flavour, 'generic': true});
            }
        }
    },

    harvest: function(creep) {
        if(creep.room.memory.mode == "harvest") {
            var src = this.get_source(creep);
            if(creep.harvest(src) == ERR_NOT_IN_RANGE) {
                creep.moveTo(src);
                creep.memory.work.move += 1;
            } else {
                creep.memory.work.harvest += 1;
            }
        }
        if(creep.room.memory.mode == "miner") {
            var sources = creep.room.find(FIND_DROPPED_RESOURCES);
            var sorted_sources = sources.sort(function(a, b){return a.amount-b.amount}).reverse();
            if(creep.pickup(sorted_sources[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sorted_sources[0]);
                creep.memory.work.move += 1;
            } else {
                creep.memory.work.harvest += 1;
            }
        }
        if(creep.room.memory.mode == "container") {

        }
    },

    get_source: function(creep) {
        var src = Game.getObjectById(creep.room.memory.sources[creep.memory.src].id);
        return src;
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

    enqueue: function(name, build_data) {
        var added_to_queue = false;
        if(!utils.is_queued(name, build_data.flavour)) {
            Game.rooms[name].memory.queues.spawnqueue.push(build_data);
            added_to_queue = true;
        }
        return added_to_queue;
    },
}
