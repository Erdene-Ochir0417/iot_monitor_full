import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import React, { useState, useEffect } from 'react';
import { BaseOptionChart } from '../../charts';
import Service from '../../../service/Service';
import { useParams } from 'react-router';

// ----------------------------------------------------------------------

export default function AppWebsiteVisits() {
  const { id } = useParams();
  const [data, setData] = React.useState([]);
  const [date, setDate] = React.useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      new Service()
        .getSensorInfo(id)
        .then((res) => {
          console.log(res.data);
          setData(res.data.list);
          setDate(res.data.labels);
        })
        .catch((e) => {
          console.log(e);
        });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const strokeValue = { width: [2, 2, 2, 2] };
  const xaxisValue = { type: 'string' };
  const fillValue = { type: ['solid', 'solid', 'solid', 'solid'] };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: strokeValue,
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: fillValue,
    labels: date,
    xaxis: xaxisValue,
    tooltip: {
      shared: true,
      intersect: false,
      y: {
        formatter: (y) => {
          if (typeof y !== 'undefined') {
            return `${y.toFixed(0)}`;
          }
          return y;
        }
      }
    }
  });

  return (
    <Card>
      <CardHeader title="Мэдрүүрүүдийн утгууд" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={data} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}