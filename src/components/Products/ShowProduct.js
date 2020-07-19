import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
const save = require('../../save.js')

const ShowProduct = props => {
  const [product, setProduct] = useState(null)
  const [click, setClicked] = useState(false)
  const [route, setRoute] = useState(false)
  // const [add, setAdd] = useState(0)

  useEffect(() => {
    axios.get(`${apiUrl}/products/` + props.match.params.id)
      .then(response => {
      // handle success
        setProduct(response.data.product)
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }, [])

  useEffect(() => {
    console.log(click)
    console.log(save.user.token)
    console.log(save.orderItem.length)
    if ((save.user.token !== undefined) && click) {
      // Checking if the object is already added in cart, if so only update quantity

      if (save.orderItem.length !== undefined) {
        save.orderItem.forEach(item => {
          if (item !== null && item.product._id === (props.match.params.id)) {
            console.log('Same')
            setClicked(false)
          }
        })
      }
      if (!click) {
        console.log('Same Again')
        console.log('In If ', click)
        return null
      } else {
        console.log('useEffect')
        console.log(props)
        console.log(product)
        console.log(save.user)
        console.log('In else ', click)
        axios({
          method: 'post',
          url: apiUrl + '/orderitems',
          headers: {
            'Authorization': `Bearer ${save.user.token}`,
            'Content-Type': 'application/json'
          },
          data: {
            orderItem: {
              product: props.match.params.id,
              quantity: 1,
              purchased: false
            }
          }
        })
          .then((res) => {
            console.log('patch request', res)
            // save.orderItem = res.data.orderItem
            console.log(save.orderItem)
          })
          .catch(console.error)
      }
    } else if (click) {
      console.log('click', click)
      setRoute(true)
    }
  }, [click])

  if (route) {
    return <Redirect to='/sign-in'/>
  }

  let jsx
  // if the API has not responded yet
  if (product === null) {
    jsx = <p>Loading...</p>
  // after API responds
  } else {
    jsx = (
      <div>
        <h3>{product.name}</h3>
        <h4>Description: {product.description}</h4>
        <h4>Price: ${product.unitPrice}</h4>
        <Button variant="primary" onClick={() => {
          // SaveDataComponent(product)
          setClicked(true)
        }}>Add To Cart</Button>
      </div>
    )
  }
  return (
    <div>
      <h2>Single Product Page</h2>
      {jsx}
    </div>
  )
}

export default ShowProduct
