<template>
  <v-content>
    <v-layout>
      <v-tooltip bottom><v-btn 
        slot="activator" 
        icon 
        flat 
        @click="returnback"><v-icon large>keyboard_backspace</v-icon></v-btn> <span>Return to View</span> </v-tooltip>
      <v-spacer />
      <span class="display-1 font-weight-black">Edit Order</span>
    </v-layout>
    <v-img 
      v-if="$vuetify.breakpoint.xsOnly" 
      :src="datain.cltimg" 
      height="300px" 
      width="320px"/>
    <v-layout>
      <v-flex>
        <v-img 
          v-if="!$vuetify.breakpoint.xsOnly" 
          :src="datain.cltimg" 
          height="300px" 
          width="320px"/>
      </v-flex>
      <v-flex 
        mx-2 
        xs12 
        sm8 
        md8 >
        <v-list>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon large>person</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ datain.ordnameto }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon large>location_on</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ datain.address }}</v-list-tile-title>
          </v-list-tile>
          <v-list-tile>
            <v-list-tile-avatar>
              <v-icon large>email</v-icon>
            </v-list-tile-avatar>
            <v-list-tile-title>{{ datain.ordsend }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
        <v-flex mt-2>
          <v-list>
            <v-list-tile>
              <v-list-tile-avatar>
                <v-icon>payments</v-icon>
              </v-list-tile-avatar>
              <v-list-tile-content>
                <span>Php {{ total }}.00</span>
              </v-list-tile-content>
            </v-list-tile>
          </v-list>
        </v-flex>
      </v-flex>
    </v-layout>
    <v-layout 
      row 
      wrap>
      <v-flex 
        mt-3 
        xs12 
        sm4 
        md4>
        <v-card dark>
          <v-card-title>
            <h2>Order Status</h2>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
    <v-container>
      <v-layout row>
        <v-flex >
          <span class="body-1 grey--text">Order date: </span> <span class="subheading font-weight-bold">{{ $dateFilter(datain.ordertime) }}</span>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex >
          <span class="body-1 grey--text">Quotation Confirmed: </span> <span class="subheading font-weight-bold">{{ confirm(datain.confirmquotation) }}</span>
        </v-flex>
      </v-layout>
      <v-layout row>
        <v-flex >
          <span class="body-1 grey--text">Client has paid: </span> <span class="subheading font-weight-bold">{{ confirm(datain.hasPaid) }}</span>
        </v-flex>
      </v-layout>
      <v-layout 
        v-if="datain.hasPaid" 
        row>
        <v-flex >
          <span class="body-1 grey--text">Mode of Payment: </span> <span class="subheading font-weight-bold">{{ datain.modepay }}</span>
        </v-flex>
      </v-layout>

    </v-container>
    <v-layout>
      <v-tabs>
        <v-tab 
          v-for="(item, index) in intabs" 
          :key="index">
          <span>{{ item.title }}</span>
        </v-tab>
        <v-tab-item 
          v-for="n in intabs.length" 
          :key="n">
          <v-content v-if="n === 1">
            <v-layout >
              <v-flex 
                xs12 
                sm5 
                md3/>
              <v-flex 
                xs12 
                sm5 
                md5 
                offset-xs0 
                offset-lg2>
                <v-layout justify-end>
                  <v-text-field 
                    :label="label" 
                    v-model="searchInput" 
                    outline/>
                </v-layout>
              </v-flex>
            </v-layout>
            <productPrev :data="searching" />
          </v-content>
          <v-content v-if="n === 2">
            <v-layout>
              <v-flex 
                xs12 
                sm5 
                md3>
                <v-dialog 
                  v-model="dialog" 
                  width="500">
                  <v-btn 
                    slot="activator" 
                    flat ><v-icon large>shopping_cart</v-icon> Go cart</v-btn>
                  <v-card>
                    <v-card-title
                      class="headline grey lighten-2"
                      primary-title
                    >
                      Edit Order
                    </v-card-title>

                    <v-card-text>
                      Confirm on Edit order of <span class="red--text subheading font-weight-bold">{{ datain.ordnameto }}</span>
                    </v-card-text>

                    <v-divider/>

                    <v-card-actions>
                      <v-spacer/>
                      <v-btn 
                        flat 
                        @click="dialog = false">Cancel</v-btn>
                      <v-btn
                        color="primary"
                        flat
                        @click="onsubmit"
                      >
                        I accept
                      </v-btn>

                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-flex>
              <v-flex 
                xs12 
                sm5 
                md5 
                offset-xs0 
                offset-lg2>
                <v-layout justify-end>
                  <v-text-field 
                    :label="label" 
                    v-model="searchInput" 
                    outline/>
                </v-layout>
              </v-flex>
            </v-layout>
            <cartitems :data="searching2" />
          </v-content>
        </v-tab-item>
      </v-tabs>
    </v-layout>
  </v-content>
</template>
<script>
import productPrev from '@/components/create/order/edit/productlist'
import cartitems from '@/components/create/order/edit/checkoutlist'
export default {
  layout: 'orderview',
  components: {
    productPrev,
    cartitems
  },
  data(){
    return {
      intabs: [
        {title: 'Show Products'},
        {title: 'In Cart'}
      ],
      date: new Date(),
      time: new Date(),
      label:'Search for Product',
      searchInput:'',
      dialog: false
    }
  },
  computed: {
    datain(){
      return this.$store.getters.profileOrder(this.$route.params.id)
    },
    getprod(){
      return this.$store.getters['product/listedProducts']
    },
    searching(){
      return this.getprod.filter((item) => {
        return item.prodname.match(this.searchInput)
      })
    },
    cartdata(){
      return this.$store.getters['order/editviewCheckoutList']
    },
    searching2(){
      return this.cartdata.filter((item) => {
        return item.prodname.match(this.searchInput)
      })
    },
    total(){
      return this.cartdata.reduce((total, p) => {
        return total + p.prodprice * p.itemquantity
      }, 0)
    },
    submittableDateTime () {
      const date = new Date(this.date)
      if (typeof this.time === 'string') {
        let hours = this.time.match(/^(\d+)/)[1]
        const minutes = this.time.match(/:(\d+)/)[1]
        date.setHours(hours)
        date.setMinutes(minutes)
      } else {
        date.setHours(this.time.getHours())
        date.setMinutes(this.time.getMinutes())
      }
      return date
    }
  },
  created(){
    this.$store.dispatch('order/preLoadEditProd', this.datain.ordprodlist)
  },
  methods: {
    confirm(conf){
      if (conf){
        return "Yes"
      }else{
        return "No"
      }
    },
    returnback(){
      return this.$router.push('/agents/')
    },
    onsubmit(){
      const products = []
      const date = new Date()
      for(let i in this.cartdata){
        products.push({...this.cartdata[i]})
      }
      const order = {
        orderid: this.datain.id,
        cltimg: this.datain.cltimg,
        cltid: this.datain.cltid,
        ordnameto: this.datain.ordnameto,
        ordsend: this.datain.ordsend,
        address: this.datain.address,
        itemstotal: this.total,
        ordprodlist: products,
        orddate: this.submittableDateTime.toISOString()
      }
      this.$store.dispatch('edit/orderEdit', order)
      .then(() => this.$router.push('/agents'))
      .catch(e => {
        this.text = e.message
        this.snackbar = true
      })
    }

  },
}
</script>
