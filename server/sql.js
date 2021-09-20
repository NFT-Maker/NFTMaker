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
        query: "select t_eoa.CA_abi from t_eoa where t_eoa.CA = ?",
    },
    makeBasicList: {
        query: `select * from t_basic`,
    },
    makeMySet: {
        query: `select * from t_mySet`,
    },
    imageDelete: {
        query: `delete from t_mySet where mySet_id=?`,
    },
};
