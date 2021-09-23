<template>
    <div>
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">testDo.sol 컨트렉트</h5>
                <h6 class="card-subtitle mb-2 text-muted">{{ $store.state.contract }} </h6>

            </div>
        </div>
        <div class="mt-4">
            <h5>ChangeName</h5>
            <input id="" v-model="string" type="text" placeholder="Name" class="mr-3 mt-4" />
            <button type="button" class="btn btn-primary" @click="changeName()">chaneName</button>

            <h5>ViewName</h5>
            <div>{{viewString}}</div>
            <button type="button" class="btn btn-primary" @click="viewName()">viewName</button>

            <h5>ChangeNum</h5>
            <input id="" v-model="uint" type="num" placeholder="Num" class="mr-3 mt-4" />
            <button type="button" class="btn btn-primary" @click="changeNum()">changeNum</button>

            <h5>ViewNum</h5>
            <div>{{viewUint}}</div>
            <button type="button" class="btn btn-primary" @click="viewNum()">viewNum</button>
        </div>

    </div>
</template>
<script>
    import TestDoControl from "../domain/TestDoControl.js"


    export default {
        name: 'TestDoInterface',
        components: {},
        data() {
            return {
                string: "",
                uint: "",
                viewString: "",
                viewUint: "",
                loading: false
            }
        },
        computes: {
            address: function () {
                return this.$store.state.contract
            }
        },
        created: async function () {
            console.log("TestDoInterface_created_start")
            const address = this.$store.state.contract
            const testDoControl = new TestDoControl()
            if (address) {
                // 여기 수정할 것
                this.balance = await testDoControl.getBalance(address, 'ether')
            }
        },
        mounted() {},
        updated() {},
        unmounted() {},
        methods: {
            changeName: async function () {
                const address = this.$store.state.contract
                const testDoControl = new TestDoControl()
                if (address) {
                    this.loading = true
                    try {
                        await testDoControl.changeName(address, this.string)
                    } catch (e) {
                        console.log(e)
                    }
                    this.loading = false
                }
            },

            viewName: async function () {
                const address = this.$store.state.contract
                const testDoControl = new TestDoControl()
                if (address) {
                    this.loading = true
                    try {
                        console.log("여기1")
                       this.viewString = await testDoControl.viewName(address)
                        console.log("여기2")    
                        
                    } catch (e) {
                        console.log(e)
                    }
                    this.loading = false
                }
            },
            changeNum: async function () {
                const address = this.$store.state.contract
                const testDoControl = new TestDoControl()
                if (address) {
                    this.loading = true
                    try {
                        await testDoControl.changeNum(address, this.uint)
                    } catch (e) {
                        console.log(e)
                    }
                    this.loading = false
                }
            },

            viewNum: async function () {
                const address = this.$store.state.contract
                const testDoControl = new TestDoControl()
                if (address) {
                    this.loading = true
                     try {
                        console.log("여기1")
                       this.viewUint = await testDoControl.viewNum(address)
                        console.log("여기2")    
                        
                    } catch (e) {
                        console.log(e)
                    }
                    this.loading = false
                }
            }
        }
    }
</script>