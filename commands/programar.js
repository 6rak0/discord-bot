const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('programa')
		.setDescription('te ayudo a programar eventos')
		.addStringOption((option) => {
			return option.setName('juego').setDescription('título del juego').setRequired(true)
		})
		.addStringOption((option) => {
			return option.setName('hora').setDescription('hora del evento').setRequired(true)
		}),
	async execute(interaction) {
		const juego = interaction.options.getString('juego')
		const hora = interaction.options.getString('hora')
		const exampleEmbed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('únete a la fiesta')
			.addField('juego', juego)
			.addField('hora', hora)
			.setTimestamp()
			.setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' })

		await interaction.channel
			.send({ embeds: [exampleEmbed] })
			.then((m) => m.react('hunter:986706044719861830'))
		return interaction.reply('wawa')
	}
}
