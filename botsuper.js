const { Telegraf, Telegram, Markup } = require('telegraf')

const bot = new Telegraf('1184997229:AAFgeR_nqBvobe5mF-OPhivHwIw7ELEpvJE')
const axios = require ('axios')

bot.command('start', ctx => {
    var nama_pengguna = ctx.from.first_name+" "+ctx.from.last_name;
    var username_pengguna = ctx.from.username;
    var IDchat = ctx.from.id;
    console.log(ctx.chat);

    bot.telegram.sendMessage(ctx.chat.id, "Haloo "+nama_pengguna+". Namaku adalah Botian. Saya adalah bot yang bertugas untuk membantu kalian dalam mengumpulkan UTS."+"\nSilahkan pilih Menu Utama untuk memulai akses bot.",
    {
      reply_markup:{
        inline_keyboard: [
          [
          {text: 'Menu Utama', callback_data: 'menuutama'}
          ]
        ]
      }
    })
})

bot.action('menuutama', ctx => {
  if (ctx.from.id == 1395813819){
    bot.telegram.sendMessage(ctx.chat.id, 'Pilih Menu:',{
      reply_markup:{
        inline_keyboard: [
          [
            {text: 'Menu Admin', callback_data: 'admin'}
          ],

          [
            {text: 'Mulai Ujian', callback_data: 'ujian'}
          ],

          [
            {text: 'Cek Nilai Ujian', callback_data: 'nilai'}
          ]
        ]
      }
    })
  }
  else{
    bot.telegram.sendMessage(ctx.chat.id, 'Pilih Menu:',{
      reply_markup:{
        inline_keyboard: [
          [
            {text: 'Mulai Ujian', callback_data: 'ujian'}
          ],

          [
            {text: 'Cek Nilai Ujian', callback_data: 'nilai'}
          ]
        ]
      }
    })
  }
});

bot.action('ujian', ctx => {
  console.log(ctx.chat);
  bot.telegram.sendMessage(ctx.chat.id, "Soal Ujian Pemograman Web:\n\n1. Buatlah ringkasan mengenai bot telegram.\n2. Berikan keunggulan dan kekurangan penggunaan bot telegram.\n3. Kumpulkan dengan format TugasUTS_<NPM>_<Nama>_<webb>.\n4. Kirim kirimkan file anda pada bot ini.\n\n Pilih Menu",
    {
      reply_markup:{
        inline_keyboard: [
          [
            {text: 'Upload Tugas', callback_data: 'tugas'}
          ],

          [
            {text: 'Kembali ke Menu Utama', callback_data: 'menuutama'}
          ]
        ]
      }
    })
});

bot.action('admin', ctx => {
  console.log(ctx.chat);
  bot.telegram.sendMessage(ctx.chat.id, "Pilih Menu:",
    {
      reply_markup:{
        inline_keyboard: [
          [
            {text: 'Masukkan Nilai', callback_data: 'input'}
          ],

          [
            {text: 'Kembali ke Menu Utama', callback_data: 'menuutama'}
          ]
        ]
      }
    })
});

bot.action('tugas', ctx => {
  console.log(ctx.chat);
  bot.telegram.sendMessage(ctx.chat.id, "Silahkan kirimkan tugas anda sesuai dengan format file yang telah ditentukan.")
});

bot.action('nilai', ctx => {
    ctx.reply('Silahkan Cek nilai anda pada link dibawah ini.\n\nLink Nilai Ujian: https://github.com/EdJoPaTo/telegraf-inline-menu')
    console.log(ctx.chat);

    bot.telegram.sendMessage(ctx.chat.id, 'Kembali ke Menu Utama?',
    {
      reply_markup:{
        inline_keyboard: [
          [
            {text: 'Kembali ke Menu Utama', callback_data: 'menuutama'}
          ]
        ]
      }
    })
});

bot.on('message', async ctx => {
  console.log(ctx);
  var nama_pengguna = ctx.from.first_name+" "+ctx.from.last_name;
  var username_pengguna = ctx.from.username;
  var IDchat = ctx.from.id;
  
  if (ctx.updateSubTypes[0] == 'document'){
      try {
          let link = await bot.telegram.getFileLink(ctx.message.document.file_id)
          ctx.reply('File anda telah berhasil terupload.')
          ctx.telegram.sendMessage(
            1395813819, 'Terdapat mahasiswa yang mengirimkan file kepada bot Anda\n\n'+ 'Nama  : '+nama_pengguna+'\nUsername  : '+username_pengguna+'\nChat ID : '+IDchat+'\nLink File: '+link,
              {
                reply_markup:{
                  inline_keyboard: [
                    [
                      {text: 'Masukkan Nilai', callback_data: 'input'}
                    ]
                  ]
                }
              }
            )
      } catch (error) {

      }
      
  }
  
});

bot.action('input', ctx => {
  ctx.reply('Masukkan Chat ID mahasiswa yang akan diberikan nilai.');
  bot.on('message', async ctx => {
    console.log(ctx);
    var nama_pengguna = ctx.from.first_name+" "+ctx.from.last_name;
    var username_pengguna = ctx.from.username;
    var IDchat = ctx.from.id;
    
    if (ctx.updateSubTypes[0] == 'text'){
      try{
        let chatid = await bot.telegram.getChat(ctx.message.text.chatid)
        ctx.reply('Masukkan nilai mahasiswa tersebut.')
        let nilaimhs = await bot.telegram.getChat(ctx.message.text.nilaimhs)
        ctx.telegram.sendMessage(chatid, 'Nilai anda: '+ nilaimhs+'\nSilahkan klik menu dibawah ini untuk menvalidasi nilai anda.',
        {
          reply_markup:{
            inline_keyboard: [
              [
                {text: 'Validasi Nilai', callback_data: 'validasi'}
              ]
            ]
          }
        })
        bot.action('validasi', async ctx => {
          console.log(ctx);
          var nama_pengguna = ctx.from.first_name+" "+ctx.from.last_name;
          var username_pengguna = ctx.from.username;
          var IDchat = ctx.from.id;
          
          ctx.reply('Masukkan NPM Anda:')
          let npm = await bot.telegram.getChat(ctx.message.text.npm)
          if (ctx.message.text = npm){
            ctx.telegram.sendMessage(1395813819, 'Terdapat mahasiswa yang mengirimkan file kepada bot Anda\n\n'+ 'Nama  : '+nama_pengguna+'NPM  : '+npm+'\nUsername  : '+username_pengguna+'\nChat ID : '+IDchat)
          }
          else{
  
          }
        });
      }catch (error) {
  
      }
    };
  });
})



bot.launch()