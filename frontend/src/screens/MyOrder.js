import React from 'react'
import { useState, useEffect } from 'react';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useCart } from '../components/ContextReducer';

export default function MyOrder() {
    const [orderData, setorderData] = useState({})

    const fetchMyOrder = async () => {
        console.log(localStorage.getItem('userEmail'))
        await fetch("http://localhost:5000/api/myOrderData", {
            // credentials: 'include',
            // Origin:"http://localhost:3000/login",
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify({
                email:localStorage.getItem('userEmail')
            })
        }).then(async (res) => {
            let response = await res.json()
            await setorderData(response)
        })
    }
let data =useCart();
console.log();
    useEffect(() => {
        fetchMyOrder()
    }, [])
    console.log("ORDER",orderData);
  return (
    <>
    <div>
     <Navbar/>
    </div>
    <div className='container'>
                <div className='row'>

                    {orderData  ? Array(orderData).map(data => {
                        return (
                            data.orderData ?
                                data.orderData.order_data.slice(0).reverse().map((item) => {
                                    return (
                                        item.map((arrayData) => {
                                            console.log("arrayData", arrayData);
                                            return (
                                                <div  >
                                                    {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                        {data = arrayData.Order_date}
                                                        <hr />
                                                    </div> :

                                                        <div className='col-12 col-md-6 col-lg-3' >
                                                            <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" , height:"250px"}}>
                                                                {/* <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "120px", objectFit: "fill" }} /> */}
                                                                <div className="card-body">
                                                                    <h5 className="card-title fs-4">{arrayData.name}</h5>
                                                                    <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1 fs-'>{arrayData.id}</span>
                                                                        <span className='m-1 fs-5'>{arrayData.qty}</span>
                                                                        <span className='m-1 fs-5'>{arrayData.size}</span>
                                                                        <span className='d-flex m-1 fs-5'>{data}</span>
                                                                        <div className=' d-inline ms-3 h-100 w-20 fs-1' >
                                                                        ৳{arrayData.price}/-
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                        </div>



                                                    }

                                                </div>
                                            )
                                        })

                                    )
                                }) : ""
                        )
                    }) : ""}
                </div>


            </div>


    <div>
     <Footer/>
    </div>
    </>
  )
}
