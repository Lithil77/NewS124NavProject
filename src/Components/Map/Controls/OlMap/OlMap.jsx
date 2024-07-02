import React, { useRef, useEffect, useContext, useState } from 'react';
import 'ol/ol.css';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { OLMapContext } from '../../../../Contexts/OlMapContext.jsx';
import HumburgerMenu from '../../../utils/HumburgerMenu.jsx';
import './OlMap.css';
import { S124NavWarningGroupLayer, nodeServerUrl } from '../../../../appConfig.js';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Col, Container, Row } from 'react-bootstrap';
import { useUtility } from '../../../../Contexts/UtilityContext.jsx';
import { useParams } from "react-router-dom";
import { useColor } from '../../../../Contexts/ColorContext.jsx';
import { mapLayers } from '../../../../Utils/layersDataConfig.js';
import { id, isBuilder, olMapHeight } from '../../../../Utils/AppDetails.jsx';
import Overlay from 'ol/Overlay';
import { CloseButton, StyledButton } from '../../../Reusable/StyledComponent.jsx';

function OlMap() {

    const { projectId: routeProjectId } = useParams();

    const selectedProjectId = routeProjectId === undefined ? id : routeProjectId;

    const { olMap, mapHeight, ConfigWMSLayerToMap, overlayRef, overlayVisible, updateOverLayVisibility, updateMapOverlay, attributeoverlayRef,updateAttributeMapOverlay,attroverlayVisible} = useContext(OLMapContext);

    const { featureInfoSideBarPanel, layerSwitcherSideBarPanel,
        productFilterSideBarPanel, s124NavWarningsSideBarPanel, updateFeatureInfoSideBarPanel,
        attributeQueryPanelVisible, updates124NavWarningsSideBarPanel, updates124activekey, attributeQuerySelectedLayer,s124geometrytype} = useUtility();

    const { fetchAndCreateProperty, getPropertyBasedOnProjectId } = useColor();

    const mapRef = useRef(null);
    const [layersData, setLayersData] = useState(null);
    useEffect(() => {
        if (olMap) {
            var view = new View({
                center: [0, 0],
                zoom: 1,
            });
            var lyr = new TileLayer({
                title: 'OSM',
                type: 'base',
                visible: true,
                source: new OSM(),
            });

            olMap.setView(view);
            olMap.addLayer(lyr);
            if (mapRef.current) {
                olMap.setTarget(mapRef.current);
            }
        }

    }, [olMap]);


    useEffect(() => {
        let mapOverlay = null;

        if (s124NavWarningsSideBarPanel) {
            
            if (s124NavWarningsSideBarPanel ||!s124geometrytype) {
              
                 mapOverlay = new Overlay({
                    element: overlayRef.current,
                    positioning: 'bottom-center',
                    offset: [0, -20],
                    autoPan: true,
                });
                updateMapOverlay(mapOverlay);
                overlayRef.current = mapOverlay;
                olMap.addOverlay(mapOverlay);
        }
    
}
    return () => {
        if (mapOverlay) {
            updateMapOverlay(null); 
            overlayRef.current = null; 
        }
    };

    }, [s124NavWarningsSideBarPanel,s124geometrytype]);

    
    
    useEffect(() => {
        let attrmapOverlay = null;

            if (attributeQueryPanelVisible &&attributeQuerySelectedLayer === S124NavWarningGroupLayer) {
             
                attrmapOverlay = new Overlay({
                    element: attributeoverlayRef.current,
                    positioning: 'bottom-center',
                    offset: [0, -20],
                    autoPan: true,
                });
                updateAttributeMapOverlay(attrmapOverlay);
                attributeoverlayRef.current = attrmapOverlay;
                olMap.addOverlay(attrmapOverlay);
               
        }
    

    return () => {
        if (attrmapOverlay) {
            updateAttributeMapOverlay(null); 
            overlayRef.current = null; 
        }
    };

    }, [attributeQueryPanelVisible,attributeQuerySelectedLayer]);

    


    useEffect(() => {

        const fetchData = async () => {
            try {
                setLayersData(null);

                if (isBuilder) {
                    const response = await axios.get(`${nodeServerUrl}/layers/${selectedProjectId}`);
                    if (response) {
                        setLayersData(response.data);
                    }
                }
                else {
                    if (mapLayers.length > 0) {
                        setLayersData(mapLayers);
                    }
                }
            } catch (error) {
                toast.warn('Error fetching layer data:', error);
            }
        };

        fetchData();
        setTimeout(async () => {
            if (isBuilder) {
                const propertices = await getPropertyBasedOnProjectId(selectedProjectId)
                if (propertices.length == 0) {
                    fetchAndCreateProperty(selectedProjectId);
                }
            }
        }, 200);

    }, [selectedProjectId]);

    useEffect(() => {
        if (layersData) {
            layersData.map((layerData) => {
                ConfigWMSLayerToMap(olMap, layerData.url, layerData.workspace, layerData.layer);
            });
        }
    }, [layersData]);

    const handlePopoverClose = () => {
        updateOverLayVisibility(false);
        updateFeatureInfoSideBarPanel(false);
    }

    const handleFeatureInfoIcon = () => {
      
         
        updateFeatureInfoSideBarPanel(true);
        updates124activekey('createNavWarn');
        updates124NavWarningsSideBarPanel(false);
    
    }

    const handleEditIcon = () => {
       
        updateFeatureInfoSideBarPanel(false);
        updates124activekey('createNavWarn');
        updates124NavWarningsSideBarPanel(true);
       
        
    }

    return (
        <Container fluid className='main-content px-0'>
            <div ref={mapRef} id="map-container" style={{ height: `${mapHeight ? `${mapHeight}px` : `${olMapHeight}px`}` }} className={`map-container ${featureInfoSideBarPanel || layerSwitcherSideBarPanel || s124NavWarningsSideBarPanel || productFilterSideBarPanel ? 'active' : ''}`} >
                <HumburgerMenu></HumburgerMenu>
            </div>
            <div ref={overlayRef} className="overlay" style={{ display: overlayVisible ? 'block' : 'none' }}>
                <span>
                    <CloseButton onClick={handlePopoverClose} className='ms-auto'>
                        <i className='bi bi-x'></i>
                    </CloseButton>
                </span>
                <Row className='mt-2 text-center' >
                    <Col sm={6}>
                        <StyledButton title='Feature information' onClick={handleFeatureInfoIcon}> <i className='bi bi-info'></i></StyledButton>
                    </Col>
                    <Col sm={6}>
                        <StyledButton title='Update feature' onClick={handleEditIcon}><i className='bi bi-pencil'></i></StyledButton>
                    </Col>
                </Row>
            </div>
            <div ref={attributeoverlayRef} className="overlay" style={{ display: overlayVisible ? 'block' : 'none' }}>
                <span>
                    <CloseButton onClick={handlePopoverClose} className='ms-auto'>
                        <i className='bi bi-x'></i>
                    </CloseButton>
                </span>
                <Row className='mt-2 text-center' >
                    <Col sm={6}>
                        <StyledButton title='Feature information' onClick={handleFeatureInfoIcon}> <i className='bi bi-info'></i></StyledButton>
                    </Col>
                    <Col sm={6}>
                        <StyledButton title='Update feature' onClick={handleEditIcon}><i className='bi bi-pencil'></i></StyledButton>
                    </Col>
                </Row>
            </div>
            <div id='featureInfoSidebar' className={`sideBar ${featureInfoSideBarPanel ? 'active' : ''}`} style={{ display: featureInfoSideBarPanel ? 'block' : 'none' }} ></div>
            <div id='layerSwitcherInfoSidebar' className={`sideBar ${layerSwitcherSideBarPanel ? 'active' : ''}`} style={{ display: layerSwitcherSideBarPanel ? 'block' : 'none' }}></div>
            <div id='productFilterInfoSidebar' className={`sideBar ${productFilterSideBarPanel ? 'active' : ''}`} style={{ display: productFilterSideBarPanel ? 'block' : 'none' }}></div>
            <div id='s124NavWarningsInfoSidebar' className={`sideBar ${s124NavWarningsSideBarPanel ? 'active' : ''}`} style={{ display: s124NavWarningsSideBarPanel ? 'block' : 'none' }}></div>
        </Container>
    )
}

export default OlMap;