import React from 'react'

import {
     Button,
} from "reactstrap";

function DeleteConfirmation({actionYes , actionNo , message}) {
     return (
          <div>
               <div className="message text-center"><h4>{message}</h4></div>
               <div className="actions d-flex justify-content-center mt-5">
                    <Button className="btn btn-primary" onClick={actionNo}>No</Button>
                    <Button className="btn btn-primary" onClick={actionYes}>Yes</Button>
               </div>
          </div>
     )
}

export default DeleteConfirmation;
