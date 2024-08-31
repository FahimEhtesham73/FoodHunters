const mongoose= require ('mongoose');
const mongoURI= "mongodb://localhost:27017/foodhunters";

const mongoDB= async(err)=>{
   
    try {
        await mongoose.connect(mongoURI);
        console.log("Database Connected Successfully");

        const foodlist = await mongoose.connection.db.collection("foodlist").find({}).toArray();
        global.foodlist=foodlist
  
        const foodcategory =await mongoose.connection.db.collection("foodcategory").find({}).toArray();
        global.foodcategory=foodcategory;
        console.log(foodcategory);

    } catch (error) {
        console.error("An Error occurred", error);
    }
}


module.exports= mongoDB;