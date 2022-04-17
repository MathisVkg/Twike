import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalHeader, ModalFooter, Input } from 'reactstrap';

function AuthSignUp(props) {
    const [usernameCreate, setUsernameCreate] = useState("");
    const [passwordCreate, setPasswordCreate] = useState("");
    const modal = props.modal;
    const toggle = () => {
        props.toggle();
    };
    const formSubmitSignUp = (e) => {
        props.formSubmitSignUp(e, usernameCreate, passwordCreate);
    }

    return(
        <Modal centered fullscreen="md" size="" backdrop="static" isOpen={ modal } toggle={ toggle }>
            <ModalHeader>
                <button type="button" className="cross-modal btn" onClick={ toggle }>x</button>
            </ModalHeader>
            <ModalBody>
                <form onSubmit={formSubmitSignUp} className="d-flex flex-column formSignUp">
                    <div className="d-flex flex-column">
                        <span>Username</span>
                        <input type="text" name="username" className="form-control w-100" value={usernameCreate} onChange={(e) => setUsernameCreate(e.target.value)} />
                    </div>
                    <div className="d-flex flex-column">
                        <span>Password</span>
                        <input type="text" name="password" className="form-control w-100" value={passwordCreate}  onChange={(e) => setPasswordCreate(e.target.value)} />
                    </div>
                    <button type="submit" className="btn btn-primary">Create account</button>
                </form>
            </ModalBody>
            <ModalFooter>
                <Button color="ligt" className="btn-sm btnCancel" onClick={ toggle }>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default AuthSignUp;