import React, { useContext } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useColor } from '../../../../../Contexts/ColorContext'
import { useProductFilter } from '../../../../../Contexts/ProductFilterContext';
import { OLMapContext } from '../../../../../Contexts/OlMapContext';
import axios from 'axios';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import { S124NavWarningGroupLayer, S1412windLayer, nodeServerUrl } from '../../../../../appConfig';
=======
<<<<<<< HEAD
import { S124NavWarningGroupLayer, S1412windLayer, nodeServerUrl } from '../../../../../appConfig';
=======
import { S1412windLayer, nodeServerUrl } from '../../../../../appConfig';
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
import { findImageLayerByTitle } from '../../../../../OpenLayersUtils/OpenLayers';

function Product() {

    const { olMap, stopDrawAction } = useContext(OLMapContext);
    const { borderColor, typoColor } = useColor();

    const { selectedMapLayer, updateSelectedMapLayer, featureData,
        updateAgencyCodeList, mapLayers, updateIsLoading,
        getQueryLayerUrl, setShowCalendarDialog, updateCqlFilterString,
        toggleGeometryButtons, setCalenderSelectedInfoSucess, flag,
        setFlag, unableBtns, clearSomeFields, setShowGeometryClearDialog } = useProductFilter();

    const getAgencyCodes = async (layerName) => {

        let agencyCodes = [];
        const geoserverQueryLayerUrl = getQueryLayerUrl(layerName, olMap);
        const propertyName = 'producercode';
        const outputFormat = 'application/json';
        const baseUrl = `${geoserverQueryLayerUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${layerName}&outputFormat=${outputFormat}&propertyName=${propertyName}`;
        const queryParams = { param: baseUrl };

        try {
            const fetchedAgencyCodes = await axios.get(`${nodeServerUrl}/getProducerCodes`, { params: queryParams });
            const features = fetchedAgencyCodes.data;

            if (features && features.features) {
                const producerCodes = new Set(
                    features.features
                        .map(feature => feature.properties.producercode)
                        .filter(code => code !== null && code !== undefined && code !== '')
                );
                agencyCodes.push(...producerCodes);
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
            } else {
                if (layerName !== S1412windLayer && layerName !== S124NavWarningGroupLayer) {
                    toast.warn(`There are no agency codes available in code geoserver for this ${layerName}`);
                }
<<<<<<< HEAD
=======
=======

                console.log('agencyCodes: ', agencyCodes)
            } else {
                toast.warn(`There are no agency codes available in code geoserver for this ${layerName}`);
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
            }
        } catch (error) {
            toast.warn(`Fetching error for agency codes from geoserver for this ${layerName}`);
        }

        return agencyCodes;
    };

<<<<<<< HEAD
=======
<<<<<<< HEAD
=======

>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
    const handleChangeProduct = async (event) => {
        if (event.target.value !== 'select') {
            setShowCalendarDialog(false);
            const selectedLayer = event.target.value;
            var foundLayer = findImageLayerByTitle(olMap, selectedLayer);

            if (foundLayer) {
                var isVisible = foundLayer.getVisible();
                if (!isVisible) {
                    toast.warn(`Layer preview is not available.`);
                    return;
                }
            }

            if (flag && featureData.length > 0) {
                handleshowGeometryClearDialog();
                setFlag(false);
            }

            setCalenderSelectedInfoSucess(false);
            toggleGeometryButtons();
            unableBtns(selectedLayer);
            stopDrawAction();
            clearSomeFields();
            updateCqlFilterString('include');
            updateSelectedMapLayer(selectedLayer);

            updateIsLoading(true);
            const agencyCodes = await getAgencyCodes(selectedLayer);
            updateIsLoading(false);

            if (agencyCodes.length == 0) {
<<<<<<< HEAD
                if (selectedLayer !== S1412windLayer && selectedLayer !== S124NavWarningGroupLayer) {
                    toast.warn(`No agency codes are available for ${selectedMapLayer}`);
=======
<<<<<<< HEAD
                if (selectedLayer !== S1412windLayer && selectedLayer !== S124NavWarningGroupLayer) {
                    toast.warn(`No agency codes are available for ${selectedMapLayer}`);
=======
                if (selectedLayer !== S1412windLayer) {
                    toast.warn(`No agency codes are available for ${lyrName}`);
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
                }
            }
            else {
                updateAgencyCodeList([]);
                updateAgencyCodeList(agencyCodes);
            }
            updateIsLoading(false);
            setFlag(true);

        } else {
            toast.warn('Please select a product.');
        }
    }

    const handleshowGeometryClearDialog = () => {
        setShowGeometryClearDialog(true)
    }

    return (
        <Form>
            <Row className='mx-0 mt-3'>
                <Col sm={12} className='px-0'>
                    <Form.Group controlId='productSelection'>
                        <Form.Select as='select' value={selectedMapLayer}
                            onChange={handleChangeProduct} style={{ color: typoColor, borderColor }}>
                            <option value='select'>Select a Product</option>
                            {mapLayers && mapLayers.map((item, index) => <option key={index} value={item}>{item}</option>)}
                        </Form.Select>
                    </Form.Group>
                </Col>
            </Row>
        </Form>
    )
}

export default Product;