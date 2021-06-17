const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jwt-simple');
// momentjs.cn moment 库
const moment = require('moment')

const { User } = require('./model');
const { secret } = require('./config')
const auth = require('./auth');
const app = express();
// 把表单格式的请求体字符串转成一个对象赋给req.body  application/www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  next();
})


// 注册
app.post('/signup', async (req, res) => {
  let user = req.body;
  let doc = await User.create(user);
  res.json({
    code: 0,
    data: {
      user: {
        id:doc._id,
        username:doc.username
      }
    }
  })
})
// 登录
app.post('/signin', async (req, res) => {
  let user = req.body;
  let doc = await User.findOne(user)
  if (doc) {
    // 登录成功 就要生成签名
    // header 不用提供了， payload 需要自己提供，signature 也不用提供
    // 我们只需要提供payload，头和尾是这个库来提供实现的。我们还需要加个KEY 秘钥
    let token = jwt.encode({
      user: {
        id: doc._id,
        username: doc.username
      },
      // exp:new Date(Date.now()+10*60*1000).getTime()/1000
      // 指定过期时间
      exp: moment().add(10, 'minutes').valueOf()
    }, secret);
    res.json({
      code: 0,
      data: {
        token
      }
    })
  } else {
    res.json({
      code: 1,
      error:'用户名或者密码错误'
    })
  }
})

// 用户页面是一个受保护资源
// 当我们访问受保护资源的时候，都要验证签名。功能逻辑，写一个中间件
app.get('/user',auth, (req,res) => {
  res.json({
    code: 0,
    data: {
      user:req.user
    }
  })
})


app.listen(8080, _ => {
  console.log('server is running at 8080')
})