let colors = require('./color'),
    readline = require('readline'),
    http = require('http');

const API_KEY = '6824998c8b574bd1bba7ba5363a341ab';

function welcome(){
    let welcomeMsg = '库啵库啵啵你好冒险者';
    Array.prototype.forEach.call(welcomeMsg, (it) => {
        colors.colorLog('♪~♥~------', it, '------~♥~♪');
    })
}

welcome()

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let name = '';

rl.question('> 阁下尊姓大名：', (answer) => {
    name = answer;
    console.log(`名字土土...不,名字酷酷的冒险者${answer}哟`);
    chat();
})

function chat(){
    rl.question('> 你有什么想问库啵的吗~♪ :', (query) => {
        let req = http.request({
            hostname: 'www.tuling123.com',
            path: '/openapi/api',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        },
        (res) => {
            let data = '';
            res.on('data', (chunk) => {
                data += chunk;
            });
            res.on('end', () => {
                console.log(data);
            })
        });
        req.write(JSON.stringify({
            key: API_KEY,
            info: query,
            userid: name
        }));

        req.end();
    })
}

