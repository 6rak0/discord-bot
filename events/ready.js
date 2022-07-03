// const { guildId, permissions } = require('../config.json')

module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.user.tag} está ahora en línea`)
		client.user.setActivity('Mono enojado', { type: 'WATCHING' })
		// client.guilds.cache
		// 	.get(guildId)
		// 	?.commands.fetch()
		// 	.then((collection) => {
		// 		collection.forEach((command) => {
		// 			if (command.name === `borrar`) {
		// 				command.permissions
		// 					.add({ permissions })
		// 					// client.application.command.permissions
		// 					// 	.add({ permissions })
		// 					.catch(console.log)
		// 			}
		// 		})
		// 	})
		// 	.catch(console.log)
	}
}
