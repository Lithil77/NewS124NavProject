import React, { useState, useEffect } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { useNavigate, useParams } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import { useLocation } from "react-router-dom";
import { toast } from 'react-toastify';
import { useColor } from '../../../../Contexts/ColorContext';
import { id, name } from '../../../../Utils/AppDetails';

function UserProfile() {

    const { backgroundColor, textColor, borderColor } = useColor();
    const navigate = useNavigate();
    const { projectId: routeProjectId, projectName: routerProjectName } = useParams();

    const selectedProjectId = routeProjectId === undefined ? id : routeProjectId;
    const selectedProjectName = routerProjectName === undefined ? name : routerProjectName;

    const [sessionusername, setsessionusername] = useState('');
    const [loginandRegisterBtnHandle, setLoginandRegisterBtnHandle] = useState(true);
    const [username, setusername] = useState('');
    const [getrole, setrole] = useState('');
    const [dashboardvalue, setdashboardvalue] = useState(false);
    const [Loginshow, setLoginshow] = useState(false);
    const handleLoginClose = () => setLoginshow(false);
    const [changepasswordshow, setChangepasswordshow] = useState(false);
    const handleChangepasswordClose = () => setChangepasswordshow(false);
    const [fullscreen, setFullscreen] = useState(true);
    const [RegistartionShow, setRegistartionShow] = useState(false);
    const handleRegistartionClose = () => setRegistartionShow(false);
    const handleRegistrationShow = () => setRegistartionShow(true);
    const location = useLocation();
    const [sessionShowModal, setsessionShowModal] = useState(false);
    const [sessionTimeout, setSessionTimeout] = useState(null);

    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        const role = sessionStorage.getItem('role');
        setrole(role);
        setusername(storedUsername);

        if (storedUsername) {
            setsessionusername(storedUsername);
            setLoginandRegisterBtnHandle(false);
            const sessionTimeoutDuration = 30 * 60 * 10;
            const timeoutId = setTimeout(() => {
                setsessionShowModal(true);
            }, sessionTimeoutDuration);
            setSessionTimeout(timeoutId);
        }

        getDashboardPath();
    }, []);


    function handleLoginShow(breakpoint) {
        setFullscreen(breakpoint);
        setLoginshow(true);
    }

    const logoutclick = () => {
        if (username) {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('checkedItems');
            sessionStorage.removeItem('sessionId');
            toast.warn("Successfully logged out into the application.")
            navigateToHome();
        }
    }

    const navigateToDashboard = () => {
        navigate(`/userDashboard/${selectedProjectName}/${selectedProjectId}`, { replace: true });
    }

    const changepasswordclick = () => {
        setChangepasswordshow(true);
    }

    const navigateToHome = () => {
        if (username || dashboardvalue) {
            navigate(`/`, { replace: true });
        }
    }

    const pathname = location.pathname;
    const parts = pathname.split('/').filter(part => part);
    const desiredPath = '/' + parts.slice(0, 1).join('/');

    const getDashboardPath = () => {
        const currentURL = window.location.href;
        const url = new URL(currentURL);
        const path = url.pathname;
        const parts = path.split('/').filter(part => part);
        const desiredPath = '/' + parts.slice(0, 1).join('/');
        if (desiredPath === '/userDashboard') {
            setdashboardvalue(desiredPath)
        }
    }

    const handleSaveChangesClick = () => {
        const sessionTimeoutDuration = 30 * 60 * 1000;
        setsessionShowModal(false);
        const newSessionTimeout = setTimeout(() => {
            setsessionShowModal(true);
        }, sessionTimeoutDuration);

        setSessionTimeout(newSessionTimeout);
    };

    const handleSessionClose = () => {
        setsessionShowModal(false);
        if (location.pathname == "/userDashboard") {
            navigate('/', { replace: true });
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('checkedItems');
            sessionStorage.removeItem('sessionId');
        } else {
            sessionStorage.removeItem('username');
            sessionStorage.removeItem('checkedItems');
            sessionStorage.removeItem('sessionId');
        }
    };

    const navigateToMap = () => {
        navigate(`/mainLayout/${selectedProjectName}/${selectedProjectId}`, { replace: true });
    }

    return (
        <>
            <Dropdown className='w-100'>
                <Dropdown.Toggle style={{ backgroundColor, color: textColor, borderColor: borderColor, height: '40px' }} className='p-1 d-flex flex-wrap align-content-center align-items-center justify-items-center w-100 mb-3'>
                    <i className="bi bi-person-circle me-1" style={{ fontSize: '18.7px' }}></i>
                    <div>{sessionusername}</div>
                </Dropdown.Toggle>
                {loginandRegisterBtnHandle &&
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={handleLoginShow} id="login-btn"><i className="bi bi-person-down me-1 p-1"></i>Login</Dropdown.Item>
                        <Dropdown.Item onClick={handleRegistrationShow} id="register-button"><i className="bi bi-person-up me-1 p-1" ></i>Register</Dropdown.Item>
                    </Dropdown.Menu>
                }

                {sessionusername &&
                    <Dropdown.Menu>
                        {getrole === '0' && desiredPath !== "/userDashboard" && (
                            <Dropdown.Item onClick={(e) => navigateToDashboard()}>
                                <i className="bi bi-layout-text-sidebar-reverse me-1 p-1">
                                </i>Dashboard
                            </Dropdown.Item>
                        )}
                        {dashboardvalue &&
                            <Dropdown.Item onClick={(e) => navigateToMap()}><i className="bi bi-layout-text-sidebar-reverse me-1 p-1"></i>Map</Dropdown.Item>
                        }
                        <Dropdown.Item onClick={(e) => changepasswordclick()}><i className="bi bi-pass me-1 p-1"></i>Change Password</Dropdown.Item>
                        <Dropdown.Item onClick={(e) => logoutclick()}><i className="bi bi-box-arrow-right me-1 p-1"></i>Logout</Dropdown.Item>
                    </Dropdown.Menu>
                }
            </Dropdown>
            <SignIn
                show={Loginshow}
                onHide={handleLoginClose}
                fullscreen={fullscreen} />
            <SignUp
                show={RegistartionShow}
                onHide={handleRegistartionClose}
                fullscreen={fullscreen} />
            <ChangePassword
                show={changepasswordshow}
                onHide={handleChangepasswordClose}
                fullscreen={fullscreen} />
        </>
    );
}

export default UserProfile;


