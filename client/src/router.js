import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Fabric from "./views/Fabric.vue";
import Web3 from "./views/Web3.vue";
import TestDoHard from "./views/TestDoHard.vue";
import TestDoSimple from "./views/TestDoSimple.vue";
import Server from "./views/Server.vue";
import SelectContractCode from "./views/SelectContractCode.vue";
import Home1 from "./views/Home1.vue";
import Select from "./views/Select.vue";
import HowToImg from "./views/HowToImg.vue";
import Gallery from "./views/Gallery.vue";
import Owner from "./views/Owner.vue";

Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: "home",
            component: Home,
        },
        {
            path: "/fabric",
            name: "Fabric",
            component: Fabric,
        },
        {
            path: "/web3",
            name: "Web3",
            component: Web3,
        },
        {
            path: "/testDoHard",
            name: "TestDoHard",
            component: TestDoHard,
        },
        {
            path: "/testDoSimple",
            name: "TestDoSimple",
            component: TestDoSimple,
        },
        {
            path: "/server",
            name: "Server",
            component: Server,
        },
        {
            path: "/selectContractCode",
            name: "SelectContractCode",
            component: SelectContractCode,
        },
        {
            path: "/home1",
            name: "Home1",
            component: Home1,
        },
        {
            path: "/select",
            name: "Select",
            component: Select,
        },
        {
            path: "/howToImg",
            name: "HowToImg",
            component: HowToImg,
        },
        {
            path: "/gallery",
            name: "Gallery",
            component: Gallery,
        },
        {
            path: "/owner",
            name: "Owner",
            component: Owner,
        },
    ],
});