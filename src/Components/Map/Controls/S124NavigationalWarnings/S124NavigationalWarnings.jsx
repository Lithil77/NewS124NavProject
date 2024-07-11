import React, { useState, useEffect, useContext } from 'react';
import { useColor } from '../../../../Contexts/ColorContext';
import { useUtility } from '../../../../Contexts/UtilityContext';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import { StyledMapControlButton } from '../../../Reusable/StyledComponent';
import { Card, Stack, Tabs, Tab } from 'react-bootstrap';
import { CloseButton } from '../../../Reusable/StyledComponent';
import StepperForm from './StepperForm';
import './S124NavigationalWarnings.css';
import ListofAllActiveNavWarns from './ListofAllActiveNavWarns';
import S124NavWarningsIcon from './S124NavWarningsIcon';

function S124NavigationalWarnings() {

    const [title] = useState('S124NavigationalWarnings');
    const { backgroundColor, textColor, borderColor, fontFamily, cardbodyColor } = useColor();
    const { olMap } = useContext(OLMapContext);
    const [session, setSession] = useState(null);

    const { activeKey, updates124activekey, toggleComponent } = useUtility();

    useEffect(() => {

        if (olMap) {
            var s124NavWarningsButtonList = document.getElementById('s124NavWarningsButtonList');
            const s124NavigationalWarningContainer = document.getElementById('s124NavigationalWarningContainer');
            if (s124NavWarningsButtonList && s124NavigationalWarningContainer != null) {
                if (!s124NavWarningsButtonList.contains(s124NavigationalWarningContainer)) {
                    s124NavWarningsButtonList.append(s124NavigationalWarningContainer);
                }
            }

            var s124NavWarningsInfoSidebar = document.getElementById('s124NavWarningsInfoSidebar');
            const s124NavigationalWarningSidebarConatiner = document.getElementById('s124NavigationalWarningSidebarConatiner');
            if (s124NavWarningsInfoSidebar != null && s124NavigationalWarningSidebarConatiner != null) {
                s124NavWarningsInfoSidebar.append(s124NavigationalWarningSidebarConatiner);
            }
            const sessionValue = sessionStorage.getItem('username');
            setSession(sessionValue);
        }
    }, [olMap]);

    useEffect(() => {
        updates124activekey(activeKey);
    }, [activeKey, updates124activekey]);

    const sidebarHeight = window.innerHeight;

    const handleS124NavWarning = () => {
        toggleComponent(title, olMap);
    }

    const handleCloseSideBar = () => {
        toggleComponent("default", olMap)
    }
    const handleSelect = (eventKey) => {
        updates124activekey(eventKey);
    };
    const CreateNavWarn = () => {
        return(
            <i class="bi bi-pencil-square"></i>
        );
    }
    const ActiveWarnList = () => {
        return(
            <i class="bi bi-list-columns-reverse"></i>
        );
    }
    return (
        <>
            <div id='s124NavigationalWarningContainer' style={{ position: "relative" }}>
                <StyledMapControlButton title={title} id={title} className='p-1 mb-1 text-center'
                    onClick={handleS124NavWarning} disabled={!session}
                >
                    <S124NavWarningsIcon />
                </StyledMapControlButton>
            </div>
            <div id='s124NavigationalWarningSidebarConatiner'>
                <Card className='layersList' style={{ fontFamily: fontFamily, borderColor: borderColor, backgroundColor: cardbodyColor }}>
                    <Card.Header className="pe-1" style={{ backgroundColor: backgroundColor, color: textColor }}>
                        <Stack direction='horizontal'>
                            <div className='mb-0'>
                                <i className="bi bi-layers me-2"></i>
                                S124 Navigational Warnings
                            </div>
                            <CloseButton onClick={handleCloseSideBar} id='popup-closer' className='ms-auto'>
                                <i className='bi bi-x'></i>
                            </CloseButton>
                        </Stack>
                    </Card.Header>
                    <Card.Body label="Layer switcher" className='p-1'
                        style={{ position: 'relative', height: '100%', minHeight: '100px', overflow: 'hidden' }}>
                        <Tabs
                            activeKey={activeKey}
                            onSelect={handleSelect}
                            id="uncontrolled-tab-example"
                            className="mb-1"
                        >
                            <Tab eventKey="createNavWarn" title={<CreateNavWarn/>}>
                                <StepperForm />
                            </Tab>
                            <Tab eventKey="listAllActiveWarns" title={<ActiveWarnList/>}>
                                <ListofAllActiveNavWarns />
                            </Tab>
                        </Tabs>
                    </Card.Body>
                </Card>
            </div>
        </>
    )
}

export default S124NavigationalWarnings;