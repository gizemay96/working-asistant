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

import { getWorks, deleteWork, getWorksCount } from '../services/works.service'
import CreateWork from "components/Modals/CreateWork";
import DocsModal from "components/Modals/DocsModal";
import DeleteConfirmation from "components/Confirmations/DeleteConfirmation";

function WorkItems(props) {

     const [filterApplying, setfilterApplying] = useState(false);
     const [workItems, setWorkItems] = useState([]);
     const [selectedItem, setSelectedItem] = useState(null);
     const [environments] = useState(['Dev', 'Fut', 'Uat', 'Preprod', 'Prod']);
     const [searchInput, setSearchInput] = useState([]);
     const [currentPage, setCurrentPage] = useState({
          page: 1,
          total: 0
     });

     const [nameInputValue, setNameInputValue] = useState('');
     const [branchInputValue, setBranchInputValue] = useState('');
     const [ticketIdInputValue, setticketIdInputValue] = useState('');

     const [filters, setFilter] = useState({
          currentEnv: 0,
          type: '',
          name_contains: '',
          branch_contains: '',
          ticketId_contains: '',
          _start: 0,
          _limit: 10
     });


     useEffect(() => {
          setfilterApplying(true);
          getItems();
     }, [filters]);

     // Below fields are for Tooltip Environment Dates
     const [tooltipOpen, setTooltipOpen] = useState('');


     // Below fields are for Tooltip Add/Update Modal
     const {
          buttonLabel,
          className = "modal-sm"
     } = props;
     const [modal, setModal] = useState(false);
     const toggleModal = () => setModal(!modal, modal == true ? setSelectedItem(null) : null);

     const [docsModal, setDocsModal] = useState(false);
     const toggleDocsModal = () => setDocsModal(!docsModal, docsModal == true ? setSelectedItem(null) : null);


     const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
     const toggleDeleteConfirmModal = () => setDeleteConfirmModal(!deleteConfirmModal);

     // Edit - Get - Delete Functions
     const getItems = async (closeModal = false, getFor = '', closeFileModal = false) => {
          if (closeFileModal)
               return toggleDocsModal();

          if (closeModal)
               toggleModal();

          const worksData = await getWorks(filters)
          setWorkItems(worksData.data);
          setfilterApplying(false);


          if (worksData.data.length == 0 && getFor == 'delete' && currentPage.page > 1) {
               setCurrentPage({ ...currentPage, page: currentPage.page - 1 });
               setFilter({ ...filters, _start: filters._start - filters._limit });
          } else {
               const workCount = await getWorksCount();
               setCurrentPage({ ...currentPage, total: workCount.data })
          }


     }

     const deleteItem = async (id) => {
          setfilterApplying(true);
          await deleteWork(id)
               .then(res => { getItems(false, 'delete'); });
          confirmationModalActions();
     }

     const editItem = (item) => {
          setSelectedItem(item);
          toggleModal();
     }

     const openDocModal = (item) => {
          setSelectedItem(item);
          toggleDocsModal();
     }

     const confirmationModalActions = (item = null, onlyClose = true) => {
          if (!onlyClose)
               setSelectedItem(item);

          toggleDeleteConfirmModal();
     }

     // Filtering Functions
     const removeFilter = (type) => {

          let openedInputType = type;
          if (type == 'name_contains') {
               openedInputType = 'name';
               setNameInputValue('');
          }
          if (type == 'branch_contains') {
               openedInputType = 'branch';
               setBranchInputValue('');
          }
          if (type == 'ticketId_contains') {
               openedInputType = 'ticketId';
               setticketIdInputValue('');
          }

          const inputs = searchInput;
          inputs.splice(inputs.findIndex(item => item == openedInputType), 1)
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

     const changePage = (type) => {
          switch (type) {
               case 'previous':
                    setFilter({ ...filters, _start: filters._start - filters._limit });
                    break;
               case 'next':
                    setFilter({ ...filters, _start: filters._start + filters._limit });
                    break;

               default:
                    break;
          }
          setCurrentPage({ ...currentPage, page: type == 'previous' ? currentPage.page - 1 : currentPage.page + 1 });
     }

     const closeDocModal = () => {
          toggleDocsModal();
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
                                   <DropdownMenu className="dropdown-black">
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
                                   <Button color="info btn-md" onClick={toggleModal}>{buttonLabel}Add Work</Button>
                              </div>
                         </div>
                    </div>

                    <Row>
                         <Col md="12">
                              <Card className="mt-3">
                                   <CardHeader>
                                        <CardTitle className="d-flex justify-content-between">
                                             <h1>My Works</h1>
                                             <h4>Total : {currentPage.total}  Item </h4>
                                        </CardTitle>
                                   </CardHeader>
                                   <CardBody className="table-case">
                                        <Table className="tablesorter" hover>
                                             <thead className="text-primary">
                                                  {/* WORK TYPE HEADER */}
                                                  <tr className="table-head-tr">
                                                       {searchInput.every(item => item !== 'type') &&
                                                            <th onClick={() => openInput('type')} ><b>Type</b> <i class="fas fa-search-plus ml-2"></i>
                                                            </th>
                                                       }
                                                       {/* WORK TYPE SEARCH INPUT */}
                                                       {searchInput.find(item => item == 'type') &&
                                                            <th className="d-flex p-0" >
                                                                 <Input
                                                                      type="select"
                                                                      name="type"
                                                                      id="type"
                                                                      onChange={(event) => setFilter({ ...filters, type: event.target.value == 'All' ? '' : event.target.value })}
                                                                 >
                                                                      <option>All</option>
                                                                      <option>Development</option>
                                                                      <option>Bug</option>
                                                                 </Input>
                                                                 <i onClick={() => removeFilter('type')} className="fas fa-times-circle col-md-2 p-0 close-search-icon"></i>
                                                            </th>
                                                       }

                                                       {/* TICKET ID HEADER */}
                                                       {searchInput.every(item => item !== 'ticketId') &&
                                                            <th onClick={() => openInput('ticketId')} ><b>Ticket Id</b> <i class="fas fa-search-plus ml-2"></i>
                                                            </th>
                                                       }
                                                       {/* TICKET ID SEARCH INPUT */}
                                                       {searchInput.find(item => item == 'ticketId') &&
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
                                                                           onKeyDown={(event) => event.key == 'Enter' && filters.ticketId_contains !== ticketIdInputValue ? setFilter({ ...filters, ticketId_contains: ticketIdInputValue }) : null}
                                                                      />
                                                                      <i onClick={() => removeFilter('ticketId_contains')} className="fas fa-times-circle col-md-1 p-0 close-search-icon"></i>
                                                                 </InputGroup>
                                                            </th>
                                                       }

                                                       {/* NAME HEADER */}
                                                       {searchInput.every(item => item !== 'name') &&
                                                            <th onClick={() => openInput('name')} ><b>Work</b> <i class="fas fa-search-plus ml-2"></i>
                                                            </th>
                                                       }
                                                       {/* NAME SEARCH INPUT */}
                                                       {searchInput.find(item => item == 'name') &&
                                                            <th className="align-items-center p-0">
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
                                                                           onKeyDown={(event) => event.key == 'Enter' && filters.name_contains !== nameInputValue ? setFilter({ ...filters, name_contains: nameInputValue }) : null}
                                                                      />
                                                                      <i onClick={() => removeFilter('name_contains')} className="fas fa-times-circle col-md-1 p-0 close-search-icon"></i>
                                                                 </InputGroup>
                                                            </th>
                                                       }

                                                       {/* BRANCH HEADER */}
                                                       {searchInput.every(item => item !== 'branch') &&
                                                            <th onClick={() => openInput('branch')} ><b>Branch</b> <i class="fas fa-search-plus ml-2"></i>
                                                            </th>
                                                       }
                                                       {/* BRANCH SEARCH INPUT */}
                                                       {searchInput.find(item => item == 'branch') &&
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
                                                                           onKeyDown={(event) => event.key == 'Enter' && filters.branch_contains !== nameInputValue ? setFilter({ ...filters, branch_contains: branchInputValue }) : null}
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
                                                            <tr key={ind} className="table-body-tr">
                                                                 <td><i className={item.type == 'Bug' ? "fas fa-bug" : "fas fa-file-code"}></i> <span>{item.type}</span> </td>
                                                                 <td>{item.ticketId}</td>
                                                                 <td style={{ maxWidth: "220px" }}>{item.name}</td>
                                                                 <td>{item.branch}</td>
                                                                 <td>
                                                                      <div>
                                                                           <p><span style={{ textDecoration: "underline", color: "blue" }} href="#" id={"TooltipExampleDev" + ind}><Button disabled className="btn-icon btn-round env-circle btn-simple"
                                                                                color={item.dev?.active ? "success" : "danger"} size="sm">
                                                                           </Button></span></p>
                                                                           <Tooltip placement="right" isOpen={tooltipOpen == 'TooltipExampleDev' + ind} target={"TooltipExampleDev" + ind} toggle={() => setTooltipOpen(tooltipOpen == 'TooltipExampleDev' + ind ? '' : 'TooltipExampleDev' + ind)}>
                                                                                {item.dev?.date ? Moment(item.dev.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                           </Tooltip>
                                                                      </div>
                                                                 </td>
                                                                 <td>
                                                                      <div>
                                                                           <p><span style={{ textDecoration: "underline", color: "blue" }} href="#" id={"TooltipExampleFut" + ind}><Button disabled className="btn-icon btn-round env-circle btn-simple"
                                                                                color={item.fut?.active ? "success" : "danger"} size="sm">
                                                                           </Button></span></p>
                                                                           <Tooltip placement="right" isOpen={tooltipOpen == 'TooltipExampleFut' + ind} target={"TooltipExampleFut" + ind} toggle={() => setTooltipOpen(tooltipOpen == 'TooltipExampleFut' + ind ? '' : 'TooltipExampleFut' + ind)}>
                                                                                {item.fut?.date ? Moment(item.fut.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                           </Tooltip>
                                                                      </div>
                                                                 </td>
                                                                 <td>
                                                                      <p><span style={{ textDecoration: "underline", color: "blue" }} href="#" id={"TooltipExampleUat" + ind}><Button disabled className="btn-icon btn-round env-circle btn-simple"
                                                                           color={item.uat?.active ? "success" : "danger"} size="sm">
                                                                      </Button></span></p>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen == 'TooltipExampleUat' + ind} target={"TooltipExampleUat" + ind} toggle={() => setTooltipOpen(tooltipOpen == 'TooltipExampleUat' + ind ? '' : 'TooltipExampleUat' + ind)}>
                                                                           {item.uat?.date ? Moment(item.uat.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <p><span style={{ textDecoration: "underline", color: "blue" }} href="#" id={"TooltipExamplePreP" + ind}><Button disabled className="btn-icon btn-round env-circle btn-simple"
                                                                           color={item.preprod?.active ? "success" : "danger"} size="sm">
                                                                      </Button></span></p>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen == 'TooltipExamplePreP' + ind} target={"TooltipExamplePreP" + ind} toggle={() => setTooltipOpen(tooltipOpen == 'TooltipExamplePreP' + ind ? '' : 'TooltipExamplePreP' + ind)}>
                                                                           {item.preprod?.date ? Moment(item.preprod.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td>
                                                                      <p><span style={{ textDecoration: "underline", color: "blue" }} href="#" id={"TooltipExampleProd" + ind}><Button disabled className="btn-icon btn-round env-circle btn-simple"
                                                                           color={item.prod?.active ? "success" : "danger"} size="sm">
                                                                      </Button></span></p>
                                                                      <Tooltip placement="right" isOpen={tooltipOpen == 'TooltipExampleProd' + ind} target={"TooltipExampleProd" + ind} toggle={() => setTooltipOpen(tooltipOpen == 'TooltipExampleProd' + ind ? '' : 'TooltipExampleProd' + ind)}>
                                                                           {item.prod?.date ? Moment(item.prod.date).format('DD/MM/YYYY HH:mm') : '-'}
                                                                      </Tooltip>
                                                                 </td>
                                                                 <td className="text-right">

                                                                      <Button onClick={() => editItem(item)} className="btn-icon" size="sm">
                                                                           <i className="fa fa-edit"></i>
                                                                      </Button>{` `}
                                                                      <Button onClick={() => openDocModal(item)} className="btn-icon" size="sm">
                                                                           <i class="fas fa-folder-open"></i>
                                                                      </Button>{` `}
                                                                      <Button onClick={() => confirmationModalActions(item, false)} className="btn-icon" size="sm">
                                                                           <i class="fas fa-trash-alt"></i>
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


                    <div className="d-flex justify-content-center">
                         <Button disabled={currentPage.page == 1} onClick={() => changePage('previous')} className="btn-icon" color="info" size="sm">
                              <i class="fas fa-caret-left"></i>
                         </Button>{` `}
                         <Button disabled className="btn-simple ml-4 mr-4" color="info" size="sm">
                              {currentPage.page}
                         </Button>{` `}
                         <Button disabled={currentPage.page + 1 * filters._limit > currentPage.total} onClick={() => changePage('next')} className="btn-icon" color="info" size="sm">
                              <i class="fas fa-caret-right"></i>
                         </Button>{` `}
                    </div>
               </div>



               {/* MODALS */}
               <Modal style={{ top: "-120px" }} isOpen={modal} toggle={toggleModal} className={className}>
                    <ModalBody>
                         <CreateWork updateItem={selectedItem} closeModal={getItems} ></CreateWork>
                    </ModalBody>
               </Modal>

               <Modal isOpen={docsModal} toggle={toggleDocsModal} className={className}>
                    <ModalBody>
                         <DocsModal updateItem={selectedItem} closeDocModal={closeDocModal}></DocsModal>
                    </ModalBody>
               </Modal>

               <Modal isOpen={deleteConfirmModal} toggle={toggleDeleteConfirmModal} className={className}>
                    <ModalBody>
                         <DeleteConfirmation message="Are You Sure You Want Delete ?" actionYes={() => deleteItem(selectedItem.id)} actionNo={confirmationModalActions}></DeleteConfirmation>
                    </ModalBody>
               </Modal>

          </>
     );
}

export default WorkItems;
