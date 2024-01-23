import Header from "./components/Header/Header"
import Info from "./components/Info/Info"
import Spreadsheet from "./components/Spreadsheet/Spreadsheet"
import DataAnalysis from "./components/DataAnalysis/DataAnalysis"
import PieChart from "./components/Graphs/PieChart/PieChart"
import DonutChart from "./components/Graphs/DounoutChart/DounoutChart"

export default function Dashboard(){
    
    return (
        <>
            <Header />
            <Info 
                title="Data" 
                subtitle="Lorem Ipsom Dolor"
            />

            <DataAnalysis>
                <Spreadsheet />
                <PieChart />
            </DataAnalysis>
        </>
    )
}