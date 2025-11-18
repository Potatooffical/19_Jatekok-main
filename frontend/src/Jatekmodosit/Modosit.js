import { useState, useEffect } from "react";
import Cim from "../Cim";

const Modosit = ({ kivalasztott, setkivalasztott }) => {
  const [adatok, setAdatok] = useState([]);
  const [tolt, setTolt] = useState(true);
  const [hiba, setHiba] = useState(false);
  const [egyjatek, setegyjatek] = useState(null);
  const Adatmodosit = async (e) => {
    try {   
        const response = await fetch(Cim.Cim + "/jatekmodosit/" + kivalasztott, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                jatek_nev: egyjatek.jatek_nev,
            }),
        });
        const data = await response.json();
        if (response.ok) {
            alert("Sikeres módosítás!");
        }
    } catch (error) {
        console.log(error);
    }
    };
  useEffect(() => {
    const leToltes = async () => {
      try {
        const response = await fetch(Cim.Cim + "/jatekegy/" + kivalasztott);
        const data = await response.json();
        if (response.ok) {
          setegyjatek(data[0]);
          setTolt(false);
        } else {
          setHiba(true);
          setTolt(false);
        }
      } catch (error) {
        console.log(error);
        setHiba(true);
      }
    };
    leToltes();
  }, [kivalasztott]);

  if (tolt)
    return (
      <div style={{ textAlign: "center" }}>Adatok betöltése folyamatban...</div>
    );
  else if (hiba) return <div>Hiba</div>;
  else
    return (
      <div>
        <form onSubmit={Adatmodosit}>
          <div className="doboz">
            <span>Játék neve modositása</span>
            <input
              type="text"
              value={egyjatek.jatek_nev}
              onChange={(e) =>
                setegyjatek({ ...egyjatek, jatek_nev: e.target.value })
              }
            />
          </div>
          <div className="doboz">
            <button className="btn btn-success" type="submit">
              modositas
            </button>
          </div>
        </form>
      </div>
    );
};
export default Modosit;
