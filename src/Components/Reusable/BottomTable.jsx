import React, { useEffect, useState } from 'react';
import { Card, Stack, Collapse } from 'react-bootstrap';
import { useColor } from '../../Contexts/ColorContext';
import { useUtility } from '../../Contexts/UtilityContext';
import { CloseButton, StyledButton } from './StyledComponent';

function BottomTable({ children, type }) {

    const { collapsedQueryResultPanel, updateCollapsedQueryResultPanel,
<<<<<<< HEAD
        attributeQueryBottomTablePanelVisible, productFilterBottomTablePanelVisible, ActivewarnlistBottomTablePanelVisible } = useUtility();
=======
<<<<<<< HEAD
        attributeQueryBottomTablePanelVisible, productFilterBottomTablePanelVisible, ActivewarnlistBottomTablePanelVisible } = useUtility();
=======
<<<<<<< HEAD
        attributeQueryBottomTablePanelVisible, productFilterBottomTablePanelVisible, ActivewarnlistBottomTablePanelVisible } = useUtility();
=======
        attributeQueryBottomTablePanelVisible, productFilterBottomTablePanelVisible } = useUtility();
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
    const { backgroundColor, textColor } = useColor();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if ((type === 'attributeQuery' && attributeQueryBottomTablePanelVisible) ||
<<<<<<< HEAD
            (type === 'productFilter' && productFilterBottomTablePanelVisible) ||
            type === 'Activewarnlist' && ActivewarnlistBottomTablePanelVisible) {
=======
<<<<<<< HEAD
            (type === 'productFilter' && productFilterBottomTablePanelVisible) ||
            type === 'Activewarnlist' && ActivewarnlistBottomTablePanelVisible) {
=======
<<<<<<< HEAD
            (type === 'productFilter' && productFilterBottomTablePanelVisible) || type === 'Activewarnlist' && ActivewarnlistBottomTablePanelVisible) {
            alert(type);
=======
            (type === 'productFilter' && productFilterBottomTablePanelVisible)) {
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
<<<<<<< HEAD
    }, [type, productFilterBottomTablePanelVisible, attributeQueryBottomTablePanelVisible, ActivewarnlistBottomTablePanelVisible]);
=======
<<<<<<< HEAD
    }, [type, productFilterBottomTablePanelVisible, attributeQueryBottomTablePanelVisible, ActivewarnlistBottomTablePanelVisible]);
=======
<<<<<<< HEAD
    }, [type, productFilterBottomTablePanelVisible, attributeQueryBottomTablePanelVisible, ActivewarnlistBottomTablePanelVisible]);
=======
    }, [type, productFilterBottomTablePanelVisible, attributeQueryBottomTablePanelVisible]);
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84

    return (
        <div
            id={`collapse${type}BottomTable`}
            className={`collapseBottomTable ${isVisible ? 'active' : ''}`}
            style={{
                transition: 'all 4s',
                width: '92%',
                position: 'absolute',
                bottom: '0',
                left: '50%',
                transform: 'translate(-50%, 0)',
                zIndex: '99',
                display: isVisible ? 'block' : 'none'
            }}
        >
            <div className='transition'>
                <StyledButton id="collapsedBtn" style={{ position: 'absolute', bottom: '0', left: '50%', borderRadius: '0', transform: 'translate(-50%, 0)' }} onClick={() => {
                    if (collapsedQueryResultPanel) {
                        updateCollapsedQueryResultPanel(false);
                    }
                    else {
                        updateCollapsedQueryResultPanel(true);
                    }
                }}><i className="bi bi-arrow-bar-up"></i></StyledButton>
                <Card className={`${collapsedQueryResultPanel ? 'collapsed' : ''}`}
                    style={{
                        height: collapsedQueryResultPanel ? 'auto' : '0px', transition: 'all 4s'
                    }} >
                    <Card.Header className="pe-2"
                        style={{
                            backgroundColor: backgroundColor,
                            color: textColor, padding: collapsedQueryResultPanel ? '0.5rem 1rem' : '8px',
                            borderRadius: collapsedQueryResultPanel ? '' : '6px'
                        }}>
                        <Stack direction="horizontal">
                            {collapsedQueryResultPanel &&
                                <div className="mb-0 me-3 align-items-center" id="featureTable" style={{ color: textColor, display: 'flex' }}>
                                    {type === 'attributeQuery' ? <i className='bi bi-filter me-2' style={{ marginTop: '2px' }}></i> : <i className="bi bi-funnel me-2" style={{ marginTop: '2px' }}></i>}
                                    <h6 className="mb-0">Search Result</h6>
                                </div>}
                            <CloseButton
                                onClick={() => {
                                    if (collapsedQueryResultPanel) {
                                        updateCollapsedQueryResultPanel(false);
                                    }
                                    else {
                                        updateCollapsedQueryResultPanel(true);
                                    }
                                }}
                                aria-expanded={collapsedQueryResultPanel}
                                className='ms-auto'
                            >
                                <i className="bi bi-dash"></i>
                            </CloseButton>
                        </Stack>
                    </Card.Header>
                    <Collapse in={collapsedQueryResultPanel}>
                        <Card.Body className='p-1' style={{ minHeight: '250px', maxHeight: '250px', overflow: 'hidden' }}>
                            {children}
                        </Card.Body>
                    </Collapse>
                </Card>
            </div>
        </div>
    );
}

export default BottomTable;
