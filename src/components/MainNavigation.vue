<template>
<div>
  <b-tabs content-class="mt-3" justified>
    <b-tab active>
      <template v-slot:title>
        <b-img  rounded="circle" src="https://mir-s3-cdn-cf.behance.net/project_modules/max_1200/ba467372969113.5bf9ecdda7cfb.gif" height="60" width="50">
        </b-img>
        <p>Building</p>
      </template>
        <buildings-list ></buildings-list></b-tab>
    <b-tab >
      <template v-slot:title>
        <b-img  rounded="circle" src="https://cdn.dribbble.com/users/330915/screenshots/6554409/1_new_condo.gif" height="60" width="60">
        </b-img>
        <p>Room</p>
      </template>
        
      <rooms-list></rooms-list></b-tab>
      <b-tab >
      <template v-slot:title>
        <b-img  rounded="circle" src="https://img.favpng.com/11/7/7/window-wall-decal-vinyl-group-drawing-png-favpng-CUVB2fiHAw6xhs2cjUXPRdVRj.jpg" height="60" width="60">
        </b-img>
        <p>Window</p>
      </template>
        <windows-list ></windows-list>
        </b-tab>
        <b-tab >
      <template v-slot:title>
        <b-img  rounded="circle" src="https://as2.ftcdn.net/v2/jpg/02/49/76/93/1000_F_249769389_7su5tYXOvcjcehNCcWTwcjnHvSMkLocJ.jpg" height="60" width="60">
        </b-img>
        <p>Heater</p>
      </template>
      <heaters-list ></heaters-list>
      </b-tab>
  </b-tabs>
</div>
 
</template>

<script>
import WindowsList from './WindowsList.vue';
import RoomsList from './RoomsList.vue';
import BuildingsList from './BuildingsList.vue';
import HeatersList from './HeatersList.vue';
export default  {
  name: 'MainNavigation',
  components: {
    
    WindowsList,
    RoomsList,
    BuildingsList,
    HeatersList
  },
  
  
}
</script>
