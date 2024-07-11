import React, { useContext, useEffect, useState } from 'react';
import { useUtility } from '../../../../Contexts/UtilityContext';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import { CloseButton, StyledMapControlButton } from '../../../Reusable/StyledComponent';
import { Accordion, Card, Form, Stack } from 'react-bootstrap';
import { getLayerExtent } from '../../../../GeoServerUtils/LayerExtent';
import { useColor } from '../../../../Contexts/ColorContext';
import { nodeServerUrl } from '../../../../appConfig';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
<<<<<<< HEAD
import './LayerSwitcher.css';
import { id, isBuilder } from '../../../../Utils/AppDetails';
import { mapLayers } from '../../../../Utils/layersDataConfig';
=======
import { useQuery } from 'react-query';
import './LayerSwitcher.css';
import { id } from '../../../../Utils/AppDetails';
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84

function LayerSwitcher() {

    const title = 'LayerSwitcher';
    const { projectId: routeProjectId } = useParams();
    const selectedProjectId = routeProjectId === undefined ? id : routeProjectId;
    const { olMap, ConfigWMSLayerToMap } = useContext(OLMapContext);
    const { backgroundColor, textColor, borderColor, typoColor, fontFamily, cardbodyColor } = useColor();
    const { toggleComponent } = useUtility();

    const [layerOpacities, setLayerOpacities] = useState({});
    const [layersList, setLayersList] = useState([]);
    const [draggedIndex, setDraggedIndex] = useState(null);
    const [selectedItems, setSelectedItems] = useState([]);
    const [layersData, setLayersData] = useState([]);

<<<<<<< HEAD
    const fetchData = async () => {
        try {
            setLayersData(null);

            if (isBuilder) {

                const response = await fetch(`${nodeServerUrl}/layers/${selectedProjectId}`);
                const data = await response.json();
                if (data) {
                    const newLayerList = data.map(item => item.layer);
                    setLayersList(newLayerList);
                    setSelectedItems(newLayerList);
                    setLayersData(data);
                }
                else {
                    toast.warn('error fetching layer list');
                }
            }
            else {
                if (mapLayers.length > 0) {
                    const layers = mapLayers.map((obj) => {
                        return obj.layer;
                    });
                    setLayersList(layers);
                    setSelectedItems(layers);
                }
            }
        } catch (error) {
            toast.warn('Error fetching layer data:', error);
        }
    };
=======
    const { isLoading: isLoadingLayerData, refetch: refetchLayerData } = useQuery(`/layers/${selectedProjectId}`, async () => {
        const response = await fetch(`${nodeServerUrl}/layers/${selectedProjectId}`);
        const data = await response.json();
        if (data) {
            const newLayerList = data.map(item => item.layer);
            setLayersList(newLayerList);
            setSelectedItems(newLayerList);
            setLayersData(data)
        }
        else {
            toast.warn('error fetching layer list');
        }
    });
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84

    useEffect(() => {
        if (olMap) {
            var layerswitcherButtonList = document.getElementById('layerswitcherButtonList');
            const layerSwitcherContainer = document.getElementById('layerSwitcherContainer');
            if (layerswitcherButtonList && layerSwitcherContainer != null) {
                if (!layerswitcherButtonList.contains(layerSwitcherContainer)) {
                    layerswitcherButtonList.append(layerSwitcherContainer);
                }
            }
            const layerSwitcherInfoSidebar = document.getElementById('layerSwitcherInfoSidebar');
            var layerSwitcherSidebarConatiner = document.getElementById('layerSwitcherSidebarConatiner');
            if (layerSwitcherInfoSidebar != null && layerSwitcherSidebarConatiner != null) {
                layerSwitcherInfoSidebar.appendChild(layerSwitcherSidebarConatiner);
            }
<<<<<<< HEAD
            fetchData();
=======
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
        }
    }, [olMap]);

    const handleLayerSwitcher = () => {
        toggleComponent('layerSwitcher', olMap);
    }

    const handleCheckboxChange = (event) => {
        const { value, checked } = event.target;
        const layers = olMap.getLayers().getArray();
        setSelectedItems((prevSelected) => {
            if (checked) {
                layers.forEach(function (lyr) {
                    if (value === lyr.get('title')) {
                        lyr.setVisible(true);
                    }
                });
                return [...prevSelected, value];
            } else {
                layers.forEach(function (lyr) {
                    if (value === lyr.get('title')) {
                        lyr.setVisible(false);
                    }
                });
                return prevSelected.filter(item => item !== value);
            }
        });
    };

    const handleOpacityChange = (event, lyr) => {
        const newOpacity = parseFloat(event.target.value);
        setLayerOpacities((prevOpacities) => ({
            ...prevOpacities,
            [lyr]: newOpacity,
        }));
    };

    const updateMap = (lyr) => {
        const allLayers = olMap.getLayers().getArray();
        if (allLayers.length > 0) {
            allLayers.forEach(function (layer) {
                if (layer.getVisible() && layer.get('title') === lyr) {
                    const opacity = layerOpacities[lyr] || 0;
                    layer.setOpacity(opacity);
                }
            });
        }
    };

    const handleButtonClick = (lyr) => {
        var buttons = document.querySelectorAll('.ZoomextentBtn');
        buttons.forEach(function (button) {
            if (button.id === lyr) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });

        if (olMap) {
            const allLayers = olMap.getLayers().getArray();
            if (allLayers.length > 0) {
                allLayers.forEach((layer) => {
                    if (layer.get('title') === lyr) {
                        const source = layer.getSource();
                        const params = source.getParams();
                        var wmsUrl = source.getUrl();
                        getLayerExtent(wmsUrl, params.LAYERS, olMap);
                    }
                });
            }
        }
    };

    const handleDragStart = (index, e) => {
        setDraggedIndex(index);
    };

    const handleDragOver = (index, e) => {
        if (draggedIndex === null || draggedIndex === index) return;

        const updatedLayers = [...layersList];
        const draggedLayer = updatedLayers[draggedIndex];

        updatedLayers.splice(draggedIndex, 1);
        updatedLayers.splice(index, 0, draggedLayer);
        setLayersList(updatedLayers);

        setDraggedIndex(index);

        // Reorder layers on the map without removing any
        const baseLayer = olMap.getLayers().getArray()[0];
        olMap.getLayers().clear();
        olMap.addLayer(baseLayer);

        updatedLayers.forEach((layerName) => {
            const layerConfig = layersData.find((lyr) => lyr.layer === layerName);
            if (layerConfig) {
                const isLayerFound = selectedItems.includes(layerName);
                if (isLayerFound) {
                    ConfigWMSLayerToMap(olMap, layerConfig.url, layerConfig.workspace, layerConfig.layer);
                    const layer = getLayerByName(layerName);
                    layer.setVisible(true);

                } else {
                    ConfigWMSLayerToMap(olMap, layerConfig.url, layerConfig.workspace, layerConfig.layer);
                    const layer = getLayerByName(layerName);
                    layer.setVisible(false);
                }
            }
        });
    };

    const getLayerByName = (layerName) => {
        const layers = olMap.getLayers().getArray();
        for (let i = 0; i < layers.length; i++) {
            const layer = layers[i];
            if (layer.get('title') === layerName) {
                return layer;
            }
        }
        return null;
    };

    const handleCloseSideBar = () => {
        toggleComponent("default", olMap)
    }

    return (
        <div>
            <div id='layerSwitcherContainer' style={{ position: "relative" }}>
                <StyledMapControlButton title={title} id={title} className='p-1 mb-1'
                    onClick={handleLayerSwitcher}
                >
                    <i className="bi bi-layers" />
                </StyledMapControlButton>
            </div>

            <div id='layerSwitcherSidebarConatiner'>
                <Card className='layersList' style={{ fontFamily: fontFamily, borderColor: borderColor, backgroundColor: cardbodyColor }}>
                    <Card.Header className="pe-1" style={{ backgroundColor: backgroundColor, color: textColor }}>
                        <Stack direction='horizontal'>
                            <div className='mb-0'>
                                <i className="bi bi-layers me-2"></i>
                                Layer Switcher
                            </div>
                            <CloseButton onClick={handleCloseSideBar} id='popup-closer' className='ms-auto'>
                                <i className='bi bi-x'></i>
                            </CloseButton>
                        </Stack>
                    </Card.Header>
                    <Card.Body label="Layer switcher p-1"
                        style={{ position: 'relative', height: 'auto', minHeight: '100px', overflow: 'auto' }}>

                        <Accordion defaultActiveKey="0" className='layerlistAccord'>
<<<<<<< HEAD

=======
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
                            {layersList.map((lyr, index) => {
                                return (
                                    <Accordion.Item key={index} eventKey={index} className='p-0' >
                                        <Accordion.Header
                                            key={index}
                                            onDragStart={(e) => handleDragStart(index, e)}
                                            onDragOver={(e) => handleDragOver(index, e)}
                                            cancel=".no-drag"
                                            draggable
                                            className='p-0'
                                        >
                                            <Form.Check style={{ borderColor: borderColor }} className='no-drag'>
                                                <Form.Check.Input
                                                    type="checkbox"
                                                    name={lyr}
                                                    onChange={(event) => handleCheckboxChange(event, lyr)}
                                                    onClick={(e) => e.stopPropagation()}
                                                    checked={(selectedItems && selectedItems.includes(lyr)) || false}
                                                    className="me-2"
                                                    id={`checkbox- ${lyr}`}
                                                    value={lyr}
                                                    style={{
                                                        backgroundColor: selectedItems?.includes(lyr) ? backgroundColor : 'transparent',
                                                        color: textColor,
                                                        borderColor: borderColor
                                                    }}
                                                />
                                                <Form.Check.Label title={lyr} style={{ color: typoColor, textOverflow: 'ellipsis', width: '125px', whiteSpace: 'nowrap', overflow: 'hidden' }}>{lyr}</Form.Check.Label>
                                            </Form.Check>
                                        </Accordion.Header>
                                        <Accordion.Body className='px-1 py-2'>
                                            <div className='d-flex align-content-center align-items-center'>
                                                <StyledMapControlButton
                                                    className='me-3 py-1 px-2'
                                                    title='layer zoom extent'
                                                    id={lyr}
                                                    onClick={() => handleButtonClick(lyr)}
                                                >
                                                    <i className="bi bi-arrows-fullscreen"></i>
                                                </StyledMapControlButton>
                                                <Form.Range id="opacity-input"
                                                    min="0"
                                                    max="1"
                                                    step="0.01"
                                                    value={layerOpacities[lyr] || 1}
                                                    title='opacity'
                                                    onChange={(e) => handleOpacityChange(e, lyr)}
                                                    onClick={() => updateMap(lyr)}
                                                    className="me-2"
                                                    style={{
                                                        backgroundColor: 'transparent',
                                                        '--track-color': backgroundColor,
                                                        '--thumb-color': backgroundColor,
                                                    }}
                                                ></Form.Range>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                )
                            })}
                        </Accordion>
                    </Card.Body>
                </Card>
            </div>
        </div >
    )
}

export default LayerSwitcher