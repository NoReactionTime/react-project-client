// // import { useState, useEffect } from 'react'
// // import { Link } from 'react-router-dom'
// import axios from 'axios'
// import apiUrl from '../../apiConfig'
// // import Button from 'react-bootstrap/Button'
// //
// // import Container from 'react-bootstrap/Container'
// // import { Row, Col } from 'react-bootstrap'
//
// const save = require('../../save.js')
//
// const CreateCart = props => {
//   // const [products, setProduct] = useState(null)
//   // const [quantity, setQuantity] = useState(0)
//   // const [purchased, setPurchased] = useState(null)
//   // const [index, setIndex] = useState(0)
//
//   useEffect(() => {
//     axios.post(`${apiUrl}/orderitems`, {
//       headers: {
//         'Authorization': `Bearer ${save.user.token}`,
//         'Accept': 'application/json',
//         'Content-Type': 'application/json'
//       }
//     })
//       .then((res) => {
//         // setProduct(save.cart.items)
//         // setQuantity(prev => prev + 1)
//       })
//   }, [])
//
//   // let jsx
//   // // if the API has not responded yet
//   // if (products === null) {
//   //   jsx = <p>Loading...</p>
//   //   // if the API responds with no books
//   // } else if (products === 0) {
//   //   jsx = <p>No products</p>
//   // // if the API responds with books
//   // } else {
//   //   jsx = (
//   //     <Container>
//   //       <Row>
//   //         {products.map(product => {
//   //           return (
//   //             <Col key={product._id}>
//   //               <Link to={`/products/${product._id}`}><h3>{product.name}</h3></Link>
//   //               <h4>Description: {product.description}</h4>
//   //               <h4>Price: $ {product.unitPrice}</h4>
//   //               <h4>Quantity: {quantity}</h4>
//   //               <Button variant="danger" onClick={() => {
//   //                 this.removeData(product)
//   //               }}>Remove From Cart</Button>
//   //             </Col>
//   //           )
//   //         })}
//   //       </Row>
//   //     </Container>
//   //   )
//   // }
//   // return (
//   //   <div>
//   //     <h2>Shopping Cart</h2>
//   //     {jsx}
//   //   </div>
//   // )
// }
//
// export default CreateCart
