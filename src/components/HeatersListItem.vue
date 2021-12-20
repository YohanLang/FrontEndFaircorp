<template>
  <div id=style class="heater border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="heater-name fw-bold pe-3">{{heater.name}}</div>
      
      <div class="room-name text-muted pe-3">{{heater.roomName}}   </div>
      <toggle-button @change="switchHeater" :value="heater.status==='ON'" color="#32CD32"  :labels="{checked: 'ON', unchecked: 'OFF'}" :width="65"/>
      
      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details d-flex">
          <div class="room-name text-muted pe-3">Power : {{heater.power}} </div> 
        <button type="button" class="btn btn-outline-danger me-2" @click="deleteHeater">Delete heater</button>
        
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../config';

export default {
  name: 'HeatersListItem',
  props: ['heater'],
  data: function() {
    return {
      isExpanded: false
    }
  }, 
  
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    async switchHeater() {
      let response = await axios.put(`${API_HOST}/heaters/${this.heater.id}/switch`);
      let updatedHeater = response.data;
      console.log("bien switch")
      this.$emit('heater-updated', updatedHeater);
    },
    async deleteHeater() {
      let response = await axios.delete(`${API_HOST}/heaters/${this.heater.id}/delete`);
      let updatedHeater = response.data;
      this.$emit('heater-updated', updatedHeater);
      console.log("bien delete")
      location.reload()
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

.heater {
  .top-row {
    cursor: pointer;
  }
}
</style>
