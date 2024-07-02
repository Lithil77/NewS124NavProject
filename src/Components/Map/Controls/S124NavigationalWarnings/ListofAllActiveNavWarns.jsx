import React, { useEffect, useState, useContext, useRef } from 'react';
import { ListGroup, Stack, Button, Form, Col, Overlay, Popover, Row } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { S124NavigationalwarningsAPI } from '../../../../appConfig';
import { OLMapContext } from '../../../../Contexts/OlMapContext';
import { StyledButton } from '../../../Reusable/StyledComponent';
import { useColor } from '../../../../Contexts/ColorContext';

const ListofAllActiveNavWarns = () => {

    const { backgroundColor, textColor, borderColor } = useColor();

    const [warnings, setWarnings] = useState([]);
    const [selectedWarning, setSelectedWarning] = useState(null);
    const [filteredWarnings, setFilteredWarnings] = useState([]);
    const { olMap, renderWarningHighlightedFeatures } = useContext(OLMapContext);

    const [selectedS124NavWarStartDate, setSelectedS124NavWarStartDate] = useState(null);
    const [selectedS124NavWarEndDate, setSelectedS124NavWarEndDate] = useState(null);

    const [s124NavWarStartdateCalenderBtnVisible, setS124NavWarStartdateCalenderBtnVisible] = useState(false);
    const [s124NavWarEndDateCalenderBtnVisible, setS124NavWarEndDateCalenderBtnVisible] = useState(false);

    const [showS124NavWarStartDateCalendarDialog, setShowS124NavWarStartDateCalendarDialog] = useState(false);
    const [showS124NavWarEndDateCalendarDialog, setShowS124NavWarEndDateCalendarDialog] = useState(false);

    const S124NavWarStartDateTarget = useRef(null);
    const S124NavWarEndDateTarget = useRef(null);

    useEffect(() => {
        const warnlist = document.getElementById('activewarnlistcontainer');
        const mapvisible = document.getElementById('map-container');
        if (warnlist && mapvisible) {
            mapvisible.append(warnlist);
        }
        fetchlistofallwarnings();
        setS124NavWarStartdateCalenderBtnVisible(true);
        setS124NavWarEndDateCalenderBtnVisible(true);
    }, []);

    const fetchlistofallwarnings = () => {
        axios.get(`${S124NavigationalwarningsAPI}/S-124`)
            .then(response => {
                if (response.data === 'No Active Warnings Found') {
                    toast.warning(response.data);
                    setWarnings([]);
                } else if (Array.isArray(response.data)) {
                    setWarnings(response.data);
                    setFilteredWarnings(response.data);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
                setWarnings([]);
            });
    };

    const handlelistclick = (warningId) => {
        const selectedWarnings = warnings.filter(warning => warning.datasetFileIdentifier === warningId);
        const vectorLayer = renderWarningHighlightedFeatures(selectedWarnings);

        var extent = vectorLayer.getSource().getExtent();
        const shrinkFactor = 0.9;
        const centerX = (extent[0] + extent[2]) / 2;
        const centerY = (extent[1] + extent[3]) / 2;
        const newWidth = (extent[2] - extent[0]) * shrinkFactor;
        const newHeight = (extent[3] - extent[1]) * shrinkFactor;
        const newExtent = [
            centerX - newWidth / 2,
            centerY - newHeight / 2,
            centerX + newWidth / 2,
            centerY + newHeight / 2
        ];
        olMap.getView().fit(newExtent, {
            padding: [100, 100, 100, 100],
            minResolution: 10,
            duration: 1000
        });

    };

    const handledelete = (warningId) => {
        axios.delete(`${S124NavigationalwarningsAPI}/S-124/${warningId}`)
            .then(response => {
                if (response.data === 'Navigational Warning Deleted Successfully') {
                    toast.success(response.data);
                    setFilteredWarnings(prevWarnings => prevWarnings.filter(warning => warning.datasetFileIdentifier !== warningId));
                    setSelectedWarning(null);
                } else if (response.data === 'No Active Warning Found With The ID') {
                    toast.warning(response.data);
                }
            })
            .catch(error => {
                console.error('There was an error!', error);
            });
    };

    const handleCalenderStartDateChange = (selectedDate) => {
        setSelectedS124NavWarStartDate(selectedDate);
        setShowS124NavWarStartDateCalendarDialog(false);
    };

    const handleCalenderEndDateChange = (selectedDate) => {
        setSelectedS124NavWarEndDate(selectedDate);
        setShowS124NavWarEndDateCalendarDialog(false);
    };

    const handleOpenStartDateCalendar = (event) => {
        event.preventDefault();
        S124NavWarStartDateTarget.current = event.target;
        setShowS124NavWarStartDateCalendarDialog(true);
        setShowS124NavWarEndDateCalendarDialog(false);
    };

    const handleOpenEndDateCalendar = (event) => {
        event.preventDefault();
        S124NavWarEndDateTarget.current = event.target;
        setShowS124NavWarEndDateCalendarDialog(true);
        setShowS124NavWarStartDateCalendarDialog(false);
    };

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

    const handleFilter = () => {
        filterWarningsByDate(selectedS124NavWarStartDate, selectedS124NavWarEndDate);
    };

    const filterWarningsByDate = (startDate, endDate) => {
        if (!startDate && !endDate) {
            setFilteredWarnings(warnings);
            toast.warn('Kindly select the start date and the end date.')
            return;
        }

        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const filtered = warnings.filter(warning => {
            const pubDateStr = warning.publicationDate;

            if (!pubDateStr || typeof pubDateStr !== 'string') return false;

            const pubDate = new Date(pubDateStr.split('T')[0]);
            if (isNaN(pubDate)) return false; // Skip if the date is invalid

            if (start && end) {
                return pubDate >= start && pubDate <= end;
            } else if (start) {
                return pubDate >= start;
            } else if (end) {
                return pubDate <= end;
            }
            return true;
        });

        setFilteredWarnings(filtered);
    };

    return (
        <div>
            <Form className='text-center mt-2'>
                <Row>
                    <Col sm={6}>
                        {selectedS124NavWarStartDate == null ?
                            <label className='me-2'>Start:</label>
                            : <label className='me-2'>Start: {convertDateFormat(selectedS124NavWarStartDate).split('T')[0]}</label>
                        }
                        <StyledButton
                            title='Calendar'
                            className={`${s124NavWarStartdateCalenderBtnVisible ? '' : 'disabled'}`}
                            id="btn-Calender"
                            onClick={handleOpenStartDateCalendar}
                            ref={S124NavWarStartDateTarget}
                            style={{ backgroundColor, color: textColor, borderColor }}
                        >
                            <i className='bi bi-calendar'></i>
                        </StyledButton>
                        <Overlay show={showS124NavWarStartDateCalendarDialog}
                            target={S124NavWarStartDateTarget.current} placement='bottom'>
                            <Popover id='popover-contained'>
                                <Popover.Body className='p-0'>
                                    <DatePicker
                                        selected={selectedS124NavWarStartDate}
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
                        {selectedS124NavWarEndDate == null ?
                            <label className='me-2'>End:</label>
                            : <label className='me-2'>End: {convertDateFormat(selectedS124NavWarEndDate).split('T')[0]}</label>
                        }
                        <StyledButton
                            title='Calendar'
                            className={`${s124NavWarEndDateCalenderBtnVisible ? '' : 'disabled'}`}
                            id="btn-Calender"
                            onClick={handleOpenEndDateCalendar}
                            ref={S124NavWarEndDateTarget}
                            style={{ backgroundColor, color: textColor, borderColor }}
                        >
                            <i className='bi bi-calendar'></i>
                        </StyledButton>
                        <Overlay show={showS124NavWarEndDateCalendarDialog}
                            target={S124NavWarEndDateTarget.current} placement='bottom'>
                            <Popover id='popover-contained'>
                                <Popover.Body className='p-0'>
                                    <DatePicker
                                        selected={selectedS124NavWarEndDate}
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
                <Button variant="primary" onClick={handleFilter}>Filter</Button>
            </Form>
            <ListGroup defaultActiveKey="#link1">
                {filteredWarnings.map((warning, index) => (
                    <ListGroup.Item action key={index} >
                        <Stack direction='horizontal' >
                            <div onClick={() => handlelistclick(warning.datasetFileIdentifier)}>
                                <span id="id" >{warning.datasetFileIdentifier}</span>
                                <h6 className='mb-0'>{warning.information}</h6>
                            </div>
                            <Button size='sm' variant='danger' className='ms-auto'><i className='bi bi-trash' onClick={() => handledelete(warning.datasetFileIdentifier)}></i></Button>&nbsp;
                        </Stack>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
};

export default ListofAllActiveNavWarns;
