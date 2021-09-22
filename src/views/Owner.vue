<template>
    <div>
        <FileUp />
        <input
            type="file"
            class="form-control"
            accept="image/png,image/jpeg"
            @change="uploadFile($event.target.files, this.select)"
        />
        <div class="alert alert-secondary" role="alert">
            <ul>
                <li>최대 5개 가능</li>
                <li>이미지 사이즈 : 700*700</li>
                <li>파일 사이즈 : 1M 이하</li>
                <li>파일 확장자 : png, jpg만 가능</li>
            </ul>
        </div>
        <select v-model="select">
            <option :value="0">상장</option>
            <option :value="1">봉사증</option>
            <option :value="2">이수증</option>
        </select>
    </div>
</template>
<script>
import FileUp from "../components/FileUp.vue";
import { $swal } from "../../dapp";

export default {
    name: "",
    components: {
        FileUp,
    },
    data() {
        return {
            sampleData: "",
            select: 0,
        };
    },
    setup() {},
    created() {},
    mounted() {},
    unmounted() {},
    methods: {
        //t_basic 에 이미지 업로드
        async uploadFile(files, type) {
            let name = "";
            let data = null;
            if (files) {
                name = files[0].name;
                data = await this.$base64(files[0]);
            }
            const { error } = await this.$api(
                `/upload/${this.productId}/${type}/${name}`,
                "post",
                {
                    data,
                }
            );
            if (error) {
                return new $swal(
                    "이미지 업로드 실패했습니다. 다시 시도하세요."
                );
            }
            new $swal("이미지가 업로드 되었습니다.");
            // setTimeout(() => {
            //     this.getProductImage();
            // }, 1000);
        },
    },
};
</script>
