module.exports = {
	name: 'delete',
	description: 'borra una cantidad de mensajes definida por el usuario',
	aliases:['borrar', 'borra'],
	args: true,
	cooldown: 5,
	usage:'<número de mensajes a borrar>',
	execute(message, args) {
		const amount = parseInt(args[0]) + 1;
		if(isNaN(amount)) {
			return message.reply(`ese no es número válido ${message.author}`);
		}
		else if(amount <= 1 || amount > 100) {
			return message.reply(`introduce un número entre 1 y 99${message.author}`);
		}
		message.channel.bulkDelete(args[0]).catch(err=>{
			console.error(err);
			message.channel.send('ocurrió un error tratando de eliminar los mensajes');
		});
	},
};
