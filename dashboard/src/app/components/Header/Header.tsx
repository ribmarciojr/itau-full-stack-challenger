"use client"
import { FormEventHandler, useState } from "react"
import styles from "./style.module.css"

interface ObjectResponse {
    [key: string]: FormDataEntryValue; // Or whatever type suits your data
}

type ResponseError = {
    message : string,
    status_code: number
}

export default function Header() {
    const [responseMessage, setResponseMessage] = useState<string>()
    

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
        event.preventDefault();

        const formElement = event.target as HTMLFormElement
        const formData = new FormData(formElement)


        const objectResponse: ObjectResponse = {}
        const fillResponseWithFormData = formData.forEach((value, key) => objectResponse[key] = value)

        
        const fixedParticipationResponse = Number(objectResponse.participation).toFixed(2)
        objectResponse.participation = fixedParticipationResponse

        console.log(typeof objectResponse.participation)

        const headers = new Headers()
        headers.append("Content-Type", "application/json")

        const participantInformation = JSON.stringify(objectResponse)
        
        const url = "http://127.0.0.1:5000/participant/create"
        
        try {
            const request = await fetch(url, {
                headers,
                method: "POST",
                body: participantInformation
            })
            
            const response = await request.json() as ResponseError
            
            if(response.status_code == 200){
                window.location.reload()
            }

            setResponseMessage(response.message)
            
        } catch (error) {
            console.log("Erro ao enviar informações!")
        }
    };

    return (
        <>
            <div className={styles.form_box} >
                <form onSubmit={handleSubmit} className={styles.form_content}>
                    <input type="text" className={styles.data_input} required placeholder="First Name" name="first_name" />
                    <input type="text" className={styles.data_input} required placeholder="Last Name" name="last_name" />
                    <input type="number" step="0.01" lang="en" min="0" max="100" className={styles.data_input} required placeholder="Participation value" name="participation" />
                    <button type="submit" className={styles.send_data_btn}>SEND</button>
                </form>
            </div>
            {!!responseMessage && <div className={styles.errors_box}>{responseMessage}</div>}
        </>
    )
}