const express =require('express');
const router =express.Router();


router.post('/foodlist', (req,res)=>{
    try {
 
        res.send([global.foodlist, global.foodcategory])
       
    } catch (error) {
        console.log(error);
        res.send('server error')
    }
})


module.exports= router;