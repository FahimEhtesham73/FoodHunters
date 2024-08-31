import React, { Children, createContext } from 'react'
import { useReducer, useContext } from 'react'


const CartStateContext = createContext();
const CartDispatchContext= createContext();


const reducer= (state,action)=>{
    switch (action.type){
        case "Add":
            return[...state,{id:action.id, name:action.name, qty:action.qty, size:action.size, price:action.price, img:action.img}]
        
        case "Remove":
            let newArr = [...state]
            newArr.splice(action.index, 1)
            return newArr

        case "Drop":
            let empArray = []
            return empArray

        case "Update":
            let arr =[...state];
            arr.find((food,index)=>{
                console.log("qty", food.qty);
                console.log("action", parseInt(action.qty));
                
                if(food.id === action.id){
                    let updatedQty = Number(food.qty) + Number(parseInt(action.qty));
                    console.log(food.qty, parseInt(action.qty), action.price + food.price);
                    arr[index]= {...food, qty:updatedQty, price: action.price+ food.price}
                }
                return arr
            })
            return arr

            default:
                console.log("Error in Reducer");
    }

}
export const CartProvider =({children})=>{
    const[state,dispatch]=useReducer(reducer, [])
   return(
<CartDispatchContext.Provider value={dispatch}>
    <CartStateContext.Provider value={state}>
        {children}
    </CartStateContext.Provider>
</CartDispatchContext.Provider>
   )
}

export const useCart=()=> useContext(CartStateContext);
export const useDispatchCart=()=> useContext(CartDispatchContext)
