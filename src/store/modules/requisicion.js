
import axios from 'axios'
const state = {
   
}

const mutations = {  
}

const actions = {  

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