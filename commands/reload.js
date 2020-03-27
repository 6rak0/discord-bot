module.exports = {
	name: 'reload',
	description: 'Reloads a command',
	aliases:['recargar'],
	args: true,
	cooldown: 10,
	usage:'[comando]',
	execute(message, args) {
		const commandName = args[0].toLowerCase();
		const command = message.client.commands.get(commandName)
	|| message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

		if (!command) return message.channel.send(`No hay comando con ese nombre \`${commandName}\`, ${message.author}!`);
		delete require.cache[require.resolve(`./${commandName}.js`)];
		try {
			const newCommand = require(`./${commandName}.js`);
			message.client.commands.set(newCommand.name, newCommand);
			console.log('command reloaded correctly');
		}
		catch (error) {
			console.log(error);
			message.channel.send(`Hubo un error recargando el comando \`${commandName}\`:\n\`${error.message}\``);
		}
	},
};