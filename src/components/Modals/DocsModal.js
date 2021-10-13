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
import { deleteFileById, uploadFileToWorkItem } from 'services/fileService';
import { getWorkById } from 'services/works.service';
import { updateWork } from '../../services/works.service'
import '../../assets/scss/black-dashboard-react/custom/_docsModal.scss'
import '../../assets/scss/black-dashboard-react/custom/general.scss'


function DocsModal(props) {
     const [workItem, setWorkItem] = useState({});
     const [filesLoading, setfilesLoading] = useState(true);

     const [fileIcons] = useState({
          xlsx: "https://cdn.icon-icons.com/icons2/342/PNG/512/Excel2_35735.png",
          docx: "https://icons.iconarchive.com/icons/blackvariant/button-ui-ms-office-2016/256/Word-2-icon.png",
          pdf: "https://icons.iconarchive.com/icons/graphicloads/filetype/256/pdf-icon.png"
     })

     useEffect(() => {
          getFiles();
     }, [], [workItem])


     const getFiles = async () => {
          await getWorkById(props.updateItem.id)
               .then(res => { setWorkItem(res.data); setfilesLoading(false) });
     }

     const deleteFile = async (fileId) => {
          setfilesLoading(true);
          await deleteFileById(fileId)
               .then(res => getFiles());
     }

     const upload = () => {
          document.getElementById("selectFile").click()
     }

     const fileSelectHandler = async (files) => {
          setfilesLoading(true);
          let uploadedFiles = [];
          for (let i = 0; i < files.length; i++) {
               const res = await uploadFileToWorkItem(files[i], props.updateItem.id);
               uploadedFiles.push(res.data[0]);
          }

          if (files.length === uploadedFiles.length) {
               const newDocs = [...uploadedFiles, ...workItem.Documents];
               const updatedWorkItem = workItem;
               updatedWorkItem.Documents = newDocs;
               await updateWork(updatedWorkItem, updatedWorkItem.id)
                    .then(res => { getFiles(); })
          }
     }

     return (
          <div className="file-modal-case">
               <Row>
                    <Col md="12">
                         <Card>
                              <CardHeader className="file-modal-header">
                                   <CardTitle tag="h4">Documents</CardTitle>
                                   <div>
                                        <Button onClick={upload} className="btn-sm" color="primary">
                                             <i class="fas fa-upload"></i> Upload
                                        </Button>
                                        <Button onClick={props.closeDocModal} className="btn-sm" color="primary">
                                             Close
                                        </Button>
                                        <input id='selectFile' hidden multiple type="file" onChange={(event) => fileSelectHandler(event.target.files)} />
                                   </div>
                              </CardHeader>
                              <CardBody>

                                   {
                                        filesLoading &&
                                        <div class="spinner">
                                             <div class="dot1"></div>
                                             <div class="dot2"></div>
                                        </div>
                                   }

                                   {
                                        !filesLoading && workItem.Documents.length > 0 &&
                                        <div key="upload" className="d-flex mb-2 pb-3 align-items-start file-item">
                                             <div className="col-3" style={{ color: "white", fontSize: "12px" }}>File Name</div>
                                             <div className="col-6 pl-0" style={{ color: "white", fontSize: "12px" }}>File Name</div>
                                             <div className="col-5">
                                             </div>
                                        </div>
                                   }

                                   {!filesLoading &&
                                        workItem.Documents.map((doc, ind) =>
                                             <>
                                                  <div key={ind} className="d-flex mb-2 pb-3 align-items-center file-item">
                                                       <div className="col-2"><CardImg className="file-img" top src={fileIcons[doc.ext?.substring(1)]} alt="..." /></div>
                                                       <div className="col-7" style={{ color: "white", fontSize: "12px" }}>{doc.name}</div>
                                                       <div className="col-5">
                                                            <Button target={doc.ext === '.pdf' ? '_blank' : ''} href={`http://localhost:1337${doc.url}`} className="btn-sm btn-round btn-icon btn-simple" color="info">
                                                                 <i class="fas fa-download"></i>
                                                            </Button>
                                                            <Button onClick={() => deleteFile(doc.id)} className="btn-sm btn-round btn-icon ml-2">
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
