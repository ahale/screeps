
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
        if(Game.rooms[name].queues == undefined) {
            Game.rooms[name].queues = {};
            Game.rooms[name].memory.queues.spawnqueue = [];
            Game.rooms[name].memory.queues.priorityspawnqueue = [];
        }

        if(Game.rooms[name].memory.energyavailable == undefined) {
            Game.rooms[name].memory.energyavailable = 1;
            console.log('todo: check for energy sources');
        }

        console.log('todo: room initialisation stuff');
        if(Game.rooms[name].memory.energyavailable > 0) {
            console.log('todo: write room source info');
        }
        else {
            Game.rooms[name].memory.sources = [];
        }
        // check if i have claimed room
        console.log('todo: write room construction sites');
        Game.rooms[name].memory.roominit = true;
    },
}
