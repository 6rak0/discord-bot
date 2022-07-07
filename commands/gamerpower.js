const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { getFreeGames } = require('../lib/utils')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gratis')
		.setDescription('te envío una lista de juegos gratis')
		.addStringOption(
			(option) =>
				option
					.setName('plataforma')
					.setDescription('plataforma')
					.setRequired(true)
					.addChoices(
						{ name: 'pc', value: 'pc' },
						{ name: 'steam', value: 'steam' },
						{ name: 'epic', value: 'epic-games-store' },
						{ name: 'ubisoft', value: 'ubisoft' },
						{ name: 'origin', value: 'origin' },
						{ name: 'switch', value: 'switch' },
						{ name: 'battlenet', value: 'battlenet' },
						{ name: 'play station', value: 'ps4.ps5' },
						{ name: 'xbox', value: 'xbox-one.xbox-series-xs' }
					)
			// .addChoices([
			// 	['pc', 'pc'],
			// 	['steam', 'steam'],
			// 	['epic', 'epic-games-store'],
			// 	['ubisoft', 'ubisoft'],
			// 	['origin', 'origin'],
			// 	['switch', 'switch'],
			// 	['play station', 'ps4.ps5'],
			// 	['xbox', 'xbox-one.xbox-series-xs'],
			// 	['battlenet', 'battlenet']
			// ])
		),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true })
		const platform = interaction.options.getString('plataforma')
		const games = await getFreeGames(platform)
		if (!games) {
			return interaction.editReply({
				content: 'no hay juegos gratuitos disponibles por el momento',
				ephemeral: true
			})
		} else {
			games.forEach(async (game) => {
				const embed = new MessageEmbed()
					.setColor('#0ff1c3')
					.setTitle(game.title)
					.setURL(game.open_giveaway_url)
					.setDescription(game.description)
					.addFields(
						{ name: 'precio', value: game.worth, inline: true },
						{ name: 'plataforma', value: game.platforms, inline: true },
						{ name: 'finaliza', value: game.end_date }
					)
					.setImage(game.thumbnail)
				await interaction.user.send({ embeds: [embed] })
			})
			return interaction.editReply({
				content: 'te envié los juegos por mensaje directo',
				ephemeral: true
			})
		}
	}
}
