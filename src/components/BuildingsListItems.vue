<template>
  
  <div  id=style class="building border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="building-name fw-bold pe-3">{{building.name}}</div>
      
      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details d-flex">
        <div class="building-name text-muted pe-3">Outside Temperature : {{building.outsideTemperature}} °C</div>
      
        <button type="button" class="btn btn-outline-danger me-2" @click="deleteBuilding"> Delete building </button>
        
    
    <b-dropdown color = "#FF0000" text="Inside Rooms" type="button" class="btn btn-secondary me-2" >
       <div class="rooms-list pt-3">
           <rooms-list-item 
              v-for="room in rooms"
              :room="room"
              :key="room.id"  
              
              @room-updated="updateRoom"
            >
            
            </rooms-list-item>
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
import RoomsListItem from './RoomsListItem.vue';
export default {
  components: {
    RoomsListItem,
    WindowsListItem,
    HeatersListItem
  },
  name: 'BuildingsListItem',
  props: ['building'],
  data: function() {
    return {
      rooms:[],
      isExpanded: false,
      
    }
    
  },
  created: async function() {
    let response = await axios.get(`${API_HOST}/buildings/${this.building.id}/rooms`);
    let rooms = response.data;
    this.rooms = rooms;
    
      
  },
  
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    async deleteBuilding() {
      let response = await axios.delete(`${API_HOST}/buildings/${this.building.id}/delete`);
      let updatedBuilding = response.data;
      this.$emit('building-updated', updatedBuilding);
      console.log("bien delete")
      location.reload()
    },
    updateWindow(newWindow) {
      /* Find the place of window objectw ith the same Id in the array, and replace it */
      let index = this.windows.findIndex(window => window.id === newWindow.id);
      this.windows.splice(index, 1, newWindow);
    },
    updateHeater(newHeater) {
      /* Find the place of heater objectw ith the same Id in the array, and replace it */
      let index = this.heaters.findIndex(heater => heater.id === newHeater.id);
      this.heaters.splice(index, 1, newHeater);
    },
    updateRoom(newRoom) {
      /* Find the place of room objectw ith the same Id in the array, and replace it */
      let index = this.rooms.findIndex(room => room.id === newRoom.id);
      this.rooms.splice(index, 1, newRoom);
    },
    
  }
}
</script>

<style lang="scss" scoped>
  #style{
    background-color: rgba(255, 255, 255);
    padding-top: 100%;
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

.building {
  .top-row {
    cursor: pointer;
  }
}
</style>
