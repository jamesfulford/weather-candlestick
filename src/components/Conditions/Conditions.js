import React from 'react';
import {
    Wrapper,
    Small,
    Loader
} from './Conditions.module.css'
import Chart from "react-google-charts";

const conditions = (props) => {
    console.log(props);
    return (
        <div className={Wrapper}>

            {props.error && <small className={Small}>Please enter a valid city.</small>}

            {props.loading && <div className={Loader} />}


            {Number(props.responseObj.cod) === 200 ?
                <>

                    <Chart
                        width={'100%'}
                        height={350}
                        chartType="CandlestickChart"
                        loader={<div>Loading Chart</div>}
                        data={[
                            ['day', 'a', 'b', 'c', 'd'],
                            ...props.responseObj.list.map(l => [
                                new Date(l.dt * 1000).toLocaleDateString(),
                                l.temp.min,
                                l.temp.morn,
                                l.temp.night,
                                l.temp.max,
                            ])
                        ]}
                        options={{
                            legend: 'none',
                            bar: { groupWidth: '100%' }, // Remove space between bars.
                            candlestick: {
                            fallingColor: { strokeWidth: 0, fill: '#a52714' }, // red
                            risingColor: { strokeWidth: 0, fill: '#0f9d58' }, // green
                            },
                        }}
                        rootProps={{ 'data-testid': 'candlestick-chart' }}
                    />
                
                    {props.responseObj.list.map(l => {
                        return <code>{new Date(l.dt * 1000).toLocaleDateString()} {l.temp.morn} {l.temp.min} {l.temp.max} {l.temp.eve}</code>
                    })}
                </>
            : null
            }
        </div>
    )
}

export default conditions;