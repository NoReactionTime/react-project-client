import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
import { Redirect } from 'react-router-dom'
const save = require('../../save.js')

const ShowProduct = props => {
  save.addedProductId = {}
  // current product
  const [product, setProduct] = useState(null)
  // checks if 'add to cart' is clicked
  const [click, setClicked] = useState(false)
  // used to reroute user to sign in page if not signed after 'add to cart is clicked'
  const [route, setRoute] = useState(false)

  // original text for button
  const [buttonText, setText] = useState('Add to Cart')
  // if added to cart, cant add again
  const [submitting, setSubmitting] = useState(false)

  const changeText = (text) => setText(text)

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

  // get the order items from cart for user if signed in
  // used to check if current product is already in cart
  const getItems = () => {
    if (save.user.token !== undefined) {
      axios({
        method: 'get',
        url: apiUrl + '/orderitems',
        headers: {
          'Authorization': `Bearer ${save.user.token}`,
          'Content-Type': 'application/json'
        }
      })
        .then(response => {
          save.orderItem = response.data.orderItems
          // console.log(save)
        })
        .catch(console.error)
    }
  }

  useEffect(() => {
    // check if save.orderItem has any values, if so if it has the current product being shown
    getItems()
    const occurs = save.orderItem.some(item => item !== null && item.product._id === (props.match.params.id) && !item.purchased)
    if ((save.user.token !== undefined) && (save.orderItem.length !== undefined) && occurs) {
      // console.log(save)
      save.orderItem.forEach((item, index) => {
        if (item !== null && (item.product._id === props.match.params.id) && click) {
          const quant = item.quantity + 1
          // console.log(quant)

          // PATCH request to update Quantity
          update(quant, index, item.product._id, item._id)
        }
      })
    } else if ((save.user.token !== undefined) && click) {
      // Checking if the object is already added in cart, if so only update quantity
      if (click) {
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
          // after POST (Add product to /orderitems), button is disabled to let user know it was added successfully
          .then((res) => {
            changeText('Added')
            setSubmitting(true)
            save.addedProductId[props.match.params.id] = 1
          })
          .catch(console.error)
      }
    } else if (click) {
      // if no signed in, go to sign-in page
      setRoute(true)
    }
  }, [click])

  const update = (count, index, product, orderID) => {
    // console.log(count)
    if (count > 1) {
      // console.log('Quantity: ', count)
      axios({
        method: 'patch',
        url: apiUrl + '/orderitems/' + orderID,
        headers: {
          'Authorization': `Bearer ${save.user.token}`,
          'Content-Type': 'application/json'
        },
        data: {
          orderItem: {
            product: product,
            quantity: count,
            purchased: false
          }
        }
      })
        // after Patch (update quantity), button is disabled to let user know it was added successfully
        .then((res) => {
          // console.log('patch request', res)
          changeText('Added')
          setSubmitting(true)
        })
        .catch(console.error)
    }
  }

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
      <div className="show-product-container">
        <div className="row">
          <div className="column-image">
            <img width={600} height={600} src={product.image}/>
          </div>
          <div className="column" style={{ height: '20vh' }}>
            <h3 style={{ color: 'forestgreen' }}>{product.name}</h3>
            <div className="break"></div>
            <h6>{product.description}</h6>
            <div className="break"></div>
            <h4>$ {product.unitPrice}</h4>
            <Button variant="success" disabled={submitting} onClick={(ref) => {
              setClicked(true)
              // setButtonAttr(ref)
            }}>{buttonText}</Button>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div>
      {jsx}
    </div>
  )
}

export default ShowProduct
