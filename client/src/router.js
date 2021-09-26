import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Fabric from "./views/Fabric.vue";
import Web3 from "./views/Web3.vue";
import Server from "./views/Server.vue";

import Select from "./views/Select.vue";
import HowToImg from "./views/HowToImg.vue";
import Gallery from "./views/Gallery.vue";
import Owner from "./views/Owner.vue";
import ImageBasic from "./views/ImageBasic.vue";
import MakeContract from "./views/MakeContract.vue";

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
            path: "/server",
            name: "Server",
            component: Server,
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
        {
            path: "/imageBasic",
            name: "ImageBasic",
            component: ImageBasic,
        },
        {
            path: "/makeContract",
            name: "MakeContract",
            component: MakeContract,
        },
    ],
});
