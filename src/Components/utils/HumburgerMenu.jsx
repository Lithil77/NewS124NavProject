import React, { useContext } from 'react';
import { Collapse, ListGroup } from 'react-bootstrap';
import { StyledButton } from '../Reusable/StyledComponent';
import { OLMapContext } from '../../Contexts/OlMapContext';

const HumburgerMenu = () => {

    const { hamburgerMenuOpen, toggleHumburgerMenu } = useContext(OLMapContext);
<<<<<<< HEAD
    const hasBuilder = true;
    const builderHeight = hasBuilder ? 60 : 0;
=======
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84

    return (
        <>
            <div style={{ position: 'relative' }} className='text-center'>
                <div className='d-flex flex-column w-auto position-absolute top-0 end-0 mt-2'>
                    <StyledButton
                        onClick={() => toggleHumburgerMenu(!hamburgerMenuOpen)}
                        aria-controls="mapControlsNavbar"
                        aria-expanded={hamburgerMenuOpen}
                        className='mx-1'
                        style={{ zIndex: '99', top: "50px" }}
                    >
                        <i className="bi bi-list"></i>
                    </StyledButton>
                </div>
                <div className='d-flex w-auto mt-2 position-absolute top-0' style={{ right: '50px', zIndex: '99' }}>
                    <ListGroup horizontal >
<<<<<<< HEAD
                        <ListGroup.Item id="cartButtonList" className='p-0 border-0 me-1' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="layerConfigButtonList" className='p-0 border-0 me-1' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="profileButtonList" className='p-0 border-0 me-1' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                    </ListGroup>
                </div>
                <Collapse in={hamburgerMenuOpen}>
=======
                        <ListGroup.Item id="cartButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="layerConfigButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="profileButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                    </ListGroup>
                </div>
                <Collapse in={hamburgerMenuOpen}>
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
                    <div id="mapControlsNavbar" className='position-absolute end-0' style={{ transition: 'all 0.5s' }}>
                        <ListGroup className='d-flex flex-column mt-5 w-auto mx-1 position-absolute end-0' style={{ zIndex: '99', top: '5px' }}>
                            <ListGroup.Item id="homeButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="zoomInButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="zoomOutButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="previousExtendButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="nextExtendButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="zoomWindowButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="featureInfoButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="measureButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="baseMapsButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="productFilterButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="s124NavWarningsButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                            <ListGroup.Item id="layerswitcherButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        </ListGroup>
<<<<<<< HEAD
=======
=======
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
                    <div id="mapControlsNavbar" className='position-absolute end-0' style={{transition: 'all 0.5s'}}>
                    <ListGroup className='d-flex flex-column mt-5 w-auto mx-1 position-absolute end-0' style={{ zIndex: '99', top: '5px' }}>
                        <ListGroup.Item id="homeButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="zoomInButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="zoomOutButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="previousExtendButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="nextExtendButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="zoomWindowButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="featureInfoButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="measureButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="baseMapsButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="productFilterButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                         <ListGroup.Item id="s124NavWarningsButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                        <ListGroup.Item id="layerswitcherButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }}></ListGroup.Item>
                    </ListGroup>
<<<<<<< HEAD
=======
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
                    </div>
                </Collapse>
                <ListGroup className='d-flex flex-column position-absolute ms-1 w-100' style={{ zIndex: '99', top: '5px' }}>
                    <ListGroup.Item id="attributeQueryButtonList" className='p-0 border-0 w-100' style={{ backgroundColor: 'transparent' }} > </ListGroup.Item>
                </ListGroup>
<<<<<<< HEAD
                <ListGroup className='position-absolute ms-2' style={{ zIndex: '99', top: `${hasBuilder ? `calc(100vh - 9vh)` : `100vh`}` }}>
=======
                <ListGroup className='position-absolute ms-2' style={{ zIndex: '99', top: '85vh' }}>
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
                    <ListGroup.Item id="overViewButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }} > </ListGroup.Item>
                    <ListGroup.Item id="scaleButtonList" className='p-0 border-0' style={{ backgroundColor: 'transparent' }} > </ListGroup.Item>
                </ListGroup>
            </div>
        </>
    );
};

export default HumburgerMenu;
