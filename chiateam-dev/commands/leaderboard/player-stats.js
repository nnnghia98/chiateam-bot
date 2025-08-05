const { getPlayerStats } = require('../../db/leaderboard');

const playerStatsCommand = bot => {
  // Handle command with player ID parameter
  bot.onText(/\/player-stats (.+)/, async (msg, match) => {
    try {
      const playerId = parseInt(match[1].trim());
      
      // Validate player ID
      if (isNaN(playerId) || playerId <= 0) {
        bot.sendMessage(
          msg.chat.id,
          '❌ **ID người chơi không hợp lệ!**\n\n' +
          '�� **Cách sử dụng:**\n' +
          '`/player-stats [player_id]`\n\n' +
          '**Ví dụ:**\n' +
          '`/player-stats 1001`\n' +
          '`/player-stats 12345`',
          { parse_mode: 'Markdown' }
        );
        return;
      }

      // Get player stats
      const playerStats = await getPlayerStats(playerId);
      
      if (!playerStats) {
        bot.sendMessage(
          msg.chat.id,
          `❌ **Không tìm thấy thông số của player ID: ${playerId}**\n\n` +
          '�� Player này chưa có dữ liệu thống kê nào.\n' +
          'Sử dụng `/update-leaderboard` để thêm dữ liệu cho player này.',
          { parse_mode: 'Markdown' }
        );
        return;
      }

      // Calculate additional stats
      const winratePercent = (playerStats.winrate * 100).toFixed(1);
      const totalGames = playerStats.total_match;
      const totalWins = playerStats.total_win;
      const totalLosses = playerStats.total_lose;
      
      // Calculate win/loss ratio
      const winLossRatio = totalLosses > 0 ? (totalWins / totalLosses).toFixed(2) : totalWins > 0 ? '∞' : '0.00';
      
      // Determine rank emoji based on performance
      const rankEmoji = totalWins > 0 ? '🏆' : totalGames > 0 ? '📊' : '👤';
      
      // Create detailed stats message
      let message = `${rankEmoji} **THÔNG SỐ PLAYER** ${rankEmoji}\n\n`;
      message += `🆔 **Player ID:** ${playerStats.player_id}\n`;
      message += `📅 **Ngày tạo:** ${new Date(playerStats.created_at).toLocaleDateString('vi-VN')}\n`;
      message += `🔄 **Cập nhật lần cuối:** ${new Date(playerStats.updated_at).toLocaleDateString('vi-VN')}\n\n`;
      
      message += '�� **THỐNG KÊ CHI TIẾT:**\n';
      message += `   • 🎮 **Tổng trận:** ${totalGames}\n`;
      message += `   • ✅ **Thắng:** ${totalWins}\n`;
      message += `   • ❌ **Thua:** ${totalLosses}\n`;
      message += `   • 🎯 **Tỷ lệ thắng:** ${winratePercent}%\n`;
      message += `   • ⚖️ **Tỷ lệ W/L:** ${winLossRatio}\n\n`;
      
      // Add performance analysis
      if (totalGames > 0) {
        const winPercentage = ((totalWins / totalGames) * 100).toFixed(1);
        let performance = '';
        
        if (winPercentage >= 80) {
          performance = '🔥 **Xuất sắc** - Player rất mạnh!';
        } else if (winPercentage >= 60) {
          performance = '⭐ **Tốt** - Player có kỹ năng tốt';
        } else if (winPercentage >= 40) {
          performance = '📉 **Trung bình** - Cần cải thiện thêm';
        } else {
          performance = '📉 **Cần cải thiện** - Nên luyện tập thêm';
        }
        
        message += `📈 **ĐÁNH GIÁ:**\n${performance}\n\n`;
      }
      
      // Add footer with commands
      message += '💡 **Lệnh liên quan:**\n';
      message += '• `/leaderboard` - Xem bảng xếp hạng\n';
      message += '• `/update-leaderboard WIN/LOSE [id1,id2,id3]` - Cập nhật thống kê';

      bot.sendMessage(msg.chat.id, message, { parse_mode: 'Markdown' });

    } catch (error) {
      console.error('Error fetching player stats:', error);
      bot.sendMessage(
        msg.chat.id,
        '❌ Có lỗi xảy ra khi tải thông số player. Vui lòng thử lại sau.'
      );
    }
  });

  // Handle command without parameters
  bot.onText(/^\/player-stats$/, (msg) => {
    bot.sendMessage(
      msg.chat.id,
      '📝 **Cách sử dụng lệnh player-stats:**\n\n' +
      '�� **Cú pháp:**\n' +
      '`/player-stats [player_id]`\n\n' +
      '**Ví dụ:**\n' +
      '`/player-stats 1001`\n' +
      '`/player-stats 12345`\n\n' +
      '💡 **Lưu ý:**\n' +
      '• Player ID phải là số nguyên dương\n' +
      '• Player phải có dữ liệu thống kê để xem được\n' +
      '• Sử dụng `/update-leaderboard` để thêm dữ liệu',
      { parse_mode: 'Markdown' }
    );
  });
};

module.exports = playerStatsCommand; 