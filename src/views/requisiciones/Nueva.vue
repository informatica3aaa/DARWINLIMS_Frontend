<template>
  <div>
      <b-card-group deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header=""
        header-tag="header"> 
        <b-row>
          <b-col>
            <h1>
              Nueva Requisición (Paso 1 de 3)
            </h1>
          </b-col>
        </b-row>
         <b-row>
           <b-col>
            <p>
              <b>
                Paso 1: Buscar Cotización
              </b>
            </p>
Para crear una requisición, debe basarse en al cotización de un cliente, para lo que debe seleccionar a un cliente o bien buscarlo por el rut.
           </b-col>
         </b-row>  
      </b-card>

      <b-row>
        <b-col>
          <b-form-group 
              label-size="sm"
              description=""
              label="Cliente:"
              label-for="input-1">
            <basic-select
                  :selectedOption="form.cliente"
                  @select="changeCliente"
                  size="sm"  
                  :options="clientesFormatRequisition"
                  placeholder="Seleccione cliente">
              </basic-select> 
             </b-form-group>
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
import { BasicSelect } from 'vue-search-select'
import { mapActions, mapGetters } from 'vuex'
import route from '../../router'


export default {
  name: 'RequisitionSearch_client_quotation',
  computed:{  ...mapGetters('clientes', ['clientesFormatRequisition']) },
  components: { BasicSelect }, 
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
