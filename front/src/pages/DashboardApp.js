import React, { useState, useEffect } from 'react';
import { Box, Grid, Container, Typography } from '@mui/material';
import Page from '../components/Page';
import {
  ReqGraph,
  SensorChart,
  DeviceNumber,
  SensorNumber,
  ActiveSensor,
  InactiveSensor
} from '../components/_dashboard/app';
import Service from '../service/Service';

// ----------------------------------------------------------------------

export default function DashboardApp() {
  const [count, setCount] = useState({
    sensor_data: null
  });

  useEffect(() => {
    console.log('hh')
    new Service()
      .getData()
      .then((res) => {
        console.log(res.data);
        setCount(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // // const device = 1;
  // // const sensor = 4;
  // // const active = 4;
  // // const inactive = 0;
  // // const sensorData = count.sensor_data;
  // // const requestGraph = count.request_graph;

  return (
    <Page title="Хянах самбар">
      <Container maxWidth="xl">
        <Box sx={{ pb: 5 }}>
          <Typography variant="h4">Тавтай морил</Typography>
        </Box>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <DeviceNumber value={count.micro_count} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <SensorNumber value={count.sensor_count} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <ActiveSensor value={count.active_count} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <InactiveSensor value={count.inactive_count} />
          </Grid>

          <Grid item xs={12} md={6} lg={8}>
            <ReqGraph value={count.request_graph} />
          </Grid>

          <Grid item xs={12} md={6} lg={4}>
            <SensorChart value={count.sensor_data} />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}