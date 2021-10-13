import { React, useEffect, useState } from 'react'
import {
     Card, CardImg, CardBody, CardText,
     Button,
     CardHeader,
     CardTitle,
     Table,
     Row,
     Col,
} from 'reactstrap';
import { deleteFileById } from 'services/fileService';
import { getWorkById } from 'services/works.service';
import '../../assets/scss/black-dashboard-react/custom/_docsModal.scss'
import '../../assets/scss/black-dashboard-react/custom/general.scss'


function DocsModal(props) {
     const [documentList, setDocumentList] = useState(props.updateItem?.Documents || []);
     const [filesLoading, setfilesLoading] = useState(true);

     const [fileIcons] = useState({
          xlsx: "https://cdn.icon-icons.com/icons2/342/PNG/512/Excel2_35735.png",
          docx: "https://icons.iconarchive.com/icons/blackvariant/button-ui-ms-office-2016/256/Word-2-icon.png",
          pdf: "https://icons.iconarchive.com/icons/graphicloads/filetype/256/pdf-icon.png"
     })

     useEffect(() => {
          console.log(props)
          getFiles();
     }, [], [documentList])


     const getFiles = async () => {
          console.log(props.updateItem)
          await getWorkById(props.updateItem.id)
               .then(res => { setDocumentList(res.data.Documents); setfilesLoading(false) });
     }

     const deleteFile = async (fileId) => {
          setfilesLoading(true);
          await deleteFileById(fileId)
               .then(res => getFiles());
     }

     return (
          <div className="file-modal-case">
               <Row>
                    <Col md="12">
                         <Card>
                              <CardHeader className="file-modal-header">
                                   <CardTitle tag="h4">Documents</CardTitle>
                                   <Button onClick={props.closeDocModal} className="btn-sm" color="danger">
                                      Close
                                   </Button>
                              </CardHeader>
                              <CardBody>

                                   {
                                        filesLoading &&
                                        <tr>
                                             <td colspan="9">
                                                  <div class="spinner">
                                                       <div class="dot1"></div>
                                                       <div class="dot2"></div>
                                                  </div>
                                             </td>
                                        </tr>
                                   }

                                   {
                                        !filesLoading && documentList.length > 0 &&
                                        <div className="d-flex mb-2 pb-3 align-items-start file-item">
                                             <div className="col-3" style={{ color: "white", fontSize: "12px" }}>File Name</div>
                                             <div className="col-6 pl-0" style={{ color: "white", fontSize: "12px" }}>File Name</div>
                                             <div className="col-5">
                                             </div>
                                        </div>
                                   }

                                   {!filesLoading &&
                                        documentList.map((doc, ind) =>
                                             <>
                                                  <div key={ind} className="d-flex mb-2 pb-3 align-items-start file-item">
                                                       <div className="col-2"><CardImg className="file-img" top src={fileIcons[doc.ext?.substring(1)]} alt="..." /></div>
                                                       <div className="col-7" style={{ color: "white", fontSize: "12px" }}>{doc.name}</div>
                                                       <div className="col-5">
                                                            <Button target={doc.ext === '.pdf' ? '_blank' : ''} href={`http://localhost:1337${doc.url}`} className="btn-sm btn-round btn-icon" color="info">
                                                                 <i class="fas fa-download"></i>
                                                            </Button>
                                                            <Button onClick={() => deleteFile(doc.id)} className="btn-sm btn-round btn-icon ml-2" color="danger">
                                                                 <i class="fas fa-trash-alt"></i>
                                                            </Button>
                                                       </div>
                                                  </div>
                                             </>
                                        )
                                   }
                              </CardBody>
                         </Card>
                    </Col>
               </Row>
          </div>
     )
}

export default DocsModal;
