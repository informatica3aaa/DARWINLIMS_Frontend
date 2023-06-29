
import axios from 'axios'
const state = {
   requisiciones : [],
   totalRows : 0
}

const mutations = {  
    SET_REQUISICIONES(state, payload)
    {  
        console.log('payload:: ', payload)
        state.requisiciones = payload 
    },
    SET_REQUISICIONES_TOTAL(state, payload)
    {  
        console.log('payload:: ', payload)
        state.totalRows = payload 
    },

}

const actions = {  

    async getRequicisiones({commit}, payload)
    {
        let loading = payload.loading.show()

        try { 
            if(!payload.limit) throw { message: 'falta el campo : limit'} 

            const { data } =  await axios.post('/api/requisition/list', payload)

            if(!data.ok) throw { message: 'No se logro consultar por las requisiciones'} 

            await commit('SET_REQUISICIONES', data.data)
            await commit('SET_REQUISICIONES_TOTAL', data.cantidad)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error No se logro consultar por las requisiciones")
            loading.hide()
            console.error('Error No se logro consultar por las requisiciones: ', error) 
        } 
    },

    async grabar(state, payload)
    {
        let loading = payload.loading.show()
        try {

            if(!payload.quotation_id) throw { message: 'falta el campo : quotation_id'} 
            if(!payload.company_id) throw { message: 'falta el campo : company_id'} 
            if(!payload.name) throw { message: 'falta el campo : name'} 
            if(!payload.destinatario) throw { message: 'falta el campo : destinatario'} 
            if(!payload.observations) throw { message: 'falta el campo : observations'}  

            const { data } =  await axios.post('/api/requisition/add', payload)

            if(!data.ok) throw { message: 'No se logro grabar la requisicion'} 

            loading.hide()
            payload.toast.success("Requisicion Creada!")
            return data.ok
        } catch (error) {
            payload.toast.error("Error No se logro grabar la requisicion")
            loading.hide()
            console.error('Error No se logro grabar la requisicion: ', error) 
        } 
    } 
}

const getters= {  
}



export default {
    namespaced: true,
    getters, 
    state,
    mutations,
    actions
}