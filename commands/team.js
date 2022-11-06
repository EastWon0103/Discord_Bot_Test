const {SlashCommandBuilder} = require('discord.js');
const dotenv = require('dotenv');
dotenv.config();
/**
 * /team
 * output: 팀이 나누어집니다.
 */
module.exports = {
    data: new SlashCommandBuilder()
        .setName('team')
        .setDescription('팀을 나눕니다.(모두 일반 채널에 있어야 합니다.)'),
    async execute(interaction) {
        //일반 채널
        const mainChannel = interaction.guild.channels.cache.get(process.env.CHAT_ID_NORMAL);
        
        //1팀 채널과 2팀 채널
        const team1 = interaction.guild.channels.cache.get(process.env.CHAT_ID_1);
        const team2 = interaction.guild.channels.cache.get(process.env.CHAT_ID_2);
        
        console.log(mainChannel.members.size);
        try {
            var setTeam1 = true;
            mainChannel.members.map((member) => {
                if(setTeam1) {
                    member.voice.setChannel(team1.id);
                    setTeam1 = !setTeam1;
                } else{
                    member.voice.setChannel(team2.id);
                    setTeam1 = !setTeam1;
                } 
            });
            await interaction.reply("팀을 나누었습니다.");
        } catch (err) {
            console.log(err);
            await interaction.reply("에러가 났습니다.")
        }
    },
};