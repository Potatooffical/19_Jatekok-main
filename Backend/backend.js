const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const app = express()
const port = 3000

app.use(cors())
app.use(express.json())
app.use("/kepek",express.static("kepek"))
app.use("/kepek2",express.static("kepek2"))

const pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'jatek2025'
        })

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/tipus', (req, res) => {
        const sql=`SELECT * from tipus`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
app.get('/jatek', (req, res) => {
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id`
        pool.query(sql, (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})

app.post('/jatekKeresTip', (req, res) => {
        const {tipus_id} =req.body
        const sql=`
                select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id
                where tipus_id=?
                `
        pool.query(sql,[tipus_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
app.delete('/jatekTorles/:jatek_id', (req, res) => {
        const {jatek_id} =req.params
        const sql=`delete from jatek where jatek_id=?`
        pool.query(sql,[jatek_id], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
       
        return res.status(200).json({message:"Sikeres törlés"})
        })
})
//INSERT INTO `jatek`(`jatek_id`, `jatek_nev`, `jatek_ertekeles`, `jatek_ar`, `jatek_leiras`, `jatek_tipus`) VALUES ('[value-1]','[value-2]','[value-3]','[value-4]','[value-5]','[value-6]')
app.post('/jatekFelvitel', (req, res) => {
    const {jatek_nev, jatek_ertekeles,jatek_ar,jatek_leiras, jatek_tipus = req.body.tipus_nev || req.body.tipus_id } = req.body;
    if (!jatek_tipus) {
      return res.status(400).json({ error: "Hiányzik a játék típusa" });
    }
    const sql = `INSERT INTO jatek (jatek_nev, jatek_ertekeles, jatek_ar, jatek_leiras, jatek_tipus)
                 VALUES (?, ?, ?, ?, ?)`;
    pool.query(sql, [jatek_nev, jatek_ertekeles, jatek_ar, jatek_leiras, jatek_tipus], (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Adatbázis hiba" });
        }
        res.json({ message: "Sikeres felvitel!" });
    });
});
//jatekok keresese ertekeles szerint
app.post('/ertekeleskeresjatek', (req, res) => {
        const {jatek_ertekeles} =req.body
        const sql=`select *from jatek where jatek_ertekeles>? `
        pool.query(sql,[jatek_ertekeles], (err, result) => {
        if (err) {
            console.log(err)
            return res.status(500).json({error:"Hiba"})
        }
        if (result.length===0){
            return res.status(404).json({error:"Nincs adat"})
        }

        return res.status(200).json(result)
        })
})
//post jatekkeres
app.get('/jatekegy/:jatek_id', (req, res) => {
    const {jatek_id} = req.params;
    const sql = `select *
                from jatek
                inner join tipus
                on jatek_tipus=tipus_id
                where jatek_id=?`;
    pool.query(sql, [jatek_id], (err,result) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Adatbázis hiba" });
        }
        res.json(result);
    });
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


