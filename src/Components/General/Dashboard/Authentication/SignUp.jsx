import React, { useState, useEffect } from 'react';
import { Card, Form, Container, Row, Modal } from 'react-bootstrap'
import logoimg from '../../../../assets/images/logo.png';
import { CloseButton, StyledButton, StyledLoaderInner, StyledLoaderWraper } from '../../../Reusable/StyledComponent';
import { toast } from 'react-toastify';
import { useColor } from '../../../../Contexts/ColorContext';
import { useUtility } from '../../../../Contexts/UtilityContext';
import { useParams } from 'react-router-dom';
import { nodeServerUrl } from '../../../../appConfig';
import axios from 'axios';

function SignUp({ show, onHide, fullscreen }) {

    const { logoFlag, updateLogoFlagValue } = useUtility();
    const [data, setData] = useState([]);
    const { projectId } = useParams();
    const [imageSrc, setImageSrc] = useState(null);

    const defaultRole = 0;
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [selectedValue, setselectedValue] = useState(defaultRole);
    const [email, setEmail] = useState("");
    const [mobileno, setmobileno] = useState("");
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setusernameError] = useState("");
    const [firstnameError, setfirstnameError] = useState("");
    const [lastnameError, setlastnameError] = useState("");
    const [roleError, setroleError] = useState("");

    const [emailError, setemailError] = useState("");
    const [passwordError, setPasswordError] = useState('');
    const [mobilenoError, setMobilenoError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const { borderColor, fontFamily, typoColor } = useColor();
    const [loading, setLoading] = useState(false);

    const fetchprojectLogoData = async () => {
        try {
            const response = await axios.get(`${nodeServerUrl}/logo/${projectId}`);
            if (response.data) {
                setData([response.data]);
            }
        } catch (err) {
            setData([]);
        }
    };

    useEffect(() => {
        fetchprojectLogoData();
        updateLogoFlagValue(false);
    }, [projectId, logoFlag])

    if (!imageSrc) {
        setImageSrc(logoimg);
    }

    const handleValidation = (event) => {
        let formIsValid = true;

        if (!username) {
            setusernameError("Username should not be empty.");
            formIsValid = false;
        } else if (!username.match(/^[a-zA-Z0-9\-]{3,18}$/)) {
            setusernameError("Username allows only 3 to 18 characters with alphabets and numbers.");
            formIsValid = false;
        } else {
            setusernameError("");
        }

        if (!firstname) {
            setfirstnameError("Firstname should not be empty.");
            formIsValid = false;
        } else if (!firstname.match(/^[a-zA-Z\-]{3,18}$/)) {
            setfirstnameError("Firstname allows only 3 to 18 characters with alphabets.");
            formIsValid = false;
        } else {
            setfirstnameError("");
        }

        if (!lastname) {
            setlastnameError("Lastname should not be empty.");
            formIsValid = false;
        } else if (!lastname.match(/^[a-zA-Z\-]{3,18}$/)) {
            setlastnameError("Lastname allows only 3 to 18 characters with alphabets.");
            formIsValid = false;
        } else {
            setlastnameError("");
        }

        if (!email) {
            setemailError("Email should not be empty.");
            formIsValid = false;
        } else if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            setemailError("Invalid EmailId(abc@xxx.yy)");
            formIsValid = false;
        } else {
            setemailError("");
        }
        if (!password) {
            setPasswordError("Password should not be empty.");
            formIsValid = false;

        } else if (!password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%"^&*()_+=\-[\]{};:'",.<>?/\\|])(?=.*\d).{8,20}$/)) {
            setPasswordError("Password should be atleast 1 uppercase, lowercase, numbers, and symbols.");
            formIsValid = false;
        }
        else {
            setPasswordError("");
        }

        if (!mobileno) {
            setMobilenoError("Phonenumber should not be empty.");
            formIsValid = false;

        } else if (!mobileno.match(/^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/)) {
            setMobilenoError("phonenumber allows only numbers.");
            formIsValid = false;
        }
        else {
            setMobilenoError("");
        }


        if (!confirmPassword) {
            setConfirmPasswordError("Confirm Password should not be empty.");
            formIsValid = false;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match.");
            formIsValid = false;
        } else {
            setConfirmPasswordError("");
        }
        return formIsValid;
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
        if (event.target.value && usernameError) {
            setusernameError("");
        }
    };

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
        if (event.target.value && firstnameError) {
            setfirstnameError("");
        }
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
        if (event.target.value && lastnameError) {
            setlastnameError("");
        }
    };

    const handleDropdownChange = (event) => {
        setselectedValue(event.target.value);
    };
    const handleEmailChange = (event) => {
        setEmail(event.target.value);
        if (event.target.value && emailError) {
            setemailError("");
        }
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
        if (event.target.value && passwordError) {
            setPasswordError("");
        }
    };

    const handleMobilenoChange = (event) => {
        setmobileno(event.target.value);
        if (event.target.value && mobilenoError) {
            setMobilenoError("");
        }
    };

    const handleConfirmpasswordChange = (event) => {
        setConfirmPassword(event.target.value);
        if (event.target.value && confirmPasswordError) {
            setConfirmPasswordError("");
        }
    };
    const ClearForm = () => {
        var form = document.getElementById("signupform");
        form.reset();
        setUsername('');
        setusernameError('');
        setFirstname('');
        setfirstnameError('');
        setLastname('');
        setlastnameError('');
        setEmail('');
        setemailError('');
        setmobileno('');
        setMobilenoError('');
        setPassword('');
        setPasswordError('');
        setConfirmPassword('');
        setConfirmPasswordError('');
    }

    const handleClose = () => {
        ClearForm();
        onHide();
    };
    const signupSubmit = async (e) => {

        e.preventDefault();
        if (handleValidation()) {
            let signupobject = {
                "captcha": "",
                'firstName': firstname,
                'lastName': lastname,
                'role': selectedValue,
                "phoneNumber": mobileno,
                'userName': username,
                'email': email,
                'password': password,
                "status": 0
            }
            try {
                setLoading(true);
                const response = await fetch(`${rootConfig.AuthenticationURL}/user/signup`, {
                    method: 'POST',
                    body: JSON.stringify(signupobject),
                    headers: {
                        'Content-Type': 'application/json'
                    }

                });

                const result = await response.text();

                if (result === 'User registered successfully') {
                    toast.success('You have registered successfully. An email with a key will be sent to your registered email address to verify your account. Please use the key when you log in.')
                    ClearForm();
                    setLoading(false);
                    onHide();
                } else {
                    ClearForm();
                    setLoading(false);
                    toast.warn(result);
                }

            } catch (error) {
                ClearForm();
                setLoading(false);
                toast.error('Registration failed due to network error, Please try after some time.');
            }
        }
    };
    return (
        <Modal show={show} onHide={onHide} fullscreen={fullscreen} className="userModal">
            {loading && (
                <StyledLoaderWraper>
                    <StyledLoaderInner />
                </StyledLoaderWraper>
            )}
            <Modal.Header className='border-0 position-absolute' style={{ zIndex: '999', top: '10px', right: '10px' }}>
                <CloseButton
                    onClick={handleClose}
                    className='ms-auto'
                ><i className='bi bi-x'></i>
                </CloseButton>
            </Modal.Header>
            <Modal.Body className='p-0 d-flex flex-wrap align-content-center align-items-center bblury'>
                <Container>
                    <Card className='col-sm-12 col-md-9 mx-auto bg-transparent border-0 px-0'>
                        <Card.Body className='p-4' style={{ position: 'relative' }}>
                            <div className='bordermask_hz'></div>
                            <div className='bordermask_hz_bottom'></div>
                            <div className='bordermask_vr'></div>
                            <div className='bordermask_vr_end'></div>
                            <Row className='m-0 p-0'>
                                <Card className='col-sm-12 col-md-6 shadow rounded-start rounded-0 bgsvg text-white'>
                                    <Card.Body className='d-flex align-items-center text-center'>
                                        <div className='text-center w-100'>
                                            {data.length > 0 ? <Card.Img
                                                src={data[0].image || logoimg}
                                                width="100px"
                                                height="250px"
                                            /> : <Card.Img
                                                src={logoimg}
                                                width="100px"
                                                height="250px"
                                            />}
                                        </div>
                                    </Card.Body>
                                </Card>
                                <Card className='col-sm-12 col-md-6 shadow rounded-end rounded-0 px-0 border-0'>
                                    <Card.Title className='text-center'><h4 className="p-0 my-2 main-heading mb-0" style={{ color: typoColor, fontFamily: fontFamily }}>Register</h4></Card.Title>
                                    <Card.Body className='linearBgCard'>
                                        <Form id="signupform" onSubmit={signupSubmit} className='bgovelshaped' style={{ fontFamily: fontFamily }}>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                                                <Form.Control type="text" size="sm" placeholder="UserName" value={username}
                                                    style={{ color: typoColor, borderColor: borderColor }} autoComplete='off'
                                                    onChange={handleUsernameChange} />
                                                <small id="usernameHelp" className="text-danger form-text">
                                                    {usernameError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
                                                <Form.Control type="text" size="sm" placeholder="Firstname" onChange={handleFirstnameChange}
                                                    style={{ color: typoColor, borderColor: borderColor }} autoComplete='Firstname'
                                                />
                                                <small id="firstnameHelp" className="text-danger form-text">
                                                    {firstnameError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
                                                <Form.Control type="text" size="sm" placeholder="Lastname"
                                                    style={{ color: typoColor, borderColor: borderColor }} autoComplete='Lastname' onChange={handleLastnameChange} />
                                                <small id="lastnameHelp" className="text-danger form-text">
                                                    {lastnameError}
                                                </small>
                                            </Form.Group>

                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput4">
                                                <Form.Select size="sm" onChange={handleDropdownChange}
                                                    style={{ color: typoColor, borderColor: borderColor }}
                                                    value={selectedValue}>
                                                    <option value="0">ADMINISTRATOR</option>
                                                    <option value="1">GUEST</option>
                                                </Form.Select>
                                                <small id="roleHelp" className="text-danger form-text">
                                                    {roleError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput5">
                                                <Form.Control type="text" size="sm" placeholder="Email"
                                                    style={{ color: typoColor, borderColor: borderColor }}
                                                    onChange={handleEmailChange} autoComplete="Email" />
                                                <small id="emailHelp" className="text-danger form-text">
                                                    {emailError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput6">
                                                <Form.Control type="text" size="sm" placeholder="PhoneNumber" autoComplete='PhoneNumber'
                                                    style={{ color: typoColor, borderColor: borderColor }} onChange={handleMobilenoChange} />
                                                <small id="mobilenoHelp" className="text-danger form-text">
                                                    {mobilenoError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput7">
                                                <Form.Control type="password" size="sm" placeholder="Password"
                                                    style={{ color: typoColor, borderColor: borderColor }} onChange={handlePasswordChange} />
                                                <small id="passwordHelp" className="text-danger form-text">
                                                    {passwordError}
                                                </small>
                                            </Form.Group>
                                            <Form.Group className="mb-3" controlId="exampleForm.ControlInput8">
                                                <Form.Control type="password" size="sm" placeholder="Confirm Password"
                                                    style={{ color: typoColor, borderColor: borderColor }} onChange={handleConfirmpasswordChange} />
                                                <small id="passwordHelp" className="text-danger form-text">
                                                    {confirmPasswordError}
                                                </small>
                                            </Form.Group>
                                            <StyledButton type="submit" className="w-100 btn_clr">
                                                Register
                                            </StyledButton>
                                        </Form>
                                    </Card.Body>
                                </Card>
                            </Row>
                        </Card.Body>
                    </Card>
                </Container>
            </Modal.Body>
        </Modal>
    );
}

export default SignUp;
