const { SlashCommandBuilder } = require('@discordjs/builders')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('borrar')
		.setDescription('borra una cantida de mensajes definida por el usuario')
		.setDefaultPermission(false)
		.addIntegerOption((option) =>
			option.setName('cantidad').setDescription('número de mensajes a borrar').setRequired(true)
		),
	async execute(interaction) {
		const amount = interaction.options.getInteger('cantidad')
		if (amount <= 1 || amount > 100) {
			return interaction.reply({ content: 'la cantidad es entre 1 y 99', ephemeral: true })
		}
		await interaction.channel.bulkDelete(amount, true).catch((error) => {
			console.error(error)
			interaction.reply({
				content: 'ocurrió un error al intentar borrar los mensajes de este canal',
				ephemeral: true
			})
		})
		return interaction.reply({ content: 'mensajes borrados con éxito', ephemeral: true })
	}
}
