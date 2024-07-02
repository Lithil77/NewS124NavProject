import React, { useEffect, useState, useContext } from 'react'
import { useUtility } from '../../../../Contexts/UtilityContext';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import { CloseButton, StyledMapControlButton, StyledReactPaginateComp } from '../../../Reusable/StyledComponent';
import { Table, Card, Stack, Container } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';
import ImageWMS from "ol/source/ImageWMS.js";
import ImageLayer from "ol/layer/Image.js";
import { S124NavWarningGroupLayer, nodeServerUrl } from '../../../../appConfig';
import axios from 'axios';
import { useColor } from '../../../../Contexts/ColorContext';
import './FeatureInfo.css';

function FeatureInfo() {

    const [title] = useState('FeatureInfo');
    const { olMap, clearVectorSource, stopDrawAction, renderHighlightedFeatures, overlayRef, updateOverLayVisibility ,attributeoverlayRef,updateAttrOverLayVisibility} = useContext(OLMapContext);
    const { backgroundColor, textColor, borderColor, fontFamily } = useColor();

    const sidebarHeight = window.innerHeight;

    const { featureInfoFlag, updateFeatureInfoFlag, registerFeatureInfoClickHandler,
        unregisterFeatureInfoClickHandlers, toggleComponent, updateFeatureInfoRecords, featureInfoRecords,
        attributeQueryPanelVisible, s124NavWarningsSideBarPanel, attributeQuerySelectedLayer, updateS124NavWarningDataSetFileIdentifier ,s124geometrytype} = useUtility();

    const [featuresGeometry, setFeaturesGeometry] = useState([]);
    const [layerName, setLayerName] = useState(null);

    const [columns, setColumns] = useState([]);
    const recordsPerPage = 1;
    const [currentPage, setCurrentPage] = useState(1);
    const lastIndex = currentPage * recordsPerPage;
    const firstIndex = lastIndex - recordsPerPage;
    const [records, setRecords] = useState([]);
    const numberOfPages = Math.ceil(featureInfoRecords.length / recordsPerPage);
    const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

    useEffect(() => {

        if (olMap) {
            var featureInfoButtonList = document.getElementById('featureInfoButtonList');
            const featureInfoContainer = document.getElementById('featureInfoContainer');
            if (featureInfoButtonList && featureInfoContainer != null) {
                if (!featureInfoButtonList.contains(featureInfoContainer)) {
                    featureInfoButtonList.append(featureInfoContainer);
                }
            }

            var featureInfoSidebar = document.getElementById('featureInfoSidebar');
            const featureInfoSidebarConatiner = document.getElementById('featureInfoSidebarConatiner');
            if (featureInfoSidebar != null && featureInfoSidebarConatiner != null) {
                featureInfoSidebar.append(featureInfoSidebarConatiner);
            }

            const mapContainer = document.getElementById('map-container');
            const productFilterable = document.getElementById('productFilterable');

            if (mapContainer && productFilterable) {
                mapContainer.appendChild(productFilterable);
            }
        }
    }, [olMap]);

    useEffect(() => {
        setCurrentPage(1);

        if (featureInfoRecords.length > 0) {
            setRecords([]);
            setColumns(Object.keys(featureInfoRecords[0]));
            var data = featureInfoRecords.slice(firstIndex, lastIndex);
            setRecords(data);
        } else {
            setColumns([]);
        }
    }, [featureInfoRecords]);

    const handleFeatureInfo = () => {
        toggleComponent(title, olMap);
        setFeaturesGeometry([]);
        updateFeatureInfoRecords([]);
        setColumns([]);
        setLayerName(null);
        setRecords([]);

        let featureInfoBtn = document.getElementById("featureInfoBtn");

        if (featureInfoBtn) {
            featureInfoBtn.classList.add('active');
        }

        if (featureInfoFlag === false) {
            olMap.getTargetElement().style.cursor = 'pointer';
            registerFeatureInfoClickHandler('click', handleMapClick, olMap);
            updateFeatureInfoFlag(true);

        } else {
            if (featureInfoBtn) {
                featureInfoBtn.classList.remove('active');
                olMap.getTargetElement().style.cursor = 'default';
                unregisterFeatureInfoClickHandlers(olMap);
                updateFeatureInfoFlag(false);
            }
        }
    }
    useEffect(() => {
         if (s124NavWarningsSideBarPanel) {
            
                registerFeatureInfoClickHandler('click', handleMapClick, olMap);
            
           
        }

    }, [s124NavWarningsSideBarPanel,s124geometrytype])


    useEffect(() => {
        if (attributeQueryPanelVisible) {
               registerFeatureInfoClickHandler('click', handleMapClick, olMap);
       }

   }, [attributeQueryPanelVisible,updateAttrOverLayVisibility])

   
    // const handleMapClick = (event) => {
        
    //     if (s124NavWarningsSideBarPanel) {
    //         const coordinate = event.coordinate;
    //         console.log(coordinate);
    //         updateOverLayVisibility(true);
    //         if (overlayRef.current) {
    //             console.log("cmng");
    //             overlayRef.current.setPosition(coordinate);
    //         }
    //         getfeatureDate(event);
    // }
    //     else {
    //         getfeatureDate(event);
    //     }

      
    // };
    
    const handleMapClick = (event) => {
        const coordinate = event.coordinate;
    
        if (s124NavWarningsSideBarPanel) {
            updateOverLayVisibility(true);
            if (overlayRef.current) {
                overlayRef.current.setPosition(coordinate);
            }
            getfeatureDate(event);
        } else if (attributeQueryPanelVisible) {
            updateOverLayVisibility(true);
            if (attributeoverlayRef.current) {
                attributeoverlayRef.current.setPosition(coordinate);
            }
            getfeatureDate(event);
        } else {
            getfeatureDate(event);
        }
    };
    
    

  

    const getfeatureDate = async (event) => {
        clearVectorSource();
        stopDrawAction();
        setRecords([]);
        updateFeatureInfoRecords([]);
        var allfeaturesList = [];
        var layers = olMap.getLayers().getArray();

        layers.forEach(async function (lyr) {

            if (lyr instanceof ImageLayer && lyr.getSource() instanceof ImageWMS) {
                if (lyr.getVisible() === true) {
                    var viewResolution = (
                        event.target.getView().getResolution()
                    );
                    var featureUrl = lyr
                        .getSource()
                        .getFeatureInfoUrl(event.coordinate, viewResolution, "EPSG:3857", {
                            INFO_FORMAT: "application/json",
                            FEATURE_COUNT: 20
                        });

                    if (featureUrl) {

                        const queryParams = { param: featureUrl };

                        try {
                            const res = await axios.get(`${nodeServerUrl}/getFeatureInfo`, { params: queryParams });
                            if (res.data.features) {
                                let lyrTitle = lyr.get('title');

                                setFeaturesGeometry(res.data.features);

                                for (let index = 0; index < res.data.features.length; index++) {

                                    let properties = res.data.features[index].properties;

                                    if (attributeQuerySelectedLayer !== S124NavWarningGroupLayer) {
                                        properties.layerName = lyrTitle;
                                    }
                                    else {
                                       // updateS124NavWarningDataSetFileIdentifier(res.data.features[index].dataset_file_identifier);
                                    }

                                    allfeaturesList.push(properties);
                                }
                            }

                            if (allfeaturesList.length > 0) {

                                res.data.features.forEach((feature, index) => {
                                    updateS124NavWarningDataSetFileIdentifier(res.data.features[index]?.properties.dataset_file_identifier);
                                });

                                const vectorLayer = renderHighlightedFeatures(res.data);
                                var extent = vectorLayer.getSource().getExtent();
                                olMap.getView().fit(extent, {
                                    padding: [180, 180, 250, 180], minResolution: 10,
                                    duration: 1000
                                });
                                olMap.addLayer(vectorLayer);
                                updateFeatureInfoRecords(allfeaturesList);
                            }
                            else {
                                updateFeatureInfoRecords([]);
                            }

                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            }
        });

        setTimeout(() => {

            if (allfeaturesList.length < 0) {
                setLayerName(allfeaturesList[0].layerName);;
            }
        }, 500)
    }

    const renderPageNumbers = () => {
        const visiblePages = 4;
        const middleIndex = Math.floor(visiblePages / 2);

        if (numberOfPages <= visiblePages) {
            return pageNumbers.map((n) => (
                <Pagination.Item key={n} active={currentPage === n} onClick={() => changeCurrentPage(n)}>
                    {n}
                </Pagination.Item>
            ));
        } else {
            let pagesToDisplay = [];

            if (currentPage <= middleIndex) {
                pagesToDisplay = [...pageNumbers.slice(0, visiblePages), 'ellipsis', numberOfPages];
            } else if (currentPage > numberOfPages - middleIndex) {
                pagesToDisplay = [1, 'ellipsis', ...pageNumbers.slice(-visiblePages)];
            } else {
                pagesToDisplay = [
                    1,
                    'ellipsis',
                    ...pageNumbers.slice(currentPage - middleIndex, currentPage + middleIndex - 1),
                    'ellipsis',
                    numberOfPages
                ];
            }

            return pagesToDisplay.map((page, index) => (
                <React.Fragment key={index}>
                    {page === 'ellipsis' ? (
                        <Pagination.Ellipsis />
                    ) : (
                        <Pagination.Item active={currentPage === page} onClick={() => changeCurrentPage(page)}>
                            {page}
                        </Pagination.Item>
                    )}
                </React.Fragment>
            ));
        }
    };


    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= numberOfPages) {
            setCurrentPage(newPage);

            const startIndex = (newPage - 1) * recordsPerPage;
            const endIndex = startIndex + recordsPerPage;
            const newRecords = [];

            for (let i = startIndex; i < endIndex && i < featureInfoRecords.length; i++) {
                newRecords.push(featureInfoRecords[i]);
            }

            setRecords(newRecords);
            const newColumns = Object.keys(newRecords[0] || {});
            setColumns(newColumns);

            if (newRecords.length > 0) {
                const updatedLayerName = newRecords[0].layerName;
                setLayerName(updatedLayerName);
            }

            if (featuresGeometry.length > 0) {
                const data = featuresGeometry[newPage - 1];
                if (data) {
                    clearVectorSource(olMap);
                    const vectorLayer = renderHighlightedFeatures(data);
                    var extent = vectorLayer.getSource().getExtent();
                    olMap.getView().fit(extent, {
                        padding: [180, 180, 250, 180], minResolution: 10,
                        duration: 1000
                    });
                    olMap.addLayer(vectorLayer);
                }
            }
        }
    };

    const prePage = () => {
        handlePageChange(currentPage - 1);
    };

    const changeCurrentPage = (page) => {
        handlePageChange(page);
    };

    const nextPage = () => {
        handlePageChange(currentPage + 1);
    };

    const handleCloseSideBar = () => {
        toggleComponent("default", olMap)
    }

    return (
        <>
            <div id='featureInfoContainer' style={{ position: "relative" }}>
                <StyledMapControlButton title={title} id={title} className='p-1 mb-1'
                    onClick={(e) => { handleFeatureInfo(e) }}
                >
                    <i className="bi bi-info-circle" />
                </StyledMapControlButton>
            </div>
            <div id='featureInfoSidebarConatiner'>
                {records && records.length > 0 ? (<Card id='popup-content' style={{ borderColor: borderColor, minHeight: '800px' }}>
                    <Card.Header className="pe-1" style={{ backgroundColor: backgroundColor, color: textColor }}>
                        <Stack direction="horizontal">
                            <i className="bi bi-info-circle me-2"></i>
                            {records.length > 0 && <h6 className="mb-0">{layerName !== null && layerName}</h6>}
                            <CloseButton onClick={handleCloseSideBar} id="popup-closer" className="ms-auto">
                                <i className="bi bi-x"></i>
                            </CloseButton>
                        </Stack>
                    </Card.Header>
                    <Card.Body className="p-0" style={{ position: 'relative', maxHeight: `calc(${sidebarHeight}px - 105px)`, height: 'auto', minHeight: '100px', overflow: 'auto' }}>
                        <Table responsive className="table table-striped featureinfoTable">
                            <tbody>
                                {
                                    records && records.map((item, index) => (
                                        columns.map((column, columnIndex) => (
                                            <tr key={columnIndex}>
                                                <th style={{ width: '56%' }}>{column}</th>
                                                <td style={{ width: '44%' }}>
                                                    {item[column] &&
                                                        (typeof item[column] === "object" ? (
                                                            Object.entries(item[column]).map(([key, value]) => (
                                                                <div key={key}>
                                                                    <strong>{key}:</strong> {value}
                                                                </div>
                                                            ))
                                                        ) : (
                                                            item[column]
                                                        ))}
                                                </td>
                                            </tr>
                                        ))
                                    ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer className="px-1" style={{ borderColor: borderColor, fontFamily: fontFamily }}>
                        <Container className='px-0'>
                            <nav style={{ overflow: 'auto' }}>
                                <StyledReactPaginateComp className='mb-0 justify-content-center'>
                                    <Pagination.Prev onClick={prePage} />
                                    {renderPageNumbers()}
                                    <Pagination.Next onClick={nextPage} />
                                </StyledReactPaginateComp>
                            </nav>
                        </Container>
                    </Card.Footer>
                </Card>) : (
                    <Card>
                        <Card.Header className="pe-1" style={{ backgroundColor: backgroundColor, color: textColor }}>
                            <Stack direction='horizontal'>
                                <div className='mb-0'>
                                    <i className="bi bi-info-circle me-2"></i>
                                    Feature information</div>
                                <CloseButton onClick={handleCloseSideBar} id='popup-closer' className='ms-auto'>
                                    <i className='bi bi-x'></i>
                                </CloseButton>
                            </Stack>
                        </Card.Header>
                        <Card.Body>
                            <h6>Please Select feature on the map to see the information.</h6>
                        </Card.Body>
                    </Card>
                )}
            </div>
        </>
    )
}

export default FeatureInfo;