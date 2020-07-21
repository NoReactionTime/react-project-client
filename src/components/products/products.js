// import React, { useState } from 'react'
// // import axios from 'axios'
//
// // import apiUrl from '../apiConfig.js'
//
// import Container from 'react-bootstrap/Container'
// // import Row from 'react-bootstrap/Row'
// // import Col from 'react-bootstrap/Col'
// import { Row, Col } from 'react-simple-flex-grid'
// import 'react-simple-flex-grid/lib/main.css'
//
// import CarnPlants from '../../carnPlants.json'
// import Button from 'react-bootstrap/Button'
// const save = require('../../save.js')
//
// const Plants = props => {
//   const [product] = useState(null)
//
//   function saveData (product) {
//     if (save.cart.items.indexOf(product) === -1) {
//       return save.cart.items.push(product)
//     }
//     console.log(product)
//     console.log(save)
//   }
//
//   return (
//     <div>
//       <h2>Our Products</h2>
//       <Container>
//         <Row>
//           {
//             CarnPlants.map((plantDetails, index) => {
//               return <Col sm={4} key=''>
//                 <img width={200} height={200} src={plantDetails.image} />
//                 <h3>{plantDetails.name}</h3>
//                 <p>{plantDetails.description}</p>
//                 <h4>Price: {plantDetails.unitPrice}</h4>
//                 <Button variant="success" onClick={() => {
//                   saveData(product)
//                 }}>Add To Cart</Button>
//               </Col>
//             })
//           }
//         </Row>
//       </Container>
//     </div>
//   )
// }
//
// export default Plants
