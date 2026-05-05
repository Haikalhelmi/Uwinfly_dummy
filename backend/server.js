const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Koneksi ke Database db_kendaraan_listrik
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'db_kendaraan_listrik'
});

db.connect(err => {
    if (err) {
        console.error('Gagal koneksi database:', err);
        return;
    }
    console.log('Database Connected!');
});

// Ambil semua produk untuk halaman utama
app.get('/api/produk', (req, res) => {
    db.query("SELECT * FROM produk", (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

// Ambil detail satu produk berdasarkan ID
app.get('/api/produk/:id', (req, res) => {
    const id = req.params.id;
    db.query("SELECT * FROM produk WHERE id = ?", [id], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json(result);
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server Backend jalan di port ${PORT}`);
});