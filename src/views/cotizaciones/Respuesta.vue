<template>
  <div>
    <b-container class="h-75 d-inline-block mt-4" fluid >
      <b-container class="mt-4">
      <b-row>
        <b-col>
          <b-card bg-variant="success" v-if="accion==2">
            <b-row>
              <b-col class="text-center">
                <h1>Cotización Aprobada</h1>
              </b-col>
            </b-row>
            
          </b-card>
          <b-card bg-variant="danger" v-if="accion==3">
            <b-row>
              <b-col class="text-center">
                <h1>Cotización Rechazada</h1>
              </b-col>
            </b-row>
            
          </b-card> 
          <b-card bg-variant="danger" v-if="accion==1000">
            <b-row>
              <b-col class="text-center">
                <h1>Algo salio mal </h1>
              </b-col>
            </b-row>
            
          </b-card> 

        </b-col>
 

      </b-row>
      </b-container>
    </b-container>


  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'RespuestaView',
  computed:{
 
  }, 
  async mounted()
  { 
    this.accion = 0 

    if ( this.$route.params.accion && this.$route.params.token ) 
    {
      const respuesta = await this.confirmarCotizacion({
        loading     : this.$loading,
        toast       : this.$toast,
        modulo      : 'cotizaciones',
        estado      : this.$route.params.accion,
        token      : this.$route.params.token 
      })

      if(respuesta)
        return this.accion = this.$route.params.accion

        this.accion = 1000
    
    } 
 
  
  },
  methods: { 
    ...mapActions('cotizaciones', ['confirmarCotizacion'])
   
  }
  ,data()
  {
    return {  
      accion: 0      
    }
  }
}
</script>
