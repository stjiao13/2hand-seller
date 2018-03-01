import Express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import Item from '../models/item';
import config from '../config';

// API Route
const app = new Express();
const apiRoutes = Express.Router();
// set JSON Web Token's secret variable
app.set('superSecret', config.secret); // secret variable
apiRoutes.post('/login', function(req, res) {
  // find the user
  User.findOne({
    email: req.body.email
  }, (err, user) => {
    if (err) throw err;
    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {
      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {
        // if user is found and password is right
        // create a token
        const token = jwt.sign({ email: user.email }, app.get('superSecret'), {
          expiresIn: 60 * 60 * 24 // expires in 24 hours
        });
        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token,
          userId: user._id
        });
      }   
    }
  });
});
//Initialize  api
apiRoutes.get('/setup', (req, res) => {
  // create a sample user
  const sampleUser = new User({ 
    username: 'mark', 
    email: 'mark@demo.com', 
    password: '123456',
    admin: true 
  });
  const sampleItem = new Item({
    id: '110ec58a-a0f2-4ac4-8393-c866d813b8d1',
    name: '2017Apple macbook pro 13.3 bar', 
    price:11000,
    description: 'Apple MacBook Pro 13.3英寸笔记本电脑 银色（2017新款Multi-Touch Bar/Core i5 3.1G/8GB/256GB MPXX2CH/A）', 
    imagePath: 'https://img.alicdn.com/bao/uploaded/i1/6000000007657/TB29PRLeiqAXuNjy1XdXXaYcVXa_!!0-fleamarket.jpg_728x728.jpg',
    updatedAt: new Date()
  });
  // save the sample user
  sampleUser.save((err) => {
    if (err) throw err;
    sampleItem.save((err) => {
      if (err) throw err;
      console.log('User saved successfully');
      res.json({ success: true });      
    })
  });
});
// redirect all  items
apiRoutes.get('/items', (req, res) => {
  Item.find({}, (err, items) => {
    res.status(200).json(items);
  })
});

// route middleware to verify a token
apiRoutes.use((req, res, next) => {
  // check header or url parameters or post parameters for token
  var token = req.body.token || req.query.token || req.headers['x-access-token'];
  // decode token
  if (token) {
    // verifies secret and checks exp
    jwt.verify(token, app.get('superSecret'), (err, decoded) => {      
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });    
      } else {
        // if everything is good, save to request for use in other routes
        req.decoded = decoded;    
        next();
      }
    });
  } else {
    // if there is no token
    // return an error
    return res.status(403).send({ 
        success: false, 
        message: 'No token provided.' 
    });
  }
});
// 確認認證是否成功
apiRoutes.get('/authenticate', (req, res) => {
  res.json({
    success: true,
    message: 'Enjoy your token!',
  });
});
// create item 
apiRoutes.post('/items', (req, res) => {
  const newItem = new Item({
    name: req.body.name, 
    price:req.body.price,
    description: req.body.description, 
    imagePath: req.body.imagePath,
    updatedAt: new Date()
  });
  newItem.save((err) => {
    if (err) throw err;
    console.log('User saved successfully');
    res.json({ success: true });      
  });
}); 
// update item 
apiRoutes.put('/items/:id', (req, res) => {
  Item.update({ _id: req.params.id }, {
    name: req.body.name, 
    description: req.body.description, 
    imagePath: req.body.imagePath,
    updatedAt: new Date()
  } ,(err) => {
    if (err) throw err;
    console.log('User updated successfully');
    res.json({ success: true });      
  });
});
// remove item 
apiRoutes.delete('/items/:id', (req, res) => {
  Item.remove({ _id: req.params.id }, (err, item) => {
    if (err) throw err;
    console.log('remove saved successfully');
    res.json({ success: true }); 
  });
}); 
export default apiRoutes;