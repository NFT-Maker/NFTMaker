module.exports = {
    listUp: {
        query: "insert into t_eoa (EOA, CA) values ('안녕1', '들어가2')",
    },
    test011: {
        query: `insert into t_eoa set ?`,
    },
    testImgUp: {
        query: `insert into t_basic set ?`,
    },
    mySetListUp: {
        query: `insert into t_mySet set ?`,
    },
    list: {
        query: "select * from t_eoa where t_eoa.CA = ?",
    },
    list1: {
        query: "select * from t_eoa where t_eoa.EOA = ?",
    },
    makeBasicList: {
        query: `select * from t_basic`,
    },
    makeMySet: {
        query: `select * from t_mySet`,
    },
    imageDelete: {
        query: `delete from t_basic where basic_id = ?`,
    },
};
