<template>
  <div>

    <div>
      <h1>라이브러리</h1>
      <label for="tags-basic">Type a new tag and press enter</label>
      <b-form-tags input-id="tags-basic" v-model="contractLibraryInput" placeholder="ex) safemath.sol"></b-form-tags>
      <p class="mt-2">contractLibraryInput: {{ contractLibraryInput }}</p>

      <div>
        <b-button @click="contractLibraryInputConvert()">Convert</b-button>
        <p class="mt-2">contractLibrary: {{ contractLibrary }}</p>
      </div>
    </div>

    <div>
      <h1>컨트렉트 이름</h1>
      <b-form-input v-model="contractName" placeholder="contractName"></b-form-input>
      <div class="mt-2">contractName: {{ contractName }}</div>
    </div>

    <div>
      <h1>컨트렉트 변수</h1>
      <!-- 타입을 설정 -->
      <b-form-select v-model="contractContentVariableSelected" :options="contractContentVariableType"></b-form-select>
      <div class="mt-3">Selected: <strong>{{ contractContentVariableSelected }}</strong></div>
    </div>

    <div>
      <textarea v-model="file" name="" id="" cols="100" rows="30"></textarea>
      <b-button @click="test(1,1)">test</b-button>

    </div>
  </div>
</template>
<script>
  export default {
    name: '',
    components: {},
    data() {
      return {
        contractLibraryInput: [],
        contractLibrary: [],
        contractName: '',
        file: null,
        contractContentVariableType: [{
            value: null,
            text: "Select an option"
          },
          {
            value: "address",
            text: "address"
          },
          {
            value: "uint",
            text: "uint"
          },
          {
            value: "string memory",
            text: "string"
          },
        ],
        contractContentVariableSelected: null,


      }
    },
    created() {},
    mounted() {

    },
    updated() {},
    unmounted() {},
    methods: {
      contractLibraryInputConvert() {
        this.contractLibrary = [];
        for (var i = 0; i < this.contractLibraryInput.length; i++) {
          var value = "import" + ' "' + this.contractLibraryInput[i] + '"'

          this.contractLibrary.push(value)
          console.log(value)
        }
      },

      createNewFile() {
        var blob = new Blob([this.file], {
          type: "text/plain"
        });

        console.log(blob)
        console.log(blob.size, blob.type)

        var url = this.window.URL.createObjectUrl(blob)
        var a = this.document.createElement('a')
        a.href = url
        a.download = "download.sol"
        a.click()
        a.remove()
        this.window.URL.revokeObjectURL(url)
      },



    }
  }
</script>