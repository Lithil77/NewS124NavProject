<<<<<<< HEAD
import React, { useContext, useState, useRef, useEffect } from 'react';
=======
import React, { useContext, useState, useRef } from 'react';
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
import ImageWMS from "ol/source/ImageWMS.js";
import ImageLayer from "ol/layer/Image.js";
import { Col, FloatingLabel, Form, Overlay, Popover, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useColor } from '../../../../../Contexts/ColorContext';
import 'react-datepicker/dist/react-datepicker.css';
<<<<<<< HEAD
import { StyledButton, StyledLoaderInner, StyledLoaderWraper } from '../../../../Reusable/StyledComponent';
import { useProductFilter } from '../../../../../Contexts/ProductFilterContext';
import { OLMapContext } from '../../../../../Contexts/OlMapContext';
import { toast } from 'react-toastify';
=======
import { StyledButton } from '../../../../Reusable/StyledComponent';
import { useProductFilter } from '../../../../../Contexts/ProductFilterContext';
import { OLMapContext } from '../../../../../Contexts/OlMapContext';
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f

function S124Warnings() {

    const { olMap } = useContext(OLMapContext);
<<<<<<< HEAD
    const { selectedMapLayer, getS124NavigationalWarningTypes, getS124NavWarnDataSetIDs,
        getS124NavigationalGeometryTypes, getS124NavWarnPublicationDates } = useProductFilter();

    const { backgroundColor, textColor, borderColor } = useColor();

    const [selectedNavigationWarningType, setSelectedNavigationWarningType] = useState('select');
    const [selectedDataSetId, setSelectedDataSetId] = useState('select');
    const [selectedGeometryType, setSelectedGeometryType] = useState('select');

    const [isLoading, setIsLoading] = useState(false);

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
=======
    const { selectedMapLayer } = useProductFilter();
    const [selectedNavigationWarningType, setSelectedNavigationWarningType] = useState('select');
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());
    const { backgroundColor, textColor, borderColor } = useColor();
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f

    const [startdateCalenderBtnVisible, setStartdateCalenderBtnVisible] = useState(false);
    const [endDateCalenderBtnVisible, setEndDateCalenderBtnVisible] = useState(false);

    const [showStartDateCalendarDialog, setShowStartDateCalendarDialog] = useState(false);
    const [showEndDateCalendarDialog, setShowEndDateCalendarDialog] = useState(false);

    const startDateTarget = useRef(null);
    const endDateTarget = useRef(null);

