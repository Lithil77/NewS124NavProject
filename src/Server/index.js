import cors from 'cors';
import bodyParser from 'body-parser';
import axios from 'axios';
import express from "express";
import { serverPort, dashBoardApiUrl, SaiTimerApiUrl } from './config.js';

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

<<<<<<< HEAD
=======
=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
app.listen(serverPort, () => {
    console.log(`App is running on port ${serverPort}`);
});

app.get('/getFeatureInfo', async (req, res) => {
    try {
        const response = await axios.get(req.query.param, {
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch layers from geosever' });
    }
});

app.get('/getLayerExtent', async (req, res) => {
    try {
        const response = await axios.get(req.query.param, {
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch layer MetaData from geosever' });
    }
});

app.get('/getAttributeQueryValues', async (req, res) => {
    try {
        const response = await axios.get(req.query.param, {
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from external domain.' });
    }
});

app.get('/getProducerCodes', async (req, res) => {
    try {
        const response = await axios.get(req.query.param, {
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from external domain.' });
    }
});

<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84
app.get('/getLayerOfLayerGroup', async (req, res) => {

    const { param } = req.query;
  
    try {
      const response = await axios.get(param, {
        auth: {
          username: 'admin',
          password: 'geoserver'
        }
      });
      res.json(response.data);
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).json({ error: 'Failed to fetch data from GeoServer' });
    }
  });

app.get('/getWarnings', async (req, res) => {
    try {
        const response = await axios.get(req.query.param, {
        });
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch data from external domain.' });
    }
});
<<<<<<< HEAD
=======
=======
>>>>>>> 51672d5f138b4eb84622956442c1c4837ee6bb8f
>>>>>>> b9629baa6d12eff5d2ffed82bbd9569191ab1d84

app.get("/exchangeset", (req, res) => {
    axios.get(`${dashBoardApiUrl}/exchangeset`)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to fetch data from external domain." });
        });
});

app.delete("/exchangeset/:id", async (req, res) => {
    try {
        const providerId = req.params.id;
        const thirdPartyApiUrl = `${dashBoardApiUrl}/exchangeset` + providerId;

        const response = await axios.delete(thirdPartyApiUrl, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });

        res.json({ success: true, message: `exchangeset with ID ${providerId} deleted successfully.` });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete exchangeset." });
    }
});

app.get("/dataset", (req, res) => {
    axios.get(`${dashBoardApiUrl}/dataset`)
        .then((response) => {
            res.json(response.data);
        })
        .catch((error) => {
            console.error("Error:", error);
            res.status(500).json({ error: "Failed to fetch data from external domain." });
        });
});

app.delete("/dataset/:id", async (req, res) => {
    try {
        const providerId = req.params.id;
        const thirdPartyApiUrl = `${dashBoardApiUrl}/dataset` + providerId;

        const response = await axios.delete(thirdPartyApiUrl, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });

        res.json({ success: true, message: `Dataset with ID ${providerId} deleted successfully.` });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete Dataset." });
    }
});

app.get("/providers", async (req, res) => {
    try {
        const response = await axios.get(`${dashBoardApiUrl}/providers`);
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch data from external domain." });
    }
});

app.get("/providers/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const response = await axios.get(`${dashBoardApiUrl}/providers/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to fetch provider details." });
    }
});

app.put('/providers/:id', async (req, res) => {
    try {
        const providerId = req.params.id;
        const formData = req.body;
        const thirdPartyApiUrl = `${dashBoardApiUrl}/providers/${providerId}`;

        const response = await axios.put(thirdPartyApiUrl, formData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });
        res.json({ success: true, message: 'Provider updated successfully' });
    } catch (error) {
        console.error('Error updating provider with third-party API:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});

app.post('/providers', async (req, res) => {
    try {
        const formData = req.body;
        const id = formData.id;
        const agencyCodes = formData['Agency Codes'];
        const agencyName = formData['Agency Name'];
        const agencyNumber = formData['Agency Number'];
        const countryName = formData['Country Name'];
        const countryCode = formData['Country Code'];
        const members = formData.Members;
        const thirdPartyApiUrl = `${dashBoardApiUrl}/providers`;
        const requestData = [
            {
                "id": id,
                "Agency Codes": agencyCodes,
                "Agency Name": agencyName,
                "Agency Number": agencyNumber,
                "Country Name": countryName,
                "Country Code": countryCode,
                "Members": members
            }
        ];
        const response = await axios.post(thirdPartyApiUrl, requestData, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });
        res.json({ success: true, message: 'Provider added successfully' });
    } catch (error) {
        console.error('Error adding provider with third-party API:', error);
        res.status(500).json({ success: false, message: 'Internal Server Error' });
    }
});


app.delete("/providers/:id", async (req, res) => {
    try {
        const providerId = req.params.id;
        const thirdPartyApiUrl = `${dashBoardApiUrl}/providers/` + providerId;

        const response = await axios.delete(thirdPartyApiUrl, {
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
        });

        res.json({ success: true, message: `Provider with ID ${providerId} deleted successfully.` });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to delete provider." });
    }
});

app.get('/windpointsfromsail', async (req, res) => {
    const apiUrl = `${SaiTimerApiUrl}`;
    const queryParams = new URLSearchParams(req.query).toString();
    const headers = {
        'Authorization': 'zWT3dCzx28LlAKsqyIixk2MJ0iOC6J',
    };
    try {
        const response = await fetch(`${apiUrl}${queryParams}`, { headers });
        const data = await response.json();
        if (data === 'Datetime of request is in the past') {
            res.json({ message: `Datetime of request is in the past.` });
        } else {
            res.json(data);
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal Server error' });
    }
});

app.get('/api/sailtimer', (req, res) => {

    var data = req.url.split("?")[1];
    let config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: `${SaiTimerApiUrl}` + data,
        headers:
        {
            'Authorization': 'zWT3dCzx28LlAKsqyIixk2MJ0iOC6J'
        }
    };

    axios.request(config)
        .then((response) => {
            console.log(JSON.stringify(response.data));
            if (response.data === 'Datetime of request is in the past') {
                res.send(response.data);
            } else {
                res.send(response.data);
            }
        })
        .catch((error) => {
            console.log(error);
        });
})