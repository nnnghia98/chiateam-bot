const { getChatId } = require('../../utils/chat');

const teamsCommand = (bot, teamA, teamB) => {
  bot.onText(/^\/team$/, msg => {
    if (teamA.size === 0 && teamB.size === 0) {
      bot.sendMessage(
        getChatId(msg, 'DEFAULT'),
        '⚠️ Chưa có team nào được chia. Dùng /chiateam trước'
      );
      return;
    }

    const message = `🎲 *Team hiện tại* 🎲\n\n👤 *HOME:*\n${Array.from(
      teamA.values()
    ).join('\n')}\n\n👤 *AWAY:*\n${Array.from(teamB.values()).join('\n')}`;

    bot.sendMessage(getChatId(msg, 'DEFAULT'), message, {
      parse_mode: 'Markdown',
    });
  });
};

module.exports = teamsCommand;
