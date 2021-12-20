<template>

  <div class="heaters-list pt-3">
    
    
    <heaters-list-item 
      v-for="heater in heaters"
      :heater="heater"
      :key="heater.id"  
      
      @heater-updated="updateHeater"
    >
    </heaters-list-item>
  
      <b-dropdown color = "#FF0000" text="Create Heater" type="button" class="btn btn-secondary me-2" >
        <div id=crea>
        <div>
    <label for="sb-locales" ><strong>Available Rooms : </strong></label>
    <b-form-select  id="sb-locales" v-model="locale" :options="locales" value-field="value"></b-form-select>
  </div><b-form-textarea 
        class="mt-3"
        id="textarea-formatter"
        v-model="textname"
        placeholder="Enter your name"
      ></b-form-textarea>
    <b-form-textarea
        class="mt-3"
        id="textarea-formatter2"
        v-model="power"
        placeholder="Enter your power"
      ></b-form-textarea>
      <toggle-button class="m-3" @change ="changeheatstatus" :value="false" color="#32CD32"  :labels="{checked: 'ON', unchecked: 'OFF'}" :width="65"/>
      
       <button  class="btn btn-warning" type="button" @click="createHeater">Create</button>
        </div>
  </b-dropdown>
    
  </div>
  
  
</template>



<script>
import axios from 'axios';
import {API_HOST} from '../config';
import HeatersListItem from './HeatersListItem.vue';


export default {
  components: {
    HeatersListItem
  },
  name: 'HeatersList',
  data: function() {
    
    return {
      /* Initialize heaters with an empty array, while waiting for actual data to be retrieved from the API */
      heaters: [],
      roomsId:[],
      locale : "-10",
      locales: [],
      textname:null,
      power:null,
      heatstatus:"OFF"
    }
  },
  created: async function() {
    let response = await axios.get(`${API_HOST}/heaters`);
    let heaters = response.data;
    this.heaters = heaters;
  
    let response2 = await axios.get(`${API_HOST}/rooms`);
    let roomsId = response2.data;
    this.roomsId = roomsId;
    this.roomsId.forEach((room) => {
    var selectListOption = {
       value: room.id,
       text:  room.name,
    }
    this.locales.push(selectListOption)
});
  },
  methods: {
    async createHeater() {
      
      const heatercreate = { name:this.textname, roomId: this.locale , status : this.heatstatus, power :this.power};
      console.log(this.heatstatus)
      const response = await axios.post(`${API_HOST}/heaters/create`, heatercreate);
      this.heaterId = response.data.id;
      let updatedHeater = response.data;
      this.$emit('heater-updated', updatedHeater);
      location.reload();
    },
    changeheatstatus(){
      console.log(this.heatstatus)
    if (this.heatstatus=="OFF"){
          this.heatstatus="ON"
    }
    else{
      this.heatstatus="OFF"
    }
    console.log(this.heatstatus)
    },
    
    updateHeater(newHeater) {
      /* Find the place of heater objectw ith the same Id in the array, and replace it */
      let index = this.heaters.findIndex(heater => heater.id === newHeater.id);
      this.heaters.splice(index, 1, newHeater);
    }
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

