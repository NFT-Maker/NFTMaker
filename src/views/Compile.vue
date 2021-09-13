<template>
    <div>
        <textarea name="" id="" cols="30" rows="10" v-model="message">

        </textarea>
        <p v-for="(a,i) in line" :key="a">{{i}} : {{a}}</p>


    </div>
</template>
<script>
    export default {
        name: '',
        components: {},
        data() {
            return {
                line: ["pragma solidity 0.8.6",
                    "contract Test2{",
                    "string name;",
                    "function changeName (string Memory _ name) public {",
                    "name = _name;}",
                    "function viewName () public view returns (string memory){",
                    "return name;}"
                ]
            }
        },
        created() {},
        mounted() {},
        updated() {},
        unmounted() {},
        methods: {

        }
    }
</script>