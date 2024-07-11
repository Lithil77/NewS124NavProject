import React, { useState, useEffect, useRef, useContext } from 'react';
import {
    Button, ButtonGroup, Card, Form,
    ListGroup, ListGroupItem, FloatingLabel,
    FormGroup, FormLabel, Row, Col, CardHeader, CardBody, CardFooter, Stack
} from 'react-bootstrap';
import axios from 'axios';
import yaml from 'js-yaml';
import { toast } from 'react-toastify';
import { StyledButton } from '../../../Reusable/StyledComponent';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import { initializeDrawAndVectorLayers } from './Utils';
import { S124NavigationalwarningsAPI } from '../../../../appConfig';
import { useUtility } from '../../../../Contexts/UtilityContext';
import CustomConfirmModel from '../../../Reusable/CustomConfirmModel';


const StepperForm = () => {

    const { s124NavWarningDataSetFileIdentifier, updates124GeometryType,s124listvalue } = useUtility();
    const [currentStep, setCurrentStep] = useState(1);
    const totalSteps = 3;
    const step1Ref = useRef(null);
    const step2Ref = useRef(null);
    const step3Ref = useRef(null);
    const [yamlContent, setYamlContent] = useState('');
    const [jsonObject, setJsonObject] = useState(null);
    const fileInputRef = useRef(null);
    const [errors, setErrors] = useState({});
    const [lineButtonActive, setLineButtonActive] = useState(false);
    const [polygonButtonActive, setPolygonButtonActive] = useState(false);
    const [pointButtonActive, setPointButtonActive] = useState(false);
    const { olMap, stopDrawAction} = useContext(OLMapContext);
    const [showModal, setShowModal] = useState(false);
    const [updatedJsonObject, setUpdatedJsonObject] = useState(null);

    const initialFormData = {
        datasetFileIdentifier: '',
        datasetTitle: '',
        datasetReferenceDate: '',
        datasetLanguage: '',
        datasetAbstract: '',
        datasetTopicCategory: '',
        datasetPurpose: '',
        updateNumber: '',
        navwarnpreambleId: '',
        agencyResponsibleForProduction: '',
        countryName: '',
        nameOfSeries: '',
        warningIdentifier: '',
        warningNumber: '',
        warningType: 'Local Navigational Warning',
        year: '',
        generalAreaLanguage: '',
        generalAreaName: '',
        locationNameLanguage: '',
        locationName: '',
        chartNumber: '',
        editionDate: '',
        language: '',
        publicationAffected: '',
        titleLanguage: '',
        title: '',
        publicationDate: '',
        cancellationDate: '',
        navwarnTypeGeneral: 'Aids to Navigation Changes',
        intService: '',
        header: '',
        navwarnpartId: '',
        dateStart: '',
        informationLanguage: '',
        information: '',
        navwarnTypeDetails: '',
        geometryId: '',
        srsName: '',
        srsDimension: '',
        coordinates: '',
        geometryType: ''
    };

    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => {
        if (s124NavWarningDataSetFileIdentifier) {
            getFormData();
        }
    }, [s124NavWarningDataSetFileIdentifier]);

    const getFormData = () => {

        const dataset_file_identifier = s124NavWarningDataSetFileIdentifier;

        axios.get(`${S124NavigationalwarningsAPI}/S-124/${dataset_file_identifier}`)
            .then(response => {
                console.log(response.data);
                if (response.data === 'No Active Warning Found With The ID') {
                    toast.warning(response.data);
                } else {
                    const overLayObj = response.data;
                    setFormData((prevData) => ({
                        ...prevData,
                        ...overLayObj["S124:Dataset"],
                        ...overLayObj["S124:NAVWARNPreamble"],
                        ...overLayObj["S124:NAVWARNPart"],
                        ...overLayObj["S124:geometry"]
                    }));
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    }

    const optionValues = [
        'Aids to Navigation Changes',
        'Aquaculture and Fishing Installations',
        'Drifting Hazardsa',
        'ECDIS Operating Anomalies including Official Data Issues',
        'Other Hazards',
        'Health Advisories',
        'Ice Information',
        'In-Force Bulletin',
        'Dangerous Natural Phenomena',
        'Newly Discovered Dangers',
        'Offshore Infrastructure',
        'Piracy or Robbery',
        'Communication or Broadcast Service Change',
        'Routeing Change',
        'Scientific Instruments Change',
        'Security Requirement Change',
        'Special Operations',
        'Towing Operations',
        'Works',
        'Rig List',
    ];

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({
            ...formData,
            [id]: value
        });
        setErrors({
            ...errors,
            [id]: ''  // Clear error message when user starts typing
        });

    };

    const validateForm = (step) => {
        let formIsValid = true;
        let errors = {};

        const allStepsValidations = {
            1: {
                'datasetFileIdentifier': /^[\w._-]+\.XML$/,
                'datasetTitle': /^.+$/,
                'datasetReferenceDate': /^\d{4}-\d{2}-\d{2}$/,
                'datasetLanguage': /^[a-z]{3}$/,
                'datasetAbstract': /^.+$/,
                'datasetTopicCategory': /^.+$/,
                'datasetPurpose': /^.+$/,
                'updateNumber': /^\d+$/
            },
            2: {
                'navwarnpreambleId': /^NW\.CA\.CCG\.[A-Z]\.\d{4}\.\d{2}\.\d{1}$/,
                'agencyResponsibleForProduction': /^.+$/,
                'countryName': /^.+$/,
                'nameOfSeries': /^.$/,
                'warningIdentifier': /^urn:mrn:NW\.CA\.CCG\.[A-Z]\.\d{4}\.\d{2}$/,
                'warningNumber': /^\d+$/,
                'warningType': /^.+$/,
                'year': /^\d{4}$/,
                'generalAreaLanguage': /^[a-z]{3}$/,
                'generalAreaName': /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/,
                'locationNameLanguage': /^[a-z]{3}$/,
                'locationName':/^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/,
                'chartNumber': /^\d+$/,
                'editionDate': /^\d{4}-\d{2}-\d{2}$/,
                'language': /^[a-z]{3}$/,
                'publicationAffected': /^.+$/,
                'titleLanguage': /^[a-z]{3}$/,
                'title': /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/,
                'publicationDate': /^\d{4}-\d{2}-\d{2}T/,
                //'cancellationDate': null,
                'navwarnTypeGeneral': /^.+$/,
                'intService': /^(true|false)$/
            },
            3: {
                //'header': null,
                'navwarnpartId': /^urn:mrn:NW\.CA\.CCG\.[A-Z]\.\d{4}\.\d{2}$/,
                'dateStart': /^\d{4}-\d{2}-\d{2}$/,
                'information': /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]+$/,
                'informationLanguage': /^[a-z]{3}$/,
                'navwarnTypeDetails': /^.+$/,
                'geometryId': /^urn:mrn:NW\.CA\.CCG\.[A-Z]\.\d{4}\.\d{2}$/,
                'srsName': /^urn:ogc:def:crs:EPSG::\d+$/,
                'srsDimension': /^\d+$/,
                'coordinates': null
            }
        };

        if (allStepsValidations[step]) {
            for (let field in allStepsValidations[step]) {
                if (!formData[field]) {
                    formIsValid = false;
                    errors[field] = `${field} is required`;
                } else if (field !== 'coordinates' && !allStepsValidations[step][field].test(formData[field])) {
                    formIsValid = false;
                    errors[field] = `${field} is invalid`;
                }
            }

        } else {
            formIsValid = false;
            errors.general = 'Invalid step';
        }


        setErrors(prevErrors => ({ ...prevErrors, ...errors }));

        return formIsValid;
    };


    const nextStep = () => {
        const isStepValid = validateForm(currentStep);
        if (isStepValid && currentStep < totalSteps) {
            setCurrentStep((prevStep) => {
                const nextStep = prevStep + 1;
                console.log(`Navigating to step: ${nextStep}`);
                return nextStep;
            });
        }
    };


    const prevStep = () => {
        if (currentStep > 1) setCurrentStep(currentStep - 1);
    };

    const handleStepClick = (step) => {
        setCurrentStep(step);
        scrollToStep(step);
    };

    const scrollToStep = (step) => {
        const stepRefs = [null, step1Ref, step2Ref, step3Ref];
        if (stepRefs[step] && stepRefs[step].current) {
            stepRefs[step].current.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const validateAllSteps = () => {
        let allValid = true;
        for (let step = 1; step <= totalSteps; step++) {
            const isStepValid = validateForm(step);
            if (!isStepValid) {
                allValid = false;
            }
        }
        return allValid;
    };


    const handleClick = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        const reader = new FileReader();
        reader.onload = (e) => {
            const content = e.target.result;

            switch (fileExtension) {
                case 'yaml':
                case 'yml':
                    handleYamlFile(content);
                    break;
                case 'json':
                    handleJsonFile(content);
                    break;
                case 'gml':
                    handleGmlFile(content);
                    break;
                default:
                    console.error('Unsupported file type:', fileExtension);
            }
        };

        reader.readAsText(file);
    };

    const handleYamlFile = (content) => {
        try {
            const jsonObj = yaml.load(content);
            setYamlContent(content);
            setJsonObject(jsonObj);
            updateFormData(jsonObj);
            console.log("YAML Content:", content);
            console.log("Converted YAML to JSON:", JSON.stringify(jsonObj, null, 2));
        } catch (e) {
            setIsJsonConverted(false);
            console.error('Error parsing YAML:', e);
        }
    };

    const handleJsonFile = (content) => {
        try {
            const jsonObj = JSON.parse(content);
            setJsonObject(jsonObj);
            updateFormData(jsonObj);
            console.log("JSON Content:", content);
        } catch (e) {
            setIsJsonConverted(false);
            console.error('Error parsing JSON:', e);
        }
    };

    const handleGmlFile = (content) => {
        console.log("GML Content:", content);
    };

    const updateFormData = (jsonObj) => {
        setFormData((prevData) => ({
            ...prevData,
            ...jsonObj["S124:Dataset"],
            ...jsonObj["S124:NAVWARNPreamble"],
            ...jsonObj["S124:NAVWARNPart"],
            ...jsonObj["S124:geometry"]
        }));
        setErrors({});
    };
    const handleDrawLine = (selecteddrawtype) => {
        updates124GeometryType(selecteddrawtype);
        setFormData(prevFormData => ({
            ...prevFormData,
            geometryType: selecteddrawtype
        }));
        setLineButtonActive(true);
        setPolygonButtonActive(false);
        setPointButtonActive(false);
        selectGeometryFeature('LineString',
            {
                color: 'rgba(0, 0, 255, 0.3)',
                // Blue color for vector layer fill
            },
            {
                color: 'rgba(0, 0, 0, 1)',
                // Black stroke color for vector layer
                width: 2,
            }
        );
    };

    const handleDrawPolygon = (selecteddrawtype) => {
        updates124GeometryType(selecteddrawtype);

        setFormData(prevFormData => ({
            ...prevFormData,
            geometryType: selecteddrawtype
        }));
        setLineButtonActive(false);
        setPolygonButtonActive(true);
        setPointButtonActive(false);

        selectGeometryFeature('Polygon',
            {
                color: 'rgba(14, 183, 142, 0.3)',
                // Green color for vector layer fill
            },
            {
                color: 'rgba(0, 0, 0, 0.7)',
                // Black stroke color for vector layer
                width: 3,
            }
        );
    };

    const handleDrawPoint = (selecteddrawtype) => {
        updates124GeometryType(selecteddrawtype);

        setFormData(prevFormData => ({
            ...prevFormData,
            geometryType: selecteddrawtype
        }));
        setLineButtonActive(false);
        setPolygonButtonActive(false);
        setPointButtonActive(true);


        selectGeometryFeature('Point',
            {
                color: 'rgba(255, 0, 0, 0.1)',
                // Red color for vector layer fill
            },
            {
                color: 'rgba(0, 0, 0, 1)',
                // Black stroke color for vector layer
                width: 3,
            }
        );
    };

    const selectGeometryFeature = (drawType, vectorFillStyle, vectorStrokeStyle) => {

        const { drawLayer, drawInteraction, vectorLayer, sourceProjection, destinationProjection } =
            initializeDrawAndVectorLayers(drawType, vectorFillStyle, vectorStrokeStyle);
        olMap.addLayer(vectorLayer);
        olMap.addLayer(drawLayer);
        olMap.addInteraction(drawInteraction);
        drawInteraction.on('drawstart', function (event) {

            olMap.getViewport();
        });
        drawInteraction.on('drawend', event => {

            const feature = event.feature;
            drawLayer.getSource().addFeature(feature);
            const drawGeometry = feature.getGeometry();
            const drawGeometryEPSG4326 = drawGeometry.clone().transform(destinationProjection, sourceProjection);
            console.log('drawGeometryEPSG4326', drawGeometryEPSG4326.flatCoordinates);

            const coordinates = drawGeometryEPSG4326.getFlatCoordinates();
            const swappedCoordinates = [];
            for (let i = 0; i < coordinates.length; i += 2) {
                swappedCoordinates.push(coordinates[i], coordinates[i + 1]); // Keep longitude and latitude as is
            }
            const formattedCoordinates = swappedCoordinates.join(' ');
            console.log('Formatted Coordinates (long lat):', formattedCoordinates);
            setFormData(prevState => ({
                ...prevState,
                coordinates: formattedCoordinates
            }));
            setErrors(prevErrors => {
                const updatedErrors = { ...prevErrors };
                delete updatedErrors.coordinates;
                return updatedErrors;
            });
            stopDrawAction();
        });
    };
    const handleCloseModal = () => {
        setShowModal(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateAllSteps()) {

            const newUpdatedJsonObject = {
                "S124:Dataset": {
                    "datasetFileIdentifier": formData.datasetFileIdentifier || '',
                    "datasetTitle": formData.datasetTitle || '',
                    "datasetReferenceDate": formData.datasetReferenceDate || '',
                    "datasetLanguage": formData.datasetLanguage || '',
                    "datasetAbstract": formData.datasetAbstract || '',
                    "datasetTopicCategory": formData.datasetTopicCategory || '',
                    "datasetPurpose": formData.datasetPurpose || '',
                    "updateNumber": formData.updateNumber || '',
                },
                "S124:NAVWARNPreamble": {
                    "navwarnpreambleId": formData.navwarnpreambleId || '',
                    "agencyResponsibleForProduction": formData.agencyResponsibleForProduction || '',
                    "countryName": formData.countryName || '',
                    "nameOfSeries": formData.nameOfSeries || '',
                    "warningIdentifier": formData.warningIdentifier || '',
                    "warningNumber": formData.warningNumber || '',
                    "warningType": formData.warningType || '',
                    "year": formData.year || '',
                    "generalAreaLanguage": formData.generalAreaLanguage || '',
                    "generalAreaName": formData.generalAreaName || '',
                    "locationNameLanguage": formData.locationNameLanguage || '',
                    "locationName": formData.locationName || '',
                    "chartNumber": formData.chartNumber || '',
                    "editionDate": formData.editionDate || '',
                    "language": formData.language || '',
                    "publicationAffected": formData.publicationAffected || '',
                    "titleLanguage": formData.titleLanguage || '',
                    "title": formData.title || '',
                    "publicationDate": formData.publicationDate || '',
                    "cancellationDate": formData.cancellationDate || '',
                    "navwarnTypeGeneral": formData.navwarnTypeGeneral || '',
                    "intService": formData.intService || '',
                },
                "S124:NAVWARNPart": {
                    "header": formData.header || '',
                    "navwarnpartId": formData.navwarnpartId || '',
                    "dateStart": formData.dateStart || '',
                    "informationLanguage": formData.informationLanguage || '',
                    "information": formData.information || '',
                    "navwarnTypeDetails": formData.navwarnTypeDetails || '',
                },
                "S124:geometry": {
                    "geometryId": formData.geometryId || '',
                    "srsName": formData.srsName || '',
                    "srsDimension": formData.srsDimension || '',
                    "coordinates": formData.coordinates || '',
                    "geometryType": formData.geometryType || ''
                }
            };

            console.log(newUpdatedJsonObject);
            setUpdatedJsonObject(newUpdatedJsonObject);

            axios.post(`${S124NavigationalwarningsAPI}/S-124`, newUpdatedJsonObject)
                .then(response => {
                    console.log(response.data);
                    if (response.data === 'Navigational Warning Created Successfully') {
                        toast.success(response.data);
                        setFormData(initialFormData);
                    } else if (response.data === 'This Navigational Warning Already Existed') {
                        //toast.warning(response.data);
                        setShowModal(true);

                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        } else {
            toast.warning('Please Fill All Fields');
        }
    };

    const updates124Navigationalwarning = async () => {
        if (updatedJsonObject) {
            await axios.put(`${S124NavigationalwarningsAPI}/S-124/${formData.datasetFileIdentifier}`, updatedJsonObject)
                .then(response => {
                    console.log(response.data);
                    if (response.data === 'Navigational Warning Updated Sucessfully') {
                        toast.success(response.data);
                        setFormData(initialFormData); // Reset form fields
                    }

                })
                .catch(error => {
                    console.error('There was an error!', error);
                });
        }
    };


    return (
        <div style={{ position: 'relative' }}>

            <Card>
                <CardHeader className='p-1 bg-white'>
                    <ListGroup horizontal className='d-flex justify-content-between'>
                        {["Dataset", "Preamble", "Part"].map((label, index) => (
                            <ListGroupItem
                                key={index}
                                onClick={() => handleStepClick(index + 1)}
                                className={`arrowsteper rounded-0 ${index + 1 === currentStep ? "active" : ""}`}
                                style={{width: '33%'}}
                            >
                                {label}
                            </ListGroupItem>
                        ))}
                    </ListGroup>
                </CardHeader>
                <CardBody className='p-0' style={{ maxHeight: 'calc(100vh - 200px)', height: '100vh', minHeight: '100%', overflow: 'auto' }}>
                    <Form>
                        {currentStep === 1 && <div ref={step1Ref}>
                            <div className='p-3'>
                                <Row>
                                    <Col md className='pe-1' title='Dataset File Identifier'>
                                        <FloatingLabel label="Dataset File Identifier" className='mb-2'>
                                            <Form.Control type="text" placeholder="Dataset File Identifier" id="datasetFileIdentifier" value={formData.datasetFileIdentifier} onChange={handleInputChange} />
                                            {errors.datasetFileIdentifier && <div className="text-danger error_msg">{errors.datasetFileIdentifier}</div>}
                                        </FloatingLabel>
                                    </Col>
                                    <Col md className='ps-1' title='Dataset Title'>
                                        <FloatingLabel label="Dataset Title" className='mb-2'>
                                            <Form.Control type="text" placeholder="Dataset Title" id="datasetTitle" value={formData.datasetTitle} onChange={handleInputChange} />
                                            {errors.datasetTitle && <div className="text-danger error_msg">{errors.datasetTitle}</div>}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md className='pe-1' title='Dataset Reference Date'>
                                        <FloatingLabel label="Dataset Reference Date" className='mb-2'>
                                            <Form.Control type="text" placeholder="Dataset Reference Date" id="datasetReferenceDate" value={formData.datasetReferenceDate} onChange={handleInputChange} />
                                            {errors.datasetReferenceDate && <div className="text-danger error_msg">{errors.datasetReferenceDate}</div>}
                                        </FloatingLabel>
                                    </Col>
                                    <Col md className='ps-1' title='Dataset Language'>
                                        <FloatingLabel label="Dataset Langauage" className='mb-2'>
                                            <Form.Control type="text" placeholder="Dataset Langauage" id="datasetLanguage" value={formData.datasetLanguage} onChange={handleInputChange} />
                                            {errors.datasetLanguage && <div className="text-danger error_msg">{errors.datasetLanguage}</div>}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md className='pe-1' title='Dataset Abstaract'>
                                        <FloatingLabel label="Dataset Abstaract" className='mb-2'>
                                            <Form.Control type="text" placeholder="Dataset Abstaract" id="datasetAbstract" value={formData.datasetAbstract} onChange={handleInputChange} />
                                            {errors.datasetAbstract && <div className="text-danger error_msg">{errors.datasetAbstract}</div>}
                                        </FloatingLabel>
                                    </Col>
                                    <Col md className='ps-1' title='Dataset Topic Category'>
                                        <FloatingLabel label="Dataset Topic Category" className='mb-2'>
                                            <Form.Control type="text" placeholder="Dataset Topic Category" id="datasetTopicCategory" value={formData.datasetTopicCategory} onChange={handleInputChange} />
                                            {errors.datasetTopicCategory && <div className="text-danger error_msg">{errors.datasetTopicCategory}</div>}
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col md className='pe-1' title='Dataset Purpose'>
                                        <FloatingLabel label="Dataset Purpose">
                                            <Form.Control type="text" placeholder="Dataset Purpose" id="datasetPurpose" value={formData.datasetPurpose} onChange={handleInputChange} />
                                            {errors.datasetPurpose && <div className="text-danger error_msg">{errors.datasetPurpose}</div>}
                                        </FloatingLabel>
                                    </Col>
                                    <Col md className='ps-1' title='Update Number'>
                                        <FloatingLabel label="Update Number">
                                            <Form.Control type="text" placeholder="Update Number" id="updateNumber" value={formData.updateNumber} onChange={handleInputChange} />
                                            {errors.updateNumber && <div className="text-danger error_msg">{errors.updateNumber}</div>}
                                        </FloatingLabel>
                                    </Col>
                                </Row>

                            </div>

                        </div>}
                        {currentStep === 2 && <div ref={step2Ref}>
                            <div className='p-3'>
                                    <Row>
                                        <Col md className='pe-1' title='Id'>
                                            <FloatingLabel label="Id" className='mb-2'>
                                                <Form.Control type="text" placeholder="Id" id="navwarnpreambleId" value={formData.navwarnpreambleId} onChange={handleInputChange} />
                                                {errors.navwarnpreambleId && <div className="text-danger error_msg">{errors.navwarnpreambleId}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className='ps-1' title='Agency Responsible for Production'>
                                            <FloatingLabel label="Agency Responsible for Production" className='mb-2'>
                                                <Form.Control type="text" placeholder="Agency Responsible for Production" id="agencyResponsibleForProduction" value={formData.agencyResponsibleForProduction} onChange={handleInputChange} />
                                                {errors.agencyResponsibleForProduction && <div className="text-danger error_msg">{errors.agencyResponsibleForProduction}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md className='pe-1' title='Country Name'>
                                            <FloatingLabel label="Country Name" className='mb-2'>
                                                <Form.Control type="text" placeholder="Country Name" id="countryName" value={formData.countryName} onChange={handleInputChange} />
                                                {errors.countryName && <div className="text-danger error_msg">{errors.countryName}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className='ps-1' title='Name of Series'>
                                            <FloatingLabel label="Name of Series" className='mb-2'>
                                                <Form.Control type="text" placeholder="Name of Series" id="nameOfSeries" value={formData.nameOfSeries} onChange={handleInputChange} />
                                                {errors.nameOfSeries && <div className="text-danger error_msg">{errors.nameOfSeries}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md className='pe-1' title='Warning Identifier'>
                                            <FloatingLabel label="Warning Identifier" className='mb-2'>
                                                <Form.Control type="text" placeholder="Warning Identifier" id="warningIdentifier" value={formData.warningIdentifier} onChange={handleInputChange} />
                                                {errors.warningIdentifier && <div className="text-danger error_msg">{errors.warningIdentifier}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className='ps-1' title='Warning Numbe'>
                                            <FloatingLabel label="Warning Number" className='mb-2'>
                                                <Form.Control type="text" placeholder="Warning Number" id="warningNumber" value={formData.warningNumber} onChange={handleInputChange} />
                                                {errors.warningNumber && <div className="text-danger error_msg">{errors.warningNumber}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md className='pe-1' title='Warning Type'>
                                            <FloatingLabel label="Warning Type" className='mb-2'>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    id="warningType"
                                                    value={formData.warningType}
                                                    onChange={handleInputChange}
                                                >
                                                    {[
                                                        'Local Navigational Warning',
                                                        'Coastal Navigational Warning',
                                                        'Sub-Area Navigational Warning',
                                                        'NAVAREA Navigational Warning',
                                                        'NAVAREA No Warning',
                                                        'Sub-Area No Warning',
                                                        'Coastal No Warning',
                                                        'Local No Warning',
                                                        'NAVAREA In-Force Bulletin',
                                                        'Sub-Area In-Force Bulletin',
                                                        'Coastal In-Force Bulletin',
                                                        'Local In-Force Bulletin',
                                                    ].map(option => (
                                                        <option key={option} value={option} disabled={(jsonObject && jsonObject["S124:NAVWARNPreamble"] && jsonObject["S124:NAVWARNPreamble"].warningType) !== option && ((jsonObject && jsonObject["S124:NAVWARNPreamble"] && jsonObject["S124:NAVWARNPreamble"].warningType) !== '' && (jsonObject && jsonObject["S124:NAVWARNPreamble"] && jsonObject["S124:NAVWARNPreamble"].warningType !== undefined))}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                {errors.warningType && <div className="text-danger error_msg">{errors.warningType}</div>}
                                            </FloatingLabel>

                                        </Col>
                                        <Col md className='ps-1' title='Year'>
                                            <FloatingLabel label="Year" className='mb-2'>
                                                <Form.Control type="text" placeholder="Year" id="year" value={formData.year} onChange={handleInputChange} />
                                                {errors.year && <div className="text-danger error_msg">{errors.year}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>


                                    <h6>General Area</h6>
                                        <Row>
                                            <Col md className='pe-1' title='Language'>
                                                <FloatingLabel label="Language" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Language" id="generalAreaLanguage" value={formData.generalAreaLanguage} onChange={handleInputChange} />
                                                    {errors.generalAreaLanguage && <div className="text-danger error_msg">{errors.generalAreaLanguage}</div>}
                                                </FloatingLabel>
                                            </Col>
                                            <Col md className='ps-1' title='Text'>
                                                <FloatingLabel label="Text" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Text" id="generalAreaName" value={formData.generalAreaName} onChange={handleInputChange} />
                                                    {errors.generalAreaName && <div className="text-danger error_msg">{errors.generalAreaName}</div>}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    <h6>Locality</h6>
                                        <Row>
                                            <Col md className='pe-1' title='Language'>
                                                <FloatingLabel label="Language" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Language" id="locationNameLanguage" value={formData.locationNameLanguage} onChange={handleInputChange} />
                                                    {errors.locationNameLanguage && <div className="text-danger error_msg">{errors.locationNameLanguage}</div>}
                                                </FloatingLabel>
                                            </Col>
                                            <Col md className='ps-1' title='Text'>
                                                <FloatingLabel label="Text" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Text" id="locationName" value={formData.locationName} onChange={handleInputChange} />
                                                    {errors.locationName && <div className="text-danger error_msg">{errors.locationName}</div>}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    <h6>Affected Chart Publications</h6>
                                        <Row>
                                            <Col md className='pe-1' title='Chart Number'>
                                                <FloatingLabel label="Chart Number" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Chart Number" id="chartNumber" value={formData.chartNumber} onChange={handleInputChange} />
                                                    {errors.chartNumber && <div className="text-danger error_msg">{errors.chartNumber}</div>}
                                                </FloatingLabel>
                                            </Col>
                                            <Col md className='ps-1' title='Edition Date'>
                                                <FloatingLabel label="Edition Date" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Edition Date" id="editionDate" value={formData.editionDate} onChange={handleInputChange} />
                                                    {errors.editionDate && <div className="text-danger error_msg">{errors.editionDate}</div>}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md className='pe-1' title='Language'>
                                                <FloatingLabel label="Language" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Language" id="language" value={formData.language} onChange={handleInputChange} />
                                                    {errors.language && <div className="text-danger error_msg">{errors.language}</div>}
                                                </FloatingLabel>
                                            </Col>
                                            <Col md className='ps-1' title='Publication Affected'>
                                                <FloatingLabel label="Publication Affected" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Publication Affected" id="publicationAffected" value={formData.publicationAffected} onChange={handleInputChange} />
                                                    {errors.publicationAffected && <div className="text-danger error_msg">{errors.publicationAffected}</div>}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col md className='pe-1' title='Language'>
                                                <FloatingLabel label="Language" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Language" id="titleLanguage" value={formData.titleLanguage} onChange={handleInputChange} />
                                                    {errors.titleLanguage && <div className="text-danger error_msg">{errors.titleLanguage}</div>}
                                                </FloatingLabel>
                                            </Col>
                                            <Col md className='ps-1' title='Text'>
                                                <FloatingLabel label="Text" className='mb-2'>
                                                    <Form.Control type="text" placeholder="Text" id="title" value={formData.title} onChange={handleInputChange} />
                                                    {errors.title && <div className="text-danger error_msg">{errors.title}</div>}
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    <Row>
                                        <Col md className='pe-1' title='Cancellation Date'>
                                            <FloatingLabel label="Cancellation Date" className='mb-2'>
                                                <Form.Control type="text" placeholder="Cancellation Date" id="cancellationDate" value={formData.cancellationDate} onChange={handleInputChange} />
                                                {errors.cancellationDate && <div className="text-danger error_msg">{errors.cancellationDate}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className='ps-1' title='Publication Date'>
                                            <FloatingLabel label="Publication Date" className='mb-2'>
                                                <Form.Control type="text" placeholder="Publication Date" id="publicationDate" value={formData.publicationDate} onChange={handleInputChange} />
                                                {errors.publicationDate && <div className="text-danger error_msg">{errors.publicationDate}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md className='pe-1' title='Nav warn Type General'>
                                            <FloatingLabel label="Nav warn Type General" className='mb-2'>
                                                <Form.Select
                                                    aria-label="Default select example"
                                                    id="navwarnTypeGeneral"
                                                    value={formData.navwarnTypeGeneral}
                                                    onChange={handleInputChange}
                                                >
                                                    {optionValues.map(option => (
                                                        <option key={option} value={option} disabled={(jsonObject && jsonObject["S124:NAVWARNPreamble"] && jsonObject["S124:NAVWARNPreamble"].navwarnTypeGeneral) !== option && ((jsonObject && jsonObject["S124:NAVWARNPreamble"] && jsonObject["S124:NAVWARNPreamble"].navwarnTypeGeneral) !== '' && (jsonObject && jsonObject["S124:NAVWARNPreamble"] && jsonObject["S124:NAVWARNPreamble"].navwarnTypeGeneral !== undefined))}>
                                                            {option}
                                                        </option>
                                                    ))}
                                                </Form.Select>
                                                {errors.navwarnTypeGeneral && <div className="text-danger error_msg">{errors.navwarnTypeGeneral}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className='ps-1' title='Int Service'>
                                        
                                            <FloatingLabel label="Int Service" className='mb-2'>
                                                <Form.Control type="text" placeholder="Int Service" id="intService" value={formData.intService} onChange={handleInputChange} />
                                                {errors.intService && <div className="text-danger error_msg">{errors.intService}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    </div>
                        </div>}
                        {currentStep === 3 && <div ref={step3Ref}>
                            <div className='p-3'>
                                    <Row>
                                        <Col md className='pe-1' title='Header'>
                                            <FloatingLabel label="Header" className='mb-2'>
                                                <Form.Control type="text" placeholder="Header" id="header" value={formData.header} onChange={handleInputChange} />
                                                {errors.header && <div className="text-danger error_msg">{errors.header}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className='ps-1' title='Id'>
                                            <FloatingLabel label="Id" className='mb-2'>
                                                <Form.Control type="text" placeholder="Id" id='navwarnpartId' value={formData.navwarnpartId} onChange={handleInputChange} />
                                                {errors.navwarnpartId && <div className="text-danger error_msg">{errors.navwarnpartId}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md title='Fixed Date Range'>
                                            <FloatingLabel label="Fixed Date Range" className='mb-2'>
                                                <Form.Control type="text" placeholder="Fixed Date Range" id="dateStart" value={formData.dateStart} onChange={handleInputChange} />
                                                {errors.dateStart && <div className="text-danger error_msg">{errors.dateStart}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md className='pe-1' title='Language'>
                                            <FloatingLabel label="Language" className='mb-2'>
                                                <Form.Control type="text" placeholder="Language" id="informationLanguage" value={formData.informationLanguage} onChange={handleInputChange} />
                                                {errors.informationLanguage && <div className="text-danger error_msg">{errors.informationLanguage}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className='ps-1' title='Text'>
                                            <FloatingLabel label="Text" className='mb-2'>
                                                <Form.Control type="text" placeholder="Text" id="information" value={formData.information} onChange={handleInputChange} />
                                                {errors.information && <div className="text-danger error_msg">{errors.information}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md title='Navwarn Type Details'>
                                            <FloatingLabel label="Navwarn Type Details" className='mb-2'>
                                                <Form.Control type="text" placeholder="Navwarn Type Details" id="navwarnTypeDetails" value={formData.navwarnTypeDetails} onChange={handleInputChange} />
                                                {errors.navwarnTypeDetails && <div className="text-danger error_msg">{errors.navwarnTypeDetails}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <div>
                                        <Stack direction="horizontal">
                                            <div className="p-0">
                                                <ButtonGroup className='mt-0'>
                                                    <StyledButton title='Line' id="btn-LineString" onClick={() => handleDrawLine('LineString')} active={lineButtonActive || formData.geometryType === 'Line'}  disabled={!!s124listvalue} >
                                                        <i className="bi bi-activity"></i>
                                                    </StyledButton>
                                                    <StyledButton title='Polygon' id="btn-Polygon" onClick={() => handleDrawPolygon('Polygon')} active={polygonButtonActive || formData.geometryType === 'Polygon'} disabled={!!s124listvalue}>
                                                        <i className="bi bi-pentagon"></i>
                                                    </StyledButton>
                                                    <StyledButton title='Point' id="btn-Point" onClick={() => handleDrawPoint('Point')} active={pointButtonActive || formData.geometryType === 'Point'} disabled={!!s124listvalue}>
                                                        <i className="bi bi-geo-fill"></i>
                                                    </StyledButton>

                                                </ButtonGroup>
                                            </div>

                                        </Stack>
                                    </div>
                                    <h6 className='pt-2'>Geometry</h6>
                                    <Row>
                                        <Col md className="pe-1" title='GeometryId'>
                                            <FloatingLabel label="GeometryId" className='mb-2'>
                                                <Form.Control type="text" placeholder="GeometryId" id="geometryId" value={formData.geometryId} onChange={handleInputChange} />
                                                {errors.geometryId && <div className="text-danger error_msg">{errors.geometryId}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className="ps-1" title='SrsName'>
                                            <FloatingLabel label="SrsName" className='mb-2'>
                                                <Form.Control type="text" placeholder="SrsName" id="srsName" value={formData.srsName} onChange={handleInputChange} />
                                                {errors.srsName && <div className="text-danger error_msg">{errors.srsName}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col md className="pe-1" title='SrsDimension'>
                                            <FloatingLabel label="SrsDimension">
                                                <Form.Control type="text" placeholder="SrsDimension" id="srsDimension" value={formData.srsDimension} onChange={handleInputChange} />
                                                {errors.srsDimension && <div className="text-danger error_msg">{errors.srsDimension}</div>}
                                            </FloatingLabel>
                                        </Col>
                                        <Col md className="ps-1" title='Coordinates'>
                                            <FloatingLabel label="Coordinates">
                                                <Form.Control type="text" placeholder="Coordinates" id="coordinates" value={formData.coordinates} onChange={handleInputChange} />
                                                {errors.coordinates && <div className="text-danger error_msg">{errors.coordinates}</div>}
                                            </FloatingLabel>
                                        </Col>
                                    </Row>
                                </div>
                        </div>}
                    </Form>
                </CardBody>
                <CardFooter className='p-1'>
                        <Stack direction="horizontal" gap={1}>
                        <Button variant="outline-secondary" title='Previous' onClick={prevStep} disabled={currentStep === 1} className={`pe-2 ${currentStep === 1 ? 'd-none' : ''}`}>
                        <i class="bi bi-chevron-left"></i>
                        </Button>
                        <Button variant="outline-secondary" title='Next' onClick={nextStep} disabled={currentStep === totalSteps} className={`ms-auto ${currentStep === totalSteps ? 'd-none' : ''}`}>
                        <i class="bi bi-chevron-right"></i>
                        </Button>
                       
                        {currentStep === totalSteps && (
                            <Button 
                                variant="outline-secondary"
                                title='Save'
                                 className="ms-auto"
                                onClick={(e) => handleSubmit(e, currentStep)}
                            >
                                <i class="bi bi-save"></i> 
                            </Button>
                        )}
                        <Form.Group>
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept=".yaml, .yml, .json, .gml"
                                onChange={handleFileChange}
                            />
                            <Button variant="outline-secondary" onClick={handleClick} disabled={!!s124listvalue} title='Import YAML/GML/JSON'><i class="bi bi-upload"></i></Button>
                           
                        </Form.Group>
                        <Button variant="outline-secondary" title='Reset'><i class="bi bi-arrow-clockwise"></i></Button>
                        </Stack>
                </CardFooter>
            </Card>
            <CustomConfirmModel
                show={showModal} title="S-124 Navigational Warning"
                content={'Are you sure you want to update S-124 Navigational Warning ?'}
                onHide={handleCloseModal} onSaveChanges={() => updates124Navigationalwarning()} />
        </div>
    );
}

export default StepperForm;