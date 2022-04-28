import React, { useState } from "react";
import { Modal, ModalBody, ModalHeader, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { BsCardImage } from "react-icons/bs";
import { AiOutlineFileGif } from "react-icons/ai";
import { ImStatsBars } from "react-icons/im";
import { VscSmiley } from "react-icons/vsc";
import { AiFillCalendar } from "react-icons/ai";
import { BsFillGeoAltFill } from "react-icons/bs";
import { BiWorld } from "react-icons/bi";
import { GoMention } from "react-icons/go";
import { RiUserFollowLine } from "react-icons/ri";
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

function ModalTweet({ modal, toggle, loadingBtn, submitTweet }) {
    const [showTweetArea, setShowTweetArea] = useState(true);
    const [dropDown, setDropDown] = useState(false);
    const [whoCanSee, setWhoCanSee] = useState(1);
    const [progressValue, setProgressValue] = useState(0);
    const [errorTweet, setErrorTweet] = useState(true);
    const toggleDrop = () => setDropDown(!dropDown);

    const checkContent = (e) => {
        setProgressValue(e.target.value.length / 2.8);
        if (e.target.value.length) setErrorTweet(false);
        else {
            setErrorTweet(true);
        }
    }

    return(
        <Modal centered fullscreen="md" size="" isOpen={ modal } toggle={ toggle } className="modalTweet">
            <ModalHeader>
                <button type="button" className="cross-modal btn" onClick={ () => showTweetArea ? toggle() : setShowTweetArea(true) }><div className="btnCross" /></button>
            </ModalHeader>
            <ModalBody>
                {showTweetArea ?
                    <form className="d-flex flex-column" onSubmit={ submitTweet }>
                        <div className="d-flex" style={{ marginTop: "5px" }}>
                            <span className="userPP" />
                            <textarea name="text" id="" cols="30" rows="10" placeholder="What's happening ?"
                                      onChange={ (e) => checkContent(e) }
                                      maxLength="280"
                            />
                        </div>
                        <Dropdown isOpen={ dropDown } toggle={ toggleDrop }>
                            <DropdownToggle caret>{
                                whoCanSee === 1 ? <span><BiWorld />Everyone can reply</span> :
                                (whoCanSee === 2 ? <span><RiUserFollowLine />People you follow can reply</span> : <span><GoMention />Only people you mention can reply</span>) }
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem header>
                                    <p className="dropDownTitle">Who can reply ?</p>
                                    <p>Choose who can reply to this Tweet. <br/>Anyone mentioned can always reply.</p>
                                </DropdownItem>
                                <DropdownItem onClick={ () => setWhoCanSee(1) }><BiWorld />Everyone</DropdownItem>
                                <DropdownItem onClick={ () => setWhoCanSee(2) }><RiUserFollowLine />People you follow</DropdownItem>
                                <DropdownItem onClick={ () => setWhoCanSee(3) }><GoMention />Only people you mention</DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                        <div className="d-flex align-items-center justify-content-between mt-2">
                            <div style={{paddingLeft: "65px", cursor: "pointer" }}>
                                <BsCardImage/>
                                <AiOutlineFileGif/>
                                <ImStatsBars/>
                                <VscSmiley/>
                                <AiFillCalendar onClick={ () => setShowTweetArea(false) }/>
                                <BsFillGeoAltFill/>
                            </div>
                            <div className="d-flex align-items-center">
                                <Stack spacing={2} direction="row" className="mr-1">
                                    <CircularProgress variant="determinate" value={progressValue}/>
                                </Stack>
                                <button type="submit" className="btn btn-primary btnTweet" disabled={ errorTweet }>
                                    { loadingBtn ? <span className="lds-dual-ring" style={{ transform: "scale(0.8)" }}/> : "Tweet" }
                                </button>
                            </div>
                        </div>
                    </form> :
                    <p>hello</p>
                }
            </ModalBody>
        </Modal>
    )
}

export default ModalTweet;