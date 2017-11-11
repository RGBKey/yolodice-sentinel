const YOLOdice = require('yolodice-api');
const display = require('./display.js');

let client = new YOLOdice(process.env.YOLO_API_KEY);

client.on('loggedIn', (user) => {
    display.log(`Logged in as (${user.id})${user.name}`);
});

client.on('error', (err) => {
    console.dir(err);
});
 
process.on('SIGINT', () => {
    client.quit();
});