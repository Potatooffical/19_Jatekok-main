const { useState, useEffect } = require("react");

const JatekFelvitel = () => {
    const [adatok, setAdatok] = useState([]);
    const [selectedType, setSelectedType] = useState('');
    const [jatekNev, setJatekNev] = useState('');
    const [ertekeles, setErtekeles] = useState('');
    const [ar, setAr] = useState('');
    const [leiras, setLeiras] = useState('');

    useEffect(() => {
        const leToltes = async () => {
            try {
                const response = await fetch("http://localhost:3000/tipus");
                const data = await response.json();
                if (response.ok) {
                    setAdatok(data);
                    if (data.length > 0) setSelectedType(data[0].tipus_id);
                }
            } catch (error) {
                console.error(error);
            }
        };
        leToltes();
    }, []);

    const felvitelFuggveny = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:3000/jatekFelvitel", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                tipus_id: selectedType,
                jatek_nev: jatekNev,
                jatek_ertekeles: ertekeles,
                jatek_ar: ar,
                jatek_leiras: leiras
            })
        });
        const data = await response.json();
        if (response.ok) {
            alert(data.message);
            setJatekNev('');
            setErtekeles('');
            setAr('');
            setLeiras('');
            setSelectedType(adatok[0]?.tipus_id || '');
        } else {
            alert(data.error);
        }
    };

    return (
        <div>
            <h1>Kérem adja meg a felvinni kívánt játék adatait!</h1>
            <form className="alma" onSubmit={felvitelFuggveny}>
                <div>
                    <label>Játék neve:</label>
                    <input type="text" value={jatekNev} onChange={(e) => setJatekNev(e.target.value)} required />
                </div>
                <div>
                    <label>Játék értékelése:</label>
                    <input type="number" min="1" max="10" value={ertekeles} onChange={(e) => setErtekeles(e.target.value)} required />
                </div>
                <div>
                    <label>Játék ára:</label>
                    <input type="number" value={ar} onChange={(e) => setAr(e.target.value)} required />
                </div>
                <div>
                    <label className="label1">Játék leírása:</label>
                    <textarea value={leiras} onChange={(e) => setLeiras(e.target.value)}></textarea>
                </div>
                <div>
                    <label>Típus:</label>
                    <select value={selectedType} onChange={e => setSelectedType(e.target.value)} required>
                        <option value="">-- Válasszon típust --</option>
                        {adatok.map(t => (
                            <option key={t.tipus_id} value={t.tipus_id}>{t.tipus_nev}</option>
                        ))}
                    </select>
                </div>
                <button type="submit">Játék felvitele</button>
            </form>
        </div>
    );
};

export default JatekFelvitel;
