<template>
  <div>
      <b-card-group deck>
      <b-card
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Datos de la cotización"
        header-tag="header"> 

         <b-row>
           <b-col>
             Datos de la Cotización
           </b-col>
         </b-row> 

        <b-row>
          <b-col> 
            <table class="table striped  table-bordered ">
              <tbody>
                <tr>
                  <td class="text-right">Rut</td> <td class="text-left"> 
                    <b>{{ cliente.rut }}-{{ cliente.dv }}</b>
                  </td> 
                </tr>
                <tr v-if="cotiza">
                     <td class="text-right">Cotización</td> <td class="text-left">{{ cotiza.quotation_number}}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Nombre</td> <td class="text-left">{{ cliente.name }}</td>
                  
                </tr>
                <tr>
                  <td class="text-right">Estado</td> <td class="text-left">
                     <span v-if="cliente.active==true">Activo</span> 
                     <span v-if="cliente.active==false">Inactivo</span> 
                    </td>
                  
                </tr>
                <tr>
                  <td class="text-right">Inicio</td> <td class="text-left">{{ new Date(cotiza.created) |   dateFormat('YYYY-MM-DD') }}</td> 
                </tr>
                <tr>
                  <td class="text-right">Expiración</td>  <td class="text-left">{{  new Date(cotiza.expiration_date) |   dateFormat('YYYY-MM-DD') }}</td>
                </tr>
                <!-- <tr>
                  <td class="text-right">Pago previo</td> <td >
                        <input type="radio" id="uno" value="Uno" v-model="picked"><label for="uno">Si</label>
                        <input type="radio" id="Dos" value="Dos" v-model="picked"><label for="Dos">No</label>
                        <span>Eligió: {{ picked }}</span>
                  </td>
                </tr> -->
              </tbody>
            </table>
        
         
          </b-col> 
        </b-row> 
   
      </b-card>
      <b-card 
        class="mt-1"
        border-variant="darwin"
        header-bg-variant="darwin"
        header="Servicios seleccionado en estado temporal"
        header-tag="header"> 
        <b-row>
          <b-check v-model="modo_clasico">Modo clasico</b-check>
        </b-row>
        <b-row>
          <b-col cols="3">
            <b-button @click="clear_filters()" variant="primary" size="sm">Restablecer filtros</b-button>
          </b-col>
        </b-row>
        <div v-if="modo_clasico"> 
          <vue-bootstrap-typeahead  
            :serializer="re => re.name" 
            placeholder="Resultados"
            :data="resultados"
            ref="typeahead"
            @hit="selected"
            @input="lookupUser"  
            v-model="form.buscar">  
              <template slot="suggestion" slot-scope="{ data }">
              <div class="d-flex align-items-center"> 
                <b>{{ data.name }} </b> <span class="text-muted"> , {{ data.assay_name }} : {{ data.technique_name }} : {{ data.digestion_name }} : {{ data.digestion_name }} </span>
              </div>
            </template>
          </vue-bootstrap-typeahead>  

        </div>
        <div v-if="!modo_clasico">
        <b-row> 
          <b-col>

            
            <b-form-group 
              label-size="sm"
              description="tipo de ensayo"
              label="Tipo de ensayo"
              label-for="input-1">
            <basic-select
                  :selectedOption="form.tipo_ensayo"
                  @select="changeEnsayo"
                  size="sm"  
                  :options="ensayosFormat"
                  placeholder="tipos de ensayo">
              </basic-select> 
             </b-form-group>

             

          </b-col>
          <b-col>

            <b-form-group 
              label-size="sm"
              description="tipo de muestra"
              label="Tipo de muestra"
              label-for="input-1">
              <basic-select
                  :isDisabled="block_filtros_otro"
                  :selectedOption="form.tipo_muestra"
                  @select="changeMuestra"
                  size="sm"  
                  :options="muestrasFormat"
                  placeholder="tipos de muestras">
              </basic-select> 
             </b-form-group>
          </b-col>
        </b-row>

        <b-row> 
          <b-col>
            <b-form-group 
              label-size="sm"
              description="Elemento quimico"
              label="Tipo de elemento"
              label-for="input-1">
            <basic-select
                  :isDisabled="block_filtros_otro"
                  :selectedOption="form.tipo_elemento"
                  @select="changeElemento"
                  size="sm"  
                  :options="elementosFormat"
                  placeholder="Seleccione elemento quimico">
              </basic-select> 
             </b-form-group>


          </b-col>
          <b-col>
              
            <b-form-group 
              label-size="sm"
              description="Unidad"
              label="Tipo de unidad"
              label-for="input-1">
              <basic-select
                  :isDisabled="block_filtros_otro || block_filtros_p_mecanica" 
                  :selectedOption="form.tipo_unidad"
                  @select="changeUnidad"
                  size="sm"  
                  :options="unidadesFormat"
                  placeholder="seleccione unidad">
              </basic-select> 
             </b-form-group>

          </b-col>
        </b-row>
        <b-row>  
            <b-col>
                <b-form-group 
              label-size="sm"
              description="tipo de digestion "
              label="Tipo de digestion"
              label-for="input-1">
              <basic-select
                  :isDisabled="block_filtros_otro || block_filtros_p_mecanica"
                  :selectedOption="form.tipo_digestion"
                  @select="changeDigestion"
                  size="sm"  
                  :options="digestionesFormat"
                  placeholder="tipos de digestiones">
              </basic-select> 
             </b-form-group> 
          </b-col>
          <b-col>
              <b-form-group 
              label-size="sm"
              description="tipo de tecnica"
              label="Tipo de tecnica"
              label-for="input-1">
              <basic-select
                  :isDisabled="block_filtros_otro || block_filtros_p_mecanica"
                  :selectedOption="form.tipo_tecnica"
                  @select="changeTecnica"
                  size="sm"  
                  :options="tecnicasFormat"
                  placeholder="tipos de tecnicas">
              </basic-select> 

             </b-form-group>
               
          </b-col> 
          
        </b-row> 
        <b-row class="mt-4"> 
          <b-col sm="12">
          <b-button-group class="col-sm-12"> 
              <basic-select
                  :selectedOption="form.servicio"
                  @select="changeServicio"
                  size="sm"  
                  :options="serviciosFormat"
                  placeholder="Agregar sevicio">
              </basic-select>  
                <b-button @click="agregarServicios" variant="dark" size="sm">Agregar</b-button>
            </b-button-group>
          </b-col>
        </b-row>
      
        <b-row class="mt-4">
          <b-col sm="12">
            <b-button  @click="showModal()" size="sm" variant="dark">Importar servicios desde una cotización existente</b-button>
          </b-col>
        </b-row>
      </div>
        <hr> 
        <b-row class="mt-3"> 
            <b-col sm="12">
                <h3>Servicios seleccionados en estado temporal</h3>
                <b-button variant="primary" @click="selectAllRows()" size="sm">Seleccionar todos</b-button>
                <b-button class="m-2" variant="primary" @click="agregarSeleccionados()" size="sm">Agregar todos los seleccionados</b-button>
                <b-table
                    ref="selectableTable"
                    class="mt-1"
                    striped="striped"
                    :items="servicios_agregados"
                    :fields="fields"
                    :per-page="porPagina"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    stacked="md"
                    :busy="isBusy"
                    show-empty
                    small
                    :outlined="true"
                    :bordered="true"
                    :selectable="true"
                    @row-selected="onRowSelected"
                    >  
         
                <template #cell(cost)="row">   
                  <b-input size="sm" v-model="row.item.cost"  ></b-input>
                  
                 </template> 
                 <template #cell(acciones)="row">   
                    <b-button-group size="sm">
                        <b-button  @click="eliminarServicio(row.item)"  variant="danger" >Eliminar</b-button>
                        <b-button variant="dark" @click="elegirServicio(row.item)" >Agregar</b-button>
                    </b-button-group>
                 </template> 
                 <template #cell(name)="row">  
                    <b-row>
                        <b-col sm="12" class="text-left">
                            <b>
                                {{ row.item.name }} 
                            </b>
                        </b-col>
                        <b-col sm="12">
                            <small>
    
                                {{ row.item.description }}
                            </small>
                        </b-col>
                    </b-row> 
                  
                 </template> 
                 <template #cell(fases)="row">  
                    <b-row >
                      <b-col sm="12"><b>Tipo:</b></b-col>
                      <b-col sm="12">{{ row.item.assay_name }} </b-col>
                      <b-col sm="12"><b>Método:</b></b-col>
                      <b-col sm="12">{{ row.item.method_name }} </b-col>
                      <b-col sm="12"><b>Técnica:</b></b-col>
                      <b-col sm="12">{{ row.item.technique_name }} </b-col>
                      <b-col sm="12"><b>Tipo de muestra:</b></b-col>
                      <b-col sm="12">{{ row.item.sample_type_name }} </b-col>
                      <b-col sm="12"><b>Digestión:</b></b-col>
                      <b-col sm="12">{{ row.item.digestion_name }} </b-col>
                      <b-col sm="12"><b>Volumen Nominal:</b></b-col>
                      <b-col sm="12">{{ row.item.nominal_volume }} </b-col>
                      <b-col sm="12"><b>Peso Volumétrico:</b></b-col>
                      <b-col sm="12">{{ row.item.nominal_weight }} {{ row.item.mass_name }}</b-col>
                      <b-col sm="12"><b>Elemento:</b> {{ row.item?.elemento?.symbol || 'sin-elemento' }} </b-col> 
                      <b-col sm="12"> 
                        <b>  Fases: </b> <span v-for="(f ,i) in row.item.fases" :key="i"> <span v-if="i>0">,</span> {{ f.fase }}</span> 
                       </b-col> 
                    </b-row> 
                  
                 </template> 
           
           
     
                <template #empty>
                    <div class="text-center my-2"> 
                        No se encontraron resultados
                    </div>
                </template>
    
                 <template #table-busy>
                    <div class="text-center my-2"> 
                    <b-spinner variant="primary" label="Spinning"></b-spinner> 
                    </div>
                </template>
            </b-table>
            </b-col>
      
        </b-row>

      </b-card> 
      <h3 class="mt-4">Servicios Agregados a la Cotización</h3>
      <hr>
      <b-card>
        <b-row class="mt-3"> 
            <b-col sm="12">
                <b-table
                    class="mt-1"
                    striped="striped"
                    :items="servicios_elegidos"
                    :fields="fields_elegidos"
                    :per-page="porPagina"
                    :filter="filter"
                    :filter-included-fields="filterOn"
                    stacked="md"
                    :busy="isBusy"
                    show-empty
                    small
                    :outlined="true"
                    :bordered="true"
                    > 
     
         
                <template #cell(cost)="row">   
                  {{ row.item.cost }}
                 </template>  
                 <template #cell(name)="row">  
                     {{ row.item.name }}  
                 </template> 
                 <template #cell(acciones)="row">   
                    <b-button-group size="sm">
                        <b-button  @click="eliminarServicioDefinitivo(row.item)"  variant="danger" >Eliminar</b-button> 
                    </b-button-group>
                 </template>           
     
                <template #empty>
                    <div class="text-center my-2"> 
                        No se encontraron resultados
                    </div>
                </template>
    
                 <template #table-busy>
                    <div class="text-center my-2"> 
                    <b-spinner variant="primary" label="Spinning"></b-spinner> 
                    </div>
                </template>
            </b-table>
            </b-col>
      
        </b-row>

      </b-card>
    </b-card-group>
        <b-row class="mb-4 mt-4">
          <b-col>
            <b-button @click="finish()" variant="dark">FINALIZAR</b-button> <b-button variant="link">Cancelar creación</b-button>
          </b-col>
        </b-row>


  <div> 
    <b-modal ref="my-modal" size="lg" hide-footer title="Importar servicios desde una cotización existente">
      <b-row class=""> 
          <b-col sm="12">
          <b-button-group class="col-sm-12"> 
              <basic-select
                  :selectedOption="form.cotizacion_all"
                  @select="changeCotizacionAll"
                  size="sm"  
                  :options="allCotizacionesFormat"
                  placeholder="Agregar sevicio">
              </basic-select>  
                <b-button @click="agregarServiciosAll" variant="dark" size="sm">Importar&nbsp;servicios</b-button>
            </b-button-group>
          </b-col>
        </b-row>
    </b-modal>
  </div>


 
  </div>
