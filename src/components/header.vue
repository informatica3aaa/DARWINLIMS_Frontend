<template>
    <div id="header">
		<div class="container">
            <b-navbar variant="faded"  class="mb-0 pb-0" type="dark">
                <b-navbar-brand href="#">
                    <b-img width="171px" :src="require('../assets/img/logo.png')"></b-img>
                </b-navbar-brand>

                <b-navbar-nav class="ms-auto top" v-if="isAuth">
                  <b-row >
                    <b-col sm="12"   class="text-end">
                      <b-button class="m" title="Ver mis notificaciones" v-b-tooltip.hover style="font-size: 1rem;" variant="link">
                        <b-icon icon="bell"></b-icon>
                      </b-button>
                      <b-button class="m" v-b-tooltip.hover style="font-size: 1rem;" variant="link" title="Ver Mi Perfil">
                          <b-icon icon="person-fill"></b-icon>
                          <span v-if="user">{{ user.name }} {{ user.lastname_f}}</span>
                      </b-button>
                      <b-button 
                        :to="{name: 'logout'}"
                        class="m" 
                        v-b-tooltip.hover 
                        style="font-size: 1rem;" 
                        variant="link" 
                        title="Salir del Sistema">
                          <b-icon icon="power"></b-icon>
                          Salir
                      </b-button>
                      <b-button class="m" style="font-weight: normal" v-b-tooltip.hover variant="link" title="Ver Ayuda">
                         Ayuda <span style="font-size: 1rem;"><b-icon icon="question-circle-fill"></b-icon></span>
                          {{ user.perfil.nombre }}
                      </b-button>
                    </b-col>
                  </b-row>              
                </b-navbar-nav>

            </b-navbar>
            <b-row class="mt-0 pt-0" v-if="isAuth">
                    <b-col sm="12" class="ml-auto text-end">
                      <b-dropdown size="sm" v-for="(m , i) in menu" :key="i"  variant="darwin">
                        <template #button-content>
                          <b-icon :icon="m.icon" aria-hidden="true"></b-icon>
                          <span > {{ m.text }}</span>
                        </template>
                        <div v-for="(sm, index)  in m.menu" :key="index" >

                          <b-dropdown-item v-if="!sm.divider" :href="sm.url">{{ sm.text }}</b-dropdown-item>
                        <b-dropdown-divider v-if="sm.divider"></b-dropdown-divider>
                        </div>

                      </b-dropdown>


                    </b-col>
              </b-row> 
           
        </div>
	</div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  name: 'HeaderComponent',
  computed:{
    ...mapState('usuario', ['isAuth', 'menu', 'user'])
  }
}
</script>

<style scoped>



.top {
  margin-top: -65px;
}

.m{
   text-decoration: none;
   color:#ffff;
   font-size: 1rem;
   font-weight: bold;
}
.m:hover{
   text-decoration: none;
   color:#c9a14c;
}

.b-dropdown:hover  {
  background-color: #c9a14c !important;
}




</style>


