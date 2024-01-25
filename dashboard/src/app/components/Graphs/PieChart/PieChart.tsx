"use client"
import { useEffect, useState } from "react";
import "./style.css"
import { Chart } from "react-google-charts";
import { Skeleton } from "@mui/material";

const options = {
    pieHole: 0.4,
    slices: {
        0: { color: "#808080"}
    }
};

var InitialData: InitStatus = [
    ['Nome', 'Porcentagem'],
    ['Nenhum', 100], 
];

type InitStatus = Array<Array<string | number>>

type ParticipantsPayload = [
        {
            first_name: string,
            last_name: string,
            participation: number,
        }
    ]
export default function PieChart() {
    const [data, setData] = useState<InitStatus>(InitialData)
    const [payload, setPayload] = useState<(string | number)[][]>()

    function handleInsertChartData(participants: ParticipantsPayload){
        const newData = [...data]

        participants.map((participant) => {
            const newParticipant = [participant.first_name, participant.participation]
        
            const updateEmptyChartSlice = (data[1][1] as number) - participant.participation
            if(updateEmptyChartSlice >= 0){
                data[1][1] = updateEmptyChartSlice
            }
            
            newData.push(newParticipant)
        })

        setData(newData)
        setPayload(newData)
    }   
    
    let loadChart = true
    useEffect(() => {
        if (loadChart){
            try {
                fetch("http://127.0.0.1:5000/participants/all")
                    .then(response => response.json())
                    .then((participants: ParticipantsPayload) => handleInsertChartData(participants))

            } catch(e) {
                console.log(e)
            }
            
            loadChart = false
        }
    }, [])

    return (       
            !!payload ? <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width="400px"
            height="400px"
            legendToggle /> : <Skeleton variant="circular" width={250} height={250} />
    )
}