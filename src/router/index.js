import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Fabric from "../views/Fabric.vue";
import FabricTest from "../views/FabricTest.vue";

const routes = [
	{
		path: "/",
		name: "Home",
		component: Home,
	},
	{
		path: "/fabric",
		name: "Fabric",
		component: Fabric,
	},
	{
		path: "/fabrictest",
		name: "FabricTest",
		component: FabricTest,
	},
	{
		path: "/about",
		name: "About",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/About.vue"),
	},
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
});

export default router;
