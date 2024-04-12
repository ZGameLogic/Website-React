import React, {useEffect, useState} from 'react';
import {getSotData} from '../services/ZGameLogicAPI';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Label, Legend,
    Rectangle,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';
import {
    SOTDataToPercentageOfYes,
    SOTDataToSuccessRateOfPlan,
    SOTDataToYesPercentageByDay, SOTDataToYesPercentageByDayAndSuccess
} from '../helpers/DataConversions';
import '../style/Graphs.css';
import {BEN_COLOR, GREG_COLOR, JJ_COLOR, PATRICK_COLOR} from '../constants';

function SeaOfThieves() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getSotData().then(res => {
           setData(res.data);
        });
    }, []);

    return data.length === 0 ? <><h1>Loading...</h1></> :
        <>
            <div className='sot-graph'>
                <h2 style={{textAlign: 'center'}}>Plan Success Rate</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={SOTDataToSuccessRateOfPlan(data)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis/>
                        <Tooltip/>
                        <Bar dataKey="rate" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='sot-graph'>
                <h2 style={{textAlign: 'center'}}>Rate of joining a plan</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={SOTDataToPercentageOfYes(data)}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="name"/>
                        <YAxis>
                            <Label value="Percentage (%)" angle={-90} position='insideLeft'
                                   style={{textAnchor: 'middle'}}/>
                        </YAxis>
                        <Tooltip/>
                        <Bar dataKey="rate" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue"/>}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='sot-graph'>
                <h2 style={{textAlign: 'center'}}>Number of Yeses on a day</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={SOTDataToYesPercentageByDay(data)}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="Ben" stackId="a" fill={BEN_COLOR}/>
                        <Bar dataKey="Greg" stackId="a" fill={GREG_COLOR}/>
                        <Bar dataKey="JJ" stackId="a" fill={JJ_COLOR}/>
                        <Bar dataKey="Patrick" stackId="a" fill={PATRICK_COLOR}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
            <div className='sot-graph'>
                <h2 style={{textAlign: 'center'}}>Number of Yeses on a day with success</h2>
                <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                        width={500}
                        height={300}
                        data={SOTDataToYesPercentageByDayAndSuccess(data)}
                        margin={{
                            top: 20,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"/>
                        <XAxis dataKey="day"/>
                        <YAxis/>
                        <Tooltip/>
                        <Legend/>
                        <Bar dataKey="Ben" stackId="a" fill={BEN_COLOR}/>
                        <Bar dataKey="Greg" stackId="a" fill={GREG_COLOR}/>
                        <Bar dataKey="JJ" stackId="a" fill={JJ_COLOR}/>
                        <Bar dataKey="Patrick" stackId="a" fill={PATRICK_COLOR}/>
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </>;
}

export default SeaOfThieves;