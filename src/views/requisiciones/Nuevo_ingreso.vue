<template>
  <div>
      <b-card-group deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header=""
        header-tag="header"> 
         <b-row>
           <b-col class="text-center"> 
            Buscar Requisiciones que se han creado y no tienen ingreso o bien tiene la opción de crear un ingreso sin requisición asociada. 
           </b-col>
         </b-row>  
         <b-row>
           <b-col class="text-center">  
            <b-button variant="pdarwin">
              Crear Ingreso sin Requisición
            </b-button>
           </b-col>
         </b-row>  
      </b-card>

      <b-row>
        <b-col>
           <h1>
            Lista de Requisiciones Sin Ingreso
           </h1>
        </b-col>
      </b-row>
      <b-row class="mb-4 mt-4">
          <b-col>
            <b-button @click="buscar()" variant="dark">Buscar</b-button> 
          </b-col>
        </b-row>
  
    </b-card-group> 
  </div>
</template>

<style scoped>

</style>

<script> 
import { mapActions, mapGetters } from 'vuex'
import route from '../../router'


export default {
  name: 'RequisitionNuevoIngreso',
  computed:{  ...mapGetters('clientes', ['clientesFormatRequisition']) },
  components: {   }, 
  async mounted()
  {  
    const payload = {}
    payload.loading = this.$loading
    payload.toast = this.$toast  
    await this.getClientesCotizaciones(payload)  
  },
  methods:{ ...mapActions('clientes', ['getClientesCotizaciones']),
    async changeCliente(item)
    {
      this.form.cliente.value = item.value
      this.form.cliente.text = item.text
    },
    async buscar()
    {
      console.log('iR A BUSCAR')

      

      await route.push({name: 'search_client_add', params:{ id: this.form.cliente.value }})

      
    }
  }
  ,data()
  {
    return { 
      modo_clasico: null,  
      loading : false,   
      form: { 
        cliente: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
      }
     
    }
  }
}
</script>
