"use client"
import { useEffect, useState } from "react"
import "./style.css"
import { Skeleton } from "@mui/material"

type ParticipantsList = [
    {
        first_name: string,
        last_name: string,
        participation: string,
    }
]

async function getParticipantsList() {
    const url = "http://127.0.0.1:5000/participants/all"
    const res = await fetch(url);
    const repo = await res.json();
    return repo;
}

export default function Spreadsheet() {
    const [participants, setParticipants] = useState<ParticipantsList>()

    useEffect(() => {
        try {
            fetch("http://127.0.0.1:5000/participants/all")
                .then(response => response.json())
                .then((participants: ParticipantsList) => setParticipants(participants))
        } catch (error) {
            console.log(error)
        }

    })

    return (
        <>
            {!!participants ? 
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Participation</th>
                    </tr>
                </thead>

                {!!participants && participants.map((participant, index) => {
                    return (

                        <tbody>
                            <tr>
                                <td>{index + 1}</td>
                                <td>{participant.first_name}</td>
                                <td>{participant.last_name}</td>
                                <td>{participant.participation}</td>
                            </tr>
                        </tbody>
                    ) 
                })                
               }

            </table> : <Skeleton variant="rounded" width={474} height={128} />    
        }
        </>
    )
}