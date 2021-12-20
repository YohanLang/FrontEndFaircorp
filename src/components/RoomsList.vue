<template>

  <div class="rooms-list pt-3">
    
    
    <rooms-list-item 
      v-for="room in rooms"
      :room="room"
      :key="room.id"  
      
      @room-updated="updateRoom"
    >
    
    </rooms-list-item>
    <b-dropdown  text="Create Room" type="button" class="btn btn-secondary me-2" >
        <div id =crea>
        <div>
    <label for="sb-locales">Available Buildings : </label>
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
        v-model="floor"
        placeholder="Enter your floor"
      ></b-form-textarea>
      
      
  <button  class="btn btn-warning me-2" type="button" @click="createRoom">Create</button>
        </div>
    </b-dropdown>
  </div>
  
  
</template>



<script>
import axios from 'axios';
import {API_HOST} from '../config';
import RoomsListItem from './RoomsListItem';


export default {
  components: {
    RoomsListItem
  },
  name: 'RoomsList',
  data: function() {
    return {
      /* Initialize rooms with an empty array, while waiting for actual data to be retrieved from the API */
      rooms: [],
      roomsId:[],
      locale : "-10",
      locales: [],
      textname:null,
      floor:null,
      
    }
  },
  created: async function() {
    let response = await axios.get(`${API_HOST}/rooms`);
    let rooms = response.data;
    this.rooms = rooms;
    let response2 = await axios.get(`${API_HOST}/buildings`);
    let buildingsId = response2.data;
    this.buildingsId = buildingsId;
    this.buildingsId.forEach((building) => {
    var selectListOption = {
       value: building.id,
       text:  building.name,
    }
    this.locales.push(selectListOption)
    console.log("room receive")
})
  },
  methods: {
    updateRoom(newRoom) {
      /* Find the place of room objectw ith the same Id in the array, and replace it */
      let index = this.rooms.findIndex(room => room.id === newRoom.id);
      this.rooms.splice(index, 1, newRoom);
    },
    async createRoom() {
      
      const roomcreate = { name:this.textname, buildingId: this.locale , floor :this.floor};
      const response = await axios.post(`${API_HOST}/rooms/create`, roomcreate);
      this.roomId = response.data.id;
      let updatedRoom = response.data;
      this.$emit('room-updated', updatedRoom);
      console.log("bien cree")
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