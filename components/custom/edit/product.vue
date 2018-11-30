<template>
  <v-flex>
    <v-layout mb-2>
      <v-btn
        icon
        flat
        @click="returnME"><v-icon large>keyboard_backspace</v-icon></v-btn>
      <v-spacer />
      <span class="display-1 font-weight-bold" >Edit Product</span>

    </v-layout>
    <v-form
      ref="form"
      v-model="valid"
      @submit.prevent="submit">
      <v-text-field
        id="prodname"
        v-model="prodname"
        :rules="[rules.required]"
        label="Products name"
        solo-inverted
      />

      <v-text-field
        id="prodimg"
        v-model="prodimg"
        :rules="[rules.required]"
        label="Product image url"/>

      <v-layout row>
        <v-flex
          xs12
          sm12
          md12
          offset-sm2>
          <img
            :src="prodimg"
            height="150">
        </v-flex>
      </v-layout>

      <v-combobox
        v-model="model"
        :filter="filter"
        :hide-no-data="!search"
        :items="items"
        :search-input.sync="search"
        hide-selected
        label="More for Desciption"
        multiple
        small-chips
        solo
      >
        <template slot="no-data">
          <v-list-tile>
            <span class="subheading">Create</span>
            <v-chip
              :color="`${colors[nonce - 1]} lighten-3`"
              label
              small
            >
              {{ search }}
            </v-chip>
          </v-list-tile>
        </template>
        <template
          v-if="item === Object(item)"
          slot="selection"
          slot-scope="{ item, parent, selected }"
        >
          <v-chip
            :color="`${item.color} lighten-3`"
            :selected="selected"
            label
            small
          >
            <span class="pr-2">
              {{ item.text }}
            </span>
            <v-icon
              small
              @click="parent.selectItem(item)"
            >close</v-icon>
          </v-chip>
        </template>
        <template
          slot="item"
          slot-scope="{ index, item, parent }"
        >
          <v-list-tile-content>
            <v-text-field
              v-if="editing === item"
              v-model="editing.text"
              autofocus
              flat
              background-color="transparent"
              hide-details
              solo
              @keyup.enter="edit(index, item)"
            />
            <v-chip
              v-else
              :color="`${item.color} lighten-3`"
              dark
              label
              small
            >
              {{ item.text }}
            </v-chip>
          </v-list-tile-content>
          <v-spacer/>
          <v-list-tile-action @click.stop>
            <v-btn
              icon
              @click.stop.prevent="edit(index, item)"
            >
              <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
            </v-btn>
          </v-list-tile-action>
        </template>
      </v-combobox>
      <v-layout row>
        <v-flex
          xs12
          sm6
          md4>
          <v-text-field
            id="prodprice"
            v-model="prodprice"
            :rules="[rules.required]"
            label="Price"
            mask="######"
            prefix="₱"
            suffix=".00"
            solo-inverted
          />
        </v-flex>
      </v-layout>
      <v-card-actions>
        <v-spacer />
        <v-btn
          :disabled="!validIn"
          type="submit">Submit</v-btn>
      </v-card-actions>
    </v-form>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
      top
    >
      {{ text }}
      <v-btn
        dark
        flat
        @click="snackbar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </v-flex>
</template>
<script>
  export default {
    props: {
      data: {
        type: Object,
        required: true
      }
    },
    data(){
      return {
        activator: null,
        attach: null,
        colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
        editing: null,
        index: -1,
        items: [{
          header: 'Edit here for changes'
        }],
        nonce: 1,
        menu: false,
        model: this.data.proddesc,
        x: 0,
        search: null,
        y: 0,
        prodprice: this.data.prodprice,
        prodname: this.data.prodname,
        prodimg: this.data.prodimg,
        snackbar: false,
        timeout: 3000,
        valid: true,
        text: '',
        rules: {
          email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
          },
          required: value => !!value || 'Required.',
          limit: value=> value.length >= 11 || 'Must be a complete phone number'
        }
      }
    },
    computed: {
      validIn() {
        return this.prodname !== '' &&
               this.prodimg !== '' &&
               this.prodprice !== '' &&
               this.model.length > 0
      }
    },
    watch: {
      model(val, prev) {
        if (val.length === prev.length) return

        this.model = val.map(v => {
          if (typeof v === 'string') {
            v = {
              text: v,
              color: this.colors[this.nonce - 1]
            }
            this.items.push(v)
            this.nonce++
          }

          return v
        })
      },
      user(to, from) {
        this.$router.push('/accounts/login')
      }
    },
    methods: {
      edit(index, item) {
        if (!this.editing) {
          this.editing = item
          this.index = index
        } else {
          this.editing = null
          this.index = -1
        }
      },
      onPickFile () {
        this.$refs.fileInput.click()
      },
      filter(item, queryText, itemText) {
        if (item.header) return false

        const hasValue = val => val != null ? val : ''

        const text = hasValue(itemText)
        const query = hasValue(queryText)

        return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
      },
      returnME(){
        return this.$router.push('/agents/products/' )
      },
      submit(){
        this.text='There is a problem with your inputs. Please try again!'
        if (this.$refs.form.validate()){
          const product = {
            prodid: this.data.id,
            prodname: this.prodname,
            prodimg: this.prodimg,
            proddesc: this.model,
            prodprice: Number(this.prodprice)
          }
          this.$store.dispatch('edit/productEdit', product).then(() => {
            this.$router.push('/agents')
          }).catch(e =>{
            this.text = e.message
            this.snackbar = true
          })
        }else{
          this.snackbar = true
        }
      }
    }
  }
</script>
