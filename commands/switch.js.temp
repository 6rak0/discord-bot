const { getGamesAmerica, getPrices } = require('nintendo-switch-eshop');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'switch',
	description: 'precios de la tienda de switch',
	aliases:['sw'],
	args: true,
	cooldown: 10,
	usage:'[juego]',
	async execute(message, args) {
		if(!args[0]) return message.channel.send('proporciona el nombre de juego');
		const rawQuery = args.map((word) => {
			return word.charAt(0).toUpperCase() + word.slice(1);
		});
		const query = rawQuery.join(' ');
		console.log(query);
		const allGames = await getGamesAmerica();
		const queryGames = allGames.filter(game => game.title.includes(query));
		if(!queryGames[0]) return message.channel.send(`${query} no encontrado, revisa la escritura`);
		queryGames.map(async (game) => {
			let data = await getPrices('MX', game.nsuid);
			data = data.prices[0];
			if(data.discount_price) {
				const embed = new MessageEmbed()
					.setColor('#EC1A28')
					.setTitle(game.title)
					.setThumbnail(`https://nintendo.com${game.boxArt}`)
					.addField('Precio:', `${data.regular_price.amount}`, true)
					.addField(`Oferta hasta el ${data.discount_price.end_datetime.split('T')[0]}:`, `${data.discount_price.amount}`, true);
				message.channel.send(embed);
			}
			else {
				const embed = new MessageEmbed()
					.setColor('#EC1A28')
					.setTitle(game.title)
					.setThumbnail(`https://nintendo.com${game.boxArt}`)
					.addField('Precio:', `${data.regular_price.amount}`);
				message.channel.send(embed);
			}
		});
	},
};
