import React, { useContext, useEffect, useState } from 'react';
import { StyledMapControlButton } from '../../../Reusable/StyledComponent';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import './NextExtend.css';
import { useUtility } from '../../../../Contexts/UtilityContext';

function NextExtend() {

    const [title] = useState('NextExtend');
    const { olMap, nextExtend, updatePreviousExtend } = useContext(OLMapContext);
    const { toggleComponent } = useUtility();

    useEffect(() => {
        var nextExtendButtonList = document.getElementById('nextExtendButtonList');
        const nextExtendContainer = document.getElementById('nextExtendContainer');

        if (nextExtendButtonList && nextExtendContainer != null) {
            if (!nextExtendButtonList.contains(nextExtendContainer)) {
                nextExtendButtonList.append(nextExtendContainer);
            }
        }


    }, [olMap]);

    const handleNextExtend = () => {
        if (olMap) {
            toggleComponent(title, olMap);
            var extent = nextExtend.pop();
            if (extent) {
                olMap.getView().fit(extent);
                updatePreviousExtend();
            }
        }
    }

    return (
        <div id='nextExtendContainer' style={{ position: "relative" }}>
            <StyledMapControlButton title={title} id={title} className='p-1 mb-1'
                onClick={handleNextExtend}
            >
                <i className="bi bi-box-arrow-in-up-right" />
            </StyledMapControlButton>
        </div>
    )
}

export default NextExtend;