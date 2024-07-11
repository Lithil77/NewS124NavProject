import React, { useContext, useState, useRef, useEffect } from 'react';
import ImageWMS from "ol/source/ImageWMS.js";
import ImageLayer from "ol/layer/Image.js";
import { Col, FloatingLabel, Form, Overlay, Popover, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import { useColor } from '../../../../../Contexts/ColorContext';
import 'react-datepicker/dist/react-datepicker.css';
import { StyledButton, StyledLoaderInner, StyledLoaderWraper } from '../../../../Reusable/StyledComponent';
import { useProductFilter } from '../../../../../Contexts/ProductFilterContext';
import { OLMapContext } from '../../../../../Contexts/OlMapContext';
import { toast } from 'react-toastify';

function S124Warnings() {

    const { olMap } = useContext(OLMapContext);
    const { selectedMapLayer, getS124NavigationalWarningTypes, getS124NavWarnDataSetIDs,
        getS124NavigationalGeometryTypes, getS124NavWarnPublicationDates } = useProductFilter();
    const [selectedNavigationWarningType, setSelectedNavigationWarningType] = useState('select');
    const [selectedDataSetId, setSelectedDataSetId] = useState('select');
    const [selectedGeometryType, setSelectedGeometryType] = useState('select');

    const [isLoading, setIsLoading] = useState(false);

    const [selectedStartDate, setSelectedStartDate] = useState(null);
    const [selectedEndDate, setSelectedEndDate] = useState(null);
    const { backgroundColor, textColor, borderColor } = useColor();

    const [startdateCalenderBtnVisible, setStartdateCalenderBtnVisible] = useState(false);
    const [endDateCalenderBtnVisible, setEndDateCalenderBtnVisible] = useState(false);

    const [showStartDateCalendarDialog, setShowStartDateCalendarDialog] = useState(false);
    const [showEndDateCalendarDialog, setShowEndDateCalendarDialog] = useState(false);

    const startDateTarget = useRef(null);
    const endDateTarget = useRef(null);

    const [warningTypesList, setWarningTypesList] = useState([]);
    const [dataSetIds, setDataSetIds] = useState([]);
    const [geometryTypesList, setGeometryTypesList] = useState([]);
    const [publicationDates, setPublicationDates] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const currentDate = new Date().toISOString().split('T')[0];

    useEffect(() => {
        let isMounted = true;

        const fetchWarningTypes = async () => {
            setWarningTypesList([]);
            const warningTypesList  = await getS124NavigationalWarningTypes(selectedMapLayer, olMap);
            if (isMounted && warningTypesList .length > 0) {
                setWarningTypesList(warningTypesList );
                const initialSelectedWarningType = warningTypesList[0];
                setSelectedNavigationWarningType(initialSelectedWarningType);
            
            const geometryTypesList = await getS124NavigationalGeometryTypes(selectedMapLayer, initialSelectedWarningType, olMap);
            if (isMounted && geometryTypesList.length > 0) {
                setGeometryTypesList(geometryTypesList);
                const initialSelectedGeometryType = geometryTypesList[0];
                setSelectedGeometryType(initialSelectedGeometryType);

                // Fetch dataset IDs based on the first warning type and geometry type
                const dataSetIds = await getS124NavWarnDataSetIDs(selectedMapLayer, initialSelectedWarningType, initialSelectedGeometryType, olMap);
                if (isMounted && dataSetIds.length > 0) {
                    setDataSetIds(dataSetIds);
                    setSelectedDataSetId(dataSetIds[0]);
                }
            }
           
           
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
        setSelectedDataSetId(event.target.value);
        setStartdateCalenderBtnVisible(true);
        setEndDateCalenderBtnVisible(true);
    }

    const handleInputChange = async (event) => {
            const warningType = event.target.value;
            setSelectedNavigationWarningType(warningType);
            setIsLoading(true);
            const geotypes = await getS124NavigationalGeometryTypes(selectedMapLayer, warningType, olMap);
            setIsLoading(false);

            if (geotypes.length > 0) {
                setGeometryTypesList(geotypes);
            }
    };

    const handleGeometryTypeChange = async (event) => {
            const geometryType = event.target.value;
            setSelectedGeometryType(geometryType);
            setIsLoading(true);
            const datasetIds = await getS124NavWarnDataSetIDs(selectedMapLayer, selectedNavigationWarningType, geometryType, olMap);
            setIsLoading(false);
            if (datasetIds.length > 0) {
                setDataSetIds(datasetIds);
            }
    }

 /*    const handleCalenderStartDateChange = (selectedDate) => {
        setSelectedStartDate(selectedDate);
        setShowStartDateCalendarDialog(false);
    };

    const handleCalenderEndDateChange = (selectedDate) => {
        setSelectedEndDate(selectedDate);
        setShowEndDateCalendarDialog(false);
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
    };*/

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
    const handleStartDateChange = (e) => {
        setStartDate(e.target.value);
    };

    const handleEndDateChange = (e) => {
        setEndDate(e.target.value);
        
    };
    const handleSubmit = async () => {
        if (olMap) {

            const allLayers = olMap.getLayers().getArray();
           /*  let startDate = convertDateFormat(startDate);
            let endDate = convertDateFormat(endDate);  */
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
            }
        }
    };
    
    return (
        <div>
            {isLoading && (
                <StyledLoaderWraper>
                    <StyledLoaderInner />
                </StyledLoaderWraper>
            )}

            <FloatingLabel label="Warning Type" className='mb-2 mt-2'>
                <Form.Select
                    id="warningType"
                    onChange={handleInputChange}
                    value={selectedNavigationWarningType}
                >
                    {warningTypesList.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <FloatingLabel label="Geometry Type" className='mb-2 mt-2'>
                <Form.Select
                    id="GeometryType"
                    onChange={handleGeometryTypeChange}
                    value={selectedGeometryType}
                >
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
                    {dataSetIds.map(option => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
                </Form.Select>
            </FloatingLabel>
            <Form>
                <Row>
                    <Col md className="pe-1" title='StartDate'>
                        <FloatingLabel label="Start Date">
                            <Form.Control type="date" placeholder="StartDate" id="startDate" 
                            value={startDate} 
                            onChange={handleStartDateChange}
                            max={currentDate}/>
                        </FloatingLabel>
                    </Col>
                    <Col md className="ps-1" title='EndDate'>
                        <FloatingLabel label="End Date">
                            <Form.Control type="date" placeholder="EndDate" id="endDate" 
                            value={endDate} 
                            onChange={handleEndDateChange}
                            max={currentDate}/>
                        </FloatingLabel>
                    </Col>
                </Row>
            </Form>
         {/*    <Row>
                <Col sm={6}>

                    {selectedStartDate == null ?
                        <label className='me-2'>Start:</label>
                        : <label className='me-2'>Start: {convertDateFormat(selectedStartDate).split('T')[0]}</label>
                    }

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
                                    dateFormat="yyyy-MM-dd"
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
                    {selectedEndDate == null ?
                        <label className='me-2'>End:</label>
                        : <label className='me-2'>End: {convertDateFormat(selectedEndDate).split('T')[0]}</label>
                    }
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
            </Row> */}
            <StyledButton className='mt-4' onClick={handleSubmit}>Submit</StyledButton>
        </div>
    );
}

export default S124Warnings;
