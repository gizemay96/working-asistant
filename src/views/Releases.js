import React from 'react'

import { Table, Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'reactstrap'

function Releases() {
     return (
          <div className="content">
               <Row>
                    <Col md="12">
                         <Card className="card-plain">
                              <CardHeader>
                                   <CardTitle tag="h4">Table on Plain Background</CardTitle>
                                   <p className="category">Here is a subtitle for this table</p>
                              </CardHeader>
                              <CardBody>
                                   <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                             <tr>
                                                  <th>Release Date</th>
                                                  <th>Project</th>
                                                  <th>Scope</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             <tr>
                                                  <td>Dakota Rice</td>
                                                  <td>Niger</td>
                                                  <td><Button color="info btn-simple btn-sm">Show</Button></td>
                                             </tr>
                                        </tbody>
                                   </Table>
                              </CardBody>
                         </Card>
                    </Col>
               </Row>
          </div>
     )
}

export default Releases
