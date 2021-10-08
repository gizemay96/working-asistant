import { React, useState } from "react";
import '../assets/scss/black-dashboard-react/custom/workItems.scss'
import workItemData from '../assets/json/works.json'

// reactstrap components
import {
     Card,
     CardHeader,
     CardBody,
     CardTitle,
     Table,
     Row,
     Col,
     UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button
} from "reactstrap";
import { Tooltip } from 'reactstrap';

function WorkItems() {

     const [workItems] = useState(workItemData);

     const [tooltipOpen, setTooltipOpen] = useState({ type: '', id: '' });

     const toggle = (type, id) => setTooltipOpen(tooltipOpen.id === id ? { type: '', id: 0 } : { type, id });

     return (
          <>
               <div className="content">
                    <div className="d-flex justify-content-between align-items-center">
                         <div>
                    <UncontrolledDropdown>
                         <DropdownToggle caret data-toggle="dropdown">
                              Environment
                         </DropdownToggle>
                         <DropdownMenu>
                              <DropdownItem>DEV</DropdownItem>
                              <DropdownItem>FUT</DropdownItem>
                              <DropdownItem>UAT</DropdownItem>
                              <DropdownItem>PREPROD</DropdownItem>
                              <DropdownItem>PROD</DropdownItem>
                         </DropdownMenu>
                    </UncontrolledDropdown>
                              </div>  
                         <div>
                         <Button color="info">Add New</Button>
                              </div>  
                    </div>

                    <Row>
                         <Col md="12">
                              <Card>
                                   <CardHeader>
                                        <CardTitle tag="h4">Simple Table</CardTitle>
                                   </CardHeader>
                                   <CardBody className="table-case">
                                        <Table className="tablesorter">
                                             <thead className="text-primary">
                                                  <tr>
                                                       <th><b>Type</b></th>
                                                       <th><b>Work</b></th>
                                                       <th><b>Branch</b></th>
                                                       <th><b>DEV</b></th>
                                                       <th><b>FUT</b></th>
                                                       <th><b>UAT</b></th>
                                                       <th><b>PREPROD</b></th>
                                                       <th><b>PROD</b></th>
                                                  </tr>
                                             </thead>

                                             <tbody>
                                                  {
                                                       workItems.map((item, ind) =>
                                                            <tr key={ind}>
                                                                 <td> {item.type} </td>
                                                                 <td>{item.workName}</td>
                                                                 <td>{item.branch}</td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1"><Button className="btn-icon btn-round "
                                                                           color={item.dev.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'dev' ? true : false} target="TooltipExample1" toggle={() => toggle('dev', item.id)}>
                                                                           Updated :  {item.dev.updated}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample2"><Button className="btn-icon btn-round "
                                                                           color={item.fut.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'fut' ? true : false} target="TooltipExample2" toggle={() => toggle('fut', item.id)}>
                                                                           Updated : {item.fut.updated}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample3"><Button className="btn-icon btn-round "
                                                                           color={item.uat.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'uat' ? true : false} target="TooltipExample3" toggle={() => toggle('uat', item.id)}>
                                                                           Updated : {item.uat.updated}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample4"><Button className="btn-icon btn-round "
                                                                           color={item.preprod.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'preprod' ? true : false} target="TooltipExample4" toggle={() => toggle('preprod', item.id)}>
                                                                           Updated : {item.preprod.updated}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample5"><Button className="btn-icon btn-round "
                                                                           color={item.prod.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'prod' ? true : false} target="TooltipExample5" toggle={() => toggle('prod', item.id)}>
                                                                           Updated : {item.prod.updated}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td className="text-right">
                                                                      <Button className="btn-icon btn-simple" color="info" size="sm">
                                                                           <i className="fa fa-edit"></i>
                                                                      </Button>{` `}
                                                                      <Button className="btn-icon btn-simple" color="danger" size="sm">
                                                                           <i className="fa fa-times" />
                                                                      </Button>{` `}
                                                                 </td>
                                                            </tr>
                                                       )
                                                  }
                                             </tbody>
                                        </Table>
                                   </CardBody>
                              </Card>
                         </Col>
                    </Row>
               </div>
          </>
     );
}

export default WorkItems;
