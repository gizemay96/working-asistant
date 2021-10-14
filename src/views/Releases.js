import { React, useEffect, useState } from 'react'
import Moment from 'moment'
import { getReleases } from 'services/release.service';


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

function Releases(props) {
     const [releaseData, setReleaseData] = useState([])
     const [selectedRelease, setSelectedRelease] = useState({})

     useEffect(() => {
          getItems();
     }, [])


     const {
          className = 'modal-md'
     } = props;
     const [releaseItemsModal, setReleaseItemsModal] = useState(false);
     const toggleReleaseItemsModal = () => setReleaseItemsModal(!releaseItemsModal);


     const getItems = async () => {
          const data = await getReleases();
          setReleaseData([...data.data]);
     }

     const openReleaseItemsModal = (item) => {
          setSelectedRelease({ ...item });
          toggleReleaseItemsModal();
     }

     const closeReleaseItemsModal = () => {
          toggleReleaseItemsModal();
     }


     return (
          <div className="content">
               <Row>
                    <Col md="12">
                         <Card className="card-plain">
                              <CardHeader>
                                   <CardTitle tag="h1">Releases</CardTitle>
                                   {/* <p className="category">Here is a subtitle for this table</p> */}
                              </CardHeader>
                              <CardBody className="table-case">
                                   <Table className="tablesorter">
                                        <thead className="text-primary">
                                             <tr>
                                                  <th>Release Date</th>
                                                  <th>Project</th>
                                                  <th>Scope</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {
                                                  releaseData.map(item =>
                                                       <tr>
                                                            <td>{Moment(item.releaseDate).format('DD/MM/YYYY')}</td>
                                                            <td>{item.Project}</td>
                                                            <td><Button onClick={() => openReleaseItemsModal(item)} color="info btn-simple btn-sm">Show</Button></td>
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
          </div>
     )
}

export default Releases
