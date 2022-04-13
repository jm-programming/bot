const uploadImage = require('../lib/uploadImage') 
const { sticker } = require('../lib/sticker')
const { MessageType } = require('@adiwajshing/baileys')

let handler = async (m, { conn, text }) => {
 try {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || ''
  if (!mime) throw 'Foto no soportada'
  if (!/image\/(jpe?g|png)/.test(mime)) throw `El peso ${mime} de la foto no es soportada`
  let img = await q.download()
  let url = await uploadImage(img)
  let wanted = `https://api.dhamzxploit.my.id/api/canvas/wanted?url=${url}`
  let stiker = await sticker(null, wanted, 'wanted', '©Aj Manuel - Bot')
  conn.sendMessage(m.chat, stiker, MessageType.sticker, {
    quoted: m
  })
 } catch (e) {
   m.reply('Conversión fallida, recuerde responder a una imagen')
  }
}
handler.help = ['wanted']
handler.tags = ['General']
handler.command = /^wanted$/i
handler.owner = false
handler.mods = false
handler.premium = false
handler.group = false
handler.private = false

handler.admin = false
handler.botAdmin = false

handler.fail = null

module.exports = handler
