const express = require("express");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");

let sql = require("./sql.js");
const cors = require("cors");
const solc = require("solc");

// create express
const app = express();

// cors option localhost:8080 에 대해서 CORS자격증명(cors credenials)을 허용(true)
const corsOption = {
    // 허락하는 요청 주소
    origin: "http://localhost:8080",
    // true로 하면 설정한 내용을 response 헤더에 추가
    credentials: true,
};

// express app 에 cors option 적용
app.use(cors(corsOption));

//__dirname 현재폴더 + 폴더명 ("/폴더명")

//리퀘스트 요청할 때 바디로 json 형태의 파라미터를 받는데 그걸 받으려면 선언 해줘야 함
app.use(
    express.json({
        limit: "50mb",
    })
);

// sever setting
// 만약 서버 루트 폴더 내에 '/uploads'라는 폴더가 없다면 fs를 이용하여 해당 폴더를 생성
// 폴더가 생성되지 않은 상태에서 파일 저장 request가 올 수도 있음을 방지
const server = app.listen(3000, () => {
    var dir = __dirname + "/uploads";
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    console.log("Server stared. port 3000.");
});

// file system watch file
// 지금 디렉토리의( __dirname ) sql.js를 본다
// (curr, prev) 지금 파일과 변경된 파일 비교
// 달라졌으면 지금 sql.js를 보고있는 캐쉬를 날려버리고
// sql 새로 정의
fs.watchFile(__dirname + "/sql.js", (curr, prev) => {
    console.log("sql 변경시 재시작 없이 반영되도록 함.");
    delete require.cache[require.resolve("./sql.js")];
    sql = require("./sql.js");
});

// set env variable in '.env.local'
// path example : C:\Projects\Course-Evaluation-System\server\.env.local
dotenv.config({ path: path.join(__dirname, ".env.local") });

// db setting by dotenv
const dbPool = require("mysql").createPool({
    database: process.env.database,
    host: process.env.host,
    port: process.env.port,
    user: process.env.user,
    password: process.env.password,
});

// 우리가 작성한 것들을 실질적으로 전송하는 역할
const sys = {
    async db(alias, param = [], where = "") {
        return new Promise((resolve, reject) =>
            dbPool.query(sql[alias].query + where, param, (error, rows) => {
                if (error) {
                    if (error.code != "ER_DUP_ENTRY") console.log(error);
                    resolve({
                        error,
                    });
                } else resolve(rows);
            })
        );
    },
};

app.post("/api/test11", async (req, res) => {
    console.log("here000");
    console.log(req.body.param);
    console.log(req.body.param[0]);

    try {
        await sys.db("test011", req.body.param[0]);
        res.status(200).send("Ok");
    } catch (err) {
        res.status(500).send({
            error: err,
        });
    }
});

//solc 사용  solc 가 node.js 기반이기때문에 여기서 처리 후 프론트로 보내줘야함
app.post("/compile", async (req, res) => {
    const SafeMathSourceCode = fs.readFileSync("./contract/safemath.sol");
    console.log(req.body.param[0]);

    var input = {
        language: "Solidity",
        sources: {
            "nftMaker.sol": {
                content: req.body.param[0],
            },
        },
        settings: {
            outputSelection: {
                "*": {
                    "*": ["*"],
                },
            },
        },
    };

    try {
        var output = JSON.parse(solc.compile(JSON.stringify(input)));

        for (var contractName in output.contracts["nftMaker.sol"]) {
            var bytecode =
                output.contracts["nftMaker.sol"][contractName].evm.bytecode
                    .object;
            var abi = output.contracts["nftMaker.sol"][contractName].abi;
        }
        res.send({
            abi,
            bytecode,
        });
    } catch (err) {
        res.send(err);
    }
});

// 업로드   '/:이름' -> '이름' 을 파라미터 삼을 수 있다.
app.post("/upload/:type/:fileName", async (request, res) => {
    let { type, fileName } = request.params;
    const dir = `${__dirname}/uploads/${type}`;
    const file = `${dir}/${fileName}`;
    if (!request.body.data)
        return fs.unlink(file, async (err) =>
            res.send({
                err,
            })
        );
    const data = request.body.data.slice(
        request.body.data.indexOf(";base64,") + 8
    );

    //그런 폴더가가 없으면 폴더를 만들어
    if (!fs.existsSync(dir)) fs.mkdirSync(dir);

    //스트링 데이터 형태로 들어온 이미지 파일을 다시 이미지로 변환
    fs.writeFile(file, data, "base64", async (error) => {
        await sys.db("testImgUp", [
            {
                type: type,
                path: fileName,
            },
        ]);

        if (error) {
            res.send({
                error,
            });
        } else {
            res.send("ok");
        }
    });
});

//다운로드
app.get("/download/:type/:fileName", (request, res) => {
    console.log("download", request.params);
    const { type, fileName } = request.params;
    const filepath = `${__dirname}/uploads/${type}/${fileName}`;
    res.header(
        "Content-Type",
        `image/${fileName.substring(fileName.lastIndexOf("."))}`
    );
    // console.log("res", res.header());
    if (!fs.existsSync(filepath))
        res.send(404, {
            error: "Can not found file.",
        });
    else {
        //파일을 클라이언트에 내려주는것
        fs.createReadStream(filepath).pipe(res);
    }
});

// sql로 고고
app.post("/api/:alias", async (req, res) => {
    console.log("alias computed!");
    console.log(req.params.alias);
    console.log(req.body.param);

    try {
        res.send(
            await sys.db(req.params.alias, req.body.param, req.body.where)
        );
    } catch (err) {
        res.status(500).send({
            error: err,
        });
    }
});
