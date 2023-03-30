import express from 'express';
import Item from '../models/item.js'
import expressAsyncHandler from 'express-async-handler';
import { isAdmin, isAuth } from '../auth.js';
const itemrouter = express.Router();

itemrouter.post('/',
expressAsyncHandler( async(req,res)=>{
    console.log('createitem',req.body)
    const item = new Item(req.body);
    if(item){
        await item.save();
        res.status(201).json(item);
    } else {
        res.status(404).json({ message: error.message });
    }
}));

itemrouter.get('/',expressAsyncHandler(async(req,res)=>{
    const item =await Item.find()
    if(item){
        res.status(200).json(item);
    } else {
        res.status(404).json({ message: error.message });

    }
}
))

itemrouter.get('/:_id',expressAsyncHandler(async(req,res)=>{
    const itemId = req.params._id;
    const item = await Item.findById(itemId);
    if(item){
        res.send(item)
    } else {
        res.status(404).json({message: error.message})
    }
}))

itemrouter.get('/categories/at/:type', expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app/');
    const cat =String(req.params.type)
    console.log(typeof(cat)) 
    const categories = await Item.find({category: cat});
    res.send(categories);
  })
)

itemrouter.get('/categories/all', expressAsyncHandler(async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'https://glistening-hotteok-eb9a5f.netlify.app/');
    const categorie = await Item.find().distinct('category');
    res.send(categorie);
  })
)

itemrouter.put('/:id',
    expressAsyncHandler(async (req, res) => {
      const item = await Item.findById(req.params.id);
      if (item) {
        item.countInStock = req.body.countInStock
        const updatedItem = await item.save();
        console.log("completed");
        res.send({ message: 'User Updated', item: updatedItem });
      } else {
        res.status(404).send({ message: 'User Not Found' });
      }
    })
  );

itemrouter.get('/search/sea',
    expressAsyncHandler(async(req,res)=>{
      const {query} = req;
      const Squery = query.query || '';
      const price = query.price || '';
      const category = query.category || '';
      const queryFilter = Squery && Squery!=='all'?{title:{$regex: Squery,$options:'i',},}:{};
      const priceFilter = price && price !== 'all'?{price: {$gte: Number(price.split('-')[0]),
                          $lte: Number(price.split('-')[1]),},} : {};
      const categoryFilter = category && category !== 'all'? {category} : {} ;
      const items = await Item.find({...queryFilter, ...priceFilter, ...categoryFilter})
      res.send({items})
    })

)
export default itemrouter;