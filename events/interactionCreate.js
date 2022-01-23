module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
		console.log(`${interaction.user.tag} activó una interacción en #${interaction.channel.name}`)
		if (!interaction.isCommand()) return

		const command = interaction.client.commands.get(interaction.commandName)

		if (!command) return

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
