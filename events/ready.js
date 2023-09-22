const {Events} = require('discord.js')
module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`${client.user.tag} está ahora en línea con ${client.users.size} usuarios en ${client.channels.size} canales de ${client.guilds.size} servidores`)
		client.user.setActivity('Visual Studio Code')
		console.log(client)
	}
}
