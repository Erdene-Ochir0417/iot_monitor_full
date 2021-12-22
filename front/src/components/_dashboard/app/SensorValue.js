import { Icon } from '@iconify/react';
import bugFilled from '@iconify/icons-ant-design/bug-filled';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, CardHeader, Typography, Grid, Box } from '@mui/material';
import roundSensorsOff from '@iconify/icons-ic/round-sensors-off';
import baselineSensors from '@iconify/icons-ic/baseline-sensors';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  // textAlign: 'center',
  padding: theme.spacing(5, 0)
  // backgroundColor: '#FFFFFF',
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.success.dark
}));

const TOTAL = 234;

export default function SensorValue(props) {
  console.log(props.value.status);
  const { status, name, high, low, avg, uuid } = props.value;
  // ({ a, b } = { a: 10, b: 20 });

  return (
    <Card style={{ border: '1px solid', borderColor: '#E3E3E3' }}>
      <Box sx={{ p: 3 }}>
        <Grid container columnSpacing={2}>
          <Grid container item justifyContent="center" alignItems="center" xs={5}>
            <Grid item>
              <IconWrapperStyle>
                <Icon icon={baselineSensors} width={72} height={72} />
              </IconWrapperStyle>
            </Grid>
            <Grid item>
              <Typography variant="body1">{name}</Typography>
            </Grid>
          </Grid>
          <Grid
            container
            item
            direction="column"
            justifyContent="center"
            alignItems="center"
            xs={7}
          >
            <Grid container item spacing={1}>
              <Grid item>
                <Typography variant="body2">API key:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{uuid}</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Typography variant="body2">Төлөв:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{status}</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Typography variant="body2">Их:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{high}</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Typography variant="body2">Бага:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{low}</Typography>
              </Grid>
            </Grid>
            <Grid container item spacing={1}>
              <Grid item>
                <Typography variant="body2">Дундаж:</Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">{avg}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </Card>
  );
}