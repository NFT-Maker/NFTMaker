module.exports = {
  list: {
    query: "select * from t_person",
  },
  createPerson: {
    query: "insert into t_person set ?",
  },
  deletePerson: {
    query: "delete from t_person where id=?",
  },
  updatePerson: {
    query: "update t_person set ? where id=?",
  },
  //첫번째 물음표 첫번째 파라미터, 두번째 물음표 두번째 파라미터
  list: {
    query: "select * from t_number",
  },
  createPerson: {
    query: "insert into t_number set ?",
  },
  deletePerson: {
    query: "delete from t_number where id=?",
  },
  updatePerson: {
    query: "update t_number set ? where id=?",
  },
};
