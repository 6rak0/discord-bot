module.exports = {
  name: 'random',
  description:
    'genera un número aleatorio entre 1 y el límite que escojas hasta 999999',
  aliases: ['rng', 'aleatorio', 'dado'],
  args: true,
  cooldown: 1,
  usage: '<límite superior>',
  execute(message, args) {
    const limit = parseInt(args[0])
    if (isNaN(limit) || limit === 0)
      message.reply(`ese no es un número válido ${message.author}`)
    else if (limit > 999999) message.reply(`el límite debe ser menor a 999999`)
    else {
      const random = Math.floor(Math.random() * Math.floor(limit))
      message.reply(`te ha salido un ${random + 1} ${message.author}`)
    }
  },
}
