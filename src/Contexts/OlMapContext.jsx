<<<<<<< HEAD
import React, { useEffect, useState, createContext, useRef } from 'react';
=======
import React, { useEffect, useState, createContext } from 'react';
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
import 'ol/ol.css';
import Map from 'ol/Map';
import { defaults as defaultInteractions, Pointer as PointerInteraction } from 'ol/interaction';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style.js';
import ImageWMS from "ol/source/ImageWMS.js";
import ImageLayer from "ol/layer/Image.js";
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Image as ImageSource } from 'ol/source';
import Draw from 'ol/interaction/Draw';
import GeoJSON from 'ol/format/GeoJSON.js';
import { useColor } from './ColorContext';

var parser = new GeoJSON();

export const OLMapContext = createContext(undefined);

export const OLMapProvider = ({ children }) => {

    const { fillColor, strokeColor } = useColor();

    const [olMap, setOlMap] = useState(null);

    const [mapHeight, setMapHeight] = useState();

<<<<<<< HEAD
    const [hamburgerMenuOpen, setHumburgerMenuOpen] = useState(true);
=======
<<<<<<< HEAD
    const [hamburgerMenuOpen, setHumburgerMenuOpen] = useState(true);
=======
    const [hamburgerMenuOpen, setHumburgerMenuOpen] = useState(false);
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f

    const [previousExtend, setPreviousExtend] = useState([]);
    const [nextExtend, setNextExtend] = useState([]);

    const [islayerAdded, setLayerAdded] = useState(false);

    const updateIsLayerAdded = (value) => {
        setLayerAdded(value);
    }

<<<<<<< HEAD
    const overlayRef = useRef(null);
    const attributeoverlayRef=useRef(null);

    const [mapOverlay, setMapOverlay] = useState();

    const [attributemapOverlay, setAttributeMapOverlay] = useState();


    const updateMapOverlay = (value) => {
        setMapOverlay(value);
    }

    const updateAttributeMapOverlay = (value) => {
        setAttributeMapOverlay(value);
    }
    const [overlayVisible, setOverlayVisible] = useState(false);

    const updateOverLayVisibility = (value) => {
        setOverlayVisible(value)
    }

    const [attroverlayVisible, setAttrOverlayVisible] = useState(false);

    const updateAttrOverLayVisibility = (value) => {
        setAttrOverlayVisible(value)
    }

=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
    useEffect(() => {
        const olMap = new Map({
            controls: [],
            interactions: defaultInteractions({ doubleClickZoom: false }).extend([
                new PointerInteraction({
                    handleDoubleClickEvent: (event) => {
                        event.preventDefault();
                    },
                }),
            ]),
        });
        setOlMap(olMap);
    }, []);

    const updatePreviousExtend = () => {
        if (olMap) {
            const extent = olMap.getView().calculateExtent(olMap.getSize());
            setPreviousExtend((prevExtent) => [
                ...prevExtent,
                extent,
            ]);
        }
    }

    const updateNextExtend = () => {
        if (olMap) {
            const extent = olMap.getView().calculateExtent(olMap.getSize())
            setNextExtend((prevExtent) => [
                ...prevExtent,
                extent,
            ]);
        }
    }

    const toggleHumburgerMenu = (value) => {
        setHumburgerMenuOpen(value)
    }

    const updateMapHeight = (value) => {
        setMapHeight(value);
    }

    const stopDrawAction = () => {
        if (olMap) {
            const interactions = olMap.getInteractions();
            interactions.forEach(interaction => {
                if (interaction instanceof Draw) {
                    if (interaction.getActive()) {
                        interaction.finishDrawing();
                        interaction.setActive(false);
                        olMap.removeInteraction(interaction);
                    }
                }
            });
        }
    };

    const clearVectorSource = () => {

        if (olMap) {
            var layers = olMap.getLayers().getArray();

            for (let index = 0; index < 2; index++) {
                layers.map((lyr) => {
                    if (lyr instanceof VectorLayer && lyr.getSource() instanceof VectorSource) {
                        if (lyr.get('title') == 'Highlight-selected-Features') {
                            lyr.getSource().clear();
                            olMap.removeLayer(lyr);
                            olMap.render();
                        } else {
                            lyr.getSource().clear();
                            olMap.removeLayer(lyr);
                            olMap.render();
                        }
                    }
                })
            }
        }
    }

    const clearImageSource = (olMap) => {

        if (olMap) {
            var layers = olMap.getLayers().getArray();
            layers.map((lyr) => {
                if (lyr instanceof ImageLayer && lyr.getSource() instanceof ImageSource) {
                    olMap.removeLayer(lyr);
                    olMap.render();
                }
            })
        }
    }

    const renderHighlightedFeatures = (data) => {
        const vectorLayer = createStylingVectorLayerWithStyles();
        if (data) {
            const features = parser.readFeatures(data);
            vectorLayer.getSource().addFeatures(features);
        }
        return vectorLayer;
    };


<<<<<<< HEAD
    const renderWarningHighlightedFeatures = (data) => {
        const vectorLayer = createStylingVectorLayerWithStyles();

        if (data && data.length > 0) {
            const geojsonData = {
                type: "FeatureCollection",
                features: data.map(warning => {
                    let coordinates = [];
                    const coordsArray = warning.coordinates.trim().split(" ");

                    if (warning.geometryType === "Point") {
                        coordinates = coordsArray.map(coord => parseFloat(coord));
                        if (coordinates.length !== 2) {
                            console.error(`Invalid Point coordinates for warning ${warning.datasetFileIdentifier}`);
                            return null;
                        }
                    } else if (warning.geometryType === "Line" || warning.geometryType === "LineString") {
                        for (let i = 0; i < coordsArray.length; i += 2) {
                            const lon = parseFloat(coordsArray[i]);
                            const lat = parseFloat(coordsArray[i + 1]);
                            if (isNaN(lon) || isNaN(lat)) {
                                console.error(`Invalid LineString coordinates for warning ${warning.datasetFileIdentifier}`);
                                return null;
                            }
                            coordinates.push([lon, lat]);
                        }
                    } else if (warning.geometryType === "Polygon") {
                        const tempCoords = [];
                        for (let i = 0; i < coordsArray.length; i += 2) {
                            const lon = parseFloat(coordsArray[i]);
                            const lat = parseFloat(coordsArray[i + 1]);
                            if (isNaN(lon) || isNaN(lat)) {
                                console.error(`Invalid Polygon coordinates for warning ${warning.datasetFileIdentifier}`);
                                return null;
                            }
                            tempCoords.push([lon, lat]);
                        }
                        if (tempCoords.length < 4 || !tempCoords[0].every((val, index) => val === tempCoords[tempCoords.length - 1][index])) {
                            console.error(`Invalid Polygon closure for warning ${warning.datasetFileIdentifier}`);
                            return null;
                        }
                        coordinates = [tempCoords];
                    } else {
                        console.error(`Unsupported geometry type ${warning.geometryType} for warning ${warning.datasetFileIdentifier}`);
                        return null;
                    }

                    return {
                        type: "Feature",
                        geometry: {
                            type: warning.geometryType === "Line" ? "LineString" : warning.geometryType,
                            coordinates: coordinates
                        },
                        properties: {
                            datasetFileIdentifier: warning.datasetFileIdentifier,
                            datasetTitle: warning.datasetTitle,
                            information: warning.information
                        }
                    };
                }).filter(feature => feature !== null) // Filter out any invalid features
            };

            const features = parser.readFeatures(geojsonData, {
                featureProjection: olMap.getView().getProjection()
            });

            vectorLayer.getSource().addFeatures(features);
        }

        return vectorLayer;
    };

=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
    const hexToRgba = (hex, alpha) => {
        const hexColor = hex.replace('#', '');
        const r = parseInt(hexColor.substring(0, 2), 16);
        const g = parseInt(hexColor.substring(2, 4), 16);
        const b = parseInt(hexColor.substring(4, 6), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    };

    const featureInformationStyles = new Style({
        fill: new Fill({
            color: hexToRgba(fillColor, 0.5),
        }),
        stroke: new Stroke({
            color: hexToRgba(strokeColor, 0.7),
            width: 3,
        }),
        image: new CircleStyle({
            radius: 5,
            stroke: new Stroke({
                color: hexToRgba(strokeColor, 0.7),
            }),
            fill: new Fill({
                color: hexToRgba(fillColor, 0.5),
            }),
        }),
    });

    const createStylingVectorLayerWithStyles = () => {
        const vectorLayer = new VectorLayer({
            source: new VectorSource(),
            title: "Highlight-selected-Features",
            style: featureInformationStyles,
        });
        return vectorLayer;
    };

    const ConfigWMSLayerToMap = (olMap, wmsUrl, workspace, layerName) => {
        const wmsSource = new ImageWMS({
            url: wmsUrl,
            params: {
                LAYERS: `${workspace}:${layerName}`,
                TILED: false,
            },
            serverType: "geoserver",
        });

        const wmsLayer = new ImageLayer({
            title: layerName,
            visible: true,
            source: wmsSource,
        });

        olMap.addLayer(wmsLayer);
    };

    const hightLightSelectedFeature = (olMap, _data) => {

        if (_data && olMap) {
            const vectorLayer = new VectorLayer({
                title: 'Highlight-Vector-Layer',
                source: new VectorSource(),
                style: featureInformationStyles,
            });
            var features = parser.readFeatures(_data, {
                dataProjection: 'EPSG:4326',
                featureProjection: 'EPSG:3857'
            });

            vectorLayer.getSource().addFeatures(features);
            var extent = vectorLayer.getSource().getExtent();
            olMap.getView().fit(extent, {
                padding: [250, 250, 350, 250], minResolution: 10,
                duration: 1000
            });
            olMap.addLayer(vectorLayer);
        }
    }

    const getAllVisibleLayers = () => {
        if (olMap) {
            const allLayers = olMap.getLayers().getArray();
            const visibleLayerTitles = [];
            for (let i = 0; i < allLayers.length; i++) {
                const layer = allLayers[i];
                if (layer instanceof ImageLayer && layer.getSource() instanceof ImageWMS) {
                    if (layer.getVisible() === true) {
                        visibleLayerTitles.push(layer.get('title'));
                    }
                }
            }
            return visibleLayerTitles;
        }
    };

    const getTargetLayer = (selectedLayer) => {
        const layersList = olMap.getLayers().getArray();
        const targetLayer = layersList.find((lyr) =>
            lyr instanceof ImageLayer &&
            lyr.getSource() instanceof ImageWMS &&
            selectedLayer === lyr.get('title') &&
            lyr.getVisible()
        );
        return targetLayer;
    }

    return (
        <>
            <OLMapContext.Provider value={{
                olMap, updateMapHeight, mapHeight,
                hamburgerMenuOpen, toggleHumburgerMenu,
                updatePreviousExtend, updateNextExtend, previousExtend, nextExtend,
                hightLightSelectedFeature, clearImageSource, clearVectorSource,
<<<<<<< HEAD
                renderHighlightedFeatures, stopDrawAction, ConfigWMSLayerToMap, renderWarningHighlightedFeatures,
                updateIsLayerAdded, islayerAdded, getAllVisibleLayers, getTargetLayer, overlayRef,attributeoverlayRef,
                updateOverLayVisibility, overlayVisible, updateMapOverlay, mapOverlay,updateAttributeMapOverlay,attributemapOverlay,updateAttrOverLayVisibility,attroverlayVisible
=======
                renderHighlightedFeatures, stopDrawAction, ConfigWMSLayerToMap,
                updateIsLayerAdded, islayerAdded, getAllVisibleLayers, getTargetLayer,
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
            }}>
                {children}
            </OLMapContext.Provider>
        </>
    )
};

