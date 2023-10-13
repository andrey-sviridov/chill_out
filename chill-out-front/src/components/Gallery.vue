<template>
<div class="text-center">
  <span style="margin-left: -60%">Галерея</span>
  <v-sheet
      class="mx-auto"
      elevation="3"
      style="background: rgba(255,255,255,0.2); width: 90%"
  >
    <v-slide-group
        selected-class="bg-success"
        show-arrows
    >
      <v-slide-group-item
          v-for="n in images"
          :key="n"
          v-slot="{ isSelected }"
      >
        <v-img
            color="grey-lighten-1"
            class="ma-4"
            height="auto"
            width="400"
            :src="n.url"
        >
          <div class="d-flex fill-height align-center justify-center">
            <v-scale-transition>
              <v-icon
                  v-if="isSelected"
                  color="red"
                  icon="mdiCloseCircleOutline"
              ></v-icon>
            </v-scale-transition>
          </div>
        </v-img>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
  <v-btn
      class="mt-3 text-white"
      style="width: 400px; height: 50px; font-size: 20px; background: rgba(255,255,255,0.2)"
  >
    Смотреть еще...
  </v-btn>
</div>
</template>

<script>

export default {
  name: "Gallery-component",
  data(){
    return{
      images: [
        {
          url: "https://wow-screenshots.com/upl/img/full_1426881712.5819326.jpg"
        },
        {
          url: "https://i.redd.it/6avbffs6v9da1.jpg"
        },
        {
          url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_rvNmxFnz1CG80kqpTsR5V93JVzdHVb9aqpaijAkf9v1ZSE-PYfQ2nVwGeE79GbhY1z0&usqp=CAU"
        },
        {
          url: "https://cdn-wow.mmoui.com/preview/pvw51033.jpg"
        },
        {
          url: "https://cdn-wow.mmoui.com/preview/pvw51033.jpg"
        },
        {
          url: "https://cdn-wow.mmoui.com/preview/pvw51033.jpg"
        },
        {
          url: "https://cdn-wow.mmoui.com/preview/pvw51033.jpg"
        },
      ]
    }
  },
  methods:{

  }
}
</script>

<style scoped>
span{
  white-space: pre-wrap;
  color: #FFF;
  text-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  font-size: 40px;
}

</style>