import { React, useEffect, useState } from 'react'
import Moment from 'moment'
import { getReleases, deleteRelease , createRelease } from 'services/release.service';

import "../assets/scss/black-dashboard-react/custom/general.scss"


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
     const [loading, setLoading] = useState(true)

     useEffect(() => {
          getItems();
     }, [])

     const {
          buttonLabel,
          className = 'modal-md',
          classNameCreateRelease = 'modal-sm'
     } = props;
     const [releaseItemsModal, setReleaseItemsModal] = useState(false);
     const toggleReleaseItemsModal = () => setReleaseItemsModal(!releaseItemsModal);

     const [createReleaseModal, setCreateReleaseModal] = useState(false);
     const toggleCreateReleaseModal = () => setCreateReleaseModal(!createReleaseModal);


     const getItems = async () => {
          const data = await getReleases();
          setReleaseData([...data.data]);
          setLoading(false);
     }

     const saveRelease = async(saveData) => {
          setLoading(true);
          const response = await createRelease(saveData);
          toggleCreateReleaseModal();
          getItems();
     }

     const removeRelease = async (item) => {
          setLoading(true);
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
                                             <tr className="table-head-tr">
                                                  <th>Release Date</th>
                                                  <th>Project</th>
                                                  <th>Scope</th>
                                                  <th></th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {    loading &&
                                                     <tr>
                                                     <td colspan="9">
                                                          <div class="spinner">
                                                               <div class="dot1"></div>
                                                               <div class="dot2"></div>
                                                          </div>
                                                     </td>
                                                </tr>
                                             }


                                             {   !loading &&
                                                  releaseData.map((item, ind) =>
                                                       <tr key={ind} className="table-body-tr">
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



               <Modal isOpen={createReleaseModal} toggle={toggleCreateReleaseModal} className={classNameCreateRelease}>
                    <ModalBody>
                         <CreateRelease
                              selectedRelease={selectedRelease}
                              closeCreateReleasModal={closeCreateReleasModal}
                              closeAndSaveRelease={(saveData) => saveRelease(saveData)}
                         >
                         </CreateRelease>
                    </ModalBody>
               </Modal>


          </div>
     )
}

export default Releases
