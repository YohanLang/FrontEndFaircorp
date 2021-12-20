<template>

  <div class="windows-list pt-3">
    
    
    <windows-list-item 
      v-for="window in windows"
      :window="window"
      :key="window.id"  
      
      @window-updated="updateWindow"
    >
    </windows-list-item>
    
      <b-dropdown color = "#FF0000" text="Create Window" type="button" class="btn btn-secondary me-2" >
        <div id =crea>
        <div>
    <label for="sb-locales">Available Rooms :</label>
    <b-form-select  id="sb-locales" v-model="locale" :options="locales" value-field="value"></b-form-select>
  </div><b-form-textarea
        class="mt-3"
        id="textarea-formatter"
        v-model="textname"
        placeholder="Enter your name"
      ></b-form-textarea>
      <toggle-button class="m-3" @change ="changewindstatus" :value="false" color="#32CD32"  :labels="{checked: 'Open', unchecked: 'Closed'}" :width="65"/>
      
  <button  class="btn btn-warning me-2" type="button" @click="createWindow">Create</button>
        </div>
</b-dropdown>
    
  </div>
  
  
</template>



<script>
import axios from 'axios';
import {API_HOST} from '../config';
import WindowsListItem from './WindowsListItem';


export default {
  components: {
    WindowsListItem
  },
  name: 'WindowsList',
  data: function() {
    
    return {
      /* Initialize windows with an empty array, while waiting for actual data to be retrieved from the API */
      windows: [],
      roomsId:[],
      locale : "-10",
      locales: [],
      textname:null,
      windstatus:"CLOSED"
    }
  },
  created: async function() {
    let response = await axios.get(`${API_HOST}/windows`);
    let windows = response.data;
    this.windows = windows;
  
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
    async createWindow() {
      
      const windowcreate = { name:this.textname, roomId: this.locale , windowStatus : this.windstatus};
      console.log(this.windstatus)
      const response = await axios.post(`${API_HOST}/windows/create`, windowcreate);
      this.windowId = response.data.id;
      let updatedWindow = response.data;
      this.$emit('window-updated', updatedWindow);
      location.reload();
    },
    changewindstatus(){
      console.log(this.windstatus)
    if (this.windstatus=="CLOSED"){
          this.windstatus="OPEN"
    }
    else{
      this.windstatus="CLOSED"
    }
    console.log(this.windstatus)
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
#crea {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #578021;
  
}
</style>