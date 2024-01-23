import styles from "./style.module.css"

interface InfoContent {
    title: string,
    subtitle: string,
}

export default function Info({title, subtitle}: InfoContent){
    return (
        <div className={styles.info_box}>
            <div className={styles.info_cont_box}>
                <h1>{title}</h1>
                <p>{subtitle}</p>
            </div>
        </div>
    )
}