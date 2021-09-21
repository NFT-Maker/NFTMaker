<template>
    <div>
        <b-card-group deck>
            <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
            <b-card
                title="Card Title"
                img-src="https://picsum.photos/600/300/?image=25"
                img-alt="Image"
                img-top
                tag="article"
                style="max-width: 20rem;"
                class="mb-2"
            >
                <b-card-text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                </b-card-text>

                <b-button href="#" variant="primary">Go somewhere</b-button>
            </b-card>
        </b-card-group>
    </div>
</template>
<script>
export default {
    name: "",
    components: {},
    data() {
        return {
            contract: "",
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
                    .balanceOf(this.$store.state.account)
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
    methods: {},
};
</script>
