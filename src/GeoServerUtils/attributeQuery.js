import axios from 'axios';
import { S124NavWarningGroupLayer, S1412windLayer, nodeServerUrl } from '../appConfig';
import { toast } from 'react-toastify';

export const getAttributeQueryValues = async (targetUrl, lyrName) => {

    const productslist = [];

    if (targetUrl !== null && lyrName !== '') {

        const baseUrl = `${targetUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${lyrName}&outputFormat=application/json`;
        const queryParams = { param: baseUrl };

        try {
            const resultData = await axios.get(`${nodeServerUrl}/getAttributeQueryValues`, { params: queryParams });
            const features = resultData.data.features;

            if (features.length > 0) {

                if (features[0]?.properties && features[0]?.properties['producercode']) {

                    features.forEach((feature) => {
                        const producercode = feature.properties['producercode'];
                        const productName = feature.properties['product'];
                        const featurename = feature.properties['featurename'];
                        const chartnumber = feature.properties['chartnumber'];

                        if (producercode !== null && !productslist.some(item => item.chartnumber === chartnumber)) {
                            const combinedLabel = `${productName}, ${featurename}, ${chartnumber}, ${producercode}`;
                            productslist.push({ productName, featurename, chartnumber, producercode, combinedLabel });
                        }
                    });

                } else {

                    features.forEach((feature) => {
                        const Id = feature.properties['ID'];
                        if (Id !== null) {
                            const combinedLabel = `${Id}`;
                            productslist.push({ Id, combinedLabel });
                        }
                    });
                }
            } else {
                toast.warn(`No records found for this layer ${lyrName}`)
            }

        } catch (error) {
            toast.warn(`Error fetching data for this layer ${lyrName}`)
        }

        return productslist;
    }
};


export const attributeQueryByOption = async (olMap, targetUrl, lyrName, selectedOption, hightLightSelectedFeature, groupLayers) => {
    let featureData = [];
    var baseUrl;

    if (targetUrl) {

        if (lyrName !== S1412windLayer && lyrName !== S124NavWarningGroupLayer) {
            const { chartnumber, featurename, producercode, productName } = selectedOption;

            const propertyName = 'producercode,country_code,producttype,featurename,chartnumber,compilationscale,polygon';
            const outputFormat = 'application/json';
            const cqlFilter = `chartnumber='${chartnumber}' AND product='${productName}' AND producercode='${producercode}' AND featurename='${featurename}'`;
            baseUrl = `${targetUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${lyrName}&outputFormat=${outputFormat}&cql_filter=${encodeURIComponent(cqlFilter)}&propertyName=${propertyName}`;

        } else {
            const { Id } = selectedOption;
            baseUrl = `${targetUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${lyrName}&outputFormat=application/json&cql_filter=ID='${Id}'`;
        }

        const queryParams = { param: baseUrl };


        if (lyrName !== S124NavWarningGroupLayer) {
            try {
                const resultData = await axios.get(`${nodeServerUrl}/getAttributeQueryValues`, { params: queryParams });

                if (resultData?.data?.features?.length > 0) {
                    const targetOverlay = olMap.getOverlays().getArray()[0];
                    if (targetOverlay) {
                        targetOverlay.setPosition(undefined);
                    }
                    hightLightSelectedFeature(olMap, resultData.data);
                    featureData.push(resultData.data.features[0].properties);

                } else {
                    toast.warn('No features found for the selected option.');
                }

            } catch (error) {
                toast.warn('Error fetching data using attrubute query option.');
            }
        }
        else {

            let axiosRequests = [];
            const outputFormat = 'application/json';
            const cqlFilter = `dataset_file_identifier='${selectedOption}'`;

            if (groupLayers.length > 0) {
                groupLayers.forEach((layer) => {
                    const baseUrl = `${targetUrl}?service=WFS&version=1.1.0&request=GetFeature&typename=${layer.layerName}&outputFormat=${outputFormat}&cql_filter=${encodeURIComponent(cqlFilter)}`;
                    const queryParams = { param: baseUrl };
                    axiosRequests.push(
                        axios.get(`${nodeServerUrl}/getAttributeQueryValues`, { params: queryParams })
                            .then(response => {
                                const features = response.data;
                                if (features && features?.features) {
                                    const targetOverlay = olMap.getOverlays().getArray()[0];
                                    if (targetOverlay) {
                                        targetOverlay.setPosition(undefined);
                                    }

                                    if (features?.features[0]?.geometry != null) {
                                        hightLightSelectedFeature(olMap, features);
                                        featureData.push(features.features[0].properties);
                                    }
                                }
                            })
                            .catch(error => {
                                console.error(error);
                            })
                    );
                });
            }
            try {
                await Promise.all(axiosRequests);
            } catch (error) {
                console.error('Error in processing multiple axios requests:', error);
            }
        }

    } else {
        toast.warn(`Layer '${lyrName}' not found.`);
    }
    return featureData;
};

