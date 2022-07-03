const axios = require('axios')
const { MessageEmbed } = require('discord.js')

const getName = async (id) => {
	const res = await axios.get(`https://www.speedrun.com/api/v1/users/${id}`)
	const name = res.data.data.names.international
	return name
}

const getGame = async (game) => {
	const res = await axios.get(`https://www.speedrun.com/api/v1/games/${game}`)
	const { data } = res.data
	const title = {
		id: data.id,
		name: data.names.international,
		image: data.assets['cover-small'].uri
	}
	return title
}

const getCategory = async (game, cat, sub) => {
	let res = await axios.get(`https://www.speedrun.com/api/v1/games/${game}/categories`)
	const categories = res.data.data
	let result = categories.filter((category) => category.id == cat)
	console.log(result)
	// const name = res.data.data.name
	// const res2 = await axios.get(
	//   `https://www.speedrun.com/api/v1/categories/${id}/variables`
	// )
	// let sub = []
	// sub = res2.data.data[0].values.values
	// console.log(sub['21g9ek6q'].label)
	// return name
}

// const getRuns = async (game, cat, sub) => {
//   if (!sub) {
//     try {
//       const res = await axios.get(
//         `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${cat}`
//       )
//       let runs = res.data.data.runs
//       runs = runs.slice(0, 3)
//       return runs
//     } catch (error) {
//       console.log(error)
//     }
//   } else
//     try {
//       const res = await axios.get(
//         `https://www.speedrun.com/api/v1/leaderboards/${game}/category/${cat}?var-${sub}`
//       )
//       let runs = res.data.data.runs
//       runs = runs.slice(0, 3)
//       return runs
//     } catch (error) {
//       console.log(error)
//     }
// }

// const makeData = (message, runs) => {
//   let data = []
//   let waiting = runs.length
//   runs.forEach(async (run) => {
//     const entry = {
//       place: run.place,
//       player: await getName(run.run.players[0].id),
//       time: run.run.times.primary,
//       title: await getTitle(run.run.game),
//       category: await getCategory(run.run.category),
//     }
//     data.push(entry)
//     waiting--
//     if (waiting == 0) {
//       data.sort((a, b) => a.place - b.place)
//       sendMessage(message, data)
//     }
//   })
// }

// const sendMessage = (message, data) => {
//   const embed = new MessageEmbed()
//     .setColor('#EC1A28')
//     .setTitle(`${data[0].title.name}`)
//     .setDescription(`${data[0].category} - Reverse Boss Order`)
//     .setThumbnail(`${data[0].title.image}`)
//     .addField('1er lugar:', `${data[0].player} - ${data[0].time.slice(2)}`)
//     .addField('2do lugar:', `${data[1].player} - ${data[1].time.slice(2)}`)
//     .addField('3er lugar:', `${data[2].player} - ${data[2].time.slice(2)}`)
//   message.channel.send(embed)
// }

module.exports.getGame = getGame
module.exports.getCategory = getCategory
// module.exports.getName = getName
// module.exports.getRuns = getRuns
// module.exports.makeData = makeData
//module.exports.sendMessage = sendMessage
