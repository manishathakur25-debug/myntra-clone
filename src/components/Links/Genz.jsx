import React from 'react'
import Api from '../ProductApi'
import { useState,useEffect } from 'react'
import useCart from '../Hooks/UseCart'
import Product from '../Product'


function Genz() {

    const[product,setProdudcts]=useState([])
    const { cart, handleCart, handleDelete } = useCart()

    const[loading,setLoading]=useState(true)
    const[error,setError]=useState(false)

    useEffect(() => {
        setLoading(true)
Promise.all([
    Api.get('/products/category/womens-dresses?limit=10'),
    Api.get('/products/category/womens-shoes?limit=10'),
    Api.get('/products/category/womens-bags?limit=10'),
    Api.get('/products/category/mens-shirts?limit=10')
])
.then(([dresses, shoes, bags, shirts]) => {
    setProdudcts([
        ...dresses.data.products,
        ...shoes.data.products,
        ...bags.data.products,
        ...shirts.data.products
    ])
    setLoading(false)
})

        .catch((error)=>{
            console.log('error');
            setError(true)
            setLoading(false)

            
        })
    },[])

    if(loading){
        return <h2>loading products.....</h2>
    }

    if(error){
        return <h2> Unable to load products . please try again.....</h2>
    }
  return (
    <>
    <Product 
   product='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWVU3b_LicdavHJLnWpym6TGiSoWVR4Kh3MKGshxyf1A&s=10'
   />
    <h1 className='menHeading'> Genz Collection</h1>
    <div className='menProducts'>
        {product.map((item)=>{
            return  (
                <div key={item.id}className='menp'>
                <img className='menImg'src={item.images[0]} alt={item.title} />
                <div className='menP'>
                    <strong>
                <p>{item.title}</p>
                <p>{item.price}</p>
                    </strong>
                    <div>
                        <button onClick={()=>handleCart(item.id)}>Add to cart</button>
                        <button onClick={()=>handleCart(item.id)}>+</button>
                        <button onClick={()=>handleDelete(item.id)}>-</button>  
                    </div>
                    <button>Wishlist ♡</button>
                    <p>Cart: {cart[item.id] || 0}</p>
                </div>
            </div>
              
            )
        })}
    </div>
    </>
  )
}

export default Genz