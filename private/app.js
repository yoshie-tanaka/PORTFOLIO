const express = require('express');
const bodyParser = require('body-parser')
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static('public'));
app.use(express.static('app'));
app.use(express.static('img'));
app.use(express.urlencoded({extended: false})); //フォームの値を受け取るために必要

// app.listen(3000);
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}
app.listen(port);


app.get('/', (req, res) => {
  res.render('top.ejs');
});

app.get('/top', (req, res) => {
  res.render('top.ejs');
});

app.get ('/inquery', (req, res) => {
  res.render('inquery.ejs');
});

app.get ('/diving', (req, res) => {
  res.render('diving.ejs');
});

// -----------問い合わせ------------


app.get ('/confirm', (req, res) => {
  const zname = '[  ' + req.body.zname + '  ]';
  const email = '[  ' + req.body.email + '  ]';
  const message = '[  ' + req.body.message + '  ]';

  res.render('confirm.ejs');
});

// ---------------確認画面-------------
app.post('/confirm', (req, res) => {
  const zname = '[  ' + req.body.zname + '  ]';
  const email = '[  ' + req.body.email + '  ]';
  const message = '[  ' + req.body.message + '  ]';
  const request = require("request");

  res.render('confirm.ejs',{
    NAME: zname,
    EMAIL: email,
    MESSAGE: message,
  }); 

  //--------------OK押されたら、Slackに通知して、完了画面を表示する------------
  app.post('/result', (req, res) => {
  // slack連携
  request.post('https://slack.com/api/chat.postMessage', {
    form: {
      token: 'xoxp-2816688127809-2804054880834-2825601460561-13d797b689f07b39a0180b7b2d37bbaf', // slackのトークン
      channel: 'inquery', // slackのチャンネル名
      username: 'bot君',// slackに投稿される名前
      text: '--メッセージがきたよ--\n' + 
      'お名前:  ' + zname + '\n' +
      'Email:  ' + email + '\n' +
      'メッセージ:  ' + message + '\n'
    }
  }, function (error, response, body) {
    console.log(error)
  });

  res.render('result.ejs');
  });

});

app.get('/result', (req, res) => {
  res.render('result.ejs');
});
