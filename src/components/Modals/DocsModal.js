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
          <div>
               <Row>
                    <Col md="12">
                         <Card>
                              <CardHeader>
                                   <CardTitle tag="h4">Documents</CardTitle>
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
                                        !filesLoading &&
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
                                                            <Button target="_blank" href={`http://localhost:1337${doc.url}`} className="btn-sm btn-round btn-icon" color="info">
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












                                   {/* <Table className="tablesorter" responsive>
                                        <thead className="text-primary">
                                             <tr>
                                                  <th>File Type</th>
                                                  <th>File Name</th>
                                                  <th></th>
                                             </tr>
                                        </thead>
                                        <tbody>
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

                                             {!filesLoading &&
                                                  documentList.map((doc, ind) =>
                                                       <>
                                                            <tr key={ind}>
                                                                 <td><CardImg className="file-img" top src={fileIcons[doc.ext?.substring(1)]} alt="..." /></td>
                                                                 <td className="col-2" >{doc.name}</td>
                                                                 <td className="text-center">
                                                                      <Button target="_blank" href={`http://localhost:1337${doc.url}`} className="btn-sm btn-round btn-icon" color="info">
                                                                           <i class="fas fa-download"></i>
                                                                      </Button>
                                                                      <Button onClick={() => deleteFile(doc.id)} className="btn-sm btn-round btn-icon ml-2" color="danger">
                                                                           <i class="fas fa-trash-alt"></i>
                                                                      </Button>
                                                                 </td>
                                                            </tr>
                                                       </>
                                                  )
                                             }
                                        </tbody>
                                   </Table> */}
                              </CardBody>
                         </Card>
                    </Col>
               </Row>
          </div>
     )
}

export default DocsModal;
