<template>
  <v-content>
      <v-layout>
        <v-flex>
          <v-layout>
            <v-btn @click="backhome" icon flat><v-icon large>keyboard_backspace</v-icon></v-btn>
          </v-layout>
        </v-flex>
        <v-flex xs12 sm5 md5 offset-xs0 offset-lg2>
          <v-layout justify-end>
            <v-text-field outline :label='label'  v-model='searchInput'></v-text-field>
          </v-layout>
        </v-flex>
      </v-layout>
      <v-flex>
          <v-card class='card' v-for="(item, index) in searching" :key="index">
             <v-list >
                <v-list-group>
                    <v-list-tile slot="activator">
                        <v-card-title>{{item.cltname}}</v-card-title>
                    </v-list-tile>
                    <v-card-text>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-sub-title><span class="caption">Client email: </span><span class="black--text">{{item.cltemail}}</span></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-sub-title><span class="caption">Client Phone Number: </span><span class="black--text">{{item.cltphone}}</span></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-sub-title><span class="caption">Client Address: </span><span class="black--text">{{item.cltaddress}}</span></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-sub-title><span class="caption">Quotation Approve in: </span><span class="black--text">{{$dateFilter(item.approvetime)}}</span></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-card-text>
                </v-list-group>
              </v-list>
          </v-card>
      </v-flex>
  </v-content>
</template>
<script>
    export default {
        props: {
            items: {
                type: Array,
                required: true
            }
        },
        data(){
            return {
                label: 'Search for Quotations',
                searchInput: ''
            }
        },
        computed: {
            searching(){
                return this.items.filter((item) => {
                    return item.cltname.match(this.searchInput)
                })
            }
        },
        methods: {
          backhome(){
            return this.$router.push('/agents/projects')
          }
        }

    }
</script>
<style scoped>
  .card {
    display: inline-block;
    display: table;
    float: left;
    margin: 3px;
    width: 260px;
  }
</style>
