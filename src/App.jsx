
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { OLMapProvider } from './Contexts/OlMapContext.jsx';
import { UtilityProvider } from './Contexts/UtilityContext.jsx';
import { ColorProvider } from './Contexts/ColorContext.jsx';
import './index.css';
import { ProductFilterProvider } from './Contexts/ProductFilterContext.jsx';
import { RTZFileProvider } from './Contexts/RTZFileContext.jsx';
import OlMap from './Components/Map/Controls/OlMap/OlMap';
import Home from './Components/Map/Controls/Home/Home';
import ZoomIn from './Components/Map/Controls/ZoomIn/ZoomIn';
import PreviousExtend from './Components/Map/Controls/PreviousExtend/PreviousExtend';

<<<<<<< HEAD
import ProductFilter from './Components/Map/Controls/ProductFilter/ProductFilter';
import AttributeQuery from './Components/Map/Controls/AttributeQuery/AttributeQuery';
import LayerSwitcher from './Components/Map/Controls/LayerSwitcher/LayerSwitcher';
import FeatureInfo from './Components/Map/Controls/FeatureInfo/FeatureInfo';
import User from './Components/General/Dashboard/Authentication/User';
import ZoomOut from './Components/Map/Controls/ZoomOut/ZoomOut';
import NextExtend from './Components/Map/Controls/NextExtend/NextExtend';
import MousePosition from './Components/Map/Controls/MousePosition/MousePosition';
import Scale from './Components/Map/Controls/Scale/Scale';
import OverView from './Components/Map/Controls/OverView/OverView';
import ZoomWindow from './Components/Map/Controls/ZoomWindow/ZoomWindow';
import BaseMaps from './Components/Map/Controls/BaseMaps/BaseMaps';
import Measure from './Components/Map/Controls/Measure/Measure';
import Dashboard from './Components/General/Dashboard/Dashboard';
=======
<<<<<<< HEAD
import ProductFilter from './Components/Map/Controls/ProductFilter/ProductFilter';
import LayerSwitcher from './Components/Map/Controls/LayerSwitcher/LayerSwitcher';
import AttributeQuery from './Components/Map/Controls/AttributeQuery/AttributeQuery';
=======
>>>>>>> 8a4e9d4a89bc04620d0687c2b84403b304539033

>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83

function App() {

    const MapComponents = () => {
        return(
          <div>
                 <OlMap />
<Home />
<ZoomIn />
<PreviousExtend />
<undefined />
<<<<<<< HEAD
<ProductFilter />
<AttributeQuery />
<LayerSwitcher />
<FeatureInfo />
<User />
<ZoomOut />
<NextExtend />
<MousePosition />
<Scale />
<OverView />
<ZoomWindow />
<BaseMaps />
<Measure />
=======
<<<<<<< HEAD
<ProductFilter />
<LayerSwitcher />
<AttributeQuery />
=======
>>>>>>> 8a4e9d4a89bc04620d0687c2b84403b304539033
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
          </div>
        );
    };

    return (
        <>
        <ColorProvider>
            <OLMapProvider>
                <UtilityProvider>
                <ProductFilterProvider>
                <RTZFileProvider>
                     <Router>
                        <Routes>
                          <Route path="/" element={<MapComponents />} />
                          <Route path="/mainLayout/:projectName/:projectId" element={<MapComponents />} />
<<<<<<< HEAD
                          <Route path="/userDashboard/:projectName/:projectId" element={<Dashboard />} />
=======
                          
>>>>>>> aed419737ce16b1fb706c4378d56f6129b74df83
                        </Routes>
                     </Router>
                </RTZFileProvider>
                </ProductFilterProvider>
                </UtilityProvider>
            </OLMapProvider>
        </ColorProvider>
        <ToastContainer
                position="top-center"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="colored"
              />
        </>
    );
}
export default App;
        