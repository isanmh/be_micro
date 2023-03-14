// // model query mysql
// module.exports = {
//   fetchData: (db, callback) => {
//     db.query("SELECT * FROM contacts", callback);
//   },
//   getById: (db, id, callback) => {
//     db.query("SELECT * FROM contacts WHERE id = ?", [id], callback);
//   },
//   insertData: (db, data, callback) => {
//     db.query("INSERT INTO contacts SET ?", [data], callback);
//   },
//   updateData: (db, data, id, callback) => {
//     db.query("UPDATE contacts SET ? WHERE id =? ", [data, id], callback);
//   },
//   deleteData: (db, id, callback) => {
//     db.query("DELETE FROM contacts WHERE id = ? ", [id], callback);
//   },
//   search: (db, keyword, callback) => {
//     db.query(
//       "SELECT * FROM contacts WHERE name LIKE ? OR phone LIKE ?",
//       [`%${keyword}%`, `%${keyword}%`],
//       callback
//     );
//   },
// };
