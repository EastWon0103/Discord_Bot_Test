const {SlashCommandBuilder} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();

/**
 * /ping
 * output: Pong!
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
    },
};