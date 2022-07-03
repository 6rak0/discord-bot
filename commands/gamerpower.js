const { SlashCommandBuilder } = require('@discordjs/builders')
const { MessageEmbed } = require('discord.js')
const { getFreeGames } = require('../lib/utils')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('gratis')
		.setDescription('responde con los juegos gratis del momento')
		.addStringOption((option) =>
			option
				.setName('plataforma')
				.setDescription('plataforma')
				.setRequired(true)
				.addChoices([
					['pc', 'pc'],
					['steam', 'steam'],
					['epic', 'epic-games-store'],
					['ubisoft', 'ubisoft'],
					['origin', 'origin'],
					['switch', 'switch'],
					['play station', 'ps4.ps5'],
					['xbox', 'xbox-one.xbox-series-xs'],
					['battlenet', 'battlenet']
				])
		),
	async execute(interaction) {
		const platform = interaction.options.getString('plataforma')
		const games = await getFreeGames(platform)
		if (!games) {
			return interaction.reply({
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
			return interaction.reply({
				content: 'se han enviado los juegos gratis por mensaje directo',
				ephemeral: true
			})
		}
	}
}
