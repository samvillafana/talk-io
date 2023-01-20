const router = require('express').Router();
const { User, Message } = require('../../models/');


router.get('/', async (req, res) => {
  try {
    const userData = await User.findAll({
      attributes: { exclude: ['password'] },
      order: [['username', 'ASC']],
    });
    return res.status(200).json(userData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/', async (req, res) => {
  try {

    const userData = await User.create(req.body);
    console.log(req.body)
    return res.status(200).json(userData);

  } catch (err) {
    console.log(req.body)
    res.status(400).json(err);
  }
});

router.post('/login', (req, res) => {
  try {
    User.findOne({
      where: {
        username: req.body.username,
      }
    })
      .then(user => {
        if (!user) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        if (!user.checkPassword(req.body.password)) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }
        user.update({
          isLoggedIn: true
        });
        res.status(200).json({ message: 'Logged in successfully' });
      })
  }
  catch (err) {
    res.status(500).json(err);
    console.log(req.body)
  }
});

router.post('/logout', (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    }
  })
    .then(user => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      user.update({
        isLoggedIn: false
      });
      res.status(200).json({ message: 'Logged out successfully' });
    })
    .catch(err => res.status(500).json(err));
});

router.post('/message', async (req, res) => {
  let message = req.body.message;
  console.log(message);

  try {
    const messageData = await Message.create(req.body).then(response => res.send('message created!!'))

  } catch (err) {
    res.send(err)
  }


})


module.exports = router;
