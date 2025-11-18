import { useState, useEffect } from "react"
import Cim from "../Cim"

const Modosit = ({ kivalasztott, setkivalasztott }) => {
    const [adatok, setAdatok] = useState([])
    const [tolt, setTolt] = useState(true)
    const [hiba, setHiba] = useState(false)
    
    useEffect(() => {
        const leToltes = async () => {
        try {
            const response = await fetch(Cim.Cim + "/jatekegy/" + kivalasztott)
            const data = await response.json()
            if (response.ok) {
                setAdatok(data)
                setTolt(false)
            } else {
                setHiba(true)
                setTolt(false)
            }
        } catch (error) {
            console.log(error)
            setHiba(true)
        }
    }
        leToltes()
    }, [kivalasztott])

    if (tolt)
        return (
            <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>
        )
    else if (hiba)
        return (
            <div>Hiba</div>
        )

    else return (
        <div>
           
        </div>
    )
}
export default Modosit
