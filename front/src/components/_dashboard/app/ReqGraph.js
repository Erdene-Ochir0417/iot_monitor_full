import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { Card, CardHeader, Box } from '@mui/material';
//
import { BaseOptionChart } from '../../charts';

// ----------------------------------------------------------------------

export default function ReqGraph(props) {
  console.log(props.value);

  const chartLabels = props.value == null ? [] : Object.keys(props.value).reverse();
  const reqData = props.value == null ? [] : Object.values(props.value).reverse();

  const CHART_DATA = [
    {
      name: 'Хүсэлт',
      type: 'line',
      data: reqData
    }
  ];
  const strokeValue = { width: [2] };
  const xaxisValue = { type: 'string' };
  const fillValue = { type: ['solid'] };

  const chartOptions = merge(BaseOptionChart(), {
    stroke: strokeValue,
    plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
    fill: fillValue,
    labels: chartLabels,
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
      <CardHeader title="Хүсэлтийн тоо" />
      <Box sx={{ p: 3, pb: 1 }} dir="ltr">
        <ReactApexChart type="line" series={CHART_DATA} options={chartOptions} height={364} />
      </Box>
    </Card>
  );
}