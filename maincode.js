

// server {requests}

console.log("Bot started.");

 //////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
 //////////////////////////////////////////////\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\

 //describe the Dicord API
const Discord = require("discord.js");
const main = require('qrcode-terminal');
const client = new Discord.Client({ intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_PRESENCES"] });
const { MessageEmbed } = require('discord.js');
const AntiSpam = require("discord-anti-spam");

const antiSpam = new AntiSpam({
  warnThreshold: 3, // Amount of messages sent in a row that will cause a warning.
  muteThreshold: 4, // Amount of messages sent in a row that will cause a mute
   // Amount of messages sent in a row that will cause a ban.
  maxInterval: 3000, // Amount of time (in milliseconds) in which messages are considered spam.
  warnMessage: "{@user}, Please stop spamming or it will lead lead to mutes.", // Message that will be sent in chat upon warning a user.
  muteMessage: "**{user_tag}** has been muted for spamming.", // Message that will be sent in chat upon muting a user.
  
  maxDuplicatesWarning: 6, // Amount of duplicate messages that trigger a warning.

  maxDuplicatesMute: 8, // Ammount of duplicate message that trigger a mute.
  ignoredPermissions: ["MANAGE_ROLES"], // Bypass users with any of these permissions.
  ignoreBots: true, // Ignore bot messages.
  verbose: true, // Extended Logs from module.
  ignoredMembers: [], // Array of User IDs that get ignored.
  unMuteTime: 1, // Amount of time (in minutes) a user will be muted for.
  removeMessages: true, // If the bot should remove all the spam messages when taking action on a user!
  modLogsEnabled: false, // If to enable modlogs
  modLogsChannelName: "vulcan-assistant-logs", // channel to send the modlogs too!
  modLogsMode: "embed",
  // And many more options... See the documentation.
});

//Bot prefix
 var prefix = "Vu!";

//Here the client runs

client.on("messageCreate", (message) => antiSpam.message(message));
client.on("message", message => {

  const Cmd = message.content;
  PrefixHelp();
  changeprefix();
  Role_mnge();
  ban_cmd();
  kickmem();
  roleall();
  role_remove();
  MemServers();
  User_Info();
  //membercount
  async function MemServers()
  {
   if (message.content.startsWith(`${prefix}membercount`))
   {
    let guildhandle =  message.guild.members.cache;
   let TotalCount = message.guild.memberCount;
   let manageperms = message.guild.members.cache.filter(m => m.permissions.has('MANAGE_GUILD'|| 'MANAGE_ROLES' || 'MANAGE_CHANNELS' || 'MANAGE_EVENTS')).size;
   let Hosts =  manageperms;
   let Participants = TotalCount - Hosts - message.guild.members.cache.filter(member => member.user.bot).size + 1;
   let onlineMembers = message.guild.members.cache.filter(member => member.presence?.status === "online" ).size + message.guild.members.cache.filter(member => member.presence?.status === "dnd").size + 1;
   const memembed = new MessageEmbed().setTitle(":white_check_mark: Server MemberCount Results [SMR]").setDescription(`**Current Total Size:** ${TotalCount} Members \n\n > **Human users Count**: ${message.guild.members.cache.filter(member => !member.user.bot).size} \n > **Active Users:** ${onlineMembers} \n > **STAFF TEAM **: ${Hosts} \n > **Normal Members**: ${Participants}`).setColor("PURPLE");

   message.channel.send({embeds: [memembed]});
  }
 }
  if (message.content.startsWith(`${prefix}roleall-`))

  {
     if (!message.member.permissions.has('MANAGE_ROLES')) return false;
  
     let RoleallRole = message.mentions.roles.first();
     if (!RoleallRole) return message.reply("@ping a role to give!");
     else {
         message.guild.members.cache.filter(m => !m.user.bot).forEach(m => m.roles.remove(RoleallRole));
        message.channel.send("removed roles from all the members!");
     
     }
  }

  const bword = /\b(?:bitch|fuck|shit|mother fucker|cunt|shitty|dumbass|ass|shithead|\shitting|holyshit|sh!t|fuckoff|fuk|fukoff|daaaamn|goddamn|fucking|pussy|retard|dick|dickhead|damnit|nigga|nig| f*uck|f!ck)\b/gi 

  if (bword.test(message.content)) {
  if (message.member.permissions.has("ADMINISTRATOR" || "MANAGE_ROLES" || "BAN_MEMBERS")) return false;

    const log_em = new MessageEmbed()
    .setTitle(`User: **${message.author.tag}**`)
  .setDescription(` Auto Message delete, **Reason:** Containing a bad word`)
  .setColor('#7D0608');

     message.delete({timeout: 2000}).then(message.channel.send(`**${message.member.user.tag}** Watch your language.`)).catch(msg=> {msg.delete(1000)} );

     const  logs = client.channels.cache.get('1001026588768489482').send({ embeds: [log_em]});

  }


  //for Helping the user. 
  if (message.content.startsWith("Vu!help")) {
  
     const helpebd = new MessageEmbed().setTitle("List of Commands").setDescription(` (1) Vu!warn <@user> <reason>\n (2) Vu!kick <@user> <reason> (optional for reason)\n (3) Vu!ban <@user> <reason>\n (4) Vu!roleall+ <role> (gives a role to all the member)\n (5) Vu!roleall- <role> (removes a role from all members)\n (6) Vu!role+ <role> (gives role to user)\n (7) Vu!role- <role> (removes role from member)\n (8) Vu!getinfo <userid> (gets user info)\n  Feature: AutoMod Anti Spam `).setColor("DARK_AQUA")
     message.react("☑️");
     const info_new = new MessageEmbed().setTitle("Developer News!").setDescription(" Warn command is being removed temporary and might not be working. \n Added new cmd: Vu!getinfo <userid> ").setColor("PURPLE");
     message.channel.send({embeds: [helpebd]});
     message.channel.send({embeds: [info_new]});
     
  }

  // warn

async function kickmem()
{
// Kick
if (message.content.startsWith(`${prefix}kick`)) {
  
    let kickmember = message.mentions.members.first();
     let kickreason = message.content.split(" ").slice(2).join(' ');

 if (!message.member.permissions.has('KICK_MEMBERS')) return false;

    if (!kickmember || !kickreason) return message.channel.send("Please use the full and correct command format.");
  
    if (kickmember || kickreason) 
    {
      if (!kickmember.kickable) return message.channel.send(":x: I can't kick This User. The user is either Mod/Admin or you don't have permission to ban the user.");
      
      else
      {
        kickmember.kick();
        message.channel.send(`:white_check_mark: kicked **${kickmember.user.tag}** | **${kickreason}**)`);
      }
   }     
 }
}
   async function ban_cmd()
   {
  // for Ban 
  if (message.content.startsWith(`${prefix}ban`)) {

    let banmember = message.mentions.members.first();
     let banreason = message.content.split(" ").slice(2).join(' ');
     
if (!message.member.permissions.has('BAN_MEMBERS')) return false;

    if (!banmember || !banreason) return message.reply("please fill up the other arguments for this command.");
  
    if (banmember || banreason ) 
    {
      if (!banmember.bannable || banmember.permissions.has("BAN_MEMBERS")) return message.channel.send(":x: I Can't Ban This User. The user is either mod/Admin or you don't have permission to ban the user.");
      
      banmember.send(`You were banned from ${message.guild.name} for the reason: ${banreason}`).catch(banerror => console.log(banerror))
     banmember.ban({reason: banreason});
     const pban = new MessageEmbed()
          .setTitle(`** BAN ** `)
          .setDescription(`:white_check_mark: ${banmember.user.toString()} was banned | **${banreason}** \n Moderator : ${message.author.toString()} `).setColor("GREEN");

      message.channel.send({embeds: [pban]});
      client.channels.cache.get('1001026588768489482').send({embeds: [pban]});
   }   
 }
   }

  async function PrefixHelp()
  {
  //for prefix.
  if (message.content.startsWith("?prefix"))
    {
     await message.member.send(`prefix of the [${message.guild.name}] server is "**${prefix}**"`).catch(e=>{console.log(`Saved bot from crash, error:\n${e}`)});
    }
  }

  async function changeprefix()
  {
    if (message.content.startsWith(`${prefix}prefixreset`))
    { 
      if (!message.member.permissions.has("MANAGE_MESSAGES")) return false;
      let newprefix = message.content.split(" ").slice(1).join(' ');

      if (!newprefix) return message.member.send("What should be the prefix?");
      else
      {
      prefix = newprefix;
      await message.channel.send(`changed the bot prefix to "${newprefix}"`);
      }
    }
  }
  async function Role_mnge()
  {
    if (message.content.startsWith(`${prefix}role+`))
    {
      
      let RoleMember = message.mentions.members.first();
       let Role = message.mentions.roles.first();
     if (!message.member.permissions.has("MANAGE_ROLES")) return false;
       if (Role || RoleMember)
       {
         RoleMember.roles.add(Role).catch(e=>{console.log(message.channel.send(`I can't add roles for this user! Please check my permissions. ${e}`))});

       }

        message.channel.send(`:white_check_mark: Added ${Role.name} role to ${RoleMember}`);
    }
  
  }

  async function role_remove()
  {
    if (message.content.startsWith(`${prefix}role-`))
    {
     let MRoleMember = message.mentions.members.first();
     let MRole = message.mentions.roles.first();
     if (!message.member.permissions.has("MANAGE_ROLES")) return false;

     if (MRole || MRoleMember)
      {
        MRoleMember.roles.remove(MRole).catch(e=>{console.log(`Saved bot from crash, error: ${e}`)}).then(msg => {
        message.channel.send("I can't manage roles for this user.");
        })

    } 
   }
  }
  async function ChnelLock()
  {

    if (message.content.startsWith(`${prefix}lock`))
    {
        
      const admin = message.guild.roles.cache.find(r => r.name === "Admin");
      const ModRole = message.guild.roles.cache.find(ro => ro.name === "Moderator");
      message.channel.permissionOverwrites.edit(message.guild.roles.everyone, {
        VIEW_CHANNEL: true,
        SEND_MESSAGES: false,
        READ_MESSAGE_HISTORY: true,
       
       }).catch();
      
  
       message.channel.send(`:white_check_mark: Locked this channel.`);
      }
      if (message.content.startsWith(`${prefix}unlock`))
      {
        const admin = message.guild.roles.cache.find(r => r.name === "Admin");
      const ModRole = message.guild.roles.cache.find(ro => ro.name === "Moderator");
        message.channel.permissionOverwrites.edit(message.guild.roles.everyone, 
          {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true,
          READ_MESSAGE_HISTORY: true
         }).catch(error => {console.log(error)});
         message.channel.send(`:white_check_mark: UnLocked this channel.`);
        }
      }
 

 async function roleall()
 {
  if (Cmd.startsWith(`${prefix}roleall+`))
  {
    if (!message.member.permissions.has("MANAGE_ROLES")) return false;

  let role_id = message.content.split(" ").slice(1).join(' ');

  let role_arg = message.guild.roles.cache.find(r => r.id === role_id);

  if (role_id)
  {
    message.guild.members.cache.filter(m => !m.user.bot).forEach(m => m.roles.add(role_arg));

      message.reply(`added roles to all the members! role: ${role_arg.name}`);
  }

}
}

async function User_Info()
{
  if (Cmd.startsWith(`${prefix}getinfo`))
{
  let user_id = message.content.split(" ").slice(1).join(' ');
  let mainuser = message.guild.members.cache.find(m => m.id === `${user_id}`);


   if (user_id)

   {
    let dateofuser = `${mainuser.joinedAt.getDay()} \ ${mainuser.joinedAt.getMonth()}`;
    let timeofuser = mainuser.user.createdAt.getMonth() 
    
    const allperms = Object.keys(Discord.Permissions.FLAGS);
    let userperms = allperms.map((perm) => { return mainuser.permissions.has(perm) ? `${perm}: YES ` : `${perm}: NO ` });

    const client_info = new MessageEmbed().addField("Info: ", `joined: ${dateofuser}`, true).addField('\u200b', `Account Age: ${mainuser.user.createdAt.getDay()}\ ${mainuser.user.createdAt.getMonth()}`, true).addField('\u200b', `Key Permissions: \n  ${userperms}`).setImage(mainuser.displayAvatarURL()).setDescription(`ID: ${mainuser.user.id}`).setColor("GOLD");
    message.channel.send({embeds: [client_info]});

   }
}
}

})

//bot login token
client.login("OTk5NjI0NjM4ODczMjA2ODc0.GrN37i.8BdtZiK36RhzWYsKb9Rbmy6ffGGoghyFa4adgU");
