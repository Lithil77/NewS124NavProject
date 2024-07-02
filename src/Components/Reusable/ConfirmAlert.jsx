import React from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import './ConfirmAlert.css';

const ConfirmAlert = ({ message, handleDelete }) => {

    const handleClick = () => {
        const options = {
            text: message,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Confirm',
            cancelButtonText: 'Cancel',
        };

        Swal.fire(options).then((result) => {
            if (result.isConfirmed) {
                handleDelete();
                Swal.fire({
                    title: 'Success!',
                    icon: 'success',
                    timer: 3000
                });
            }
        });
    };

    return (
        <>
<<<<<<< HEAD
            <Button className='ms-2' variant='danger' title='Delete' onClick={handleClick}> <i className='bi bi-trash'></i></Button>
=======
<<<<<<< HEAD
            <Button className='ms-2' variant='danger' title='Delete' onClick={handleClick}> <i className='bi bi-trash'></i></Button>
=======
            <Button className='p-1' style={{ fontSize: '20px', width: '40px', height: '40px' }} variant='danger' title='Delete' onClick={handleClick}> <i className='bi bi-trash'></i></Button>
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
        </>
    );
};

export default ConfirmAlert;
