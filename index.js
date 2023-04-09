
import Express from 'express';
import mongoose from 'mongoose'
import User from './modules/usermodules.js';
import dotenv from 'dotenv';

dotenv.config()

const app = Express();
const port = 3000;
app.use(Express.json())

app.get('/', async (req, res)=>{
  const users = await User.find()

  res.json(users)
})

app.post('/', async(req, res)=>{
     const { name, email, password } = req.body
    const user = new User({
        name, email, password
    });

    const newdata = await user.save();
    res.status(201).json(newdata);
})
app.post('/login', async(req, res)=>{
    const {  email, password } = req.body
    const user = await User.findOne({email})

    if (user) {
        res.statusCode(200).json(user)
    }else{
        res.statusCode(404).json({message :"not found"})
    }
})
app.put('/:id', async(req, res)=>{
const {id}=req.params
const user = await User.findByIdAndUpdate(id, req.body)

if (user) {
    const updateuser = await User.findById(id);
    res.json(updateuser)
}
})

app.delete('/:id', async(req, res)=>{
const {id}=req.params;

const user = await User.findByIdAndDelete(id);
res.json({message: 'successfully deleted'})

})



app.listen(port, ()=> {
    console.log(`server is running on port ${port}`)
})


mongoose.connect(process.env.MONG_URL)
.then(()=> {
    console.log('connected to Database')
}).catch((e) =>{
    console.log(e);
})
