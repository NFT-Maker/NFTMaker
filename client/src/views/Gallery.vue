<template>
    <div>
        <Nav />
        <b-card
            class="mx-2 my-2"
            header-bg-variant="warning"
            header-text-variant="dark"
        >
            <!-- 헤더 -->
            <template #header>
                <h6 class="mb-0">나만의 NFT 갤러리</h6>
            </template>
            <div class="bg-light container-fluid" style="height: 100%">
                <b-card-group deck>
                    <b-card
                        :key="i"
                        v-for="(i, m) of data"
                        title="NFT 정보"
                        :img-src="`${data[m].url}`"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem; min-width:15rem;"
                        class="mb-2"
                    >
                        <b-card-text>
                            발행 컨트랙트 : {{ data[m].CA }}<br />
                            발행 NFT ID : {{ data[m].NFTId }}<br />
                            이미지 url : {{ data[m].url }}
                        </b-card-text>
                    </b-card>
                </b-card-group>
            </div>
        </b-card>
    </div>
</template>
<script>
import Nav from "../components/Nav123.vue";
export default {
    computed: {
        account() {
            return this.$store.state.account;
        },
    },
    name: "",
    components: { Nav },
    data() {
        return {
            contract: {},
            contract1: "0x83a73F15a57D352f2D9C4De97ba357723777f8F2",
            abi2: [],
            abi1: [],
            abi: [],
            url: [],
            myNFT: [],
            nftCount: 0,
            // url로 nft그림 불러와서 그린다
            imgList: [],
            // v-for 이용해서 그림 불러오기
            data: [],
            CA: "",
        };
    },
    setup() {},
    created() {
        // 접속한 EOA 로 CA랑 abi 알아냄
        this.$api("/api/list1", "post", {
            param: [this.$store.state.account],
        }).then((result) => {
            // 알아낼 CA랑 abi로 컨트랙트 연결함
            for (var i = 0; i < result.length; i++) {
                this.contract = new this.$store.state.web3.eth.Contract(
                    eval(result[i].CA_abi),
                    result[i].CA,
                    (this.CA = result[i].CA)
                );
                // 연결한 컨트랙트에서 EOA로 NFT 검색함
                console.log(this.contract);

                this.contract.methods
                    .NFTId()
                    .call()
                    .then((result) => {
                        console.log("nft 개수", result);
                        this.nftCount = result;
                        // NFT id 로 ifps url 주소 알아냄
                        for (var j = 0; j < result; j++) {
                            console.log("포문도니", j);
                            console.log(this.contract);
                            this.wait(j);
                        }
                        console.log("url 배열", this.url);
                    });
            }
        });
    },
    mounted() {},
    unmounted() {},
    methods: {
        wait(jj) {
            this.contract.methods
                .NFTToOwner(jj)
                .call()
                .then((result) => {
                    if (result == this.$store.state.account) {
                        console.log("안녕?", jj);
                        this.myNFT.push(jj);
                        console.log(this.myNFT);
                        this.contract.methods
                            .NFTUrl(jj)
                            .call()
                            .then((result) => {
                                console.log("ipfsurl", result);
                                this.url.push(result);
                                this.data.push({
                                    CA: this.CA,
                                    NFTId: jj,
                                    url: result,
                                });
                                console.log(this.data);
                            });
                    }
                });
        },
    },
};
</script>
