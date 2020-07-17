import React, { useState, useEffect } from 'react'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
const save = require('../../save.js')

const ShowProduct = props => {
  const [product, setProduct] = useState(null)

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

  // useEffect(() => {
  //   if (add === 0) {
  //     if (save.cart.items.indexOf(product) === -1) {
  //       save.cart.items.push(product)
  //     }
  //     console.log(product)
  //     console.log(save)
  //   }
  // }, [])

  function saveData (product) {
    if (save.cart.items.indexOf(product) === -1) {
      return save.cart.items.push(product)
    }
    console.log(product)
    console.log(save)
    // useEffect((product) => {
    //
    // }, [])
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
          saveData(product)
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
