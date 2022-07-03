async function getFreeGames(platform) {
	try {
		const res = await fetch(
			`https://www.gamerpower.com/api/giveaways?platform=${platform}&type=game`
		)
		const games = await res.json()
		if (games.status === 0) return null
		else return games
	} catch (error) {
		console.log(error)
	}
}
module.exports.getFreeGames = getFreeGames
