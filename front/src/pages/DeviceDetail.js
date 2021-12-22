import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import editOutlined from '@iconify/icons-ant-design/edit-outlined';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';

// material
import Page from '../components/Page';
import {
  Stack,
  Button,
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContentText,
  DialogContent,
  TextField,
  Box,
  Grid
} from '@mui/material';
import {
  AppWeeklySales,
  SensorValue,
  AppWebsiteVisits,
  MicroController
} from '../components/_dashboard/app';
import Service from '../service/Service';

// ----------------------------------------------------------------------

export default function DeviceDetail() {
  const { id } = useParams();
  const [detail, setDetail] = useState({
    sensorValue: [],
    controllerValue: {}
  });
  const [addOpen, setAddopen] = React.useState(false);
  const [editOpen, setEditopen] = React.useState(false);
  const [values, setValues] = React.useState({controller_id: id});
  const [fullWidth, setFullWidth] = React.useState(true);
  const [maxWidth, setMaxWidth] = React.useState('sm');

  const handleAddOpen = () => {
    setAddopen(true);
  };

  const handleAddClose = () => {
    setAddopen(false);
  };

  const handleAddSubmit = async (event) => {
    event.preventDefault();
    new Service()
      .addSensor(values)
      .then((res) => {
        setDetail({sensorValue: [...detail.sensorValue, res.data],
          controllerValue: detail.controllerValue});
      })
      .catch((e) => {
        console.log(e);
      });
  }

  const onChange = (e) => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    });
  };

  const handleEditOpen = () => {
    setEditopen(true);
  };

  useEffect(() => {
    new Service()
      .getDeviceInfo(id)
      .then((res) => {
        setDetail(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <Page title="Төхөөрөмж">
      <Container maxWidth="xl">
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4">Төхөөрөмжийн мэдээлэл</Typography>
          <Box sx={{ pl: 3 }}>
          <div>
            <Button
              sx={{ mr: 1 }}
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={plusFill} />}
              onClick={handleAddOpen}
            >
              Нэмэх
            </Button>
            <Dialog fullWidth={fullWidth} maxWidth={maxWidth} open={addOpen} onClose={handleAddClose}>
              <DialogTitle>Нэмэх</DialogTitle>
              <DialogContent>
                <DialogContentText> Мэдрэгчийн нэрийг оруулна уу. </DialogContentText>
                <Box
                  noValidate
                  component="form"
                  sx={{
                    p: 4,
                    display: 'flex',
                    flexDirection: 'column',
                    m: 'auto',
                    width: 'fit-content'
                  }}
                >
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <TextField
                        required
                        fullWidth
                        id="outlined-basic"
                        name="name"
                        onChange={onChange}
                        label="нэр"
                        variant="outlined"
                      />
                    </Grid>
                    <Button onClick={handleAddSubmit} fullWidth variant="contained">
                      Нэмэх
                    </Button>
                  </Grid>
                </Box>
              </DialogContent>
              {/* <DialogActions>
                
              </DialogActions> */}
            </Dialog>
          </div>
            <Button
              sx={{ mr: 1 }}
              variant="contained"
              component={RouterLink}
              to="#"
              startIcon={<Icon icon={editOutlined} />}
            >
              Засах
            </Button>
          </Box>
        </Stack>
        <Grid container spacing={3}>
          <Grid item lg={12}>
            <MicroController value={detail.controllerValue} />
          </Grid>
          {detail.sensorValue.map((item) => (
            <Grid item xs={4}>
              <SensorValue value={item} />
            </Grid>
          ))}
          <Grid item xs={12} md={6} lg={12}>
            <AppWebsiteVisits />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}