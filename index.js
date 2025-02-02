const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
require('dotenv').config();

// Ensure the LocalAuth path exists
const authPath = process.env.LOCAL_AUTH_PATH || './.wwebjs_auth';
if (!fs.existsSync(authPath)) {
    fs.mkdirSync(authPath, { recursive: true });
}

const client = new Client({
    authStrategy: new LocalAuth({ dataPath: authPath }),
});

client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message_create', message => {
    if (message.isGroupMsg) return;
    if (!message.fromMe) {
        if (message.body.toLowerCase().startsWith('h')) {
            client.sendMessage(message.from, "Don't hi me, please speak.");
        } else {
            client.sendMessage(message.from, 'Hello! You have reached Breezy. I\'m his assistant bot. Kindly leave a message, and don\'t say hi.');
        }
    }
});

client.initialize();
