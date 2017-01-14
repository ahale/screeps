
module.exports = {
    checkArea: function() {
        console.log('todo: checkArea function');
    },

    buildRoads: function(from, to, name) {
		path = this.get_path(from, to, name);
		console.log('building road length '+path.length+' in room '+name);
		for(var i in path) {
			var res = Game.rooms[name].createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
		}
	},

    get_path: function(from, to, name) {
        return path = Game.rooms[name].findPath(from, to, { ignoreCreeps: true });
    },

    buildContainers: function(pos, name) {
        // creates two containers in row above provided pos
        var x = pos.x;
        var y = pos.y;
        var res = Game.rooms[name].createConstructionSite((x-1), (y-1), STRUCTURE_CONTAINER);
        var res = Game.rooms[name].createConstructionSite((x), (y-1), STRUCTURE_ROAD);
        var res = Game.rooms[name].createConstructionSite((x+1), (y-1), STRUCTURE_CONTAINER);
    },

    buildExtensions: function(name) {
        var room_level = Game.rooms[name].controller.level;
        var extension_list = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }})
        var need_to_build = EXTENSION_LEVELS[room_level] - extension_list.length;
        var room_spawn = _.filter(Game.spawns, (spawn) => (spawn.pos.room == name);
        if(room_spawn.length) {
            console.log('room '+name+' needs '+need_to_build+' more extensions');
            if(need_to_build > 0) {
                var start_position = room_spawn[0].pos;
                if(Game.rooms[name].memory.last_extension_pos) {
                    start_position = new RoomPosition(Game.rooms[name].memory.last_extension_pos[0], Game.rooms[name].memory.last_extension_pos[1], name);
                }
                start_position.x += -2;
                for (i = 0; i < need_to_build; i++) {
                    var res = -1;
                    while(res != 0) {
                        res = Game.rooms[name].createConstructionSite(start_position.x, start_position.y, STRUCTURE_EXTENSION);
                        start_position.x += -2;
                    }
                }
                Game.rooms[name].memory.last_extension_pos = [start_position.x, start_position.y]
            }
        }
    },

    clear_expired_creeps: function() {
        for(var name in Memory.creeps) {
            if(!Game.creeps[name]) {
                delete Memory.creeps[name];
            }
        }
    },

    roominit: function(name) {
        // check if i have claimed room

        if(Game.rooms[name].controller) {
            Game.rooms[name].memory.controller_level = Game.rooms[name].controller.level;
        }


        if(Game.rooms[name].memory.queues == undefined) {
            Game.rooms[name].memory.queues = {};
            Game.rooms[name].memory.queues['spawnqueue'] = [];
            Game.rooms[name].memory.queues['priorityspawnqueue'] = [];
        }

        if(Game.rooms[name].memory.last_extension_pos == undefined) {
            Game.rooms[name].memory.last_extension_pos = false;
        }

        if(Game.rooms[name].memory.mode == undefined) {
            Game.rooms[name].memory.mode = 'harvest';
        }

        if(Game.rooms[name].memory.energyavailable == undefined) {
            var energy_sources = Game.rooms[name].find(FIND_SOURCES);
            Game.rooms[name].memory.energy_sources_available = energy_sources.length;
        }

        console.log('todo: room initialisation stuff');
        if(Game.rooms[name].memory.energy_sources_available > 0) {
            var room_source_data = [];
            var energy_sources = Game.rooms[name].find(FIND_SOURCES);
            for(var n in energy_sources) {
                var path = Game.rooms[name].findPath(Game.spawns.Spawn1.pos, energy_sources[n].pos, { ignoreCreeps: true });
                var data = {};
                var nearby = this.checkarea(energy_sources[n].pos, 1, "AROUND", "accessable");
                var inaccessable_count = 9 - nearby;
                data.id = energy_sources[n].id;
                data.cost = path.length * inaccessable_count;
                data.mode = 'harvest';
                data.active = false;
                data.accesspoints = nearby;
                room_source_data.push(data);
            }
            Memory.rooms[name].sources = room_source_data;
        }
        else {
            Game.rooms[name].memory.sources = [];
        }

        var source = Game.getObjectById(Game.rooms[name].memory.sources[0].id);
        var container_pos = new RoomPosition(Game.spawns.Spawn1.pos.x, (Game.spawns.Spawn1.pos.y - 1), name)
        Game.rooms[name].memory.container_pos = [container_pos.x, container_pos.y];
        this.buildContainers(container_pos, name);
        this.buildRoads(Game.spawns.Spawn1.pos, source.pos, name);
        this.buildRoads(source.pos, Game.rooms[name].controller.pos, name);
        this.buildRoads(Game.rooms[name].controller.pos, container_pos, name);
        this.buildRoads(container_pos, Game.spawns.Spawn1.pos, name);
        this.buildRoads(container_pos, source.pos, name);
        Game.rooms[name].memory.roominit = true;
    },

    controller_level_change: function(name) {
        console.log('roomlevel changed from '+Game.rooms[name].memory.controller_level+' to '+Game.rooms[name].controller.level)
        Game.rooms[name].memory.controller_level = Game.rooms[name].controller.level;
    },

    checkarea: function(_pos, distance, direction, type) {
    // todo: pass room
        for(var name in Game.rooms) {
            var accessable_count = 0;
            var creep_count = 0;
            var energy_count = 0;
            var a = _pos.y - distance ;
            if( a < 0) {
                a = 0;
            }
            var b = _pos.x - distance ;
            if( b < 0) {
                b = 0;
            }
            var c = _pos.y + distance ;
            if( c > 49) {
                c = 49;
            }
            var d = _pos.x + distance ;
            if( d > 49) {
                d = 49;
            }
            var nearby = Game.rooms[name].lookAtArea(a, b, c, d, true);
            for(var n in nearby) {
                // console.log(nearby[n].x+","+nearby[n].y+" - type: "+nearby[n].type+", terrain: "+nearby[n].terrain)
                if(nearby[n].terrain === "plain") {
                    accessable_count += 1;
                }
                if(nearby[n].terrain === "swamp") {
                    accessable_count += 1;
                }
                if(nearby[n].type == "creep") {
                    creep_count += 1;
                }
                if(nearby[n].type == "energy") {
                    energy_count += 1;
                }
            }
        }
        if(type == "energy") {
            return energy_count;
        }
        return accessable_count;
    },
}
