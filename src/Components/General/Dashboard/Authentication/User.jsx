import React, { useEffect, useContext } from 'react';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import UserProfile from './UserProfile';

function User() {

    const { olMap } = useContext(OLMapContext);

    useEffect(() => {
        var profileButtonList = document.getElementById('profileButtonList');
        const profileContainer = document.getElementById('profileContainer');
        if (profileButtonList && profileContainer != null) {
            profileButtonList.append(profileContainer);
        }
    }, [olMap]);

    return (
        <>
            <div id="profileContainer" style={{ position: 'relative' }}>
                <UserProfile />
            </div>
        </>
    );
}

export default User;