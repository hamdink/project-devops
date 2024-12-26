// ** MUI Imports
import Grid from '@mui/material/Grid'
import { fetchUserData } from '../api/appConfig'


// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'

// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'
import React, { useEffect, useState } from 'react';

// ** Demo Components Imports
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'
import RequireAuth from 'src/@core/layouts/components/RequireAuth'
import ReservationTable from 'src/views/tables/dailyReservation'

const Dashboard = () => {

  return (
    <RequireAuth>
    <ApexChartWrapper>
      <Grid container spacing={6}>

        <Grid item xs={12} md={6} lg={8}  >
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <WeeklyOverview />
        </Grid>

        <Grid item xs={12} >
        <ReservationTable />
                </Grid>



      </Grid>
    </ApexChartWrapper>
    </RequireAuth>
  )

};

export default Dashboard;



