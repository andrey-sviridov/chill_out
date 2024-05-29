<template>
  <v-container>
    <v-row justify="start">
      <v-timeline side="end" style="max-width: 50%;">
        <v-timeline-item
            v-for="item in items"
            :key="item.id"
            :dot-color="item.color"
            size="small"
        >
          <v-alert
              :color="item.color"
              :icon="item.icon"
              :value="true"
          >
            {{item.message}}
          </v-alert>
        </v-timeline-item>
      </v-timeline>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Activity-component",
      data(){
        return{
          items: [
            {
              id: 1,
              color: 'success',
              icon: 'mdi-information',
              message: "Гильдия убивает босса Малкорок, в 21:58"
            },
            {
              id: 2,
              color: 'success',
              icon: 'mdi-information',
              message: "Гильдия убивает босса Совет Клакси, в 20:35"
            },
          ],
        }
      }
}
</script>

<style scoped>

</style>