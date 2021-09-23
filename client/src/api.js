import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000";
axios.defaults.headers.post["Content-Type"] = "application/json;charset=utf-8";
axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

export default {
    mounted() {
        // 계정 정보를 store에 저장
        // this.$emit("change-path", this.$route.path);
    },
    methods: {
        // 서버 연결
        async $api(url, method, data) {
            return (
                await axios({
                    method: method,
                    url: url,
                    data: data,
                }).catch((e) => {
                    console.log(e);
                })
            ).data;
        },

        //사용자가 업로드 한 파일을 읽어서
        //데이터 url 형태로 바꿔주는것
        $base64(file) {
            return new Promise((resolve) => {
                var a = new FileReader();
                a.onload = (e) => resolve(e.target.result);
                a.readAsDataURL(file);
            });
        },
    },
};
