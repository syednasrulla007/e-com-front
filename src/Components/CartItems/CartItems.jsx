import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useEffect,useMemo } from 'react'
import { context } from '../../App'
import './Cart.css'
// import {useNavigate} from 'react-router-dom'


const CartItems = () => {
  // const navigate=useNavigate()
 
  const count = useContext(context).count
  const setCount = useContext(context).setCount
  // const [check,setCheck] = useState(false)
  const [order,setOrder] = useState()
  const [post,setPost] = useState(0)
  // const [CartItems,setCartItems]=useState([]);
    // const context=useContext(store)
    useEffect(()=>{
      const token = sessionStorage.getItem('Token')
      // setInterval(()=>{
        axios.post('https://e-commerce-backend-rdg9.onrender.com/getorder',{token:token})
      .then((res)=>setOrder(res.data.orders))
      // },100)
    },[])
    // const placeorder=(productId)=>{
    //   // setUserdata([])
    //   // navigate('/order')
    //   const deleteallitem= productId
    //   const userId=localStorage.getItem("userId")
    //   console.log({productId: deleteallitem,userId})
    //   const data={productId: deleteallitem,userId}
    //   console.log(userId)
    //   axios.post("https://e-commerce-backend-rdg9.onrender.com/update",data)
      
    //   .then(data=>{ 
    //     if(data.data.status==="ok"){
    //       alert("order placed")
    //       navigate('/order')
    //       // setUserdata([]);
    //     }
    //     else if(data.data.status==="error"){
    //       alert("failed to delete") 
    //     }
    //   })
    // }
    // console.log(order.length)
    // useEffect(() => {
    //   axios.get("https://e-commerce-backend-rdg9.onrender.com/getorder").then((response) => {
    //     setCartItems(response.data);
    //   });
    // }, []);
  
    // const clearCart = () => {
    //   axios.delete("https://e-commerce-backend-rdg9.onrender.com/deleteall").then(() => {
    //     setCartItems([]);
    //   });
    // };



      var sum = 0
      useMemo(() => {
        order && order.forEach((x)=>sum = sum +parseInt(x.price.split('').splice(1).filter((x)=>x!==',').join(''),10)*x.qty)
      // console.log(sum)
      }, [order]);
      const clearCart = () => {
        alert('items has been deleted')
        setOrder([]);
      };

      


    // const handleDeleteAllItems = () => {
    //     axios.delete('https://e-commerce-backend-rdg9.onrender.com/checkout')
    //       .then(response => {
    //         // Handle success, for example, you can update the state or show a success message.
    //         console.log('All cart items deleted successfully!');
    //       })
    //       .catch(error => {
    //         // Handle error, for example, you can show an error message or handle the error gracefully.
    //         console.error('Error deleting cart items:', error);
    //       });
    //   }

    const handleClick = async (data)=>{
      setCount(count+1)
      const token  = sessionStorage.getItem('Token')
      setPost(post+1)
      await axios.put('https://e-commerce-backend-rdg9.onrender.com/order',{data:data,token:token})
      // .then((res)=>console.log(res))
      .catch((err)=>console.log(err))
      await axios.post('https://e-commerce-backend-rdg9.onrender.com/getorder',{token:token})
      .then((res)=>setOrder(res.data.orders))
      // console.log(order)
    };
  
  return (
    <div className='cartcon'>
      <div className='carthr'>Cart</div>
      <table>
        <thead>
        <tr>
          <th>PRODUCT</th>
          <th></th>
          <th>PRICE</th>
          <th>QTY</th>
          <th>UNIT PRICE</th>
        </tr>
        </thead>
        {
          order &&
            order.map((item,index)=>{
              return(
                  <tbody key={index}>
                    <tr >
                    <td><img className='cartimg' src={item.image} alt="" /></td>
                    <td>{item.name}</td>
                    <td>₹{parseInt(item.price.split('').splice(1).filter((x)=>x!==',').join(''),10)*item.qty}</td>
                    <td>
                      <button onClick={()=>handleClick({order:item,type:'inc'})} className='qty-btn'>+</button>
                      {item.qty}
                      <button onClick={()=>handleClick({order:item,type:'dec'})} className='qty-btn'>-</button>
                    </td>
                    <td>{item.price}</td>
                  </tr>
                  </tbody>
              )
            })
        }
        </table>
        {/* {
          check && 
          <div className='thank'>
            <h1>Thank you</h1>
            <h1>Your Order is on the way</h1>
            <button className='add-cart-btn' onClick={()=>setCheck(false)}>Close</button>
          </div>
        } */}
        <div className='cartfoot'>
          <div className='carttotal'>
            <div className='carttotal1'><span>Subtotal</span><span>₹{sum}</span></div>
            {/* <div className='carttotal1'><span>Shipping fee</span><span>₹50</span></div> */}
            <div className='carttotal1'><span>Coupon</span><span>No</span></div>
            <hr />
            <div className='carttotal1'><h2>TOTAL</h2><span>₹{sum}</span></div>
            { 
               (order && order.length===0)?<></>:<button className='add-cart-btn' onClick={clearCart}>CheckOut</button>
             }
          </div>
        </div>
    </div>
  )
}

export default CartItems