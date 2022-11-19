const Discord = require('discord.js');
const { Client, GatewayIntentBits, AuditLogEvent, EmbedBuilder, PermissionFlagsBits,
   ActivityType, ChannelType, MessageFlags, DiscordAPIError, 
     UserFlags,  MessageType, MessageComponentInteraction, ActionRowBuilder,
     ButtonBuilder, REST, SlashCommandBuilder, Routes, Events, SelectMenuBuilder,  GuildMember, ModalBuilder, TextInputStyle, TextInputBuilder, InteractionType, ButtonStyle } = require('discord.js');
const { createVerify } = require('node:crypto');
const { Stream } = require('node:stream');

const {  joinVoiceChannel, StreamType, VoiceConnectionStatus, getVoiceConnection, VoiceReceiver, createAudioPlayer, createAudioResource, VoiceConnection} = require('@discordjs/voice');
const ytdl = require('ytdl-core');

const client = new Discord.Client({intents: 
  [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, 
    GatewayIntentBits.GuildMembers, GatewayIntentBits.MessageContent,
 GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildPresences, 
 GatewayIntentBits.GuildMessageTyping,
 GatewayIntentBits.GuildBans, GatewayIntentBits.DirectMessageTyping, GatewayIntentBits.GuildVoiceStates] 
});


client.on(Events.MessageCreate, async vcmanager => {

  if (vcmanager.content.startsWith('?playvc'))
  {
let handlevcid;
let link = vcmanager.content.split(" ").slice(1).join(' ');

    let channelid = vcmanager.guild.channels.cache.find(m => m.name === 'vc-fantasy' && m.type === ChannelType.GuildVoice);
    if (!channelid) vcmanager.guild.channels.create({ name: "vc-fantasy", type: ChannelType.GuildVoice});
    try {
    const vc = joinVoiceChannel({
      channelId: channelid.id,
	guildId: vcmanager.guildId,
	adapterCreator: vcmanager.guild.voiceAdapterCreator,
      })
      
      const stream = ytdl(link, { filter: 'audioonly', quality: 248});
      const resource = createAudioResource(stream, { inlineVolume: true });
      resource.volume.setVolume(100);

      const player = createAudioPlayer();
      
      vc.subscribe(player);
    player.play(resource);
    }
    catch (err) {console.log(err)}
    }
    
})

client.login(process.env.token);
