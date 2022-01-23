const API = require('call-of-duty-api')({ platform: 'battle' });
const { user, password } = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'cod',
	description: 'información de warzone',
	aliases:['warzone', 'wz'],
	args: true,
	cooldown: 5,
	usage: '<nombre#XXXX>',
	execute(message, args) {
		if(!args[0]) return message.channel.send('proporciona nombre completo del jugador');
		API.login(user, password)
			.then(() => {
				API.MWwz(args[0])
					.then(data => {
						const embed = new MessageEmbed()
							.setColor('#427ddb')
							.setAuthor(`Warzone - ${args[0].split('#')[0]}`)
							.setThumbnail('https://www.callofduty.com/content/dam/atvi/callofduty/cod-touchui/warzone/common/wz-icon.png')
							.addField('Stats', `
                            -Ganados: ${data.br_all.wins || 0}
                            -Jugados: ${data.br_all.gamesPlayed || 0}
                            -Kills: ${data.br_all.kills || 0}
                            -Deaths: ${data.br_all.deaths || 0}
                            -K/D ratio: ${data.br_all.kdRatio.toFixed(2)}
                            `);
						message.channel.send(embed);
					})
					.catch(err => {
						console.log(err);
						message.channel.send('no existe ese jugador');
					});
			})
			.catch(err=>console.log(err));
	},
};
