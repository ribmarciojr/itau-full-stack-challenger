import React, { ReactNode } from 'react';
import styles from "./style.module.css"

interface DataAnalysisComponents {
    children: ReactNode;
  }
  

const DataAnalysis: React.FC<DataAnalysisComponents> = ({children}) => {
    return (
        <div className={styles.panel_box}>
            {children}
        </div>
    )
}

export default DataAnalysis;