
import axios from 'axios'
const state = {
    clientes: [], 
    cliente: null, 
    clientes_cotizaciones: [], 
    email_requisicion: [], 
    proyectos: []
}

const mutations = { 

    SET_CLIENTE(state, payload)
    {
        state.cliente = payload
    },
    SET_CLIENTES(state, payload)
    {
        state.clientes = payload
    },
    SET_CLIENTES_COTIZACIONES(state, payload){  state.clientes_cotizaciones = payload },
    SET_CLIENTES_EMAIL_REQUISICION(state, payload){  state.email_requisicion = payload },
    SET_PROYECTOS(state, payload)
    {
        console.log('COLO PROYECTOS', payload)
        state.proyectos = payload || []
    }

}

const actions = {  

    async getClienteEmail({commit}, payload)
    {
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/requisition/mail', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los correos de la requisicion'} 

            await commit('SET_CLIENTES_EMAIL_REQUISICION', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error No se logro consultar por los correos de la requisicion")
            loading.hide()
            console.error('Error No se logro consultar por los correos de la requisicion: ', error) 
        } 
    },
    async getClientesCotizaciones({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/aceptadas')

            if(!data.ok) throw { message: 'No se logro consultar por los clientes con cotizaciones'}

            

            await commit('SET_CLIENTES_COTIZACIONES', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error No se logro consultar por los clientes con cotizaciones")
            loading.hide()
            console.error('Error No se logro consultar por los clientes con cotizaciones: ', error) 
        }
    
    },
    async getClientes({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los clientes'}

            

            await commit('SET_CLIENTES', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error No se logro consultar por los clientes")
            loading.hide()
            console.error('Error No se logro consultar por los clientes: ', error) 
        }
    
    },
    async validaCliente({commit}, payload) 
    {   
        console.log('valida cliente', payload)
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/herramientas/comprobar', payload)

            if(!data.ok) throw { message: 'No se logro  validar el cliente'}

            
            payload.toast.success(`Cliente ${ data.data[0].name } existe en el sistema`)
            loading.hide()

            data.data[0].rut = payload.rut

            await commit('SET_PROYECTOS', data.data[0].proyectos)
            await commit('SET_CLIENTE', data.data[0]) 
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro validar el cliente")
            loading.hide()
            console.error('Error No se logro validar el cliente: ', error) 
        }
    
    },
    async crearCliente(state, payload) 
    {   
        console.log('crear cliente', payload)
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/accion', payload)

            if(!data.ok) throw { message: 'No se logro crear el cliente'}

            
            payload.toast.success(`Cliente ${ data.data[0].name } existe en el sistema`)
            loading.hide()
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro crear el cliente")
            loading.hide()
            console.error('Error No se logro crear el cliente: ', error) 
        }
    
    }
}

const getters= { 
    email_requisicion: state => {

        if(!state.email_requisicion) return []

        return state.email_requisicion.map(item => ({ value: item.id, text: `${ item.mail } ` }))
    },
    clientesFormatRequisition: state => {

        if(!state.clientes_cotizaciones) return []

        return state.clientes_cotizaciones.map(item => ({ value: item.id, text: `${ item.name } - Rut: ${ item.rut }` }))
    },
    clientesFormat: state => {

        if(!state.clientes) return []

        return state.clientes.map(item => ({ value: item.id, text: item.name }))
    },
    proyectosFormat: state => {

        if(!state.proyectos) return []

        return state.proyectos.map(item => ({ value: item.id, text: item.proyecto }))
    }
}



export default {
    namespaced: true,
    getters, 
    state,
    mutations,
    actions
}