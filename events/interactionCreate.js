const {Events} = require('discord.js')

module.exports = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		console.log(`${interaction.user.tag} activó una interacción en #${interaction.channel.name}`)
		if (!interaction.isChatInputCommand()) return
		const command = interaction.client.commands.get(interaction.commandName)
		if (!command) {
			console.error(`no existe este comando: ${interaction.commandName}`);
			return
		}
		try {
			await command.execute(interaction)
		} catch (error) {
			console.error(error)
			await interaction.reply({
				content: 'Ocurrió un error al ejecutar este comando',
				ephemeral: true
			})
		}
	}
}
