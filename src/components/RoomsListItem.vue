<template>
  <div id=style class="room border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="room-name fw-bold pe-3">{{room.name}}</div>
      
      <div class="building-name text-muted pe-3">{{room.buildingName}}  </div>
      
      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details d-flex">
        <div class="building-name text-muted pe-3">Floor : {{room.floor}}</div>
        
        <button type="button" class="btn btn-outline-danger me-2" @click="deleteRoom">Delete room</button>
      <!--<div class="building-name text-muted pe-3"><v-if>Current : {{room.currentTemperature}} °C</div>
      <div class="building-name text-muted pe-3">Target : {{room.targetTemperature}} °C </div>-->
      <b-dropdown color = "#FF0000" text="Inside Components" type="button" class="btn btn-secondary me-2" >
      <div id=crea>
       <div class="windows-list pt-3">
          <windows-list-item 
          v-for="window in windows"
          :window="window"
          :key="window.id"  
          
          @window-updated="updateWindow"
        >
        </windows-list-item>
      </div>
      <div class= "heaters-list pt-3">
        <heaters-list-item 
          v-for="heater in heaters"
          :heater="heater"
          :key="heater.id"  
          
          @heater-updated="updateHeater"
        >
        </heaters-list-item>
        <button  class="btn btn-warning me-2" type="button" @click="reload">Apply</button>
      </div>
      </div>
      </b-dropdown>
       </div>
        
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../config';
import WindowsListItem from './WindowsListItem';
import HeatersListItem from './HeatersListItem.vue';
export default {
  components: {
    WindowsListItem,
    HeatersListItem
  },
  name: 'RoomsListItem',
  props: ['room'],
  data: function() {
    return {
      windows:[],
      heaters:[],
      isExpanded: false
    }
    
  }, 
   created: async function() {
    let response = await axios.get(`${API_HOST}/rooms/${this.room.id}/windows`);
    let windows = response.data;
    this.windows = windows;
    let response2 = await axios.get(`${API_HOST}/rooms/${this.room.id}/heaters`);
    let heaters = response2.data;
    this.heaters = heaters;
    console.log("room receive")
    },
    
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    async reload(){
      console.log("bien applique")
      location.reload()
    },
   /* async switchRoom() {
      let response = await axios.put(`${API_HOST}/rooms/${this.room.id}/switch`);
      let updatedRoom = response.data;
      this.$emit('room-updated', updatedRoom);
    },*/
    async deleteRoom() {
      let response = await axios.delete(`${API_HOST}/rooms/${this.room.id}/delete`);
      let updatedRoom = response.data;
      this.$emit('room-updated', updatedRoom);
      console.log("bien delete")
      location.reload()
    },
    updateHeater(newHeater) {
      /* Find the place of heater objectw ith the same Id in the array, and replace it */
      let index = this.heaters.findIndex(heater => heater.id === newHeater.id);
      this.heaters.splice(index, 1, newHeater);
    },
    updateWindow(newWindow) {
      /* Find the place of window objectw ith the same Id in the array, and replace it */
      let index = this.windows.findIndex(window => window.id === newWindow.id);
      this.windows.splice(index, 1, newWindow);
    }
    
  }
}
</script>

<style lang="scss" scoped>
#style{
    background-color: rgba(255, 255, 255);
    padding-top: 100%;
  }
#crea {
font-family: Avenir, Helvetica, Arial, sans-serif;
-webkit-font-smoothing: antialiased;
-moz-osx-font-smoothing: grayscale;
text-align: center;
color: #578021;

}
.open-status {
  .icon {
    position: relative;
  }

  &.open {
    color: #198754;
    .icon {
      font-size: 12px;
      top: -3px;
    }
  }

  &.closed {
    color: #dc3545;
  }
}

.room {
  .top-row {
    cursor: pointer;
  }
}
</style>
