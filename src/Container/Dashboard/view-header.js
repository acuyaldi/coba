import React from 'react';
import {
    LineChart, Line,
    BarChart, Bar,
    Tooltip
} from 'recharts';

let tinyChartData = [
    {day: '01', growth: 44, traffic: 1440},
    {day: '02', growth: 22, traffic: 3320},
    {day: '03', growth: 58, traffic: 7743},
    {day: '04', growth: 82, traffic: 2280},
    {day: '05', growth: 54, traffic: 4480}
];



const IncomeGrowthTooltip = (props) => {
     const { payload, active } = props;
    if(active) {
        return (
            <div style={{'padding': '3px 7px', background: 'rgba(60,70,75,.9)', 'fontSize': 9, color: '#fff', borderRadius: 2}}>
                {payload[0].value}%
            </div>
        );
    }
    return null;
};

export default () => (
    <div className="view-header d-flex align-items-center">
        <header className="text-black">
            <h1 className="h5 title text-uppercase">Dashboard</h1>
        </header>
    </div>
);
