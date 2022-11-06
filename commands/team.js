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
        .setDescription('팀을 랜덤으로 나눕니다.(모두 일반 채널에 있어야 합니다.)'),
    async execute(interaction) {
        //일반 채널
        const mainChannel = interaction.guild.channels.cache.get(process.env.CHAT_ID_NORMAL);
        
        //1팀 채널과 2팀 채널
        const team1 = interaction.guild.channels.cache.get(process.env.CHAT_ID_1);
        const team2 = interaction.guild.channels.cache.get(process.env.CHAT_ID_2);
        
        
        try {
            var setTeam1 = true;
            const memberSize = mainChannel.members.size;
            const halfSize = Math.floor(memberSize/2);            

            var team1Count = 0;
            var team2Count = 0;
            mainChannel.members.map((member) => {
                //랜덤픽
                if(Math.round(Math.random())==1){
                    setTeam1 = !setTeam1;
                }
                
                if(team1Count <= halfSize && setTeam1) {
                    //team1번에 자리가 남고 team1로 가라는 경우
                    member.voice.setChannel(team1.id);
                    team1Count++;
                } else if (team2Count <= halfSize && !setTeam1){
                    //team2번에 자리가 남고 team2로 가라는 경우
                    member.voice.setChannel(team2.id);
                    team2Count++;
                } else if(setTeam1){
                    //team1에 자리가 꽉차고 team1로 가라는 경우 (team2로 가야함)
                    member.voice.setChannel(team2.id);
                    team2Count++;
                } else {
                    //team2에 자리가 꽉차고 team2로 가라는 경우 (team1로 가야함)
                    member.voice.setChannel(team1.id);
                    team1Count++;
                }
            });
            await interaction.reply("팀을 나누었습니다.");
        } catch (err) {
            console.log(err);
            await interaction.reply("에러가 났습니다.")
        }
    },
};