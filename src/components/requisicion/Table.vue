<template>
  <div>
    <b-row> 
        <b-col sm="2" class="my-3 pf-0 text-start">
              <b-form-group
              label="por página"
              label-for="per-page-select"
              label-cols-sm="7" 
              label-align-sm="right"
              label-size="sm"
              class="mb-0 pl-0"
              >
              <model-select 
                  id="per-page-select"
                  :options="pageOptions"
                  size="sm"
                  v-model="porPagina"
                  placeholder="select item">
              </model-select> 
              </b-form-group>
          </b-col>
          <b-col sm="10" class=" my-4 text-end">
           

          </b-col>
      </b-row> 
    <b-row>
      <b-table
                striped="striped"
                :items="requisiciones"
                :fields="fields"
                :per-page="porPagina"
                stacked="md"
                show-empty
                small
                :outlined="true"
                :bordered="true">
            <template #cell(name)="row">  
               <b-row>
               <span> {{ row.item.name }}</span>
               </b-row>  
           </template> 
            <template #cell(company_name)="row">  
               <b-row>
               <span> {{ row.item.company_name }}</span>
               </b-row>  
           </template> 
            <template #cell(sample_quantity)="row">  
               <b-row>
               <span> {{ row.item.sample_quantity }}</span>
               </b-row>  
           </template> 
            <template #cell(Observations)="row">  
               <b-row>
               <span> {{ row.item.Observations }}</span>
               </b-row>  
           </template> 
            <template #cell(created)="row">  
               <b-row>
               <span> {{ row.item.created }}</span>
               </b-row>  
           </template> 
            <template #cell(requisition_stage_id)="row">  
               <b-row>
                
               <span> {{ (requisition_stages.find(estado=> estado.value == row.item.requisition_stage_id) ).text }}</span>
               </b-row>  
           </template> 
      </b-table>
    </b-row>
    <b-row class="mb-4">
          <b-col cols="4">
              <b-pagination
              v-model="currentPage"
              :total-rows="totalRows"
              :per-page="porPagina"
              align="fill"
              size="sm"
              class="my-0"
              ></b-pagination>
          </b-col>
      </b-row>


  </div>

</template>

<script>
import { mapState , mapActions} from 'vuex'
//import { BasicSelect } from 'vue-search-select'
import { ModelSelect } from 'vue-search-select'
// import router from './../router'
// import Swal from "sweetalert2"

export default {
  name: 'requisicionTable',
  computed: {
      
       ...mapState('requisicion', ['requisiciones', 'totalRows']),
  },
  methods : {
    ...mapActions('requisicion', ['getRequicisiones']), 
        async search()
        {
            await this.getRequicisiones({
                loading: this.$loading,
                toast : this.$toast,
                limit : this.porPagina,
                offset :  this.porPagina * (this.currentPage - 1)  
            })
        } 
        
    },
    watch: {
            'porPagina' : async function()
            {  
                await this.search()
            },
            'currentPage' : async function()
            {  
                await this.search()
            },
        },
  async mounted()
  { 
    this.search()     
  },
  data: function() {
    return { 
        currentPage: 1, 
        porPagina: 5,
        pageOptions: [
            {value: 5, text: '5'},
            {value: 10, text: '10'},
            {value: 20, text: '20'},
            {value: 50, text: '50'},
        ],
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
            {  is_select: 'observations', active: false, fil: true, key: 'observations', label: 'Observaciones', class: 'text-center'},
            {  is_select: 'created', active: false, fil: true, key: 'Created', label: 'Fecha', class: 'text-center'},
            {  is_select: 'requisition_stage_id', active: false, fil: true, key: 'requisition_stage_id', label: 'Ingreso', class: 'text-center'},
        ]
    }
  },
  components : { ModelSelect }
}
</script>