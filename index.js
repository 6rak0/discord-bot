const fs = require('node:fs')
const path = require('node:path')
const { Client, Collection, Intents } = require('discord.js')
const { token } = require('./config.json')

const client = new Client({ intents: [Intents.FLAGS.GUILDS] })

client.commands = new Collection()
const commmandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commmandsPath).filter((file) => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commmandsPath, file)
	const command = require(filePath)
	client.commands.set(command.data.name, command)
}
const eventsPath = path.join(__dirname, 'events')
const eventFiles = fs.readdirSync(eventsPath).filter((file) => file.endsWith('.js'))

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file)
	const event = require(filePath)
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args))
	} else {
		client.on(event.name, (...args) => event.execute(...args))
	}
}

client.login(token)