<<<<<<< HEAD
    const [warningTypesList, setWarningTypesList] = useState([]);
    const [dataSetIds, setDataSetIds] = useState([]);
    const [geometryTypesList, setGeometryTypesList] = useState([]);
    const [publicationDates, setPublicationDates] = useState([]);

    useEffect(() => {
        let isMounted = true;

        const fetchWarningTypes = async () => {
            setWarningTypesList([]);
            const list = await getS124NavigationalWarningTypes(selectedMapLayer, olMap);
            if (isMounted && list.length > 0) {
                setWarningTypesList(list);
            }

            const dates = await getS124NavWarnPublicationDates(selectedMapLayer, olMap);

            if (isMounted && dates.length > 0) {
                setPublicationDates(dates);
            }
        };
        fetchWarningTypes();
        return () => {
            isMounted = false;
        };
    }, []);

    const handleChangeDataSetId = async (event) => {

        if (event.target.value === 'select') {
            toast.warn('Please select a geometry type');
        } else {
            setSelectedDataSetId(event.target.value);
            setStartdateCalenderBtnVisible(true);
            setEndDateCalenderBtnVisible(true);
        }
    }

    const handleInputChange = async (event) => {
        if (event.target.value === 'select') {
            toast.warn('Please select a warning type');
        } else {
            const warningType = event.target.value;
            setSelectedNavigationWarningType(warningType);
            setIsLoading(true);
            const geotypes = await getS124NavigationalGeometryTypes(selectedMapLayer, warningType, olMap);
            setIsLoading(false);

            if (geotypes.length > 0) {
                setGeometryTypesList(geotypes);
            }
        }

    };

    const handleGeometryTypeChange = async (event) => {

        if (event.target.value === 'select') {
            toast.warn('Please select a geometry type');
        } else {
            const geometryType = event.target.value;
            setSelectedGeometryType(geometryType);
            setIsLoading(true);
            const datasetIds = await getS124NavWarnDataSetIDs(selectedMapLayer, selectedNavigationWarningType, geometryType, olMap);
            setIsLoading(false);
            if (datasetIds.length > 0) {
                setDataSetIds(datasetIds);
            }
        }
    }

    const handleCalenderStartDateChange = (selectedDate) => {
        setSelectedStartDate(selectedDate);
        setShowStartDateCalendarDialog(false);
    };

    const handleCalenderEndDateChange = (selectedDate) => {
        setSelectedEndDate(selectedDate);
        setShowEndDateCalendarDialog(false);
=======
    const navigationWarningTypes = [
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
    ];

    const handleInputChange = (event) => {
        if (event.target.value === 'select') {
            Toast.warn('Please select a warning type');
        } else {
            setSelectedNavigationWarningType(event.target.value);
            setStartdateCalenderBtnVisible(true);
            setEndDateCalenderBtnVisible(true);
        }
    };

    const handleCalenderStartDateChange = (selectedDate) => {
        if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            setSelectedStartDate(selectedDate);
            setShowStartDateCalendarDialog(false); // Close the calendar after selecting a date
        }
    };

    const handleCalenderEndDateChange = (selectedDate) => {
        if (selectedDate instanceof Date && !isNaN(selectedDate)) {
            setSelectedEndDate(selectedDate);
            setShowEndDateCalendarDialog(false); // Close the calendar after selecting a date
        }
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
    };

    const handleOpenStartDateCalendar = (event) => {
        event.preventDefault();
        startDateTarget.current = event.target;
        setShowStartDateCalendarDialog(true);
        setShowEndDateCalendarDialog(false);
    };

    const handleOpenEndDateCalendar = (event) => {
        event.preventDefault();
        endDateTarget.current = event.target;
        setShowEndDateCalendarDialog(true);
        setShowStartDateCalendarDialog(false);
    };

