var express = require('express');
var router = express.Router();

const messages = [
  {
    text: "Hi there!",
    user: "Amando",
    added: new Date()
  },
  {
    text: "Hello World!",
    user: "Charles",
    added: new Date()
  }
]

function createMessagesToSend(){
  const messagesToSend = [];
  messages.forEach(message => {
    const newMessage = {...message, timePassed:timePassed(message.added.getTime())};
    messagesToSend.push(newMessage);
  })
  messagesToSend.sort((a,b) => b.added - a.added);
  return messagesToSend;
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { messages: createMessagesToSend(), title: "Mini Message Board" });
});

router.get('/new', function(req, res, next){
  res.render('form');
})
router.post('/new', (req,res,next) => {
  const data = req.body;
  const user = data.user;
  const text = data.text;
  const added = new Date();
  messages.push({
    text: text,
    user: user,
    added: added
  })
  res.redirect('/');
})

function timePassed(timeInMilli){
  const currentTime = new Date();
  let timePassed = currentTime.getTime() - timeInMilli;
  //convert to minutes
  let timePassedInMinutes = parseInt(timePassed / 60000);
  return returnMinuteHandler(timePassedInMinutes);
}

function returnMinuteHandler(timePassedInMinutes){
  if(timePassedInMinutes < 1){
    return "less than a minute ago";
  }else if(timePassedInMinutes >= 1 && timePassedInMinutes < 60){
    return  `${timePassedInMinutes} minutes ago`;
  }else if(timePassedInMinutes >= 60 && timePassedInMinutes < 1440){
    return `${timePassedInMinutes/60} hours ago`
  }else if(timePassedInMinutes >= 1440){
    return `${timePassedInMinutes/1440} days ago`
  }
}

module.exports = router;
