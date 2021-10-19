import { React, useEffect, useState } from 'react'
import Moment from 'moment'
import { getReleases, deleteRelease } from 'services/release.service';


// reactstrap components
import {
     Card,
     CardHeader,
     CardBody,
     CardTitle,
     Table,
     Row,
     Col,
     Button,
     Modal,
     ModalBody
} from "reactstrap";

import ReleaseItemsModal from 'components/Modals/ReleaseItemsModal';
import CreateRelease from 'components/Modals/CreateRelease';

function Releases(props) {
     const [releaseData, setReleaseData] = useState([])
     const [selectedRelease, setSelectedRelease] = useState({})

     useEffect(() => {
          getItems();
     }, [])


     const {
          buttonLabel,
          className = 'modal-sm'
     } = props;
     const [releaseItemsModal, setReleaseItemsModal] = useState(false);
     const toggleReleaseItemsModal = () => setReleaseItemsModal(!releaseItemsModal);

     const [createReleaseModal, setCreateReleaseModal] = useState(false);
     const toggleCreateReleaseModal = () => setCreateReleaseModal(!createReleaseModal);


     const getItems = async () => {
          const data = await getReleases();
          setReleaseData([...data.data]);
     }

     const removeRelease = async (item) => {
          const response = await deleteRelease(item.id);
          getItems();
     }

     const openReleaseItemsModal = (item) => {
          setSelectedRelease({ ...item });
          toggleReleaseItemsModal();
     }

     const closeReleaseItemsModal = () => {
          toggleReleaseItemsModal();
     }

     const closeCreateReleasModal = () => {
          toggleCreateReleaseModal();
     }



     return (
          <div className="content">

               <div className="d-flex justify-content-end">
                    <Button color="info btn-md" onClick={toggleCreateReleaseModal}>{buttonLabel}Create Release</Button>
               </div>


               <Row>
                    <Col md="12">
                         <Card className="card-plain">
                              <CardHeader>
                                   <CardTitle tag="h1">Releases</CardTitle>
                              </CardHeader>
                              <CardBody className="table-case">
                                   <Table className="tablesorter">
                                        <thead className="text-primary">
                                             <tr>
                                                  <th>Release Date</th>
                                                  <th>Project</th>
                                                  <th>Scope</th>
                                                  <th></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {
                                                  releaseData.map((item, ind) =>
                                                       <tr key={ind}>
                                                            <td>{Moment(item.releaseDate).format('DD/MM/YYYY')}</td>
                                                            <td>{item.Project}</td>
                                                            <td><Button onClick={() => openReleaseItemsModal(item)} color="info btn-simple btn-sm">Show</Button></td>
                                                            <td className="text-center">
                                                                 <Button onClick={() => removeRelease(item)} className="btn-icon text-rigth" size="sm">
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




               <Modal isOpen={releaseItemsModal} toggle={toggleReleaseItemsModal} className={className}>
                    <ModalBody>
                         <ReleaseItemsModal

                              selectedRelease={selectedRelease}
                              closeReleaseItemsModal={closeReleaseItemsModal}>
                         </ReleaseItemsModal>
                    </ModalBody>
               </Modal>



               <Modal isOpen={createReleaseModal} toggle={toggleCreateReleaseModal} className={className}>
                    <ModalBody>
                         <CreateRelease

                              selectedRelease={selectedRelease}
                              closeReleaseItemsModal={closeCreateReleasModal}
                         >
                         </CreateRelease>
                    </ModalBody>
               </Modal>


          </div>
     )
}

export default Releases
