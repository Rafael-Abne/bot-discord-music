const Discord  = require('discord.js');
const client = new Discord.Client();
const ytdl = require('ytdl-core');
const array_welcome = ['olá','oi','Olá','ola','Ola','Oi'];
client.login('Njk4NTc4MjAyNDQ4MTAxMzk4.XpH4Cg.1fGxV-YET0Jd8lzkas21HXX6Xlc');

client.on('ready', () => {
  console.log('I am ready');
});

function music(connection, link, stop){
    const watcher = connection.play(
        ytdl(link, {
            filter: 'audioonly',
            quality: 'highest',
            })
        );
    if(stop){
       watcher.end();
    }
    watcher.on('end', () => voiceChannel.leave()); 
}

client.on('message', async (message) =>{
    const client_message = message.content;
    const bot = message.channel;
    const voiceChannel = message.member.voice.channel;

    if(array_welcome.indexOf(client_message) > -1){
        bot.send('Olá como vai');

    }else if(client_message == 'ping'){
        bot.send('pong');

    }else if(client_message.toLowerCase() == "!play"){
        if(!voiceChannel){
            return message.reply('Entre em um canal de voz primeiro!');
        }
        const connection = await voiceChannel.join();
        music(connection, 'https://www.youtube.com/watch?v=iywaBOMvYLI', false);
        bot.send('música tocando...');

    }else if(client_message.split(" ")[0].toLowerCase() == '!play' && client_message.split(" ")[1] != ''){
       const connection = await voiceChannel.join();
       const link = client_message.split(" ")[1];
       music(connection, link, false);
       bot.send('tocando sua música...!');
    }
    if(client_message.toLowerCase() == '!stop'){
        if(!voiceChannel){
            return message.reply('Entre em um canal de voz primeiro!');
        }
        const connection = await voiceChannel.join();
        music(connection ,'', true);
        bot.send('música parada!');
    }


    

});    