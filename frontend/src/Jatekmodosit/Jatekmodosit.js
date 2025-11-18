import { useState } from "react";
import Lenyilojatek from "./Lenyilojatek";
import Modosit from "./Modosit";

const Jatekmodosit = () => {
  const [kivalasztott, setkivalasztott] = useState(1);
  const [talalat, settalalat] = useState(null);
  
  const keres = () => {
    //alert("Kiválasztott játék id: " + kivalasztott);
    settalalat(kivalasztott);
  }
  return (
    <div>
      <div className="alcim">Játék módosítása</div>
      <p>Itt lehet módosítani a játékokat.</p>
      <Lenyilojatek 
        kivalasztott={kivalasztott} 
        setkivalasztott={setkivalasztott} 
      />
      <button className="btn btn-primary" style={{marginTop:"10px"}} onClick={()=>keres()} >Játék keresése</button>
      {talalat && <Modosit kivalasztott={kivalasztott} />}
    </div>
  );
}
export default Jatekmodosit;
