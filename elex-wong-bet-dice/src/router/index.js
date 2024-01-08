import { createRouter, createWebHashHistory } from "vue-router";

function include(path) {
  return () => import("@/views/" + path);
}

const routes = [
  {
    path: "/",
    name: "Index",
    component: include("index"),
    meta: { title: 'Crazydice' }
  },
  {
    path: "/diceBets",
    name: "DiceBets",
    component: include("diceBets"),
    meta: { title: 'DiceBets' }
  },
  {
    path: "/referral",
    name: "Referral",
    component: include("referral"),
    meta: { title: 'Referral' }
  },
  {
    path: "/dividend",
    name: "Dividend",
    component: include("dividend"),
    meta: { title: 'Dividend' }
  },
  {
    path: "/slot",
    name: "SlotGame",
    component: include("slotGame"),
    meta: { title: 'Slot Game' }
  },
  {
    path: "/races",
    name: "Races",
    component: include("races"),
    meta: { title: 'Races' }
  },
  {
    path: "/slotBets",
    name: "SlotBets",
    component: include("slotBets"),
    meta: { title: 'SlotBets' }
  },
  {
    path: "/riskyFarmer",
    name: "RiskyFarmer",
    component: include("riskyFarmer"),
    meta: { title: 'Risky Farmer' }
  },
  {
    path: "/games",
    name: "Games",
    component: include("games"),
    meta: { title: 'Games' }
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

router.beforeEach((to)=>{
  localStorage.setItem('routeNow',to.name);
});

export default router;