
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

            const { data } =  await axios.post('/api/requisition/add', payload)

            if(!data.ok) throw { message: 'No se logro grabar la requisicion'} 

            loading.hide()
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