</template>

<style scoped>

</style>

<script>
// @ is an alias to /src
import { mapState, mapActions, mapGetters } from 'vuex'
import { BasicSelect } from 'vue-search-select'
import Swal from "sweetalert2"
import { debounce } from 'underscore' 
import route from './../../router' 
import axios from 'axios'

export default {
  name: 'CotizacionesNewDosView',
  computed:{
    ...mapState('cotizaciones', ['cotiza', 'servicios', 'servicios_agregados', 'servicios_elegidos', 'moneda']),
    ...mapGetters('cotizaciones', [ 'ensayosFormat', 'muestrasFormat', 'digestionesFormat', 'tecnicasFormat', 'serviciosFormat', 'allCotizacionesFormat', 'elementosFormat','unidadesFormat']), 
    ...mapState('clientes', ['cliente'])
  },
  components: {
    BasicSelect
  },
  async mounted()
  { 
       this.getTipoEnsayo(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "tipos_de_ensayo",
          offset :0,
          limit :20
       }) 
       this.getTipoMuestra(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "tipo_muestra",
          offset :0,
          limit :20
       })
       this.getTipoDigestion(
       {
          loading: this.$loading,
           toast : this.$toast,
          active : "1",
          tipo : "digestiones",
          offset :0,
          limit :20
       })
       this.getTipoTecnica(
       {
          loading: this.$loading,
          toast : this.$toast,
          active : "1",
          tipo : "tecnica",
          offset :0,
          limit :20
       }) 
       this.getElementos(
       {
          loading: this.$loading,
          toast : this.$toast,
          active : "1",
          tipo : "elementos_quimicos",
          offset :0,
          limit :20
       })
       this.getUnidades(
       {
          loading: this.$loading,
          toast : this.$toast,
          active : "1",
          tipo : "unidades",
          offset :0,
          limit :20
       })  

       this.fields = [
            {  is_select: 'cost', active: false, fil: true, key: 'cost', label: `Valor ${ this.moneda }` , class: 'text-center' },
            {  is_select: 'Acciones', active: false, fil: true, key: 'Acciones', label: 'Acciones', class: 'text-center'},
            {  is_select: 'name', active: false, fil: true, key: 'name', label: 'Nombre', class: 'text-left'},
            {  is_select: 'description', active: false, fil: true, key: 'fases', label: 'Detalle' , class: 'text-left'}
       ] 
      


  },
  methods:{
    ...mapActions('cotizaciones', [
      'getTipoEnsayo', 
      'getTipoMuestra', 
      'getTipoDigestion', 
      'getTipoTecnica', 
      'getServicios', 
      'getElementos',
      'getUnidades',
      'setServicios', 
      'setServiciosAll', 
      'deleteServiceAgregado', 
      'addServiceElegido', 
      'finalizar', 
      'getAllCotizaciones',
      'devolverServiceAgregado'
    ]),
    onRowSelected(items) {
        this.seleccionados = items
      },
    async selectAllRows() {
        this.$refs.selectableTable.selectAllRows()
    },
    async showModal() 
    {

      await this.getAllCotizaciones(
      {
        loading: this.$loading,
        toast : this.$toast,
        active: 1

      }) 
      this.$refs['my-modal'].show()
    },
    lookupUser: debounce(function(addr) {  
        this.getAddresses(addr) 
      }, 500),
      async selected($event)
      {   
          
        await this.setServicios(
        {
          loading: this.$loading,
          toast : this.$toast, 
          active: '1', 
          tipo: 'servicio',
          assay_id: $event.assay_id,
          offset : 0,
          limit:10
       }
      )
      },
      async getAddresses(query) {

        if(!query) return 

        try {
          const { data } = await  axios.post('/api/quotations/clasico', {query})

          console.log( 'resultado:: ', data) 
          this.resultados = data.data
 
        } catch (error) {
          console.error("Error al obtener direcciones:: ", error)
        } 
    },
    async agregarSeleccionados()
    { 
      console.log('this.seleccionados:: ', this.seleccionados)
        if(this.seleccionados.length == 0)
        {
          Swal.fire({ text: 'No Existen servicios seleccionados',  
                        type: 'error', 
                        confirmButtonText: 'Aceptar',
                        showCancelButton: false
                    })
          return console.error('No se tiene seleccionado servicios')
        }
        const { value } = await Swal.fire({ text: '¿Está seguro que desea agregar todos los análisis seleccionados?',  
                        type: 'success', 
                        confirmButtonText: 'Aceptar',
                        showCancelButton: false
                    })

      if(!value) return console.error('se nego')

      for(let item of this.seleccionados)
      {
        await this.addServiceElegido(
        {
            loading: this.$loading,
            toast : this.$toast,
            item,
            quotation_id: this.cotiza.id
  
        })  
      }
    },
    async elegirServicio(item)
    { 
        const { value } = await Swal.fire({ text: '¿Está seguro que desea agregar este análisis?',  
                        type: 'success', 
                        confirmButtonText: 'Aceptar',
                        showCancelButton: false
                    })

      if(!value) return console.error('no se coloco nombre')

      await this.addServiceElegido(
      {
          loading: this.$loading,
          toast : this.$toast,
          item,
          quotation_id: this.cotiza.id

      }) 
    },
    async clear_filters()
    {

      this.form.tipo_elemento.value = ''
      this.form.tipo_elemento.text = ''
      this.form.tipo_unidad.value = ''
      this.form.tipo_unidad.text = ''
      this.form.tipo_ensayo.value = ''
      this.form.tipo_ensayo.text = ''
      this.form.tipo_muestra.value = ''
      this.form.tipo_muestra.text = ''
      this.form.tipo_digestion.value = ''
      this.form.tipo_digestion.text = ''
      this.form.tipo_tecnica.value = ''
      this.form.tipo_tecnica.text = ''

    }, 
    async eliminarServicio(item)
    { 
      await this.deleteServiceAgregado(
      {
          loading: this.$loading,
          toast : this.$toast,
          item 
      }) 
    },  
    async eliminarServicioDefinitivo(item)
    {
      await this.devolverServiceAgregado(
      {
          loading: this.$loading,
          toast : this.$toast,
          item,
          quotation_id : item.quotation_id 
      }) 

    },  
    async finish()
    { 
      const { value } = await Swal.fire({ text: '¿Está seguro que desea terminar de agregar análisis?',  
                          type: 'success', 
                          confirmButtonText: 'Aceptar',
                          showCancelButton: false
                      })

      if(!value) return console.error('no se acepto')

      
      await this.finalizar(
        {
          loading: this.$loading,
          toast : this.$toast,
          quotation_id: this.cotiza.id,
          active : 1
        })
      await route.push({name: 'cotizaciones'})

    },
    async changeCotizacionAll(item)
    {
      this.form.cotizacion_all.value = item.value 
      this.form.cotizacion_all.text = item.text 
    },
    async changeEnsayo(item)
    { 
      this.block_filtros_otro = false
      this.block_filtros_p_mecanica = false
      if(item.value == 4) this.block_filtros_otro = true
      if(item.value == 2) this.block_filtros_p_mecanica = true
      this.form.tipo_ensayo.value = item.value 
      this.form.tipo_ensayo.text = item.text 
      await this.changeServicios()

    },
    async changeMuestra(item)
    {
      this.form.tipo_muestra.value = item.value 
      this.form.tipo_muestra.text = item.text
      await this.changeServicios()
    },
    async changeDigestion(item)
    {
      this.form.tipo_digestion.value = item.value 
      this.form.tipo_digestion.text = item.text
      await this.changeServicios()
    },
    async changeTecnica(item)
    {
      this.form.tipo_tecnica.value = item.value 
      this.form.tipo_tecnica.text = item.text
      await this.changeServicios()
    },
    async changeServicio(item)
    {
      this.form.servicio.value = item.value 
      this.form.servicio.text = item.text  
    },
    async changeUnidad(item)
    {
      this.form.tipo_unidad.value = item.value 
      this.form.tipo_unidad.text = item.text 
      await this.changeServicios()

    },
    async changeElemento(item)
    {
       this.form.tipo_elemento.value = item.value 
      this.form.tipo_elemento.text = item.text 
      await this.changeServicios()
    },
    async changeServicios()
    {
      await this.getServicios(
       {
          loading: this.$loading,
          toast : this.$toast,
          tipo :"servicios",
          active :1, 
          assay_type_id : this.form.tipo_ensayo.value || null,
          sample_type_id : this.form.tipo_muestra.value || null,
          digestion_id : this.form.tipo_digestion.value || null,
          technique_id : this.form.tipo_tecnica.value || null ,
          unit_id : this.form.tipo_unidad.value || null, 
          element_id : this.form.tipo_elemento.value || null
        }) 

    },
    async agregarServicios()
    {  
      await this.setServicios(
        {
          loading: this.$loading,
          toast : this.$toast, 
          active: '1', 
          tipo: 'servicio',
          assay_id: this.form.servicio.value,
          offset : 0,
          limit:10
       }
      ) 

    },
    async agregarServiciosAll()
    {  

      console.log('this.form.servicio.value', this.form.cotizacion_all.value)
      await this.setServiciosAll(
        {
          loading: this.$loading,
          toast : this.$toast,   
          id: this.form.cotizacion_all.value, 
      }
      ) 

      this.$refs['my-modal'].hide()

    }

  }
  ,data()
  {
    return { 
      seleccionados: [], 
      block_filtros_otro: false,
      block_filtros_p_mecanica: false,
      modo_clasico: null,
      resultados:[],
      filters: {
            id: '',
            issuedBy: '',
            issuedTo: ''
      }, 
      currentPage:1,
      porPagina: 500,
      loading : false, 
      isBusy: false,
      filter: null,
      filterOn: [],
      fields: [
            
          ],
      fields_elegidos: [
            {  is_select: 'name', active: false, fil: true, key: 'assay_name', label: 'Nombre', class: 'text-center' },
            {  is_select: 'Tipo', active: false, fil: true, key: 'tipo', label: 'Tipo', class: 'text-center'},
            {  is_select: 'Método', active: false, fil: true, key: 'metodo', label: 'Método', class: 'text-center'},
            {  is_select: 'Técnica', active: false, fil: true, key: 'tecnica', label: 'Técnica', class: 'text-center'},
            {  is_select: 'Muestra', active: false, fil: true, key: 'tipo_muestra', label: 'Muestra', class: 'text-center'},
            {  is_select: 'Digestión', active: false, fil: true, key: 'digestion', label: 'Digestión', class: 'text-center'},
            // {  is_select: 'Unidad', active: false, fil: true, key: 'digestion_name', label: 'Digestión', class: 'text-center'},
            // {  is_select: 'Elemento', active: false, fil: true, key: 'digestion_name', label: 'Digestión', class: 'text-center'},
            {  is_select: 'price', active: false, fil: true, key: 'valor_final', label: 'Valor', class: 'text-center'},
            {  is_select: 'Acciones', active: false, fil: true, key: 'Acciones', label: 'Acciones', class: 'text-center'}
      ],
      form: { 
        tipo_ensayo: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_muestra: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_digestion: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_tecnica: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_unidad: { text: null, value: null, isError: false, error: null, class: "select-default" },
        tipo_elemento: { text: null, value: null, isError: false, error: null, class: "select-default" },
        servicio: { text: null, value: null, isError: false, error: null, class: "select-default" },
        cotizacion_all: { text: null, value: null, isError: false, error: null, class: "select-default" },
        buscar: { text: null, value: null, isError: false, error: null, class: "select-default" }
      }
     
    }
  }
}
</script>
