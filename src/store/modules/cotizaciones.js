import axios from 'axios'
import route from '../../router'

const state = {
    cotiza: null,
    totalRows: 0,
    cotizaciones: [],
    condiciones: [],
    cotizaciones_historicas: [],
    servicios: [],
    servicios_agregados: [],
    servicios_elegidos: [],
    cotizaciones_historico : [],
    cotizaciones_por_aprobar : [],
    tipos_ensayos: [],
    tipos_muestras: [],
    tipos_digestiones: [],
    tipos_tecnicas: [],
    all_cotizaciones: [],
    estado_cotizaciones: [],
    stringMoneda:' ',
    pageOptions: [
        {value: 5, text: '5'},
        {value: 10, text: '10'},
        {value: 20, text: '20'},
        {value: 50, text: '50'},
    ],
}

const mutations = { 

    SET_COTIZACIONES(state, payload)
    {
        state.totalRows = payload.total_registros
        state.cotizaciones = payload.data
    },

    SET_CONDICIONES(state, payload)
    {
        state.condiciones = payload.data
    },
    SET_COTIZACION(state, payload)
    {
        state.cotiza = payload
    },
    SET_TIPOS_ENSAYO(state, payload)
    {
        state.tipos_ensayos = payload
    },
    SET_TIPOS_UNIDAD(state, payload)
    {
        state.tipos_unidades = payload
    },
    SET_TIPOS_ELEMENTO(state, payload)
    {
        state.tipos_elementos = payload
    },
 
    SET_TIPOS_MUESTRA(state, payload)
    {
        state.tipos_muestras = payload
    },
    SET_TIPOS_DIGESTION(state, payload)
    {
        state.tipos_digestiones = payload
    },
    SET_TIPOS_TECNICA(state, payload)
    {
        state.tipos_tecnicas = payload
    },
    SET_SERVICIOS(state, payload)
    {
        state.servicios = payload
    },
    SET_COTIZACIONES_HISTORIAL(state, payload)
    {
        state.cotizaciones_historicas = payload
    },
    SET_COTIZACIONES_POR_APROBAR(state, payload)
    {
        state.cotizaciones_por_aprobar = payload
    },
    SET_SERVICIOS_AGREGADOS(state, payload)
    {
        state.servicios_agregados = payload
        console.log('state.servicios_agregados:: ', state.servicios_agregados)
    },
    SET_ONE_SERVICIOS_AGREGADOS(state, payload)
    {
        state.servicios_agregados.push(payload)
    },
    DELETE_SERVICIOS_AGREGADOS(state, payload)
    { 
        state.servicios_agregados = state.servicios_agregados.filter(ser => ser.id != payload.id)
    },
    ADD_SERVICIOS_ELEGIDOS(state, payload)
    { 
        console.log('ADD_SERVICIOS_ELEGIDOS::', payload)
        state.servicios_elegidos.push(payload)
    },
    BACK_SERVICIOS_ELEGIDOS(state, payload)
    { 
        console.log('BACK_SERVICIOS_ELEGIDOS::', payload)
        state.servicios_elegidos = state.servicios_elegidos.filter(serv => serv.id != payload.id  )
    },
    CLEAR_SERVICIOS_ELEGIDOS(state)
    { 
        state.servicios_elegidos= []
    },
    SET_MONEDA(state, payload)
    { 
        state.stringMoneda = payload
    },
    SET_ALL_COTIZACIONES(state, payload)
    { 
        state.all_cotizaciones = payload
    },
    SET_ESTADO_COTIZACIONES(state, payload)
    {
        state.estado_cotizaciones = payload.data
    },
    CLEAR_ALL(state)
    {
        state.cotizaciones=[]
        state.condiciones=[]
        state.cotizaciones_historicas=[]
        state.servicios=[]
        state.servicios_agregados=[]
        state.servicios_elegidos=[]
        state.cotizaciones_historico=[]
        state.cotizaciones_por_aprobar=[]
        state.tipos_ensayos=[]
        state.tipos_muestras=[]
        state.tipos_digestiones=[]
        state.tipos_tecnicas=[]
        state.all_cotizaciones=[]
        state.estado_cotizaciones=[]
    }

}

