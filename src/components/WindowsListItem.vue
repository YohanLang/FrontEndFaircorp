<template>
  <div id=style class="window border border-secondary rounded p-2 mb-2" :class="{expanded: isExpanded}">
    <div class="top-row d-flex" @click="toggleExpand">
      <div class="window-name fw-bold pe-3">{{window.name}}</div>
      
      <div class="room-name text-muted pe-3">{{window.roomName}}   </div>
      <toggle-button @change="switchWindow" :value="window.windowStatus==='OPEN'" color="#32CD32"  :labels="{checked: 'Open', unchecked: 'Closed'}" :width="65"/>
      
      <div class="expand-button ms-auto">
        {{ isExpanded ? '&#9660;' : '&#9658;' }}
      </div>
    </div>
    <template v-if="isExpanded">
      <hr/>
      <div class="details d-flex">
        <button type="button" class="btn btn-outline-danger me-2" @click="deleteWindow">Delete window</button>
        
      </div>
    </template>
  </div>
</template>

<script>
import axios from 'axios';
import {API_HOST} from '../config';

export default {
  name: 'WindowsListItem',
  props: ['window'],
  data: function() {
    return {
      isExpanded: false
    }
  }, 
  
  methods: {
    toggleExpand() {
      this.isExpanded = !this.isExpanded;
    },
    async switchWindow() {
      let response = await axios.put(`${API_HOST}/windows/${this.window.id}/switch`);
      let updatedWindow = response.data;
      this.$emit('window-updated', updatedWindow);
      console.log("bien print")
    },
    async deleteWindow() {
      let response = await axios.delete(`${API_HOST}/windows/${this.window.id}/delete`);
      let updatedWindow = response.data;
      this.$emit('window-updated', updatedWindow);
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

.window {
  .top-row {
    cursor: pointer;
  }
}
</style>
