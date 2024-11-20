import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Slider,
  Switch,
  FormControlLabel,
  Button,
  Card,
  CardContent,
  Grid,
  Box,
  TextField
} from '@mui/material';

function MobilePricePredictor() {
  const [batteryPower, setBatteryPower] = useState(1500);
  const [blue, setBlue] = useState(true);
  const [clockSpeed, setClockSpeed] = useState(2.5);
  const [dualSim, setDualSim] = useState(true);
  const [fc, setFc] = useState(5);
  const [fourG, setFourG] = useState(true);
  const [intMemory, setIntMemory] = useState(16);
  const [mDep, setMDep] = useState(0.5);
  const [mobileWt, setMobileWt] = useState(150);
  const [nCores, setNCores] = useState(4);
  const [pxHeight, setPxHeight] = useState(800);
  const [pxWidth, setPxWidth] = useState(1200);
  const [ram, setRam] = useState(3000);
  const [scH, setScH] = useState(15);
  const [scW, setScW] = useState(8);
  const [talkTime, setTalkTime] = useState(20);
  const [threeG, setThreeG] = useState(true);
  const [touchScreen, setTouchScreen] = useState(true);
  const [wifi, setWifi] = useState(true);
  const [brand, setBrand] = useState('Alcatel');
  const [priceRange, setPriceRange] = useState(null);

  // Brand mapping
  const brandMap = {
    'Alcatel': 0,
    'Apple': 1,
    'Asus': 2,
    'Google': 3,
    'Huawei': 4,
    'Infinix': 5,
    'LG': 6,
    'Lenovo': 7,
    'Motorola': 8,
    'Nokia': 9,
    'OnePlus': 10,
    'Oppo': 11,
    'Realme': 12,
    'Samsung': 13,
    'Sony': 14,
    'Tecno': 15,
    'Vivo': 16,
    'Xiaomi': 17,
    'ZTE': 18
  };

  // Price range labels
  const priceRangeLabels = {
    0: "Low Price",
    1: "Medium Price",
    2: "High Price",
    3: "Very High Price"
  };

  const handleSubmit = async () => {
    const featureValues = {
      battery_power: batteryPower,
      blue: blue ? 1 : 0,
      clock_speed: clockSpeed,
      dual_sim: dualSim ? 1 : 0,
      fc: fc,
      four_g: fourG ? 1 : 0,
      int_memory: intMemory,
      m_dep: mDep,
      mobile_wt: mobileWt,
      n_cores: nCores,
      pc: pxHeight, // Verify if this is correct
      px_height: pxHeight,
      px_width: pxWidth,
      ram: ram,
      sc_h: scH,
      sc_w: scW,
      talk_time: talkTime,
      three_g: threeG ? 1 : 0,
      touch_screen: touchScreen ? 1 : 0,
      wifi: wifi ? 1 : 0,
      brand: brandMap[brand], // Map brand to numeric value
    };

    try {
      const response = await axios.post('https://na6z3tb1vk.execute-api.us-east-1.amazonaws.com/mlapistage/api', {
        body: JSON.stringify(featureValues)
      });

      // Assuming the Lambda function returns { Prediction: [price_range] }
      const priceRangeIndex = response.data.body ? JSON.parse(response.data.body).Prediction[0] : null;
      setPriceRange(priceRangeIndex !== null ? priceRangeLabels[priceRangeIndex] : "Unknown");
    } catch (error) {
      console.error('Error fetching prediction: ', error);
    }
  };

  return (
    <Container maxWidth="md">
      <Card sx={{ marginBottom: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Mobile Price Prediction
          </Typography>

          {/* Feature Sliders and Inputs */}
          <Grid container spacing={2}>
            {/* Battery Power */}
            <Grid item xs={12} sm={6}>
              <Typography>Battery Power ({batteryPower} mAh)</Typography>
              <Slider
                value={batteryPower}
                onChange={(e, newValue) => setBatteryPower(newValue)}
                min={500}
                max={2000}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* Clock Speed */}
            <Grid item xs={12} sm={6}>
              <Typography>Clock Speed ({clockSpeed} GHz)</Typography>
              <Slider
                value={clockSpeed}
                onChange={(e, newValue) => setClockSpeed(newValue)}
                min={0.5}
                max={3.0}
                step={0.1}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* RAM */}
            <Grid item xs={12} sm={6}>
              <Typography>RAM ({ram} MB)</Typography>
              <Slider
                value={ram}
                onChange={(e, newValue) => setRam(newValue)}
                min={512}
                max={6000}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* Internal Memory */}
            <Grid item xs={12} sm={6}>
              <Typography>Internal Memory ({intMemory} GB)</Typography>
              <Slider
                value={intMemory}
                onChange={(e, newValue) => setIntMemory(newValue)}
                min={4}
                max={256}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* Touch Screen */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={touchScreen} onChange={() => setTouchScreen(!touchScreen)} />}
                label="Touch Screen"
              />
            </Grid>

            {/* Wi-Fi */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={wifi} onChange={() => setWifi(!wifi)} />}
                label="Wi-Fi"
              />
            </Grid>

            {/* 4G */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={fourG} onChange={() => setFourG(!fourG)} />}
                label="4G"
              />
            </Grid>

            {/* Brand */}
            <Grid item xs={12} sm={6}>
              <TextField
                label="Brand"
                variant="outlined"
                fullWidth
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                select
                SelectProps={{
                  native: true,
                }}
              >
                {Object.keys(brandMap).map((brandName) => (
                  <option key={brandName} value={brandName}>{brandName}</option>
                ))}
              </TextField>
            </Grid>

            {/* Dual SIM */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={dualSim} onChange={() => setDualSim(!dualSim)} />}
                label="Dual SIM"
              />
            </Grid>

            {/* Three G */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={threeG} onChange={() => setThreeG(!threeG)} />}
                label="3G"
              />
            </Grid>

            {/* Bluetooth */}
            <Grid item xs={12} sm={6}>
              <FormControlLabel
                control={<Switch checked={blue} onChange={() => setBlue(!blue)} />}
                label="Bluetooth"
              />
            </Grid>

            {/* Additional Features */}
            <Grid item xs={12} sm={6}>
              <Typography>Mobile Weight ({mobileWt} g)</Typography>
              <Slider
                value={mobileWt}
                onChange={(e, newValue) => setMobileWt(newValue)}
                min={100}
                max={250}
                valueLabelDisplay="auto"
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <Typography>Talk Time ({talkTime} hours)</Typography>
              <Slider
                value={talkTime}
                onChange={(e, newValue) => setTalkTime(newValue)}
                min={1}
                max={30}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* Screen Height */}
            <Grid item xs={12} sm={6}>
              <Typography>Screen Height ({scH} cm)</Typography>
              <Slider
                value={scH}
                onChange={(e, newValue) => setScH(newValue)}
                min={5}
                max={20}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* Screen Width */}
            <Grid item xs={12} sm={6}>
              <Typography>Screen Width ({scW} cm)</Typography>
              <Slider
                value={scW}
                onChange={(e, newValue) => setScW(newValue)}
                min={2}
                max={10}
                valueLabelDisplay="auto"
              />
            </Grid>

            {/* Mobile Depth */}
            <Grid item xs={12} sm={6}>
              <Typography>Mobile Depth ({mDep} cm)</Typography>
              <Slider
                value={mDep}
                onChange={(e, newValue) => setMDep(newValue)}
                min={0.1}
                max={1.0}
                step={0.1}
                valueLabelDisplay="auto"
              />
            </Grid>

          </Grid>

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              Predict
            </Button>
          </Box>

          {priceRange && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="h6">Price Range: {priceRange}</Typography>
            </Box>
          )}
        </CardContent>
      </Card>
    </Container>
  );
}

export default MobilePricePredictor;
