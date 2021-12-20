<template>

  <div class="buildings-list pt-3" >
    
    
    <buildings-list-item 
      v-for="building in buildings"
      :building="building"
      :key="building.id"  
      
      @building-updated="updateBuilding"
    >
    
    </buildings-list-item>
    <b-dropdown color = "#FF0000" text="Create Building" type="button" class="btn btn-secondary me-2" >
      <div id="crea">
    
      <b-form-textarea
        class="mt-3"
        id="textarea-formatter"
        v-model="textname"
        placeholder="Enter your name"
      ></b-form-textarea>
      <b-form-textarea
        class="mt-3"
        id="textarea-formatter2"
        v-model="out"
        placeholder="Enter the outside temperature"
      ></b-form-textarea>
      
      
  <button  class="btn btn-warning me-2" type="button" @click="createBuilding">Create</button>
    </div>
    </b-dropdown>
 </div>
  
  
</template>



<script>
import axios from 'axios';
import {API_HOST} from '../config';
import BuildingsListItem from './BuildingsListItems.vue';


export default {
  components: {
    BuildingsListItem
  },
  name: 'BuildingsList',
  data: function() {
    return {
      /* Initialize buildings with an empty array, while waiting for actual data to be retrieved from the API */
      buildings: [],
      buildingsId:[],
      textname:null,
      out:null,
      
    }
  },
  created: async function() {
    let response = await axios.get(`${API_HOST}/buildings`);
    let buildings = response.data;
    this.buildings = buildings;
  },
  methods: {
    updateBuilding(newBuilding) {
      /* Find the place of building objectw ith the same Id in the array, and replace it */
      let index = this.buildings.findIndex(building => building.id === newBuilding.id);
      this.buildings.splice(index, 1, newBuilding);
    },
    async createBuilding() {
      
      const buildingcreate = { name:this.textname, outsideTemperature : this.out};
      const response = await axios.post(`${API_HOST}/buildings/create`, buildingcreate);
      this.buildingId = response.data.id;
      let updatedBuilding = response.data;
      this.$emit('building-updated', updatedBuilding);
      location.reload();
    },
  }
}
</script>
<style lang="scss" scoped>
#crea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #578021;
  
}
</style>
