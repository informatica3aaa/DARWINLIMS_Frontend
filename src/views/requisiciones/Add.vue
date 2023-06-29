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
              <b-form-group
              label-size="sm"
              description="Nombre cliente"
              label="Nombre cliente"
              label-for="input-1">
              <b-form-input size="sm" :disabled="true" id="input-1" v-model="form.cliente_nombre.value"   trim></b-form-input>
            </b-form-group>
            </b-col>
          </b-row> 
  
        <b-row>
          <b-col>
            <b-form-group 
                label-size="sm"
                description=""
                label="Cotizacion"
                label-for="input-1">
              <basic-select
                    :selectedOption="form.cotizacion"
                    @select="changeCotizacion"
                    size="sm"  
                    :options="cotizacionesFormatRequisition"
                    placeholder="Seleccione cotizacion">
                </basic-select> 
               </b-form-group>
          </b-col>
        </b-row>

        <b-row>
            <b-col>
              <b-form-group
              label-size="sm"
              description="Nombre documento"
              label="Nombre Documento"
              label-for="input-1">
              <b-form-input size="sm"  id="input-1" v-model="form.nombre_documento.value"   trim></b-form-input>
            </b-form-group>
            </b-col>
        </b-row> 

        <b-row>
            <b-col>
              <b-form-group
              label-size="sm"
              description="Persona Destinataria"
              label="Persona Destinataria"
              label-for="input-1">
              <b-form-input size="sm"  id="input-1" v-model="form.persona_destinataria.value"   trim></b-form-input>
            </b-form-group>
            </b-col>
        </b-row> 
        <b-row>
          <b-col>
            <b-form-group 
                label-size="sm"
                description=""
                label="Correo Cliente"
                label-for="input-1">
              <basic-select
                    :selectedOption="form.correo_cliente"
                    @select="changeCorreo"
                    size="sm"  
                    :options="email_requisicion"
                    placeholder="Seleccione correo cliente">
                </basic-select> 
               </b-form-group>
          </b-col>
        </b-row>

        <b-row>
            <b-col>
              <b-form-group
              label-size="sm"
              description="otro correo"
              label="Otro correo"
              label-for="input-1">
              <b-form-input size="sm"  id="input-1" v-model="form.correo_otro.value"   trim></b-form-input>
            </b-form-group>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
              <b-form-group
              label-size="sm"
              description="Observaciónes"
              label="Observaciónes"
              label-for="input-1">
              <b-form-input size="sm"  id="input-1" v-model="form.observaciones.value"   trim></b-form-input>
            </b-form-group>
            </b-col>
        </b-row>

        <b-row class="mb-4 mt-4">
            <b-col>
              <b-button @click="siguiente()" variant="dark">Siguiente</b-button> 
            </b-col>
        </b-row>

      </b-card>

  
    </b-card-group> 
  </div>
</template>

<style scoped>

</style>

<script> 
import { BasicSelect } from 'vue-search-select'
import { mapActions, mapGetters,  mapState } from 'vuex'

export default {
  name: 'RequisitionSearch_add',
  computed:{ ...mapState('cotizaciones', ['cotiza']),  ...mapGetters('cotizaciones', ['cotizacionesFormatRequisition']), ...mapGetters('clientes', ['email_requisicion']) },
  components: { BasicSelect }, 
  async mounted()
  {  
    if ( this.$route.params.id  ) 
    { 

      await this.getCotizacionesById({
          loading: this.$loading,
          toast : this.$toast,
          id :  this.$route.params.id
      })

      await this.getClienteEmail({
          loading: this.$loading,
          toast : this.$toast,
          id :  this.$route.params.id
      })

      this.form.cliente_nombre.value = this.cotiza.name
      console.log('email_requisicion::', this.email_requisicion)
    }
  },
  methods:{ ...mapActions('clientes', ['getClienteEmail']),  ...mapActions('cotizaciones', [ 'getCotizacionesById']),
    async changeCorreo(item)
    {
      this.form.correo_cliente.value = item.value
      this.form.correo_cliente.text = item.text
    },
    async changeCotizacion(item)
    {
      this.form.cotizacion.value = item.value
      this.form.cotizacion.text = item.text
    },
    async siguiente()
    {
      console.log('iR A BUSCAR') 
    }
  }
  ,data()
  {
    return { 
      modo_clasico: null,  
      loading : false,   
      form: { 
        cliente: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        cotizacion: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        cliente_nombre: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        nombre_documento: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        persona_destinataria: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        correo_cliente: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        correo_otro: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        observaciones: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
        muestra: { text: null, value: null, isError: false, error: null, class: "select-default" }, 
      }
     
    }
  }
}
</script>
