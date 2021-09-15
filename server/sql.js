module.exports = {
  updatePerson: {
    query: "update t_number set ? where id=?",
  },
  list: {
    query: "select CA from t_eoa",
  },
  listUp: {
    query: "insert into t_eoa (EOA, CA) values ('안녕1', '들어가2')",
  },
};
