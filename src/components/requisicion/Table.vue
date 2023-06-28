<template>
  <div>
    <b-row>
      <b-col sm="12">
                <b-row> 
                </b-row>
      </b-col>
    </b-row>
    <b-row>
      <b-table
                striped="striped"
                :items="cotizaciones"
                :fields="fields"
                :per-page="porPagina"
                :filter="filter"
                :filter-included-fields="filterOn"
                stacked="md"
                :busy="isBusy"
                show-empty
                small
                :outlined="true"
                :bordered="true">
            <template slot="top-row" slot-scope="{ fields }">
                <td v-for="field in fields" :key="field.key">   
                    <b-input-group v-if="field.is_select == 'quotation_state' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="internos"
                            v-model="filters[field.key]"
                            placeholder="interno_plazo">
                        </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'quotation_number' && field.fil">
                        <b-form-input  
                            @keyup.enter="search()"  
                            size="sm" 
                            :disabled="field.active" 
                            v-model="filters[field.key]">
                        </b-form-input>
                        <b-input-group-append> 
                        <b-button 
                            size="sm" 
                            v-if="!field.active" 
                            @click="search()" 
                            variant="pdarwin">
                            <b-icon icon="search"></b-icon>
                        </b-button>
                        <b-button 
                            size="sm" 
                            v-if="field.active"
                             @click="search()" 
                             variant="danger">
                            <b-icon icon="x"></b-icon>
                        </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'company_name' && field.fil">
                        <b-form-input  
                            @keyup.enter="search()"  
                            size="sm" 
                            :disabled="field.active" 
                            v-model="filters[field.key]">
                        </b-form-input>
                        <b-input-group-append> 
                        <b-button 
                            size="sm" 
                            v-if="!field.active" 
                            @click="search()" 
                            variant="pdarwin">
                            <b-icon icon="search"></b-icon>
                        </b-button>
                        <b-button 
                            size="sm" 
                            v-if="field.active"
                             @click="search()" 
                             variant="danger">
                            <b-icon icon="x"></b-icon>
                        </b-button>
                        </b-input-group-append>
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'state_id' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="estados"
                            v-model="filters[field.key]"
                            placeholder="Estado">
                        </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'active' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="vigencias"
                            v-model="filters[field.key]"
                            placeholder="Vigencia">
                        </model-select>  
                    </b-input-group>
                    <b-input-group v-if="field.is_select == 'expiration_date' && field.fil">
                        <model-select 
                            size="sm"  
                            :options="activas"
                            v-model="filters[field.key]"
                            placeholder="Activa">
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
      fields: [
            {  is_select: 'quotation_state_id', active: false, fil: true, key: 'quotation_state', label: 'Plazo Interno', class: 'text-center' },
            {  is_select: 'quotation_state', active: false, fil: true, key: 'quotation_state', label: 'Correo Notificación', class: 'text-center' },
            {  is_select: 'quotation_number', active: false, fil: true, key: 'quotation_number', label: 'Cotizacion', class: 'text-center'},
            {  is_select: 'company_name', active: false, fil: true, key: 'company_name', label: 'Cliente', class: 'text-center'},
            {  is_select: 'estado_notificacion', active: false, fil: true, key: 'estado_notificacion', label: 'Est Noti.', class: 'text-center'},
            {  is_select: false, active: false, fil: true, key: 'project', label: 'Proyecto' , class: 'text-center'},
            {  is_select: false, active: false, fil: false, key: 'start_date', label: 'Inicio' , class: 'text-center'},
            {  is_select: 'expiration_date', active: false, fil: true,  key: 'expiration_date', label:'Expiracion', class: 'text-center'},
            {  is_select: 'active', active: false, fil: true, key: 'active',  label:'Vigencia', class: 'text-center'},
            {  is_select: 'state_id', active: false, fil: true, key: 'state_id',  label:'Estado', class: 'text-center'},
            {  is_select: false, active: false, fil: false, key: 'acciones',  label:'Acciones', class: 'text-center'}
        ]
    }
  },
  components : {}
}
</script>