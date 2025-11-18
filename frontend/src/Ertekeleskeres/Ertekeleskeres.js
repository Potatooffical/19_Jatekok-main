import Cim from "../Cim"
import "../App.css"
import React, { useState } from "react";

const Ertekeleskeres = () => {
  const [adatok, setAdatok] = useState([]);
  const [ertekeles, setErtekeles] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const Ertekeleskereses = async () => {
    // Input validation
    if (!ertekeles || ertekeles < 1 || ertekeles > 10) {
      setError("Kérem adjon meg egy értékelést 1 és 10 között!");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const bemenet = {
        "jatek_ertekeles": ertekeles
      };
      
      const response = await fetch(Cim.Cim + "/ertekeleskeresjatek", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bemenet)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Hiba történt a keresés során");
      }

      setAdatok(data);
    } catch (err) {
      setError(err.message);
      setAdatok([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>
        Kérem adja meg a keresett játék(ok) értékelését min 1 max 10 között!
      </h1>
      <form className="alma" onSubmit={(e) => e.preventDefault()}>
        <label>Játék értékelése:</label>
        <input 
          type="number" 
          value={ertekeles}
          onChange={(e) => setErtekeles(e.target.value)}
          min="1"
          max="10"
        />
        <button 
          type="button" 
          onClick={Ertekeleskereses}
          disabled={isLoading}
        >
          {isLoading ? "Keresés..." : "Keresés"}
        </button>
      </form>

      {error && <div className="error-message">{error}</div>}
      
      {isLoading && <div>Keresés folyamatban...</div>}

      <div>
        {adatok.length > 0 ? (
          adatok.map((item) => (
            <div key={item.jatek_id} className="kartya">
              <h2>{item.jatek_nev}</h2>
              <p>Értékelés: {item.jatek_ertekeles}</p>
              <p>Ár: {item.jatek_ar} Ft</p>
              <p>Leírás: {item.jatek_leiras}</p>
            </div>
          ))
        ) : !isLoading && !error && (
          <p>Nincs találat a megadott értékeléssel.</p>
        )}
      </div>
    </div>
  );
};

export default Ertekeleskeres;
