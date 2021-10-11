import { React, useState, useEffect } from "react";
import '../assets/scss/black-dashboard-react/custom/workItems.scss'
import Moment from 'moment'

// reactstrap components
import {
     Card,
     CardHeader,
     CardBody,
     CardTitle,
     Table,
     Row,
     Col,
     UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button,
     Modal, ModalBody
} from "reactstrap";
import { Tooltip } from 'reactstrap';

import { getWorks, deleteWork } from '../services/works.service'
import AddWork from "components/Modals/AddWork";

function WorkItems(props) {

     const [workItems, setWorkItems] = useState([]);
     const [selectedItem, setSelectedItem] = useState(null);
     const [filters, setFilter] = useState({
          currentEnv: 1
     });

     const [tooltipOpen, setTooltipOpen] = useState({ type: '', id: '' });

     const toggle = (type, id) => setTooltipOpen(tooltipOpen.id === id ? { type: '', id: 0 } : { type, id });

     useEffect(() => {
          getItems();
     }, [])


     const {
          buttonLabel,
          className
     } = props;

     const [modal, setModal] = useState(false);

     const toggleModal = () => setModal(!modal, modal === true ? setSelectedItem(null) : null);

     const getItems = (closeModal = false) => {
          if (closeModal)
               toggleModal();

          getWorks(filters)
               .then(res => setWorkItems(res.data));
     }

     const deleteItem = (id) => {
          deleteWork(id)
               .then(res => { getItems(); })
     }

     const editItem = (item) => {
          setSelectedItem(item);
          toggleModal();
     }

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
                              <div>
                                   <Button color="danger" onClick={toggleModal}>{buttonLabel}Add New</Button>
                                   <Modal isOpen={modal} toggle={toggleModal} className={className}>
                                        <ModalBody>
                                             <AddWork updateItem={selectedItem} closeModal={getItems} ></AddWork>
                                        </ModalBody>
                                   </Modal>
                              </div>
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
                                                                 <td>{item.name}</td>
                                                                 <td>{item.branch}</td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1"><Button className="btn-icon btn-round "
                                                                           color={item.dev.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'dev' ? true : false} target="TooltipExample1" toggle={() => toggle('dev', item.id)}>
                                                                           Updated   {Moment(item.dev.date).format('DD-MM-YYYY')}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample2"><Button className="btn-icon btn-round "
                                                                           color={item.fut.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'fut' ? true : false} target="TooltipExample2" toggle={() => toggle('fut', item.id)}>
                                                                           Updated  {Moment(item.fut.date).format('DD-MM-YYYY')}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample3"><Button className="btn-icon btn-round "
                                                                           color={item.uat.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'uat' ? true : false} target="TooltipExample3" toggle={() => toggle('uat', item.id)}>
                                                                           Updated  {Moment(item.uat.date).format('DD-MM-YYYY')}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample4"><Button className="btn-icon btn-round "
                                                                           color={item.preprod.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'preprod' ? true : false} target="TooltipExample4" toggle={() => toggle('preprod', item.id)}>
                                                                           Updated  {Moment(item.preprod.date).format('DD-MM-YYYY')}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample5"><Button className="btn-icon btn-round "
                                                                           color={item.prod.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'prod' ? true : false} target="TooltipExample5" toggle={() => toggle('prod', item.id)}>
                                                                           Updated  {item.prod.date ? Moment(item.prod.date).format('DD-MM-YYYY') : '--'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td className="text-right">
                                                                      <Button onClick={() => editItem(item)} className="btn-icon btn-simple" color="info" size="sm">
                                                                           <i className="fa fa-edit"></i>
                                                                      </Button>{` `}
                                                                      <Button onClick={() => deleteItem(item.id)} className="btn-icon btn-simple" color="danger" size="sm">
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
