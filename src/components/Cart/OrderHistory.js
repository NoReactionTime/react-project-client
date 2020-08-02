import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import Container from 'react-bootstrap/Container'
import { Row, Col } from 'react-bootstrap'

const save = require('../../save.js')

const OrderHistory = props => {
  const [orders, setOrders] = useState(null)

  console.log(props)
  console.log(save)

  useEffect(() => {
    axios({
      method: 'get',
      url: apiUrl + '/orderitems',
      headers: {
        'Authorization': `Bearer ${props.user.token}`,
        'Content-Type': 'application/json'
      }
    })
      .then(res => {
        // console.log(res)
        save.orderItem = res.data.orderItems
        setOrders(res.data.orderItems)
      })
      .catch(console.error)
  })

  // console.log(save)

  let jsx

  if (orders === null) {
    jsx = <p>Loading...</p>
  } else if (orders.length === 0) {
    jsx = <p>No History</p>
  } else {
    jsx = (
      <Container>
        {orders.map((item, index) => {
          if (item !== null && item.purchased) {
            return (
              <Row sm={4}>
                <div>
                  <img width={150} height={150} src={item.product.image}/>
                </div>
                <Col sm={4} key={index}>
                  <h3>
                    {item.product.name}
                  </h3>
                  <h5>
                    Description: {item.product.description}
                  </h5>
                  <h4>
                  Price: ${item.product.unitPrice}
                  </h4>
                </Col>
              </Row>
            )
          }
        })}
      </Container>
    )
  }

  return (
    <div>
      <h2>Order History</h2>
      {jsx}
    </div>
  )
}

export default withRouter(OrderHistory)
