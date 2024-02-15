import { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../services/api';

function MailVerify() {
    const param = useParams();
    console.log(param, "------------------->params")
    const navigate = useNavigate();

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
            if (res.code === 200) {
                alert("mail verified you can login")
            }
            if (res.code === 400) {
                alert('Mail Already Verified')
            }

            if (res.code === 500) {
                alert(res.message)
            }
        } catch (error) {
            if (error.response.status === 401) navigate("/");
        }
    }

    useEffect(() => {
        verifyMail()
    }, [])

    return (
        <div>MailVerify</div>
    )
}

export default MailVerify