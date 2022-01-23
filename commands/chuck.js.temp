const axios = require('axios');

module.exports = {
	name: 'chuck',
	description: 'chuck norris facts',
	aliases:['norris'],
	args: false,
	cooldown: 5,
	usage:'',
	execute(message) {
		axios.get('https://api.chucknorris.io/jokes/random')
			.then(response => message.channel.send(response.data.value))
			.catch(err => console.log(err));
	},
};
