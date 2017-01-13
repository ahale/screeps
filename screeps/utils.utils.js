
module.exports = {
    checkArea: function() {
        console.log('todo: checkArea function');
    },

    buildRoads: function(from, to, name) {
		var path = Game.rooms[name].findPath(from, to, { ignoreCreeps: true });
		console.log('building road length '+path.length+'in room '+name);
		for(var i in path) {
			var res = Game.rooms[name].createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
		}
	},

    buildContainers: function(pos, name) {
        // creates three containers in row above provided pos
        var x = pos.x;
        var y = pos.y;
        var res = Game.rooms[name].createConstructionSite((x-1), (y-1), STRUCTURE_CONTAINER);
        var res = Game.rooms[name].createConstructionSite((x), (y-1), STRUCTURE_CONTAINER);
        var res = Game.rooms[name].createConstructionSite((x+1), (y-1), STRUCTURE_CONTAINER);
    },

    roominit: function(name) {
        // check if i have claimed room

        if(Game.rooms[name].memory.queues == undefined) {
            Game.rooms[name].memory.queues = {};
            Game.rooms[name].memory.queues['spawnqueue'] = [];
            Game.rooms[name].memory.queues['priorityspawnqueue'] = [];
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
        console.log('todo: write room construction sites');

        var source = Game.getObjectById(Game.rooms[name].memory.sources[0].id);
        var container_pos = new RoomPosition(Game.spawns.Spawn1.pos.x, (Game.spawns.Spawn1.pos.y - 3), name)
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
