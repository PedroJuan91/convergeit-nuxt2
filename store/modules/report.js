import firebase from 'firebase'
import slices from '@/static/rawDat'
import jspdf from 'jspdf'
export default {
  namespaced: true,
  state: {
    perClient: []
  },
  getters: {
    filterdate(state){
      return state.perClient.sort((dateA, dateB) => {
        return dateA.orddate < dateB.orddate
      })
    }
  },
  mutations: {
    perClt(state, payload){
      state.perClient = payload
    }
  },
  actions: {
    getCltOrder({commit, dispatch, getters, rootGetters}, payload){
      const agent = rootGetters.agentKey
      async function getData(){
        let loads = []
        const rooter = await firebase.database().ref()
        const data = await rooter.child(`orders/${agent}`).once('value', snap => {
          const inside = snap.val()
          for(let n in inside){
            if(inside[n].cltid == payload){
              loads.push({id: n, ...inside[n]})
            }
          }
        })
        commit('perClt', loads)
      }
      return getData().catch(e => console.log('error on getCltOrder', e))
    },
    convertpfd({commit, dispatch, getters, rootGetters}, id){
      let dataInfo
      const page_margin = 10
      const page_size = 'a4'
      const page_width = 210
      const vspace = 10
      const content_width = page_width - (page_margin * 2)
      const data = rootGetters.profileOrder(id)

      function mm2px(mil){
        const inch = mil / 25.4
        return inch * 72
      }
      function px2mm(mil){
        const inches = mil /25.4
        return inches * 72
      }
      function imgsize(img_w, img_h, img_mm_w){
        if(img_mm_w > content_width){
          img_mm_w = content_width
        }
        if(mm2px(img_mm_w) > img_w){
          return 'the Image is way too big'
        }
        const img_mm_h = Math.round((px2mm(img_h) * img_mm_w) / px2mm(img_w))

        return {
          w: img_mm_w,
          h: img_mm_h,
          center_x: (page_width - img_mm_w) / 2}
      }
      let doc = new jspdf('p','mm', page_size)
      const con_img = imgsize(slices.w, slices.h, 60)
      const lineHeight = 30
      doc.setProperties({
        title: data.id,
        subject: `${data.id} info`,
        author: 'Converge IT Solutions'
      })
      doc.addImage(slices.src, 'PNG', con_img.center_x, page_margin, con_img.w, con_img.h)
      doc.save(data.id)


    }
  }
}
