const TelegramBot = require('node-telegram-bot-api');

// Replace this with your actual bot token
const token = '7427858559:AAG7YZCiEFrpQb-ytIN04xD_s2ej0Ls1Mj4';
const bot = new TelegramBot(token, { polling: true });

// Store members who typed /addme
const members = new Map();

// Store last member list before split
// eslint-disable-next-line prefer-const
let lastMembersBeforeSplit = new Map();

// Store current groups after split
// eslint-disable-next-line prefer-const
let groupA = [];
// eslint-disable-next-line prefer-const
let groupB = [];

// Import commands
const startCommand = require('./commands/start');
const addMeCommand = require('./commands/addme');
const splitCommand = require('./commands/split');
const unSplitCommand = require('./commands/unsplit');
const listCommand = require('./commands/list');
const removeCommand = require('./commands/remove');
const resetCommand = require('./commands/reset');
const addListCommand = require('./commands/addlist');
const switchCommand = require('./commands/switch');
const unknownCommand = require('./commands/unknown');

// Initialize all commands
startCommand(bot);
addMeCommand(bot, members);
splitCommand(bot, members, lastMembersBeforeSplit, groupA, groupB);
unSplitCommand(bot, members, lastMembersBeforeSplit);
listCommand(bot, members);
removeCommand(bot, members);
resetCommand(bot, members);
addListCommand(bot, members);
switchCommand(bot, groupA, groupB);
unknownCommand(bot);

console.log('🤖 Bot is running...');
