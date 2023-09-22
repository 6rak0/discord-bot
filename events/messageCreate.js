const {Events} = require('discord.js')

module.exports = {
	name: Events.MessageCreate,
	execute(message) {
		console.log(`a message was created`);
        console.log({message});
	}
}