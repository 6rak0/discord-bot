const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { getGamesAmerica, getPrices } = require('nintendo-switch-eshop')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('switch')
		.setDescription('te envío el precio actual del juego de switch que buscas')
		.addStringOption((option) =>
			option.setName('juego').setDescription('nombre del juego que buscas').setRequired(true)
		),
	async execute(interaction) {
		await interaction.deferReply({ ephemeral: true })
		const query = interaction.options.getString('juego')
		const allGames = await getGamesAmerica()
		const queryGames = allGames.filter((game) =>
			game.title.toLowerCase().includes(query.toLowerCase())
		)
		if (!queryGames[0]) {
			return interaction.editReply({
				content: 'no encontré ningún juego con ese nombre, revisa que lo hayas escrito bien',
				ephemeral: true
			})
		}
		queryGames.forEach(async (game) => {
			let data = await getPrices('MX', game.nsuid)
			data = data.prices[0]
			if (data.discount_price) {
				const embed = new EmbedBuilder()
					.setColor('#EC1A28')
					.setTitle(game.title)
					.setURL(`https://nintendo.com${game.url}`)
					.setImage(`${game.horizontalHeaderImage}.jpg`)
					.addFields(
						{ name: 'precio normal:', value: data.regular_price.amount },
						{ name: 'precio con descuento:', value: data.discount_price.amount },
						{ name: 'finaliza el:', value: data.discount_price.end_datetime.split('T')[0] }
					)
				await interaction.user.send({ embeds: [embed] })
			} else {
				const embed = new EmbedBuilder()
					.setColor('#EC1A28')
					.setTitle(game.title)
					.setURL(`https://nintendo.com${game.url}`)
					.setImage(`${game.horizontalHeaderImage}.jpg`)
					.addFields({ name: 'precio:', value: data.regular_price.amount })
				await interaction.user.send({ embeds: [embed] })
			}
		})
		return interaction.editReply({
			content: 'te envié los juegos por mensaje directo',
			ephemeral: true
		})
	}
}
