import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function AuthSignUp({ modal, loadingBtn, toggle, formSubmitSignUp }) {
    const [usernameCreate, setUsernameCreate] = useState("");
    const [passwordCreate, setPasswordCreate] = useState("");
    const [emailCreate, setEmailCreate] = useState("");

    return(
        <Modal centered fullscreen="md" size="" backdrop="static" isOpen={ modal } toggle={ toggle }>
            <ModalHeader>
                <span className="modalTitle">Create a account</span>
                <button type="button" className="cross-modal btn" onClick={ toggle }><div className="btnCrossSign" /></button>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={ (e) => formSubmitSignUp(e, usernameCreate, passwordCreate, emailCreate) } className="d-flex flex-column formSignUp">
                    <div className="d-flex flex-column">
                        <span>Email</span>
                        <input type="text" name="email" className="form-control w-100" value={emailCreate} onChange={(e) => setEmailCreate(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Username</span>
                        <input type="text" name="username" className="form-control w-100" value={usernameCreate} onChange={(e) => setUsernameCreate(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Password</span>
                        <input type="text" name="password" className="form-control w-100" value={passwordCreate}  onChange={(e) => setPasswordCreate(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">{ loadingBtn ? <div className="lds-dual-ring" /> : "Create Account" }</button>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="ligt" className="btn-sm btnCancel" onClick={ toggle }>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AuthSignUp;