<<<<<<< HEAD
    function convertDateFormat(dateString) {
        let date = new Date(dateString);

        let year = date.getFullYear();
        let month = (date.getMonth() + 1).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');
        let hours = date.getUTCHours().toString().padStart(2, '0');
        let minutes = date.getUTCMinutes().toString().padStart(2, '0');
        let seconds = date.getUTCSeconds().toString().padStart(2, '0');

        let formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
        return formattedDate;
    }

    const isAnyDateInRange = (dates, startDateStr, endDateStr) => {
        const startDate = new Date(startDateStr);
        const endDate = new Date(endDateStr);

        for (let dateStr of dates) {
            const date = new Date(dateStr);
            if (date >= startDate && date <= endDate) {
                return true; // Return true as soon as we find a date in range
            }
        }
        return false; // Return false if no date in range is found
    };

    const handleSubmit = async () => {
        if (olMap) {

            const allLayers = olMap.getLayers().getArray();
            let startDate = convertDateFormat(selectedStartDate);
            let endDate = convertDateFormat(selectedEndDate);
            const exists = isAnyDateInRange(publicationDates, startDate, endDate);

            if (!exists) {
                toast.warn(`publication dates are not in range`);
            }
            else {
                for (const lyr of allLayers) {
                    if (lyr instanceof ImageLayer) {
                        const source = lyr.getSource();
                        if (source instanceof ImageWMS) {
                            const title = lyr.get('title');
                            if (selectedMapLayer === title) {
                                const params = source.getParams();
                                params.CQL_FILTER = `warning_type='${selectedNavigationWarningType}' AND dataset_file_identifier='${selectedDataSetId}' AND geometry_type='${selectedGeometryType}'`;
                                source.updateParams(params);
                                source.refresh();
                            }
                        }
                    }
                }
=======
    const handleSubmit = () => {
        if (olMap) {
            const allLayers = olMap.getLayers().getArray();
            const finalFilterString = `warningtype=${selectedNavigationWarningType}`;

            let foundFeature = false;

            allLayers.forEach(lyr => {
                if (lyr instanceof ImageLayer && lyr.getSource() instanceof ImageWMS) {
                    if (selectedMapLayer === lyr.get('title')) {
                        lyr.setVisible(true);
                        const params = lyr.getSource().getParams();
                        params.CQL_FILTER = finalFilterString;
                        lyr.getSource().updateParams(params);
                        foundFeature = true;
                    }
                }
            });

            if (!foundFeature) {
                alert('No features found for the selected warning type.');
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
            }
        }
    };

<<<<<<< HEAD
    return (
        <div>
            {isLoading && (
                <StyledLoaderWraper>
                    <StyledLoaderInner />
                </StyledLoaderWraper>
            )}

=======



    return (
        <div>
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
            <FloatingLabel label="Warning Type" className='mb-2 mt-2'>
                <Form.Select
                    id="warningType"
                    onChange={handleInputChange}
                    value={selectedNavigationWarningType}
                >
                    <option value='select'>Select a Navigational Warning</option>
<<<<<<< HEAD
                    {warningTypesList.map(option => (
=======
                    {navigationWarningTypes.map(option => (
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>
<<<<<<< HEAD
            <FloatingLabel label="Geometry Type" className='mb-2 mt-2'>
                <Form.Select
                    id="GeometryType"
                    onChange={handleGeometryTypeChange}
                    value={selectedGeometryType}
                >
                    <option value='select'>Select a Geometry type</option>
                    {geometryTypesList.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Dataset Id" className='mb-2 mt-2'>
                <Form.Select
                    id="DatasetId"
                    onChange={handleChangeDataSetId}
                    value={selectedDataSetId}
                >
                    <option value='select'>Select a Dataset Id</option>
                    {dataSetIds.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>

            <Row>
                <Col sm={6}>

                    {selectedStartDate == null ?
                        <label className='me-2'>Start:</label>
                        : <label className='me-2'>Start: {convertDateFormat(selectedStartDate).split('T')[0]}</label>
                    }

=======
            <Row>
                <Col sm={6}>
                    <label className='me-2'>Start: {selectedStartDate.toLocaleDateString()}</label>
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                    <StyledButton
                        title='Calendar'
                        className={`${startdateCalenderBtnVisible ? '' : 'disabled'}`}
                        id="btn-Calender"
                        onClick={handleOpenStartDateCalendar}
                        ref={startDateTarget}
                        style={{ backgroundColor, color: textColor, borderColor }}
                    >
                        <i className='bi bi-calendar'></i>
                    </StyledButton>
                    <Overlay show={showStartDateCalendarDialog} target={startDateTarget.current} placement='bottom'>
                        <Popover id='popover-contained'>
                            <Popover.Body className='p-0'>
                                <DatePicker
                                    selected={selectedStartDate}
                                    onChange={handleCalenderStartDateChange}
                                    inline
<<<<<<< HEAD
                                    dateFormat="yyyy-MM-dd"
=======
                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                                    style={{
                                        backgroundColor,
                                        color: textColor,
                                        borderColor,
                                    }}
                                />
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </Col>
                <Col sm={6}>
<<<<<<< HEAD
                    {selectedEndDate == null ?
                        <label className='me-2'>End:</label>
                        : <label className='me-2'>End: {convertDateFormat(selectedEndDate).split('T')[0]}</label>
                    }
=======
                    <label className='me-2'>End: {selectedEndDate.toLocaleDateString()}</label>
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                    <StyledButton
                        title='Calendar'
                        className={`${endDateCalenderBtnVisible ? '' : 'disabled'}`}
                        id="btn-Calender"
                        onClick={handleOpenEndDateCalendar}
                        ref={endDateTarget}
                        style={{ backgroundColor, color: textColor, borderColor }}
                    >
                        <i className='bi bi-calendar'></i>
                    </StyledButton>
                    <Overlay show={showEndDateCalendarDialog} target={endDateTarget.current} placement='bottom'>
                        <Popover id='popover-contained'>
                            <Popover.Body className='p-0'>
                                <DatePicker
                                    selected={selectedEndDate}
                                    onChange={handleCalenderEndDateChange}
                                    inline
                                    dateFormat="yyyy-MM-dd'T'HH:mm:ss'Z'"
                                    style={{
                                        backgroundColor,
                                        color: textColor,
                                        borderColor,
                                    }}
                                />
                            </Popover.Body>
                        </Popover>
                    </Overlay>
                </Col>
            </Row>
            <StyledButton className='mt-4' onClick={handleSubmit}>Submit</StyledButton>
        </div>
    );
}

export default S124Warnings;
