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
     Modal, ModalBody, Input,
     InputGroup,
     InputGroupAddon,
     InputGroupText,
} from "reactstrap";
import { Tooltip } from 'reactstrap';

import { getWorks, deleteWork } from '../services/works.service'
import AddWork from "components/Modals/AddWork";

function WorkItems(props) {

     const [filterApplying, setfilterApplying] = useState(false);
     const [workItems, setWorkItems] = useState([]);
     const [selectedItem, setSelectedItem] = useState(null);
     const [environments] = useState(['Dev', 'Fut', 'Uat', 'Preprod', 'Prod']);
     const [searchInput, setSearchInput] = useState([]);

     const [nameInputValue, setNameInputValue] = useState('');
     const [branchInputValue, setBranchInputValue] = useState('');
     const [ticketIdInputValue, setticketIdInputValue] = useState('');

     const [filters, setFilter] = useState({
          currentEnv: 0,
          type: '',
          name_contains: '',
          branch_contains: '',
          ticketId_contains: ''
     });

     useEffect(() => {
          setfilterApplying(true);
          getItems();
     }, [filters]);

     // Below fields are for Tooltip Environment Dates
     const [tooltipOpen, setTooltipOpen] = useState({ type: '', id: '' });
     const toggle = (type, id) => setTooltipOpen(tooltipOpen.id === id ? { type: '', id: 0 } : { type, id });

     // Below fields are for Tooltip Add/Update Modal
     const {
          buttonLabel,
          className
     } = props;
     const [modal, setModal] = useState(false);
     const toggleModal = () => setModal(!modal, modal === true ? setSelectedItem(null) : null);

     // Edit - Get - Delete Functions
     const getItems = (closeModal = false) => {
          if (closeModal)
               toggleModal();

          getWorks(filters)
               .then(res => {
                    setWorkItems(res.data);
                    setTimeout(() => {
                         setfilterApplying(false)
                    }, 600);
               });
     }

     const deleteItem = (id) => {
          deleteWork(id)
               .then(res => { getItems(); })
     }

     const editItem = (item) => {
          setSelectedItem(item);
          toggleModal();
     }

     // Filtering Functions
     const removeFilter = (type) => {

          let openedInputType = type;
          if (type === 'name_contains') {
               openedInputType = 'name';
               setNameInputValue('');
          }
          if (type === 'branch_contains') {
               openedInputType = 'branch';
               setBranchInputValue('');
          }
          if (type === 'ticketId_contains') {
               openedInputType = 'ticketId';
               setticketIdInputValue('');
          }

          const inputs = searchInput;
          inputs.splice(inputs.findIndex(item => item === openedInputType), 1)
          setSearchInput([...inputs]);

          if (filters[type]) {
               setFilter({ ...filters, [type]: '' });
          }
     }

     const openInput = (value) => {
          const inputs = searchInput;
          inputs.push(value);
          setSearchInput([...inputs]);
     }

     return (
          <>
               <div className="content">
                    <div className="d-flex justify-content-between align-items-center">
                         <div>
                              <UncontrolledDropdown>
                                   <DropdownToggle caret data-toggle="dropdown">
                                        Environment : {environments[filters.currentEnv - 1] || 'ALL'}
                                   </DropdownToggle>
                                   <DropdownMenu>
                                        <DropdownItem onClick={() => filters.currentEnv !== 0 ? setFilter({ ...filters, currentEnv: 0 }) : null}>ALL</DropdownItem>
                                        <DropdownItem onClick={() => filters.currentEnv !== 1 ? setFilter({ ...filters, currentEnv: 1 }) : null}>DEV</DropdownItem>
                                        <DropdownItem onClick={() => filters.currentEnv !== 2 ? setFilter({ ...filters, currentEnv: 2 }) : null}>FUT</DropdownItem>
                                        <DropdownItem onClick={() => filters.currentEnv !== 3 ? setFilter({ ...filters, currentEnv: 3 }) : null}>UAT</DropdownItem>
                                        <DropdownItem onClick={() => filters.currentEnv !== 4 ? setFilter({ ...filters, currentEnv: 4 }) : null}>PREPROD</DropdownItem>
                                        <DropdownItem onClick={() => filters.currentEnv !== 5 ? setFilter({ ...filters, currentEnv: 5 }) : null}>PROD</DropdownItem>
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
                                        <CardTitle tag="h4">My Works</CardTitle>
                                   </CardHeader>
                                   <CardBody className="table-case">
                                        <Table className="tablesorter">
                                             <thead className="text-primary">
                                                  {/* WORK TYPE HEADER */}
                                                  <tr>
                                                       {searchInput.every(item => item !== 'type') &&
                                                            <th onClick={() => openInput('type')} ><b>Type</b> <i class="fas fa-search-plus"></i>
                                                            </th>
                                                       }
                                                       {/* WORK TYPE SEARCH INPUT */}
                                                       {searchInput.find(item => item === 'type') &&
                                                            <th className="d-flex p-0" >
                                                                 <Input
                                                                      type="select"
                                                                      name="type"
                                                                      id="type"
                                                                      onChange={(event) => setFilter({ ...filters, type: event.target.value })}
                                                                 >
                                                                      <option>Development</option>
                                                                      <option>Bug</option>
                                                                 </Input>
                                                                 <i onClick={() => removeFilter('type')} className="fas fa-times-circle col-md-2 p-0 close-search-icon"></i>
                                                            </th>
                                                       }

                                                       {/* TICKET ID HEADER */}
                                                       {searchInput.every(item => item !== 'ticketId') &&
                                                            <th onClick={() => openInput('ticketId')} ><b>Ticket Id</b> <i class="fas fa-search-plus"></i>
                                                            </th>
                                                       }
                                                       {/* TICKET ID SEARCH INPUT */}
                                                       {searchInput.find(item => item === 'ticketId') &&
                                                            <th className="align-items-center p-0" >
                                                                 <InputGroup>
                                                                      <InputGroupAddon onClick={() => filters.ticketId_contains !== ticketIdInputValue ? setFilter({ ...filters, ticketId_contains: ticketIdInputValue }) : null} addonType="append">
                                                                           <InputGroupText className="text-input-search-icon">
                                                                                <i className="fas fa-search-plus" />
                                                                           </InputGroupText>
                                                                      </InputGroupAddon>
                                                                      <Input
                                                                           type="text"
                                                                           name="workName"
                                                                           id="workName"
                                                                           value={ticketIdInputValue}
                                                                           onChange={(e) => setticketIdInputValue(e.target.value)}
                                                                           onKeyDown={(event) => event.key === 'Enter' && filters.ticketId_contains !== ticketIdInputValue ? setFilter({ ...filters, ticketId_contains: ticketIdInputValue }) : null}
                                                                      />
                                                                      <i onClick={() => removeFilter('ticketId_contains')} className="fas fa-times-circle col-md-1 p-0 close-search-icon"></i>
                                                                 </InputGroup>
                                                            </th>
                                                       }

                                                       {/* NAME HEADER */}
                                                       {searchInput.every(item => item !== 'name') &&
                                                            <th onClick={() => openInput('name')} ><b>Work</b> <i class="fas fa-search-plus"></i>
                                                            </th>
                                                       }
                                                       {/* NAME SEARCH INPUT */}
                                                       {searchInput.find(item => item === 'name') &&
                                                            <th className="align-items-center p-0" >
                                                                 <InputGroup>
                                                                      <InputGroupAddon onClick={() => filters.name_contains !== nameInputValue ? setFilter({ ...filters, name_contains: nameInputValue }) : null} addonType="append">
                                                                           <InputGroupText className="text-input-search-icon">
                                                                                <i className="fas fa-search-plus" />
                                                                           </InputGroupText>
                                                                      </InputGroupAddon>
                                                                      <Input
                                                                           type="text"
                                                                           name="workName"
                                                                           id="workName"
                                                                           value={nameInputValue}
                                                                           onChange={(e) => setNameInputValue(e.target.value)}
                                                                           onKeyDown={(event) => event.key === 'Enter' && filters.name_contains !== nameInputValue ? setFilter({ ...filters, name_contains: nameInputValue }) : null}
                                                                      />
                                                                      <i onClick={() => removeFilter('name_contains')} className="fas fa-times-circle col-md-1 p-0 close-search-icon"></i>
                                                                 </InputGroup>
                                                            </th>
                                                       }

                                                       {/* BRANCH HEADER */}
                                                       {searchInput.every(item => item !== 'branch') &&
                                                            <th onClick={() => openInput('branch')} ><b>Branch</b> <i class="fas fa-search-plus"></i>
                                                            </th>
                                                       }
                                                       {/* BRANCH SEARCH INPUT */}
                                                       {searchInput.find(item => item === 'branch') &&
                                                            <th className="align-items-center p-0" >
                                                                 <InputGroup>
                                                                      <InputGroupAddon onClick={() => filters.branch_contains !== nameInputValue ? setFilter({ ...filters, branch_contains: branchInputValue }) : null} addonType="append">
                                                                           <InputGroupText className="text-input-search-icon">
                                                                                <i className="fas fa-search-plus" />
                                                                           </InputGroupText>
                                                                      </InputGroupAddon>
                                                                      <Input
                                                                           type="text"
                                                                           name="branchName"
                                                                           id="branchName"
                                                                           value={branchInputValue}
                                                                           onChange={(e) => setBranchInputValue(e.target.value)}
                                                                           onKeyDown={(event) => event.key === 'Enter' && filters.branch_contains !== nameInputValue ? setFilter({ ...filters, branch_contains: branchInputValue }) : null}
                                                                      />
                                                                      <i onClick={() => removeFilter('branch_contains')} className="fas fa-times-circle col-md-1 p-0 close-search-icon"></i>
                                                                 </InputGroup>
                                                            </th>
                                                       }

                                                       {/* ENVIRONMENTS */}
                                                       <th><b>DEV</b></th>
                                                       <th><b>FUT</b></th>
                                                       <th><b>UAT</b></th>
                                                       <th><b>PREPROD</b></th>
                                                       <th><b>PROD</b></th>
                                                  </tr>
                                             </thead>

                                             <tbody>
                                                  {
                                                       filterApplying &&
                                                       <tr>
                                                            <td colspan="9">
                                                                 <div class="spinner">
                                                                      <div class="dot1"></div>
                                                                      <div class="dot2"></div>
                                                                 </div>
                                                            </td>
                                                       </tr>
                                                  }
                                                  {!filterApplying &&
                                                       workItems.map((item, ind) =>
                                                            <tr key={ind}>
                                                                 <td><i className={item.type === 'Bug' ? "fas fa-bug" : "fas fa-file-code"}></i> <span>{item.type}</span> </td>
                                                                 <td>{item.ticketId}</td>
                                                                 <td>{item.name}</td>
                                                                 <td>{item.branch}</td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample1"><Button className="btn-icon btn-round "
                                                                           color={item.dev.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'dev' ? true : false} target="TooltipExample1" toggle={() => toggle('dev', item.id)}>
                                                                           {item.dev.date ? Moment(item.dev.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample2"><Button className="btn-icon btn-round "
                                                                           color={item.fut.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'fut' ? true : false} target="TooltipExample2" toggle={() => toggle('fut', item.id)}>
                                                                           {item.fut.date ? Moment(item.fut.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample3"><Button className="btn-icon btn-round "
                                                                           color={item.uat.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'uat' ? true : false} target="TooltipExample3" toggle={() => toggle('uat', item.id)}>
                                                                           {item.uat.date ? Moment(item.uat.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample4"><Button className="btn-icon btn-round "
                                                                           color={item.preprod.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'preprod' ? true : false} target="TooltipExample4" toggle={() => toggle('preprod', item.id)}>
                                                                           {item.preprod.date ? Moment(item.preprod.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <span style={{ textDecoration: "underline", color: "blue" }} href="#" id="TooltipExample5"><Button className="btn-icon btn-round "
                                                                           color={item.prod.active ? "success-custom" : "danger"} size="sm">
                                                                      </Button>{` `}</span>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen.id === item.id && tooltipOpen.type === 'prod' ? true : false} target="TooltipExample5" toggle={() => toggle('prod', item.id)}>
                                                                           Updated  {item.prod.date ? Moment(item.prod.date).format('DD/MM/YYYY HH:mm') : '-'}
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
