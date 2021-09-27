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
                        :img-src="`${data[m].url}`"
                        img-alt="Image"
                        img-top
                        tag="article"
                        style="max-width: 20rem; min-width:15rem;"
                        class="mb-2 text-center"
                    >
                        <b-button
                            v-b-modal:[`example-modal-${m}`]
                            class="mx-1 my-1"
                            variant="dark"
                            >NFT 정보 보기</b-button
                        >

                        <!-- <b-modal
                            title="NFT 정보"
                            header-bg-variant="warning"
                            header-text-variant="dark"
                            body-bg-variant="light"
                            body-text-variant="dark"
                            footer-bg-variant="dark"
                            footer-text-variant="light"
                            :id="`example-modal-${m}`"
                            size="xl"
                        >
                            <b-card class="mx-2 my-2 warnig">
                                <h5>발행 컨트랙트 : {{ data[m].CA }}</h5>
                                <h5>발행 NFT ID : {{ data[m].NFTId }}</h5>
                                <h5>이미지 url : {{ data[m].url }}</h5>
                            </b-card>

                            <img :src="`${data[m].url}`" />
                        </b-modal> -->
                        <b-modal
                            title="NFT 정보"
                            header-bg-variant="warning"
                            header-text-variant="dark"
                            body-bg-variant="light"
                            body-text-variant="dark"
                            footer-bg-variant="dark"
                            footer-text-variant="light"
                            :id="`example-modal-${m}`"
                            size="xl"
                        >
                            <b-img
                                :src="`${data[m].url}`"
                                fluid
                                thumbnail
                            ></b-img>

                            <!-- <b-card class="mx-2 my-2 warnig">
                                <h5>발행 컨트랙트 : {{ data[m].CA }}</h5>
                                <h5>발행 NFT ID : {{ data[m].NFTId }}</h5>
                                <h5>이미지 url : {{ data[m].url }}</h5>
                            </b-card> -->
                            <b-card class="mt-1" title="NFT ID" fluid>
                                {{ data[m].NFTId }}
                            </b-card>
                            <b-card class="mt-1" title="Contract Address" fluid>
                                {{ data[m].CA }}
                            </b-card>

                            <b-card class="mt-1" title="IPFS Url" fluid>
                                {{ data[m].url }}
                            </b-card>
                        </b-modal>
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
            contract: [],
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
            DataNFT: 0,
            aa: "",
        };
    },
    setup() {},
    created() {},
    mounted() {
        this.grid();
    },
    unmounted() {},
    methods: {
        grid() {
            this.$api("/api/list1", "post", {
                param: [this.$store.state.account],
            }).then((result) => {
                // 알아낼 CA랑 abi로 컨트랙트 연결함
                // console.log("처음", result);
                // 문제없음
                for (var i = 0; i < result.length; i++) {
                    this.contract.push(
                        new this.$store.state.web3.eth.Contract(
                            eval(result[i].CA_abi),
                            result[i].CA
                        )
                    );

                    // 연결한 컨트랙트에서 EOA로 NFT 검색함
                    // console.log(this.contract);
                    this.CA = result[i].CA;
                    this.NFTIdCall(this.contract[i], result[i].CA);
                    // console.log("ca", this.CA);
                }
            });
        },

        async NFTIdCall(aa, ca) {
            await aa.methods
                .NFTId()
                .call()
                .then((result) => {
                    // console.log("nft 개수", result);
                    if (result == 0) {
                        return;
                    }
                    this.nftCount = result;
                    // NFT id 로 ifps url 주소 알아냄
                    for (var j = 0; j < result; j++) {
                        // console.log("포문도니", j);
                        // console.log(this.contract);
                        this.wait(aa, j, ca);
                    }
                    // console.log("url 배열", this.url);
                });
        },
        wait(aa, jj, ca) {
            // console.log("그림");
            aa.methods
                .NFTToOwner(jj)
                .call()
                .then((result) => {
                    // console.log("nft 아이디", jj);
                    // console.log("nft 주인", result);
                    // console.log("내어카운트", this.$store.state.account);
                    if (result == this.$store.state.account) {
                        // console.log("안녕?", jj);
                        this.myNFT.push(jj);
                        // console.log(this.myNFT);
                        aa.methods
                            .NFTUrl(jj)
                            .call()
                            .then((result) => {
                                console.log("ipfsurl", result);
                                this.url.push(result);
                                this.data.push({
                                    CA: ca,
                                    NFTId: jj,
                                    url: result,
                                });
                                // console.log(this.data);
                            });
                    }
                });
        },
    },
};
</script>
