import React, { createContext, useContext, useState } from 'react';
import ImageWMS from 'ol/source/ImageWMS.js';
import ImageLayer from 'ol/layer/Image.js';
import { toast } from 'react-toastify';
<<<<<<< HEAD
import axios from 'axios';
import { nodeServerUrl } from '../appConfig';

=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f

export const ProductFilterContext = createContext();

export const useProductFilter = () => {
    return useContext(ProductFilterContext);
};

export const ProductFilterProvider = ({ children }) => {

    const [selectedMapLayer, setSelectedMapLayer] = useState('select');

    const updateSelectedMapLayer = (layer) => {
        setSelectedMapLayer(layer)
    }

    const [productTypeFlag, setProductTypeFlag] = useState(true);

    const updateProductTypeFlag = (isValue) => {
        setProductTypeFlag(isValue)
    }
    const [mapLayers, setMapLayers] = useState([]);

    const updateMapLayers = (allVisibleLayers) => {
        setMapLayers((prevList) => {
            const uniqueTitles = [...new Set([...prevList, ...allVisibleLayers])];
            return uniqueTitles;
        });
    }
    const [agencyCodeList, setAgencyCodeList] = useState([]);

    const updateAgencyCodeList = (list) => {
        setAgencyCodeList(list);
    }

    const [selectedAgencyCode, setSelectedAgencyCode] = useState('select');

    const updateSelectedAgencyCode = (isValue) => {
        setSelectedAgencyCode(isValue);
    }

    const [countryList, setCountryList] = useState([]);

    const updateCountryList = (list) => {
        setCountryList(list);
    }

    const [selectedCountry, setSelectedCountry] = useState('select');

    const updateSelectedCountry = (country) => {
        setSelectedCountry(country);
    }

    const [productTypes, setProductTypes] = useState([]);

    const updateProductTypes = (list) => {
        setProductTypes(list);
    }
    const [selectedProductTypes, setSelectedProductTypes] = useState([]);

    const updateSelectedProductTypes = (isValue) => {
        setSelectedProductTypes(isValue);
    }

    const [cqlFilterString, setCqlFilterString] = useState('include');

    const updateCqlFilterString = (isValue) => {
        setCqlFilterString(isValue)
    }

    const [isLoading, setIsLoading] = useState(false);

    const updateIsLoading = (isLoading) => {
        setIsLoading(isLoading)
    }

    const [bands, setbands] = useState([
        { band: '1', value: 'Overview', selected: true },
        { band: '2', value: 'General', selected: true },
        { band: '3', value: 'Coastal', selected: true },
        { band: '4', value: 'Approach', selected: true },
        { band: '5', value: 'Harbor', selected: true },
        { band: '6', value: 'Berthing', selected: true },
    ]);

    const activeUsageBandsCheckBox = () => {
        setbands(prevBands =>
            prevBands.map(band => ({
                ...band,
                selected: true,
            }))
        );
    };

    const updateBands = (isbands) => {
        setbands(isbands)
    }

    const [selectedCalenderDate, setSelectedCalenderDate] = useState(new Date());

    const updateSelectedCalenderDate = (newDate) => {
        setSelectedCalenderDate(newDate);
    }

    const [lineButtonActive, setLineButtonActive] = useState(false);
    const [polygonButtonActive, setPolygonButtonActive] = useState(false);
    const [pointButtonActive, setPointButtonActive] = useState(false);
    const [rtzButtonActive, setRtzButtonActive] = useState(false);

    const [lineButtonVisible, setlineButtonVisible] = useState(false);
    const [polygonButtonVisible, setPolygonButtonVisible] = useState(false);
    const [pointButtonVisible, setPointButtonVisible] = useState(false);
    const [rtzButtonVisible, setRtzButtonVisible] = useState(false);
    const [calenderBtnVisible, setCalenderBtnVisible] = useState(false);
    const [calenderSelectedInfoSucess, setCalenderSelectedInfoSucess] = useState(false);
    const [showCalendarDialog, setShowCalendarDialog] = useState(false);

    const toggleGeometryButtons = () => {
        setLineButtonActive(false);
        setPolygonButtonActive(false);
        setPointButtonActive(false);
        setRtzButtonActive(false);
    }

    const [flag, setFlag] = useState(false);

    const unableBtns = (lyrName) => {
        if (lyrName === 'S-101') {
            setlineButtonVisible(false);
            setPolygonButtonVisible(false);
            setPointButtonVisible(false);
            setRtzButtonVisible(false);
            setCalenderBtnVisible(false);
        } else {
            setCalenderBtnVisible(true);
            setlineButtonVisible(false);
            setPolygonButtonVisible(false);
            setPointButtonVisible(false);
            setRtzButtonVisible(false);
        }
    }

    const clearSomeFields = () => {
        setSelectedAgencyCode('select');
        setSelectedCountry('select');
        setProductTypes([]);
        setSelectedProductTypes([]);
        setAgencyCodeList([]);
        setCountryList([]);
    }

    const [enableGeomertyContainer, SetEnableGeomertyContainer] = useState(false);
    const [showGeometryClearDialog, setShowGeometryClearDialog] = useState(false);

    const enableGeomertyButtonsOnCountrySelection = (value) => {
        if (value === 'select') {
            setlineButtonVisible(false);
            setPolygonButtonVisible(false);
            setPointButtonVisible(false);
            setRtzButtonVisible(false);
        }
        else {
            setlineButtonVisible(true);
            setPolygonButtonVisible(true);
            setPointButtonVisible(true);
            setRtzButtonVisible(true);
            setCalenderBtnVisible(false);
<<<<<<< HEAD

=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
        }
    }

    const deactiveGeometryBtns = () => {
        setLineButtonActive(false);
        setPolygonButtonActive(false);
        setPointButtonActive(false);
        setRtzButtonActive(false);
    }

    const [featureData, setFeatureData] = useState([]);

    const updateFeatureData = (data, layerName) => {

        setFeatureData((prevFeatureData) => {
            const existingIndex = prevFeatureData.findIndex(item => item.layerName === layerName);

            if (existingIndex !== -1) {
                const updatedFeatureData = [...prevFeatureData];
                updatedFeatureData[existingIndex] = {
                    ...updatedFeatureData[existingIndex],
                    data: [...updatedFeatureData[existingIndex].data, ...data],
                };
                return updatedFeatureData;
            } else {
                return [
                    ...prevFeatureData,
                    {
                        layerName: layerName,
                        data: data,
                    },
                ];
            }
        });
    };

    const clearFeatureData = () => {
        setFeatureData([]);
    }

    const [headers, setHeaders] = useState([]);

    const updateHeader = (data) => {
        setHeaders(data)
    }

    const [checkedItems, setCheckedItems] = useState([]);

    const toggleCheckedItem = (itemId) => {

        setCheckedItems((prevItems) => {
            if (prevItems.includes(itemId)) {
                return prevItems.filter((checkedItem) => checkedItem !== itemId);
            } else {
                return [...prevItems, itemId];
            }
        });

    };

    const removeItem = (itemToRemove) => {
        setCheckedItems((prevItems) => prevItems.filter((item) => item !== itemToRemove));
    };

    const getQueryLayerUrl = (lyrName, olMap) => {
        let layerUrl;
        if (olMap) {
            const layersList = olMap.getLayers().getArray();
<<<<<<< HEAD
=======

>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
            const targetLayer = layersList.find(lyr =>
                lyr instanceof ImageLayer &&
                lyr.getSource() instanceof ImageWMS &&
                lyrName === lyr.get('title') &&
                lyr.getVisible() === true
            );

            if (targetLayer) {
                layerUrl = targetLayer.getSource().getUrl();
                if (layerUrl !== null && layerUrl !== undefined) {
                    return layerUrl;
                }
            } else {
                toast.warn('Target layer not found or is not visible.');
            }
        }
        return layerUrl;
    }

    const makeInitialState = () => {
        updateSelectedMapLayer('select');
        setSelectedCountry('select');
        setSelectedAgencyCode('select');
        setCountryList([]);
        setProductTypes([]);
        setSelectedProductTypes([]);
        setAgencyCodeList([]);
        deactiveGeometryBtns();
        clearFeatureData();
        enableGeomertyButtonsOnCountrySelection('select');
        setlineButtonVisible(false);
        setPolygonButtonVisible(false);
        setPointButtonVisible(false);
        setRtzButtonVisible(false);
        setCalenderBtnVisible(false);
    }

<<<<<<< HEAD
    async function getLayersFromLayerGroup(geoserverUrl, selectedMapLayer) {

        const url = new URL(geoserverUrl);
        const baseUrl = `${url.protocol}//${url.hostname}:${url.port}`;
        const parts = geoserverUrl.split('/');
        const workspace = parts[4];
        const layerGroupName = selectedMapLayer;

        const dynamicUrl = `${baseUrl}/geoserver/rest/workspaces/${workspace}/layergroups/${layerGroupName}.json`;
        const queryParams = { param: dynamicUrl };

        try {
            const response = await axios.get(`${nodeServerUrl}/getLayerOfLayerGroup`, {
                params: queryParams
            });

            if (response) {
                const data = response.data;
                const layers = data.layerGroup.publishables.published.map(layer => ({
                    layerName: (layer.name).split(':')[1],
                }));

                return layers;
            }

        } catch (error) {
            console.error('Error:', error.message);
            return [];
        }
    }

    const getS124NavWarnPublicationDates = async (selectedMapLayer, olMap) => {

        const layerName = selectedMapLayer;
        const geoserverQueryLayerUrl = getQueryLayerUrl(layerName, olMap);
        const groupLayers = await getLayersFromLayerGroup(geoserverQueryLayerUrl, selectedMapLayer)
        const propertyName = 'publication_date';
        const outputFormat = 'application/json';
        let publicationDateSet = new Set();
        let axiosRequests = [];

        if (groupLayers.length > 0) {
            groupLayers.forEach((layer) => {
                const baseUrl = `${geoserverQueryLayerUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${layer.layerName}&outputFormat=${outputFormat}&propertyName=${propertyName}`;
                const queryParams = { param: baseUrl };
                axiosRequests.push(
                    axios.get(`${nodeServerUrl}/getWarnings`, { params: queryParams })
                        .then(response => {
                            const features = response.data;
                            if (features && features.features) {
                                features.features.forEach(feature => {
                                    const publication_date = feature.properties.publication_date;
                                    if (publication_date !== '') {
                                        publicationDateSet.add(publication_date);
                                    }
                                });
                            } else {
                                toast.warn(`There are no publication date available in GeoServer`);
                            }
                        })
                        .catch(error => {
                            toast.warn(`Fetching error for publication date from GeoServer for layer ${layer.layerName}`);
                            console.error(error);
                        })
                );
            });

            await Promise.all(axiosRequests);

            const publicationDatesArr = Array.from(publicationDateSet);

            return publicationDatesArr;
        }
    };


    const getS124NavigationalWarningTypes = async (selectedMapLayer, olMap) => {

        const layerName = selectedMapLayer;
        const geoserverQueryLayerUrl = getQueryLayerUrl(layerName, olMap);
        const groupLayers = await getLayersFromLayerGroup(geoserverQueryLayerUrl, selectedMapLayer)
        const propertyName = 'warning_type';
        const outputFormat = 'application/json';
        let warningTypeSet = new Set();
        let axiosRequests = [];

        if (groupLayers.length > 0) {
            groupLayers.forEach((layer) => {
                const baseUrl = `${geoserverQueryLayerUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${layer.layerName}&outputFormat=${outputFormat}&propertyName=${propertyName}`;
                const queryParams = { param: baseUrl };
                axiosRequests.push(
                    axios.get(`${nodeServerUrl}/getWarnings`, { params: queryParams })
                        .then(response => {
                            const features = response.data;

                            if (features && features.features) {
                                features.features.forEach(feature => {
                                    const warning_type = feature.properties.warning_type;
                                    if (warning_type !== null && warning_type !== undefined && warning_type !== '') {
                                        warningTypeSet.add(warning_type);
                                    }
                                });
                            } else {
                                toast.warn(`There are no warning type available in GeoServer`);
                            }
                        })
                        .catch(error => {
                            toast.warn(`Fetching error for warning type from GeoServer for layer ${layer.layerName}`);
                            console.error(error);
                        })
                );
            });

            await Promise.all(axiosRequests);

            const warningTypeArr = Array.from(warningTypeSet);

            return warningTypeArr;
        }
    };

    const getDataSetIdsForAttributeQuery = async (selectedMapLayer, olMap) => {

        const layerName = selectedMapLayer;
        const geoserverQueryLayerUrl = getQueryLayerUrl(layerName, olMap);
        const groupLayers = await getLayersFromLayerGroup(geoserverQueryLayerUrl, selectedMapLayer)
        const propertyName = 'dataset_file_identifier';
        const outputFormat = 'application/json';
        let dataset_file_identifierSet = new Set();
        let axiosRequests = [];

        if (groupLayers.length > 0) {
            groupLayers.forEach((layer) => {
                const baseUrl = `${geoserverQueryLayerUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${layer.layerName}&outputFormat=${outputFormat}&propertyName=${propertyName}`;
                const queryParams = { param: baseUrl };
                axiosRequests.push(
                    axios.get(`${nodeServerUrl}/getWarnings`, { params: queryParams })
                        .then(response => {
                            const features = response.data;

                            if (features && features.features) {
                                features.features.forEach(feature => {
                                    const dataset_file_identifier = feature.properties.dataset_file_identifier;
                                    if (dataset_file_identifier !== null && dataset_file_identifier !== undefined && dataset_file_identifier !== '') {
                                        dataset_file_identifierSet.add(dataset_file_identifier);
                                    }
                                });
                            } else {
                                toast.warn(`There are no warning type available in GeoServer`);
                            }
                        })
                        .catch(error => {
                            toast.warn(`Fetching error for warning type from GeoServer for layer ${layer.layerName}`);
                            console.error(error);
                        })
                );
            });

            await Promise.all(axiosRequests);

            const dataset_file_identifierArr = Array.from(dataset_file_identifierSet);

            return dataset_file_identifierArr;
        }
    };


    const getS124NavigationalGeometryTypes = async (selectedMapLayer, warningType, olMap) => {
        const layerName = selectedMapLayer;
        const geoserverQueryLayerUrl = getQueryLayerUrl(layerName, olMap);
        const groupLayers = await getLayersFromLayerGroup(geoserverQueryLayerUrl, selectedMapLayer);
        const propertyName = 'geometry_type';
        const outputFormat = 'application/json';
        const cqlFilter = `warning_type='${warningType}'`;
        let geometryTypeSet = new Set();
        let axiosRequests = [];

        if (groupLayers && groupLayers.length > 0) {
            groupLayers.forEach((layer) => {
                const baseUrl = `${geoserverQueryLayerUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${layer.layerName}&outputFormat=${outputFormat}&cql_filter=${encodeURIComponent(cqlFilter)}&propertyName=${propertyName}`;
                const queryParams = { param: baseUrl };

                axiosRequests.push(
                    axios.get(`${nodeServerUrl}/getWarnings`, { params: queryParams })
                        .then(response => {
                            const features = response.data;

                            if (features && features.features) {
                                features.features.forEach(feature => {
                                    const geometry_type = feature.properties.geometry_type;
                                    if (geometry_type !== null && geometry_type !== undefined && geometry_type !== '') {
                                        geometryTypeSet.add(geometry_type);
                                    }
                                });
                            } else {
                                toast.warn(`There are no geometry type available in GeoServer`);
                            }
                        })
                        .catch(error => {
                            toast.warn(`Fetching error for geometry type from GeoServer for layer ${layer.layerName}`);
                            console.error(error);
                        })
                );
            });

            await Promise.all(axiosRequests);

            const geometryTypeArr = Array.from(geometryTypeSet);

            return geometryTypeArr;
        } else {
            toast.warn(`No layers found for the selected map layer: ${selectedMapLayer}`);
            return [];
        }
    };

    const getS124NavWarnDataSetIDs = async (selectedMapLayer, warningType, geometryType, olMap) => {
        const layerName = selectedMapLayer;
        const geoserverQueryLayerUrl = getQueryLayerUrl(layerName, olMap);
        const groupLayers = await getLayersFromLayerGroup(geoserverQueryLayerUrl, selectedMapLayer);
        const propertyName = 'dataset_file_identifier';
        const outputFormat = 'application/json';
        const cqlFilter = `(warning_type='${warningType}') AND geometry_type='${geometryType}'`;

        let datasetFileIdentifierSet = new Set();
        let axiosRequests = [];

        if (groupLayers && groupLayers.length > 0) {
            groupLayers.forEach((layer) => {
                const baseUrl = `${geoserverQueryLayerUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${layer.layerName}&outputFormat=${outputFormat}&cql_filter=${encodeURIComponent(cqlFilter)}&propertyName=${propertyName}`;
                const queryParams = { param: baseUrl };
                axiosRequests.push(
                    axios.get(`${nodeServerUrl}/getWarnings`, { params: queryParams })
                        .then(response => {
                            const features = response.data;
                            if (features && features.features) {
                                features.features.forEach(feature => {
                                    const dataset_file_identifier = feature.properties.dataset_file_identifier;
                                    if (dataset_file_identifier !== null && dataset_file_identifier !== undefined && dataset_file_identifier !== '') {
                                        datasetFileIdentifierSet.add(dataset_file_identifier);
                                    }
                                });
                            } else {
                                toast.warn(`There are no dataset file identifier available in GeoServer`);
                            }
                        })
                        .catch(error => {
                            toast.warn(`Fetching error for dataset file identifier from GeoServer for layer ${layer.layerName}`);
                            console.error(error);
                        })
                );
            });

            await Promise.all(axiosRequests);

            const datasetFileIdentifierArr = Array.from(datasetFileIdentifierSet);
            return datasetFileIdentifierArr;
        } else {
            toast.warn(`No layers found for the selected map layer: ${selectedMapLayer}`);
            return [];
        }
    };
=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
    return (
        <ProductFilterContext.Provider value={{
            selectedMapLayer, updateSelectedMapLayer,
            checkedItems, toggleCheckedItem, removeItem, setCheckedItems,
            updateProductTypeFlag, productTypeFlag, updateMapLayers, mapLayers,
            updateAgencyCodeList, agencyCodeList, updateSelectedAgencyCode, selectedAgencyCode,
            updateCountryList, countryList, updateSelectedCountry, selectedCountry, updateProductTypes, productTypes,
            updateSelectedProductTypes, selectedProductTypes, updateCqlFilterString, cqlFilterString,
            updateIsLoading, isLoading, bands, activeUsageBandsCheckBox, updateBands, setbands, getQueryLayerUrl,
            selectedCalenderDate, updateSelectedCalenderDate, lineButtonVisible, setlineButtonVisible,
            polygonButtonVisible, setPolygonButtonVisible, pointButtonVisible, setPointButtonVisible,
            rtzButtonVisible, setRtzButtonVisible, calenderBtnVisible, setCalenderBtnVisible,
            calenderSelectedInfoSucess, setCalenderSelectedInfoSucess, showCalendarDialog, setShowCalendarDialog,
            lineButtonActive, setLineButtonActive, polygonButtonActive, setPolygonButtonActive,
            pointButtonActive, setPointButtonActive, rtzButtonActive, setRtzButtonActive, toggleGeometryButtons,
            flag, setFlag, unableBtns, clearSomeFields, enableGeomertyContainer, SetEnableGeomertyContainer,
            enableGeomertyButtonsOnCountrySelection, deactiveGeometryBtns, updateFeatureData, featureData, clearFeatureData,
<<<<<<< HEAD
            headers, updateHeader, makeInitialState, showGeometryClearDialog, setShowGeometryClearDialog,
            getLayersFromLayerGroup, getS124NavigationalWarningTypes, getS124NavWarnDataSetIDs, getS124NavigationalGeometryTypes,
            getS124NavWarnPublicationDates, getDataSetIdsForAttributeQuery
=======
            headers, updateHeader, makeInitialState, showGeometryClearDialog, setShowGeometryClearDialog
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
        }}>
            {children}
        </ProductFilterContext.Provider>
    );
};
