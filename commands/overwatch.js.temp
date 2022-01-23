const overwatch = require('overwatch-api');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'overwatch',
	description: 'información de jugador de overwatch',
	aliases:['ow', 'overwachinango'],
	args: true,
	cooldown: 5,
	usage:'<nombre completo del jugador> <pc, xbl, psn>',
	execute(message, args) {
		if(!args[0]) return message.channel.send('proporciona nombre completo del jugador');
		if(!args[1] || (args[1] && !['pc', 'xbl', 'psn'].includes(args[1]))) return message.channel.send('proporciona una plataforma válida: pc, xbl, psn');
		if(args[0].includes('#')) args[0] = args[0].replace(/#/g, '-');

		overwatch.getProfile(args[1], 'global', args[0], (err, json)=>{
			if(err) return message.channel.send('no existe ese jugador');
			const { username, portrait, level, games, playtime:{ competitive, quickplay }, private } = json;
			const { sportsmanship, shotcaller, teammate } = json.endorsement;
			const { won, lost, draw, played } = json.games.competitive;
			const { tank, damage, support } = json.competitive;
			if(private) return message.channel.send('este jugador tiene sus datos privados');
			const embed = new MessageEmbed()
				.setColor('#F7943E')
				.setAuthor(`Overwatch - ${username}`, portrait)
				.addField('General:', `
                -Nivel: ${level || 0}
                -Sportsmanship: ${sportsmanship.rate || 0}%
                -Shotcaller: ${shotcaller.rate || 0}%
                -Teammate: ${teammate.rate || 0}%
                `)
				.addField('Competitivo:', `
                -Jugados: ${played || 0}
                -Ganados: ${won || 0}
                -Perdidos: ${lost || 0}
                -Empates: ${draw || 0}
                -Tanque: ${tank.rank || 'N/A'}
                -Daño: ${damage.rank || 'N/A'}
                -Apoyo: ${support.rank || 'N/A'}
                -Tiempo de juego: ${competitive || '00:00:00'}
                `, true)
				.addField('Quickplay:', `
                -Jugados: ${games.quickplay.played || 'N/A'}
                -Ganados: ${games.quickplay.won || 0}
                -Tiempo de juego: ${quickplay || 0}
                `, true)
				.setTimestamp();

			message.channel.send(embed);
		});
	},
};
