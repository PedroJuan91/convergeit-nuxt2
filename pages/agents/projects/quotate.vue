<template>
    <v-content>
        <list :items='data' />
    </v-content>
</template>
<script>
import list from '@/components/agent/projects/fullquotate'
    export default {
        layout: 'agentpayments',
        computed: {
            data(){
                return this.$store.getters['render/quotationlatestclient']
            }
        },
        components: {
            list
        }
    }
</script>
