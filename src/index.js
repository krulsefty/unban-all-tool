// s
// e
// f
// t
// y

const { Client } = require("discord.js")

const { TOKEN, GUILDID } = require("./config.js")

const client = new Client()

client.on("ready", async () => {
  console.log(`logged in as ${client.user.tag}`)
  client.user.setActivity("by sefty", { type: 1 })

  try {
    const guild = client.guilds.cache.get(GUILDID)
    if (!guild) {
      console.log('Server not found.')
      return
    }

    const bans = await guild.fetchBans()
    if (bans.size === 0) {
      console.log('Nobody is banned.')
      return
    }

    bans.forEach(async (ban) => {
      try {
        await guild.members.unban(ban.user);
        console.log(`Unbanned ${ban.user.username} [${ban.user.id}]`);
      } catch (error) {
        console.error(`Failed to unban ${ban.user.usernam}:`, error);
      }
    });
  } catch (error) {
    console.error()
  }

})

client.login(TOKEN)

client.on("debug", () => { })
client.on("warn", () => { })
client.on("error", () => { })
