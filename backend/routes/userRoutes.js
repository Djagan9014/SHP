import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth,isAdmin,generateToken } from '../auth.js';

const userRouter = express.Router();




userRouter.post(
  '/signin',
  expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        }
        );
        return;
      } else {
        res.send({message:"Invalid Password"})
      }
    } else {
      res.send({message:"Invalid User"})
    }
   
  })
);



userRouter.post(
  '/signup',
  
  expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin','*');
    const usem = await User.findOne({ email: req.body.email });
    if (usem) {
      res.send({message:"user Already Present"})
      return;
    }
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });

    const user = await newUser.save();
    console.log("heiiiiiiiiii");
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);


userRouter.get('/getusers',
expressAsyncHandler(async(req,res)=>{
  res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app');
  const users = await User.find({});
  res.send(users);
}))

userRouter.delete(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app');
    const user = await User.findById(req.params.id);
    if (user) {
      if (user.email === 'dasarijagan996@gmail.com') {
        res.send({ message: 'Can Not Delete Admin User' });
        return;
      }
      await user.remove();
      res.send({ message: 'User Deleted' });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.get(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app');
    const user = await User.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.put(
  '/:id',
  expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app');
    const user = await User.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updatedUser = await user.save();
      console.log("completed");
      res.send({ message: 'User Updated', user: updatedUser });
    } else {
      res.status(404).send({ message: 'User Not Found' });
    }
  })
);

userRouter.patch(
  '/profile',
  expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app');
    const user = await User.findById(req.body._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }
      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser)
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);



export default userRouter;
