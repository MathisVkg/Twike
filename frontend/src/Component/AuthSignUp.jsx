import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';

function AuthSignUp(props) {
    const [usernameCreate, setUsernameCreate] = useState("");
    const [passwordCreate, setPasswordCreate] = useState("");
    const errorFormSignUp = props.errorFormSignUp
    const modal = props.modal;
    const loadingBtn = props.loadingBtn;
    const toggle = () => {
        setUsernameCreate("");
        setPasswordCreate("");
        props.toggle();
    };
    const formSubmitSignUp = (e) => {
        props.formSubmitSignUp(e, usernameCreate, passwordCreate);
        setUsernameCreate("");
        setPasswordCreate("");
    };

    return(
        <Modal centered fullscreen="md" size="" backdrop="static" isOpen={ modal } toggle={ toggle }>
            <ModalHeader>
                <span className="modalTitle">Create a account</span>
                <button type="button" className="cross-modal btn" onClick={ toggle }>X</button>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={formSubmitSignUp} className="d-flex flex-column formSignUp">
                    <div className="d-flex flex-column">
                        <span>Username</span>
                        <input type="text" name="username" className="form-control w-100" value={usernameCreate} onChange={(e) => setUsernameCreate(e.target.value)} />
                        <span className="errorSpan">{ errorFormSignUp ? "User already exist" : "" }</span>
                    </div>
                    <div className="d-flex flex-column">
                        <span>Password</span>
                        <input type="text" name="password" className="form-control w-100" value={passwordCreate}  onChange={(e) => setPasswordCreate(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">{ loadingBtn ? <div className="lds-dual-ring"></div> : "Create Account" }</button>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="ligt" className="btn-sm btnCancel" onClick={ toggle }>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AuthSignUp;