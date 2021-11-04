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
import DeleteConfirmation from 'components/Confirmations/DeleteConfirmation';

function ReleaseItemsModal({ selectedRelease, closeReleaseItemsModal }, props) {
    const [releaseItemsData, setReleaseItemsData] = useState({});
    const [loadingData, setLoadingData] = useState(true);
    const [removing, setremoving] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);
    const [selectedItemForDelete, setSelectedItemForDelete] = useState({});


    const {
        className = 'modal-l'
    } = props;
    const [workItemsModal, setworkItemsModal] = useState(false);
    const toggleWorkItemsModal = () => setworkItemsModal(!workItemsModal);

    const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
    const toggleDeleteConfirmModal = () => setDeleteConfirmModal(!deleteConfirmModal);


    useEffect(() => {
        setLoadingData(true);
        getItems();
    }, [])

    useEffect(() => {
    }, [removing])

    useEffect(() => {
        setLoadingData(true);
        const selectedItemIds = selectedItems?.map(item => item.id) || [];
        const alreadyAddedItemIds = releaseItemsData.works?.map(item => item.id) || [];
        let sameItems = selectedItemIds.every(element => {
            return alreadyAddedItemIds.includes(element);
        });

        if (!sameItems && !removing) {
            updateReleaseItems(selectedItems);
            toggleWorkItemsModal();
        } else if (removing) {
            updateReleaseItems();
        }
    }, [selectedItems]);

    const getItems = async () => {
        const response = await getReleaseById(selectedRelease.id)
        setReleaseItemsData({ ...response.data });
        setLoadingData(false);
    }

    const updateReleaseItems = async () => {
        const updatedRelease = releaseItemsData;
        updatedRelease.works = selectedItems;
        const response = await updateRelease(updatedRelease);
        if (response) {
            setremoving(false);
            getItems();
        }
    }

    const removeItem = (item) => {
        setLoadingData(true);
        setremoving(true);
        console.log(releaseItemsData.works, item)
        let items = releaseItemsData.works;

        const ind = items.findIndex(addedItem => addedItem.id === item.id);
        console.log(ind)
        if (ind > -1) {
            items[ind].checked = false;
            items.splice(ind, 1);
            setSelectedItems([...items]);
        }
        toggleDeleteConfirmModal();
    }

    const confirmationModalActions = (item = null, onlyClose = true) => {
        if (!onlyClose)
            setSelectedItemForDelete({ ...item });

        toggleDeleteConfirmModal();
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
                                    Add <i class="fas fa-plus-circle"></i>
                                </Button>
                                <Button onClick={closeReleaseItemsModal} className="btn-sm" color="primary">
                                    Close <i class="fas fa-times-circle"></i>
                                </Button>
                            </div>
                        </CardHeader>
                        <CardBody className="table-case release-items-modal-body">
                            <Table className="tablesorter">
                                <thead className="text-primary">
                                    <tr className="table-head-tr">
                                        <th>Type</th>
                                        <th>Ticket Id</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        loadingData &&
                                        <tr>
                                            <td colspan="9">
                                                <div class="spinner">
                                                    <div class="dot1"></div>
                                                    <div class="dot2"></div>
                                                </div>
                                            </td>
                                        </tr>
                                    }

                                    {!loadingData && releaseItemsData.works.length > 0 &&
                                        releaseItemsData.works.map((item, index) =>
                                            <tr key={index} className="table-body-tr">
                                                <td><i className={item.type === 'Bug' ? "fas fa-bug" : "fas fa-file-code"}></i> <span>{item.type}</span> </td>
                                                <td>{item.ticketId}</td>
                                                <td className="text-right">
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


            <Modal isOpen={workItemsModal} toggle={toggleWorkItemsModal} className={className}>
                <ModalBody>
                    <AddWorkModal closeModal={toggleWorkItemsModal} initData={releaseItemsData.works} updateReleaseItems={setSelectedItems} ></AddWorkModal>
                </ModalBody>
            </Modal>

            <Modal isOpen={deleteConfirmModal} toggle={toggleDeleteConfirmModal} className={className}>
                <ModalBody>
                    <DeleteConfirmation message="Are You Sure You Want Delete ?" actionYes={() => removeItem(selectedItemForDelete)} actionNo={confirmationModalActions}></DeleteConfirmation>
                </ModalBody>
            </Modal>
        </div>
    )
}

export default ReleaseItemsModal
