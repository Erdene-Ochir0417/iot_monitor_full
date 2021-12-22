import { Icon } from '@iconify/react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Card, Typography, Grid, Box } from '@mui/material';
import outlineRouter from '@iconify/icons-ic/outline-router';
import cpuIcon from '@iconify/icons-whh/cpu';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none'
  // textAlign: 'center',
  // padding: theme.spacing(5, 0)
  // color: theme.palette.warning.darker,
  // backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  color: theme.palette.warning.dark
}));
// ----------------------------------------------------------------------

export default function MicroController(props) {
  console.log('props', props);
  const { name, type, apiKey, sensorCount, createdAt, sendSecond, active, inActive } = props.value;

  return (
    <RootStyle>
      <Card style={{ border: '1px solid', borderColor: '#E3E3E3' }}>
        <Box sx={{ p: 3 }}>
          <Grid container justifyContent="center" alignItems="center" spacing={2}>
            <Grid item xs={2}>
              <IconWrapperStyle>
                <Icon icon={cpuIcon} width="1920" height="1920" />
              </IconWrapperStyle>
            </Grid>
            <Grid container item xs={10}>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">Нэр:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{name}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">Төрөл:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{type}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">API Key:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{apiKey}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">Мэдрүүрийн тоо:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{sensorCount}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">Үүсгэсэн огноо:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{createdAt}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">Илгээх секунд:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{sendSecond}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">Идэвхтэй мэдрүүр:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{active}</Typography>
                </Grid>
              </Grid>
              <Grid container item xs={6} spacing={2}>
                <Grid item>
                  <Typography variant="body1">Идэвхгүй мэдрүүр:</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body1">{inActive}</Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Card>
    </RootStyle>
  );
}