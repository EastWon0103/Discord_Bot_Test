const {SlashCommandBuilder} = require('discord.js');
/**
 * /가위바위보
 * output: win msg, loose msg, draw msg
 */

function gameResult(user, bot) {
    if(user=='가위') {
        if(bot=='가위') {
            return "비겼습니다 ㅜㅜ";
        } else if (bot=='바위') {
            return "당신은 looser 입니다.";
        } else {
            return "축하합니다!! 당신이 이겼습니다!";
        }
    } else if(user=='바위') {
        if(bot=='가위') {
            return "축하합니다!! 당신이 이겼습니다!";
        } else if (bot=='바위') {
            return "비겼습니다 ㅜㅜ";
        } else {
            return "당신은 looser 입니다.";
        }
    } else {
        if(bot=='가위') {
            return "당신은 looser 입니다.";
        } else if (bot=='바위') {
            return "축하합니다!! 당신이 이겼습니다!";
        } else {
            return "비겼습니다 ㅜㅜ";
        }
    }
}

module.exports = {
    data: new SlashCommandBuilder()
        .setName('가위바위보')
        .setDescription('가위바위보 게임입니다.')
        .addStringOption(option => 
            option.setName("input")
            .setDescription("가위/바위/보 중에 하나를 입력하세요")
            .setRequired(true)),
    async execute(interaction) {
        const input = interaction.options.getString('input');
        const set = ["가위", "바위", "보"];
        var pick = Math.floor(Math.random(0,2));
        var reply = "";

        if (set.includes(input)) {
            reply += `유저: ${input} vs 봇: ${set[pick]}\n`;
            reply += gameResult(input, set[pick]);
        } else {
            reply = "가위 바위 보 중 하나만 입력하세요";
        }

        await interaction.reply(reply);

    },
};