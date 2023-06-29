<template>
  <div>
    <b-row>
      <b-table
                striped="striped"
                :items="cotizaciones"
                :fields="fields"
                stacked="md"
                show-empty
                small
                :outlined="true"
                :bordered="true">
            <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">
                    <b-input-group v-if="field.is_select == 'name' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="name">
                        </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'company_name' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="company_name">
                            </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'sample_quantity' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="sample_quantity"
                            placeholder="sample_quantity">
                        </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'Observations' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="Observations"
                            placeholder="Observations">
                        </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'requisition_stage_id' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="requisition_stage_id"
                            v-model="filters[field.key]"
                            placeholder="requisition_stage_id">
                        </model-select>  
                    </b-input-group>
                   
                </td>
            </template>
      </b-table>
    </b-row>



  </div>

</template>

<script>
import { mapState , mapActions} from 'vuex'
// import { BasicSelect } from 'vue-search-select'
// import { ModelSelect } from 'vue-search-select'
// import router from './../router'
// import Swal from "sweetalert2"

export default {
  name: 'requisicionTable',
  computed: {
      
       ...mapState('cotizaciones', [
           'totalRows',  
           'cotizaciones', 
           'pageOptions',
           'estado_cotizaciones'
   
           ]),
  },
  methods : {
    ...mapActions('cotizaciones', [
            'searchFilter', 
            'download',
            'getHistorico',
            'cotizacionAccion',
            'setCotizacion',
            'cambiaEstadoInterno',
            'getEstadosCotizaciones'
        ]),  
  },
  data: function() {
    return {
      requisition_stages:[
              { value: 1, text: 'Esperando Ingreso'},
              { value: 2, text: 'Esperando Aprobación'},
              { value: 3, text: 'Preparación Mecánica'},
              { value: 4, text: 'Análisis'},
              { value: 5, text: 'Análisis'},
              { value: 6, text: 'Inserto'},
              { value: 7, text: 'Análisis'},
              { value: 8, text: 'Resultados'},
              { value: 9, text: 'Cobrado'},
          ],
      fields: [
            {  is_select: 'name', active: false, fil: true, key: 'name', label: 'Documento', class: 'text-center' },
            {  is_select: 'company_name', active: false, fil: true, key: 'company_name', label: 'Cliente', class: 'text-center' },
            {  is_select: 'sample_quantity', active: false, fil: true, key: 'sample_quantity', label: 'Muestras', class: 'text-center'},
            {  is_select: 'Observations', active: false, fil: true, key: 'Observations', label: 'Observaciones', class: 'text-center'},
            {  is_select: 'created', active: false, fil: true, key: 'Created', label: 'Fecha', class: 'text-center'},
            {  is_select: 'requisition_stage_id', active: false, fil: true, key: 'requisition_stage_id', label: 'Ingreso', class: 'text-center'},
        ]
    }
  },
  components : {}
}
</script>