import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Spinner } from 'reactstrap';

function AuthSignUp({ modal, loadingBtn, toggle, formSubmitSignUp }) {
    const [usernameCreate, setUsernameCreate] = useState("");
    const [passwordCreate, setPasswordCreate] = useState("");
    const [emailCreate, setEmailCreate] = useState("");
    const [account, setAccount] = useState("");

    return(
        <Modal centered fullscreen="md" size="" backdrop="static" isOpen={ modal } toggle={ toggle } className="modalForm">
            <ModalHeader>
                <span className="modalTitle">Create a account</span>
                <button type="button" className="cross-modal btn" onClick={ toggle }><div className="btnCrossSign" /></button>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={ (e) => formSubmitSignUp(e, usernameCreate, passwordCreate, emailCreate, account) } className="d-flex flex-column formSignUp">
                    <div className="d-flex flex-column">
                        <span>Email</span>
                        <input type="text" name="email" className="form-control w-100" value={emailCreate} onChange={(e) => setEmailCreate(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Account name</span>
                        <input type="text" name="account" className="form-control w-100" value={account} onChange={(e) => setAccount(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Pseudo</span>
                        <input type="text" name="username" className="form-control w-100" value={usernameCreate} onChange={(e) => setUsernameCreate(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Password</span>
                        <input type="password" name="password" className="form-control w-100" value={passwordCreate}  onChange={(e) => setPasswordCreate(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ marginBottom: "10px", marginTop: "25px" }}>{ loadingBtn ? <Spinner size="sm" className="loadingBtn" /> : "Create Account" }</button>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="ligt" className="btn-sm btnCancel" onClick={ toggle }>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AuthSignUp;