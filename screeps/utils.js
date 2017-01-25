
module.exports = {
    get_path: function(from, to, name) {
        var path = Game.rooms[name].findPath(from, to, { ignoreCreeps: true });
        return path;
    },

    buildRoads: function(from, to, name) {
		var path = this.get_path(from, to, name);
		console.log('building road length '+path.length+' in room '+name);
		for(var i in path) {
			var res = Game.rooms[name].createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
		}
	},
}
