import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const SongListDetails=()=>import('components/main/SongListDetails')
const searchpage=()=>import("views/home/child/searchpage")
const mvpage=()=>import("views/home/child/mvpage")
const userpage=()=>import("views/home/child/userpage")
const albumpage=()=>import("views/home/child/albumpage")
const songerpage=()=>import("views/home/child/songerpage")
const find=()=>import("views/find/find")
const video=()=>import("views/video/video")
const mycollect=()=>import("views/collectpage/mycollect")
const personalfm=()=>import("views/personalFM/personalFM")
const recommend=()=>import("views/recommendpage/recommend")
const myradio=()=>import("views/myradio/myradio")

const routes = [
  {
    path: '/', 
    redirect: '/find' 

  },
  {
    path:"/find",
    name:"find",
    component:find
  },
  {
    path:"/video",
    name:"video",
    component:video
  },
  {
    path:"/mycollect",
    name:"mycollect",
    component:mycollect
  },
  {
    path:"/personalfm",
    name:"personalfm",
    component:personalfm
  },
  {
    path:"/recommend",
    name:"recommend",
    component:recommend
  },
  {
    path:"/myradio",
    name:"myradio",
    component:myradio
  },

{
  path:"/playlist/:id",
  name:"SongListDetails",
  component: SongListDetails
},
{
  path:"/search/:keywords",
  name:"searchpage",
  component:searchpage
},
{
  path:"/mvinfo/:type/:id",
  name:"mvpage",
  component:mvpage
},
{
  path:"/user/:id",
  name:"userpage",
  component:userpage
},
{
  path:"/albumpage/:id",
  name:"albumpage",
  component:albumpage
},
{
  path:"/songerpage/:id",
  name:"songerpage",
  component:songerpage
}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
