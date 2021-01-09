const { MessageEmbed } = require('discord.js')
const {
  getGame,
  getCategory,
  getName,
  getRuns,
  makeData,
} = require('../lib/utils')

module.exports = {
  name: 'record',
  description: 'record de speedruns',
  aliases: ['rm', 'wr'],
  args: true,
  cooldown: 15,
  usage:
    '<nombre abreviado del juego e.g. alttp> <nombre abreviado de la subcategoría>',
  async execute(message, args) {
    if (!args[0])
      return message.channel.send('proporciona nombre abreviado del juego')
    const title = await getGame(args[0])
    await getCategory(...args)
    // if (args[0] === 'alttp') {
    //   if (!args[1])
    //     message.channel.send(
    //       'proporciona el nombre de la subcategoría abreviada e.g. rbo'
    //     )
    //   if (args[1] === 'rbo') {
    //     try {
    //       const runs = await getRuns(args[0], 'n2y180m2', '68kzoq82=21g9ek6q')
    //       let waiting = runs.length
    //       runs.forEach(async (run) => {
    //         const entry = {
    //           place: run.place,
    //           player: await getName(run.run.players[0].id),
    //           time: run.run.times.primary,
    //         }
    //         data.push(entry)
    //         waiting--
    //         sendMessage()
    //       })
    //       const sendMessage = () => {
    //         if (waiting == 0) {
    //           data.sort((a, b) => a.place - b.place)
    //           const embed = new MessageEmbed()
    //             .setColor('#EC1A28')
    //             .setTitle(`The Legend of Zelda: A Link to the Past`)
    //             .setDescription('Major Glitches - Reverse Boss Order')
    //             .setThumbnail(
    //               `https://www.speedrun.com/themes/alttp/cover-64.png`
    //             )
    //             .addField(
    //               '1er lugar:',
    //               `${data[0].player} - ${data[0].time.slice(2)}`
    //             )
    //             .addField(
    //               '2do lugar:',
    //               `${data[1].player} - ${data[1].time.slice(2)}`
    //             )
    //             .addField(
    //               '3er lugar:',
    //               `${data[2].player} - ${data[2].time.slice(2)}`
    //             )
    //           message.channel.send(embed)
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   } else if (args[1] === '100%') {
    //     try {
    //       const runs = await getRuns(args[0], 'wk6jz5rd', '2lg2368p=rqvx6jrl')
    //       let waiting = runs.length
    //       runs.forEach(async (run) => {
    //         const entry = {
    //           place: run.place,
    //           player: await getName(run.run.players[0].id),
    //           time: run.run.times.primary,
    //         }
    //         data.push(entry)
    //         waiting--
    //         sendMessage()
    //       })
    //       const sendMessage = () => {
    //         if (waiting == 0) {
    //           data.sort((a, b) => a.place - b.place)
    //           const embed = new MessageEmbed()
    //             .setColor('#EC1A28')
    //             .setTitle(`The Legend of Zelda: A Link to the Past`)
    //             .setDescription('No Major Glitches - 100%')
    //             .setThumbnail(
    //               `https://www.speedrun.com/themes/alttp/cover-64.png`
    //             )
    //             .addField(
    //               '1er lugar:',
    //               `${data[0].player} - ${data[0].time.slice(2)}`
    //             )
    //             .addField(
    //               '2do lugar:',
    //               `${data[1].player} - ${data[1].time.slice(2)}`
    //             )
    //             .addField(
    //               '3er lugar:',
    //               `${data[2].player} - ${data[2].time.slice(2)}`
    //             )
    //           message.channel.send(embed)
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // } else if (args[0] === 'tww') {
    //   if (!args[1])
    //     message.channel.send(
    //       'proporciona el nombre de la subcategoría abreviada e.g. anynomss'
    //     )
    //   if (args[1] === 'anynomss') {
    //     try {
    //       const runs = await getRuns(args[0], 'wkp3gew2')
    //       let waiting = runs.length
    //       runs.forEach(async (run) => {
    //         const entry = {
    //           place: run.place,
    //           player: await getName(run.run.players[0].id),
    //           time: run.run.times.primary,
    //         }
    //         data.push(entry)
    //         waiting--
    //         sendMessage()
    //       })
    //       const sendMessage = () => {
    //         if (waiting == 0) {
    //           data.sort((a, b) => a.place - b.place)
    //           const embed = new MessageEmbed()
    //             .setColor('#EC1A28')
    //             .setTitle(`The Legend of Zelda: The Wind Waker`)
    //             .setDescription('Any % - No MSS')
    //             .setThumbnail(
    //               `https://www.speedrun.com/themes/tww/cover-64.png`
    //             )
    //             .addField(
    //               '1er lugar:',
    //               `${data[0].player} - ${data[0].time.slice(2)}`
    //             )
    //             .addField(
    //               '2do lugar:',
    //               `${data[1].player} - ${data[1].time.slice(2)}`
    //             )
    //             .addField(
    //               '3er lugar:',
    //               `${data[2].player} - ${data[2].time.slice(2)}`
    //             )
    //           message.channel.send(embed)
    //         }
    //       }
    //     } catch (error) {
    //       console.log(error)
    //     }
    //   }
    // } else if (args[0] === 'test') {
    //   try {
    //     const runs = await getRuns('alttp', 'n2y180m2', '68kzoq82=21g9ek6q')
    //     makeData(message, runs)
    //   } catch (error) {
    //     console.log(error)
    //   }
    // }
  },
}