const actions = {

    async clearAll({commit} )
    {
        await commit('CLEAR_ALL')

    },
    async setModena({commit}, payload )
    {
        await commit('SET_MONEDA', payload)

    },
    async getAllCotizaciones({commit}, payload) 
    {   
        let loading = payload.loading.show() 
        console.log(commit)
        try { 
            const { data } =  await axios.post('/api/quotations/allquo', payload)

            if(!data.ok) throw { message: 'No se logro confirmar la cotización'}

            console.log('cotizacioens:: ', data.data)
            await commit('SET_ALL_COTIZACIONES', data.data)
            loading.hide() 

            return true

        } catch (error) {
            payload.toast.error("Error al confirmar la cotización")
            loading.hide()
            console.error('Error al confirmar la cotización:: ', error) 
            return false
        } 
    },
    async confirmarCotizacion({commit}, payload) 
    {   
        let loading = payload.loading.show() 
        console.log(commit)
        try { 
            const { data } =  await axios.post('/auth/confirmacion', payload, {
                headers: {
                    Authorization: payload.token
                }})
            if(!data.ok) throw { message: 'No se logro confirmar la cotización'}


            loading.hide() 

            return true

        } catch (error) {
            payload.toast.error("Error al confirmar la cotización")
            loading.hide()
            console.error('Error al confirmar la cotización:: ', error) 
            return false
        } 
    },
    async download({commit}, payload) 
    {   
        let loading = payload.loading.show() 
        console.log(commit);
        try { 
            const { data } =  await axios.post('/api/quotations/download', payload)
            if(!data.ok) throw { message: 'No se logro consultar consultar por la cotización'}
            loading.hide()
            return data.data

        } catch (error) {
            payload.toast.error("Error al   descargar el documento")
            loading.hide()
            console.error('Error no se logro descargar el documento:: ', error) 
        } 
    },
    async searchFilter({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/filter', payload)

            if(!data.ok) throw { message: 'No se logro consultar las cotizaciones'}
            

            await commit('SET_COTIZACIONES', data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        } 
    },
    async getServicios({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await  axios({
                method: 'post',
                url: '/api/quotations/services',
                data: payload,
                timeout: 10000 
              })
              
            //axios.post('/api/quotations/services', payload, {timeout: 10000})
            

            if(!data.ok) throw { message: 'No se logro consultar por los servicios'}
            

            await commit('SET_SERVICIOS', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los servicios")
            loading.hide()
            console.error('Error al buscar los servicios:: ', error) 
        } 
    },
    async getServiciosByAssayId({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post(`/api/quotations/parent`, payload)

            console.log('POST SERVICIOS::', data.data)

            if(!data.ok) throw { message: 'No se logro consultar por los servicios de Assay'}
            

            await commit('SET_SERVICIOS', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los servicios")
            loading.hide()
            console.error('Error al buscar los servicios:: ', error) 
        } 
    },
    async getCotizaciones({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {
            if (payload.company_id) throw { message: 'Falta el parametro company_id'}
            if (payload.project_id) throw { message: 'Falta el parametro project_id'}

            const { data } = await axios.get(`/api/history/:${payload.company_id}/project/${ payload.project_id}`)

            if(!data.ok) throw { message: 'No se logro consultar por los servicios'}
            

            await commit('SET_COTIZACIONES_HISTORIAL', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        } 
    },
    async getCotizacionesPorAprobar({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try { 
            const { data } = await axios.post(`/api/quotations/pendingquotations`, payload)

            if(!data.ok) throw { message: 'No se logro obtener las cotizaciones por aprobar'}
            

            await commit('SET_COTIZACIONES_POR_APROBAR', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones por aprobar")
            loading.hide()
            console.error('Error al buscar las cotizaciones por aprobar:: ', error) 
        } 
    },
    async getTipoEnsayo({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de ensayos'}
            

            await commit('SET_TIPOS_ENSAYO', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de ensayos")
            loading.hide()
            console.error('Error al buscar los tipos de ensayos:: ', error) 
        } 
    },
    async getElementos({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los elementos'}
            

            await commit('SET_TIPOS_ELEMENTO', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los elementos")
            loading.hide()
            console.error('Error al buscar los elementos:: ', error) 
        } 
    },
    async getUnidades({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los unidades'}
            

            await commit('SET_TIPOS_UNIDAD', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las unidades")
            loading.hide()
            console.error('Error al buscar las unidades:: ', error) 
        } 
    },
    async getTipoMuestra({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de muestras'}
            

            await commit('SET_TIPOS_MUESTRA', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de muestras")
            loading.hide()
            console.error('Error al buscar los tipos de muestras:: ', error) 
        } 
    },
    async getTipoDigestion({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de digestion'}
            

            await commit('SET_TIPOS_DIGESTION', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de digestion")
            loading.hide()
            console.error('Error al buscar los tipos de diogestion:: ', error) 
        } 
    },
    async getTipoTecnica({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar por los tipos de tecnicas'}
            

            await commit('SET_TIPOS_TECNICA', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar los tipos de tecnicas")
            loading.hide()
            console.error('Error al buscar los tipos de tecnicas:: ', error) 
        } 
    },
    async searchCondiciones({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } = await axios.post('/api/herramientas/gettool', payload)

            if(!data.ok) throw { message: 'No se logro consultar las condiciones'}
            

            await commit('SET_CONDICIONES', data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las condiciones")
            loading.hide()
            console.error('Error al buscar las condiciones:: ', error) 
        } 
    },
    async setServicios({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations', payload)

            if(!data.ok) throw { message: 'No se logro cargar los servicios'}

            console.log('Paso::')
            console.log('data[0]:: ', data.data)

            await commit('SET_SERVICIOS_AGREGADOS', data.data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al agregar servicio")
            loading.hide()
            console.error('Error al agregar servicio:: ', error) 
        } 
    },
    async setServiciosAll({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/cargarservicios', payload)

            if(!data.ok) throw { message: 'No se logro cargar los servicios'}

            console.log('data crgaservicio:: ', data?.data[0])

            await commit('SET_SERVICIOS_AGREGADOS', data?.data[0]?.analisis_asociado)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al agregar servicio")
            loading.hide()
            console.error('Error al agregar servicio:: ', error) 
        } 
    },
    async deleteServiceAgregado({commit}, payload) 
    {   

        let loading = payload.loading.show()

        try { 

            await commit('DELETE_SERVICIOS_AGREGADOS', payload.item)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al eliminar servicio agregado")
            loading.hide()
            console.error('Error al eliminar servicio agregado:: ', error) 
        } 
    },
    async devolverServiceAgregado({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try { 

            const { data } =  await axios.post('/api/quotations/anular-det', { 
                id : payload.item.assay_id 
            })

            if(!data.ok) throw { message: 'No se logro agregar el item'}

            await commit('BACK_SERVICIOS_ELEGIDOS', payload.item)
            await commit('SET_ONE_SERVICIOS_AGREGADOS', payload.item)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al eliminar servicio agregado")
            loading.hide()
            console.error('Error al eliminar servicio agregado:: ', error) 
        } 
    },
    async addServiceElegido({commit}, payload) 
    {   

        let loading = payload.loading.show()

        try { 


            console.log('payload.item::', payload.item)

            const { data } =  await axios.post('/api/quotations/new/detail', {
                active : 0,
                quotation_id : payload.quotation_id,
                assay_id : payload.item.assay_id,
                price : payload.item.cost
            })

            if(!data.ok) throw { message: 'No se logro agregar el item'} 
            await commit('ADD_SERVICIOS_ELEGIDOS', data.data[0].analisis_asociado[0])
            // await commit('ADD_SERVICIOS_ELEGIDOS', payload.item)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al agregar servicio")
            loading.hide()
            console.error('Error al agregar servicio:: ', error) 
        } 
    },
    async crearProyecto(state, payload) 
    {   
        console.log('crear proyecto', payload)
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/accion', payload)

            if(!data.ok) throw { message: 'No se logro  crear proyeto'}

            loading.hide()
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error No se logro crear el proyecto")
            loading.hide()
            console.error('Error No se logro crear el proyecto: ', error) 
        }
    },
    async setCotizacion({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {   

            const { data } =  await axios.get(`/api/quotations/${ payload.item.id }/${ payload.item.active }`)

            console.log('data cotizacion:: ', data.data)
            loading.hide()  
            await commit('SET_SERVICIOS_AGREGADOS', [])
            await commit('SET_COTIZACION', data?.data[0])
            

        } catch (error) {
            payload.toast.error("Error al sete4ar cotizacion")
            loading.hide()
            console.error('Error No  se crear cotizacion: ', error) 
        }
    
    },
    async crearCotizacion({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {
            const { data } =  await axios.post('/api/quotations/new', payload)

            console.log(data)

            if(!data.ok) throw { message: 'No se creo cotizacion'} 

            loading.hide() 
            payload.toast.success("Cotizacion creada")
            console.log('NUEVA COTIZACION::::', data)
            await commit('SET_COTIZACION', data.data[0])
            await commit('SET_SERVICIOS_AGREGADOS', []) 
            await commit('CLEAR_SERVICIOS_ELEGIDOS')

            const asociados = data.data[0]?.analisis_asociado || [] 

            console.log('asociados:: ', asociados)

            for(let servicio of asociados)
            {
                
                await commit('ADD_SERVICIOS_ELEGIDOS', servicio)
            }

            await route.push({name: 'cotizaciones_new_dos'})
            return data.data[0]

        } catch (error) {
            payload.toast.error("Error no se creo cotizacion")
            loading.hide()
            console.error('Error No  se crear cotizacion: ', error) 
        }
    
    },
    async finalizar({commit}, payload) 
    {   
        console.log('payload finish::', payload, commit)
        let loading = payload.loading.show()

        try {
            const { data } =  await axios.post('/api/quotations/new/end', payload) 

            if(!data.ok) throw { message: 'No se pudo new end'} 

            loading.hide() 
            payload.toast.success("Cotizacion Finalizada con exito") 

            await commit('SET_COTIZACION', null)
            await commit('SET_SERVICIOS_AGREGADOS', []) 

        } catch (error) {
            payload.toast.error("Error en el new end")
            loading.hide()
            console.error('Error  en el new end: ', error) 
        }
    
    },
    async porAprobar({commit}, payload) 
    {   
        let loading = payload.loading.show()
        try {
            const { data } =  await axios.post('/api/quotations/pendingquotations', payload)
            if(!data.ok) throw { message: 'No se logro consultar las cotizaciones'}
            await commit('SET_COTIZACIONES', data)
            loading.hide()

        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        } 
    },
    async porVencer({commit}, payload) 
    {   
        let loading = payload.loading.show()
        try {
            console.log("payload", payload);
            const { data } =  await axios.post('/api/quotations/por_vencer', payload)
            if(!data.ok) throw { message: 'No se logro consultar las cotizaciones'}
            console.log("data:::", data);
            await commit('SET_COTIZACIONES', data)
            loading.hide()

        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        } 
    },
    async quotationAction({commit}, payload) 
    {   
        console.log("payload::::::::::::::::::2", payload);
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/action', payload)

            if(!data.ok) throw { message: 'No se logro Actualizar la cotización'}
            
            console.log("Actualizada::::::", data);

            await commit('SET_COTIZACIONES', data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        } 
    },
    async getQuotationId({commit}, payload) 
    {   
        let loading = payload.loading.show()

        try {

            const { data } =  await axios.post('/api/quotations/quo', payload)

            if(!data.ok) throw { message: 'No se logro encontrar la cotización'}
            
            await commit('SET_COTIZACIONES', data)

            loading.hide()
        } catch (error) {
            payload.toast.error("Error al buscar la cotizacion")
            loading.hide()
            console.error('Error al buscar la cotizacion:: ', error) 
        } 
    },
    async cambiaEstadoInterno({commit}, payload){
        let loading = payload.loading.show()
        try {
            const { data } =  await axios.post('/api/quotations/quotation_validity', payload)
            if(!data.ok) throw { message: 'No se logro consultar las cotizaciones'}
            await commit('SET_COTIZACIONES', data)
            loading.hide()

        } catch (error) {
            payload.toast.error("Error al buscar las cotizaciones")
            loading.hide()
            console.error('Error al buscar las cotizaciones:: ', error) 
        }    
    },
    async getEstadosCotizaciones({commit}, payload){
        let loading = payload.loading.show()
        try {
            const { data } =  await axios.post('/api/quotations/quo-status', payload)
            if(!data.ok) throw { message: 'No se logro consultar por el estado de  las cotizaciones'}
            await commit('SET_ESTADO_COTIZACIONES', data)
            loading.hide()

            return data.data

        } catch (error) {
            payload.toast.error("Error al buscar el estado de  las cotizaciones")
            loading.hide()
            console.error('Error al buscar el estado de  las cotizaciones:: ', error) 
        }  
    }


}

const getters= { 
    condicionesFormat: state => {

        if(!state.condiciones) return []

        return state.condiciones.map(item => ({ value: item.id, text: item.title }))
    },
    ensayosFormat: state => {

        if(!state.tipos_ensayos) return []

        return state.tipos_ensayos.map(item => ({ value: item.id, text: item.name }))
    },
    muestrasFormat: state => {

        if(!state.tipos_muestras) return []

        return state.tipos_muestras.map(item => ({ value: item.id, text: item.name }))
    },
    digestionesFormat: state => {

        if(!state.tipos_digestiones) return []

        return state.tipos_digestiones.map(item => ({ value: item.id, text: item.name }))
    },
    elementosFormat: state => {

        if(!state.tipos_elementos) return []

        return state.tipos_elementos.map(item => ({ value: item.id, text: item.name }))
    },
    unidadesFormat: state => {

        if(!state.tipos_unidades) return []
        return state.tipos_unidades.map(item => ({ value: item.id, text: item.description + ' ('+ item.name +')' }))
    },
    destinatariosFormat: state => {

        if(!state.destinatarios) return []

        return state.destinatarios.map(item => ({ value: item.id, text:`${ item.name } - ${ item.mail } ${ item.telefono } ` }))
    },
    tecnicasFormat: state => {

        if(!state.tipos_tecnicas) return []

        return state.tipos_tecnicas.map(item => ({ value: item.id, text: item.name }))
    },
    cotizacioneshistoricasFormat: state => {

        if(!state.cotizaciones_historicas) return []

        return state.cotizaciones_historicas.map(item => ({ value: item.id, text: item.name }))
    },
    serviciosFormat: state => {

        if(!state.servicios) return []

        return state.servicios.map(item => ({ value: item.aasay_id, text: item.name }))
    },
    allCotizacionesFormat: state => {

        if(!state.all_cotizaciones) return []

        return state.all_cotizaciones.map(item => ({ value: item.id, text: `${ item.quotation_number } - ${ item.company_name } ${ item.estado } ` }))
    }
}


export default {
    namespaced: true, 
    state,
    mutations,
    actions,
    getters
}