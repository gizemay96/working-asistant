import { React, useEffect, useState } from 'react'
import Moment from 'moment'
import { getReleaseById, updateRelease } from 'services/release.service';


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
    Modal, ModalBody
} from "reactstrap";
import AddWorkModal from '../Modals/AddWorkModal';

function ReleaseItemsModal({ selectedRelease, closeReleaseItemsModal }, props) {
    const [releaseItemsData, setReleaseItemsData] = useState({});
    const [loadingData, setLoadingData] = useState(true);

    const [selectedItems, setSelectedItems] = useState([]);


    const {
        buttonLabel,
        className = 'modal-l'
    } = props;
    const [workItemsModal, setworkItemsModal] = useState(false);
    const toggleWorkItemsModal = () => setworkItemsModal(!workItemsModal);


    useEffect(() => {
        setLoadingData(true);
        getItems();
    }, [], [releaseItemsData])

    useEffect(() => {
        const selectedItemIds = selectedItems?.map(item => item.id) || [];
        const alreadyAddedItemIds = releaseItemsData.works?.map(item => item.id) || [];
        let sameItems = selectedItemIds.every(element => {
            return alreadyAddedItemIds.includes(element);
        });
        if (!sameItems) {
            toggleWorkItemsModal();
            updateReleaseItems(selectedItems);
        }
    }, [selectedItems])

    const getItems = async () => {
        const response = await getReleaseById(selectedRelease.id)
        setReleaseItemsData({ ...response.data });
        setLoadingData(false);
    }

    const updateReleaseItems = async () => {
        const updatedRelease = releaseItemsData;
        updatedRelease.works = selectedItems;
        const response = await updateRelease(updatedRelease);
    }

    const removeItem = (item) => {
        let items = releaseItemsData.works;

        const ind = items.findIndex(addedItem => addedItem.id === item.id);
        if (ind > -1) {
            items[ind].checked = false;
            items.splice(ind, 1);
            setSelectedItems([...items]);
            updateReleaseItems();
        }
    }


    return (
        <div>
            <Row hidden={workItemsModal}>
                <Col md="12">
                    <Card className="card-plain">
                        <CardHeader className="d-flex justify-content-between">
                            <div>
                                <CardTitle tag="h4">( {Moment(selectedRelease.releaseDate).format('DD-MM-YYYY')} ) Release Scope</CardTitle>
                                <p className="category">You can add or delete item</p>
                            </div>
                            <div>
                                <Button onClick={toggleWorkItemsModal} className="btn-sm" color="primary">
                                    Add Scope Item <i class="fas fa-plus-circle"></i>
                                </Button>
                                <Button onClick={closeReleaseItemsModal} className="btn-sm" color="primary">
                                    Close <i class="fas fa-times-circle"></i>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="table-case">
                            <Table className="tablesorter">
                                <thead className="text-primary">
                                    <tr>
                                        <th>Type</th>
                                        <th>Ticket Id</th>
                                        <th>Name</th>
                                        <th>Branch</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {!loadingData && releaseItemsData.works.length > 0 &&
                                        releaseItemsData.works.map(item =>
                                            <tr>
                                                <td><i className={item.type === 'Bug' ? "fas fa-bug" : "fas fa-file-code"}></i> <span>{item.type}</span> </td>
                                                <td>{item.ticketId}</td>
                                                <td>{item.name}</td>
                                                <td>{item.branch}</td>
                                                <td className="text-right d-flex">
                                                    <Button onClick={() => removeItem(item)} className="btn-icon" size="sm">
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


            <Modal isOpen={workItemsModal} toggle={toggleWorkItemsModal} className={className}>
                <ModalBody>
                    <AddWorkModal closeModal={toggleWorkItemsModal} initData={releaseItemsData.works} updateReleaseItems={setSelectedItems} ></AddWorkModal>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ReleaseItemsModal
