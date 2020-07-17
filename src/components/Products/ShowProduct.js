import React, { useState, useEffect } from 'react'
import { Redirect } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'
import Button from 'react-bootstrap/Button'
const save = require('../../save.js')

const ShowProduct = props => {
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(0)
  const [purchased, setPurchased] = useState(null)
  const [add, setAdd] = useState(false)

  useEffect(() => {
    axios.get(`${apiUrl}/products/` + props.match.params.id)
      .then(response => {
      // handle success
        console.log(response)
        setProduct(response.data.product)
      })
      .catch(error => {
        // handle error
        console.log(error)
      })
  }, [])

  function saveData (product) {
    if (save.cart.items === null) {
      return <h4>Add Products To Cart</h4>
    } else {
      if (save.cart.items.indexOf(product) === -1) {
        setAdd(true)
        return save.cart.items.push(product)
      }
    }
  }

  const data = () => {
    setProduct(save.cart.items)
    setQuantity(0)
    setPurchased(null)
    console.log(quantity, purchased)
  }

  const handleChange = () => {
    console.log(data)
    console.log('Handle Change')
    console.log(props)
    // console.log(save.user.token)
    // axios.patch(`${apiUrl}/orderitems`, {
    //   headers: {
    //     'Authorization': `Bearer ${save.user.token}`,
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   }
    // })
    axios({
      method: 'PATCH',
      headers: {
        'Authorization': `Bearer ${save.user.token}`,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      url: `${apiUrl}/orderitems/` + props.match.params.id,
      data: {
        product: save.cart.items,
        quantity: null,
        purchased: null
      }
    })
      .then((res) => {
        console.log('INSIDE CREATE')
        console.log(res)
        // this.setState({
        // })
        // setQuantity(prev => prev + 1)
      })
      .catch(console.log)
  }

  const user = save.user

  if (add && (user === undefined)) {
    return <Redirect to={'/sign-in'}/>
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
          if (save.user !== undefined) {
            handleChange()
          }
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
