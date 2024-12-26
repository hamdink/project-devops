import React, { useEffect, useState } from 'react'

// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Button from '@mui/material/Button'
import { useTheme } from '@mui/material/styles'
import CardHeader from '@mui/material/CardHeader'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import { weeklyReservationStats } from 'src/pages/api/appConfig'

// ** Icons Imports
import DotsVertical from 'mdi-material-ui/DotsVertical'

// ** Custom Components Imports
import ReactApexcharts from 'src/@core/components/react-apexcharts'

const WeeklyOverview = () => {
  const [stats, setStats] = useState([])

  // ** Hook
  const theme = useTheme()

  // useEffect(() => {
  //   async function fetchWeeklyStats() {
  //     try {
  //       const data = await weeklyReservationStats();
  //       setStats(data);
  //       console.log(data)
  //     } catch (error) {
  //       console.error('Erreur lors de la récupération des statistiques hebdomadaires :', error);
  //     }
  //   }

  //   fetchWeeklyStats();
  // }, []);

  const maxReservationsDay = stats.reduce((maxDay, stat) => {
    return stat.count > maxDay.count ? stat : maxDay
  }, stats[0])
  const dayForChart = stats.map(stat => stat.day)

  const colors = stats.map(stat => {
    return stat.day === maxReservationsDay.day ? theme.palette.primary.main : theme.palette.background.default
  })

  const options = {
    chart: {
      parentHeightOffset: 0,
      toolbar: { show: true }
    },
    plotOptions: {
      bar: {
        borderRadius: 9,
        distributed: true,
        columnWidth: '40%',
        endingShape: 'rounded',
        startingShape: 'rounded'
      }
    },
    stroke: {
      width: 2,
      colors: [theme.palette.background.paper]
    },
    legend: { show: false },
    grid: {
      strokeDashArray: 7,
      padding: {
        top: -1,
        right: 0,
        left: -12,
        bottom: 5
      }
    },
    dataLabels: { enabled: false },
    colors: colors,
    states: {
      hover: {
        filter: { type: 'none' }
      },
      active: {
        filter: { type: 'none' }
      }
    },
    xaxis: {
      categories: dayForChart,
      tickPlacement: 'on',
      labels: { show: true },
      axisTicks: { show: false },
      axisBorder: { show: false }
    },
    yaxis: {
      show: true,
      tickAmount: 4,
      labels: {
        offsetX: -6,
        formatter: value => `${value > 999 ? `${(value / 1000).toFixed(0)}` : value}`
      }
    }
  }
  const dataForChart = stats.map(stat => stat.count)

  return (
    <Card>
      <CardHeader
        title='Weekly Recap '
        titleTypographyProps={{
          sx: { lineHeight: '2rem !important', letterSpacing: '0.15px !important' }
        }}
      />
      <CardContent sx={{ '& .apexcharts-xcrosshairs.apexcharts-active': { opacity: 0 } }}>
        <ReactApexcharts type='bar' height={205} options={options} series={[{ data: dataForChart }]} />
      </CardContent>
    </Card>
  )
}

export default WeeklyOverview
