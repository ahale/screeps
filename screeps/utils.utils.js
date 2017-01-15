
var EXTENSION_LEVELS = {"1": 0, "2": 5, "3": 10, "4": 20, "5": 30, "6": 40, "7": 50, "8": 60};
var TIMERS = [10, 50, 100];

module.exports = {
    checkArea: function() {
        console.log('todo: checkArea function');
    },

    buildRoads: function(from, to, name) {
		var path = this.get_path(from, to, name);
		console.log('building road length '+path.length+' in room '+name);
		for(var i in path) {
			var res = Game.rooms[name].createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
		}
	},

    is_queued: function(name, flavour) {
        var res = 0;
        var room_spawn = this.get_room_spawn(name);
        if(room_spawn.spawning && Game.rooms[name].memory.building === flavour) { res = 1; }
        for(var n in Game.rooms[name].memory.spawnqueue) {
            console.log(Game.rooms[name].memory.spawnqueue[n].flavour);
            if(Game.rooms[name].memory.spawnqueue[n].flavour == flavour) {
                res += 1;
                console.log(res);
            }
        }
        return res;
    },

    get_path: function(from, to, name) {
        var path = Game.rooms[name].findPath(from, to, { ignoreCreeps: true });
        return path;
    },

    buildContainers: function(pos, name) {
        // creates two containers in row above provided pos
        var x = pos.x;
        var y = pos.y;
        var res = Game.rooms[name].createConstructionSite((x-1), (y-1), STRUCTURE_CONTAINER);
        var res = Game.rooms[name].createConstructionSite((x), (y-1), STRUCTURE_ROAD);
        var res = Game.rooms[name].createConstructionSite((x+1), (y-1), STRUCTURE_CONTAINER);
    },

    log_time: function() {
        Memory.timers.gametime = Game.time;
        return true;
    },

    controller_level_change: function(name) {
        if(Game.rooms[name].controller.level > Game.rooms[name].memory.controller_level) {
            this.buildExtensions(name);
        }
        console.log('roomlevel changed from '+Game.rooms[name].memory.controller_level+' to '+Game.rooms[name].controller.level)
        Game.rooms[name].memory.controller_level = Game.rooms[name].controller.level;
    },

    buildExtensions: function(name) {
        if(Game.rooms[name].controller.level == 0) { return ; }
        var extension_list = Game.spawns.Spawn1.room.find(FIND_MY_STRUCTURES, {filter: { structureType: STRUCTURE_EXTENSION }})
        var room_spawn = _.filter(Game.spawns, (spawn) => (spawn.pos.roomName == name));
        if(room_spawn.length) {
            if(Game.rooms[name].controller.level < 4) { var need_to_build = 5; }
            else { var need_to_build = 10; }
            console.log('need to build '+need_to_build);
            var start_position = room_spawn[0].pos;
            start_position.y = start_position.y - 5 + Game.rooms[name].controller.level;
            start_position.x = start_position.x - 1;
            if(Game.rooms[name].controller.level % 2 == 0) { start_position.x = start_position.x - 1; }
            for (i = 0; i < need_to_build; i++) {
                var res = -1;
                var n = 0;
                while(res != 0 && n < 20) {
                    start_position.x += -2;
                    res = Game.rooms[name].createConstructionSite(start_position.x, start_position.y, STRUCTURE_EXTENSION);
                    // console.log(start_position.x+', '+start_position.y);
                    n++;
                }
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

    get_room_spawn: function(name) {
        // console.log('utils.get_room_spawn() '+name);
        // console.log(_.filter(Game.spawns, (spawn) => (spawn.pos.roomName == name)));
        var room_spawn = _.filter(Game.spawns, (spawn) => (spawn.pos.roomName == name));
        if(!room_spawn.length) {
            return false;
        } else {
            return room_spawn[0];
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
