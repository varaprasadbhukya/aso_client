import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import api from '../../services/api';

function MailVerify() {
    const param = useParams();
    console.log(param, "------------------->params")
    const navigate = useNavigate();
    const [modalShow, setModalShow] = useState(false);


    const verifyMail = async () => {
        try {
            let res = await api({
                url: '/auth/verifymail',
                method: "POST",
                responseType: "json",
                data: {
                    param
                },
            });
            console.log(res, "------------------>response")
            if (res.code === 200) {
                alert("mail verified you can login")
                navigate('/signup')
            }
            if (res.code === 400) {
                const errorMessage = res.message;
                // Find index of "Error :" in the message
                const errorIndex = errorMessage.indexOf('Error:');
                if (errorIndex !== -1) {
                    // Extract message after "Error :"
                    const actualMessage = errorMessage.slice(errorIndex + 7).trim();
                    // Display error message in alert
                    if (actualMessage === 'Mail Already Verified') {
                        alert(actualMessage);
                        navigate('/signup')
                    }
                    if (actualMessage === 'Link Expired') {
                        //Resend Activation Link
                        setModalShow(true)
                    }
                }
            }

            if (res.code === 500) {
                alert(res.message)
            }
        } catch (error) {
            if (error.response.status === 401) navigate("/");
        }
    }

    const ResendLink = async () => {
        try {
            let res = await api({
                url: '/auth/resendmail',
                method: "POST",
                responseType: "json",
                data: {
                    param
                },
            });
            console.log(res, "------------------>response")
            if (res.code === 200) {
                alert("mail sent please verify")
            }
            if (res.code === 500 || res.code === 400) {
                alert('Error occured')
            }
        } catch (error) {
            if (error.response.status === 401) navigate("/");
        }
    }

    useEffect(() => {
        verifyMail()
    }, [])

    return (
        <>
            <div>MailVerify</div>
            <Modal
                show={modalShow}
                onHide={() => { setModalShow(false); navigate("/signup") }}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Resend Mail
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>

                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => { ResendLink(); setModalShow(false) }}>Click Here to resend verification link</Button>
                </Modal.Footer>
            </Modal>
        </>


    )
}

export default MailVerify