import React, { useContext, useEffect, useState, useRef } from 'react'
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import { Form, InputGroup, Row, Col, Table } from 'react-bootstrap';
import { CloseButton, StyledButton, StyledLoaderInner, StyledLoaderWraper, StyledPopover } from '../../../Reusable/StyledComponent';
import { useColor } from '../../../../Contexts/ColorContext';
import Popover from 'react-bootstrap/Popover';
import { useUtility } from '../../../../Contexts/UtilityContext';
import { toast } from 'react-toastify';
import { Typeahead } from 'react-bootstrap-typeahead';
import { attributeQueryByOption, getAttributeQueryValues } from '../../../../GeoServerUtils/attributeQuery';
import BottomTable from '../../../Reusable/BottomTable';
import './AttributeQuery.css';
<<<<<<< HEAD
import { S1412windLayer, S124NavWarningGroupLayer } from '../../../../appConfig';
import { useProductFilter } from '../../../../Contexts/ProductFilterContext';

function AttributeQuery() {

    const { getDataSetIdsForAttributeQuery, getQueryLayerUrl, getLayersFromLayerGroup } = useProductFilter();

=======
import { S1412windLayer } from '../../../../appConfig';

function AttributeQuery() {

>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
    const { olMap, getAllVisibleLayers, getTargetLayer, hightLightSelectedFeature, clearVectorSource } = useContext(OLMapContext);

    const { attributeQueryPanelVisible, updateAttributeQueryPanelVisible, attributeQuerySelectedLayer,
        updateAttributeQuerySelectedLayer, featureSearchResults, updateFeatureSearchResults, clearFeatureSearchResults,
        searchInputloading, updateSearchInputloading, typeaheadRef, updateSelectedAttributeQueryOption,
        selectedAttributeQueryOption, toggleComponent,
<<<<<<< HEAD
        updateCollapsedQueryResultPanel, updateAttributeQueryBottomTablePanelVisible, updateFeatureInfoRecords } = useUtility();
=======
        updateCollapsedQueryResultPanel, updateAttributeQueryBottomTablePanelVisible } = useUtility();
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f

    const { backgroundColor, borderColor, typoColor, textColor } = useColor();

    const [loading, setLoading] = useState();
    const [olMapLayers, SetOlMapLayers] = useState([]);
    const [targetUrl, setTargetUrl] = useState(null);
    const formSearchRef = useRef(null);

    const [headers, setHeaders] = useState([]);
    const [selectedFeatureData, setSelectedFeatureData] = useState([]);

<<<<<<< HEAD
    const [groupLayers, setGroupLayers] = useState([]);


=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
    useEffect(() => {
        if (olMap) {
            const mapContainer = document.getElementById('map-container');
            const attributeQueryTable = document.getElementById('attributeQueryTable');

            if (mapContainer && attributeQueryTable) {
                mapContainer.appendChild(attributeQueryTable);
            }
            const searchControl = document.getElementById('search-control');
            const attributeQueryButtonList = document.getElementById('attributeQueryButtonList');

            if (searchControl && attributeQueryButtonList) {
                attributeQueryButtonList.appendChild(searchControl);
            }
        }
    }, [olMap]);

<<<<<<< HEAD
    useEffect(() => {
        if (attributeQuerySelectedLayer !== '') {
            setTimeout(async () => {
                if (attributeQuerySelectedLayer === S124NavWarningGroupLayer) {
                    updateSearchInputloading(true);
                    const arributesData = await getDataSetIdsForAttributeQuery(attributeQuerySelectedLayer, olMap);
                    updateSearchInputloading(false);
                    if (arributesData.length > 0) {
                        updateFeatureSearchResults(arributesData);
                        const geoserverQueryLayerUrl = getQueryLayerUrl(attributeQuerySelectedLayer, olMap);
                        const Layers = await getLayersFromLayerGroup(geoserverQueryLayerUrl, attributeQuerySelectedLayer)
                        console.log(Layers)
                        setGroupLayers(Layers);
                    }
                    updateAttributeQueryPanelVisible(false);
                }
                else {
                    updateSearchInputloading(true);
                    const arributesData = await getAttributeQueryValues(targetUrl, attributeQuerySelectedLayer);
                    updateSearchInputloading(false);
                    if (arributesData.length > 0) {
                        updateFeatureSearchResults(arributesData);
                    }
                    updateAttributeQueryPanelVisible(false);
                }

=======

    useEffect(() => {
        if (attributeQuerySelectedLayer !== '') {
            setTimeout(async () => {
                updateSearchInputloading(true);
                const arributesData = await getAttributeQueryValues(targetUrl, attributeQuerySelectedLayer);
                updateSearchInputloading(false);
                if (arributesData.length > 0) {
                    updateFeatureSearchResults(arributesData);
                }
                updateAttributeQueryPanelVisible(false);
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
            }, 1000);
        }
    }, [attributeQuerySelectedLayer]);

    const handleComboBoxLayerSelectionChange = (event) => {

        const selectedLayer = event.target.value;

        if (selectedLayer === "select") {
            toast.warn('Please select a product.');
            updateAttributeQuerySelectedLayer('')
            clearFeatureSearchResults();
        } else {
            clear();
            const targetLayer = getTargetLayer(selectedLayer);
            if (targetLayer) {
                const selectedLayerName = targetLayer.get('title');
                updateAttributeQuerySelectedLayer(selectedLayerName);
                const wmsUrl = targetLayer.getSource().getUrl();
                if (wmsUrl !== null && wmsUrl !== undefined) {
                    setTargetUrl(wmsUrl);
                }
            } else {
                toast.warn('The selected layer is not visible.');
            }
        }
    }

    const handleAttributeQuery = () => {
        setSelectedFeatureData([]);
        clearFeatureSearchResults();
        setHeaders([]);
        toggleComponent('attributeQuery', olMap)
        SetOlMapLayers(getAllVisibleLayers());
        updateCollapsedQueryResultPanel(false);
        updateAttributeQueryBottomTablePanelVisible(false);
    }

    const handlePopoverClose = () => {
        updateFeatureSearchResults();
        updateAttributeQuerySelectedLayer('')
        updateCollapsedQueryResultPanel(false);
        updateAttributeQueryBottomTablePanelVisible(false);
        updateAttributeQueryPanelVisible(false);
    }

    const handleClear = () => {
        clear();
        updateCollapsedQueryResultPanel(false);
        updateAttributeQueryBottomTablePanelVisible(false);
    }

    const clear = () => {
        clearVectorSource();
        if (typeaheadRef.current) {
            typeaheadRef.current.clear();
        }
        updateSelectedAttributeQueryOption(null);
    }

    const handleSelect = async (selectedOptions) => {

        const lyrName = attributeQuerySelectedLayer;

        if (selectedOptions.length > 0) {
            const selectedOption = selectedOptions[0];
            updateSelectedAttributeQueryOption(selectedOption);
            clearVectorSource();
            setSelectedFeatureData([]);
<<<<<<< HEAD
            const data = await attributeQueryByOption(olMap, targetUrl, lyrName, selectedOption, hightLightSelectedFeature, groupLayers);
            if (data.length > 0 && attributeQuerySelectedLayer !== S124NavWarningGroupLayer) {
=======
            const data = await attributeQueryByOption(olMap, targetUrl, lyrName, selectedOption, hightLightSelectedFeature);
            if (data.length > 0) {
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                setSelectedFeatureData(data);
                const headings = Object.keys(data[0]);
                setHeaders(headings);
                updateCollapsedQueryResultPanel(true);
                updateAttributeQueryBottomTablePanelVisible(true);
            }
        }
    }

    const style = document.createElement('style');
    style.innerHTML = `
        .custom-typeahead .rbt-menu {
          width: auto !important;
        }
      `;
    document.head.appendChild(style);

    return (
        <>
            <div id="search-control" className='ms-2 mt-2 position-absolute top-0 start-0' style={{ width: 'auto' }}>
                <Row>
                    <Col sm={2} className='pe-0'>
                        <div>
                            <OverlayTrigger trigger="click" key="bottom" placement="bottom" className="w-25 position-absolute" show={attributeQueryPanelVisible} rootClose={true} overlay={
                                <StyledPopover style={{ width: '400px', height: 'auto' }}>
                                    <Popover.Header as="h6" className='d-flex justify-content-between align-items-center pe-2'
                                        style={{ color: textColor, backgroundColor: backgroundColor, borderColor: borderColor }}>
                                        <i className="bi bi-filter me-2" style={{ fontSize: '20px' }}></i>
                                        IHO-Products
                                        <CloseButton onClick={handlePopoverClose} className='ms-auto'>
                                            <i className='bi bi-x'></i>
                                        </CloseButton>
                                    </Popover.Header>
                                    <Popover.Body className='pb-1' style={{ position: 'relative' }}>
                                        {loading && (
                                            <StyledLoaderWraper>
                                                <StyledLoaderInner />
                                            </StyledLoaderWraper>
                                        )}
                                        <select className='form-select mb-2' value={attributeQuerySelectedLayer}
                                            onChange={handleComboBoxLayerSelectionChange} style={{ color: typoColor, borderColor: borderColor }}>
                                            <option value="select">Select a Product</option>
                                            {olMapLayers && olMapLayers.map((item, index) => (
                                                <option key={index} value={item}>
                                                    {item}
                                                </option>
                                            ))}
                                        </select>
                                    </Popover.Body>
                                </StyledPopover>
                            }>
                                <StyledButton title='Attribute query tool' id='attributeQueryToggleBtn'
                                    onClick={handleAttributeQuery} style={{ width: '42px', height: '54px' }}>
                                    <i className="bi bi-list"></i>
                                </StyledButton>
                            </OverlayTrigger >
                        </div>
                    </Col>
                    <Col sm={10} className='ps-1'>
                        <div>
                            {featureSearchResults && featureSearchResults.length > 0 &&
                                <Form ref={formSearchRef} className="w-100">
                                    <InputGroup className="rounded shadow"
                                        style={{ padding: '6px', backgroundColor: backgroundColor, color: textColor, border: `1px solid ${borderColor}` }}
                                        title={attributeQuerySelectedLayer != S1412windLayer ? `Product Id, Feature Name, Chart Number, Country or Location` : 'Id'}>

                                        <Typeahead
                                            id="searchBox"
                                            labelKey="combinedLabel"
                                            onChange={handleSelect}
<<<<<<< HEAD
                                            placeholder={
                                                attributeQuerySelectedLayer === S124NavWarningGroupLayer
                                                    ? 'Data Set'
                                                    : attributeQuerySelectedLayer !== S1412windLayer
                                                        ? 'Product Id, Feature Name, Chart Number, Country or Location'
                                                        : 'Id'
                                            }

=======
                                            placeholder={attributeQuerySelectedLayer != S1412windLayer ? `Product Id, Feature Name, Chart Number, Country or Location` : 'Id'}
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                                            options={featureSearchResults}
                                            ref={typeaheadRef}
                                            className="custom-typeahead"
                                            style={{ backgroundColor: 'transparent', color: typoColor, borderColor: borderColor }}
                                        />

                                        <InputGroup.Text style={{ backgroundColor: backgroundColor, color: textColor, borderColor: borderColor }}>
                                            {searchInputloading === true ? (
                                                <StyledLoaderInner style={{ top: 'unset', left: 'unset', width: '25px', height: '25px', borderWidth: '5px' }} />
                                            ) : selectedAttributeQueryOption ? (
                                                <i className="bi bi-x-lg clear-icon" onClick={handleClear}></i>
                                            ) : (
                                                <i className="bi bi-search"></i>
                                            )}
                                        </InputGroup.Text>
                                    </InputGroup>
<<<<<<< HEAD
                                    {selectedAttributeQueryOption !== null ? <p>Please select the feature to view details</p> : <></>}
=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                                </Form>
                            }
                        </div>
                    </Col>
                </Row>
            </div>
            <div id='attributeQueryTable'>
                {selectedFeatureData.length > 0 && <BottomTable type="attributeQuery">
                    <Table responsive striped className="featureTable_attr mb-0 fixed_header" size='sm'>
                        <thead>
                            <tr>
                                {headers.map((header) => (
                                    header !== 'layername' && header !== 'time' && (
                                        <th key={header}>{header}</th>
                                    )
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {selectedFeatureData.length > 0 && Object.entries(selectedFeatureData[0]).map(([key, value]) => (
                                    key !== 'layername' && key !== 'time' && (
                                        <td key={key}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
                                    )
                                ))}
                            </tr>
                        </tbody>
                    </Table>
                </BottomTable>}
            </div>
        </>
    )
}

export default AttributeQuery;