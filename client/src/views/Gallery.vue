<template>
    <div>
        <Nav />
        <div class="bg-warning container-fluid" style="height: 100%">
            <b-card-group deck>
                <b-card
                    title="Card Title"
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem; min-width:15rem;"
                    class="mb-2"
                >
                    <b-card-text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </b-card-text>

                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
                <b-card
                    :key="i"
                    v-for="(i, img) of url"
                    title="Card Title"
                    :img-src="`${url[img]}`"
                    img-alt="Image"
                    img-top
                    tag="article"
                    style="max-width: 20rem; min-width:15rem;"
                    class="mb-2"
                >
                    <b-card-text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </b-card-text>

                    <b-button href="#" variant="primary">Go somewhere</b-button>
                </b-card>
            </b-card-group>
            <button @click="getContract()">만들어지나 테스트</button>
        </div>
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
            abi1: [
                {
                    inputs: [],
                    stateMutability: "nonpayable",
                    type: "constructor",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "_who",
                            type: "address",
                        },
                        {
                            internalType: "string",
                            name: "_url",
                            type: "string",
                        },
                    ],
                    name: "NFT",
                    outputs: [],
                    stateMutability: "nonpayable",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "address",
                            name: "",
                            type: "address",
                        },
                    ],
                    name: "NFTCount",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "NFTId",
                    outputs: [
                        {
                            internalType: "uint256",
                            name: "",
                            type: "uint256",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "",
                            type: "uint256",
                        },
                    ],
                    name: "NFTToOwner",
                    outputs: [
                        {
                            internalType: "address",
                            name: "",
                            type: "address",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [
                        {
                            internalType: "uint256",
                            name: "",
                            type: "uint256",
                        },
                    ],
                    name: "NFTUrl",
                    outputs: [
                        {
                            internalType: "string",
                            name: "",
                            type: "string",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
                {
                    inputs: [],
                    name: "owner",
                    outputs: [
                        {
                            internalType: "address",
                            name: "",
                            type: "address",
                        },
                    ],
                    stateMutability: "view",
                    type: "function",
                },
            ],
            abi: [],
            url: [],
            // url로 nft그림 불러와서 그린다
            imgList: [],
            // v-for 이용해서 그림 불러오기
        };
    },
    setup() {},
    created() {
        // 접속한 EOA 로 CA랑 abi 알아냄
        this.$api("/api/list1", "post", {
            param: [this.$store.state.account],
        }).then((result) => {
            console.log(result);
            // 알아낼 CA랑 abi로 컨트랙트 연결함
            for (var i = 0; i < result.length; i++) {
                this.contract = new this.$store.state.web3.eth.Contract(
                    result[i].abi,
                    result[i].CA
                );
                // 연결한 컨트랙트에서 EOA로 NFT 검색함
                this.contract.methods
                    .ownerOf(this.$store.state.account)
                    .call()
                    .then((result) => {
                        console.log(result);
                        // NFT id 로 ifps url 주소 알아냄
                        for (var j = 0; j < result.length; j++) {
                            this.contract.methods
                                .NFTUrl(result[j])
                                .call()
                                .then((result) => {
                                    console.log(result);
                                    // url 배열에 알아낸 ifps url 주소 차곡차곡 넣어둠
                                    this.url.push(result);
                                });
                        }
                    });
            }
        });
    },
    mounted() {
        for (var i = 0; i < this.url.length; i++) {
            //IPFS에 업로드 된 해시값을 http링크로 변환
            var link = "https:/" + this.url[i] + ".ipfs.dweb.link";
            console.log(link);

            //cidImgLink 값에 link 저장 => img.src로 v-bind
            this.imgList.push(link);
        }
        console.log(this.imgList);
    },
    unmounted() {},
    methods: {
        async getContract() {
            this.contract = new this.$store.state.web3.eth.Contract(
                this.abi1,
                this.contract1
            );
            console.log(this.contract);
            await this.contract.methods
                .NFTUrl([0])
                .call()
                .then((result) => {
                    console.log(result);
                    // url 배열에 알아낸 ifps url 주소 차곡차곡 넣어둠
                    this.url.push(result);
                });
            console.log("url", this.url);
            console.log("url1", this.url[0]);

            for (var i = 0; i < this.url.length; i++) {
                //IPFS에 업로드 된 해시값을 http링크로 변환
                console.log("i", i);
                var link = "https:/" + this.url[i] + ".ipfs.dweb.link";
                console.log("link", link);

                //cidImgLink 값에 link 저장 => img.src로 v-bind
                this.imgList.push(link);
            }
            console.log("imgList", this.imgList);
        },
    },
};
</script>
