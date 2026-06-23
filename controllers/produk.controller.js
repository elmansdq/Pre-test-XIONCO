const db = require("../config/db");

// GET produk + stock + pembelian
exports.getProduk = (req, res) => {
  db.query(`
    SELECT produk.*, stock.qty 
    FROM produk 
    JOIN stock ON produk.id = stock.produk_id
  `, (err, produk) => {

    if (err) return res.send("Error produk");

    db.query(`
      SELECT pembelian.*, produk.nama 
      FROM pembelian 
      JOIN produk ON produk.id = pembelian.produk_id
      ORDER BY pembelian.id DESC
    `, (err2, pembelian) => {

      if (err2) return res.send("Error pembelian");

      res.render("produk", {
        produk,
        pembelian
      });
    });

  });
};

// POST pembelian
exports.beliProduk = (req, res) => {
  const { produk_id, qty } = req.body;

  const sqlStock = "SELECT * FROM stock WHERE produk_id = ?";

  db.query(sqlStock, [produk_id], (err, result) => {
    if (err) return res.send("Error stock");

    const stock = result[0];

    if (!stock || stock.qty < qty) {
      return res.send("Stock tidak cukup");
    }

    const sqlInsert =
      "INSERT INTO pembelian (produk_id, qty) VALUES (?, ?)";

    db.query(sqlInsert, [produk_id, qty], (err2) => {
      if (err2) return res.send("Error beli");

      const sqlUpdate =
        "UPDATE stock SET qty = qty - ? WHERE produk_id = ?";

      db.query(sqlUpdate, [qty, produk_id], (err3) => {
        if (err3) return res.send("Error update stock");

        res.redirect("/produk");
      });
    });
  });
};

// CANCEL PEMBELIAN
exports.cancelPembelian = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM pembelian WHERE id = ?",
    [id],
    (err, result) => {
      if (err) return res.send("Error ambil data");

      const data = result[0];

      if (!data) return res.send("Not found");
      if (data.status === "cancel") return res.send("Sudah cancel");

      db.query(
        "UPDATE pembelian SET status = 'cancel' WHERE id = ?",
        [id],
        (err2) => {
          if (err2) return res.send("Error cancel");

          db.query(
            "UPDATE stock SET qty = qty + ? WHERE produk_id = ?",
            [data.qty, data.produk_id],
            (err3) => {
              if (err3) return res.send("Error restore stock");

              res.redirect("/produk");
            }
          );
        }
      );
    }
  );
};