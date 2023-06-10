
import store from './../store/index'

export default async function auth(to, from, next) 
{  

    await store.dispatch('usuario/clearSession')
    await store.dispatch('cotizaciones/clearAll')
  
    return next({name: 'login'})
}