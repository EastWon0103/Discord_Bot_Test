const {REST, Routes} = require('discord.js');
const dotenv = require('dotenv');
const fs = require('node:fs');


// command 등록
const deployCommands = () => {
    dotenv.config();
    const commands = [];
    const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
        const command = require(`./commands/${file}`);
        commands.push(command.data.toJSON());
    }

    const rest = new REST({version: '10'}).setToken(process.env.TOKEN);

    (async () => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
            
            const data = await rest.put(
                Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
                {body: commands},
            );
        
            console.log(`Successfully reloaded ${data.length}`);
        } catch (error) {
            console.log(error);
        }
    })();
}

module.exports = {
    deployCommands
}