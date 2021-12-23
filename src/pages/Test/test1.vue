<template>
  <div>
    <page-title :heading=heading
                :subheading=subheading
                :icon=icon
                :breadcrumb-item="breadcrumbItem"
    ></page-title>
    <my-list title="课程信息" :items="items" :fields="fields">
      <template slot-scope="row">
        <b-card class="mb-3 nav-justified" no-body>
          <b-tabs pills card>
            <b-tab title="课程信息" active>
              <p>It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages,
                and more recently with desktop
                publishing software like Aldus PageMaker
                including versions of Lorem Ipsum.</p>
            </b-tab>
            <b-tab title="其他功能">
              <template
                  v-for="variant in ['primary','secondary','success','info','warning','danger','focus','alternate','light','dark','link']">
                <b-button class="mr-2 mb-2" :variant="variant" :key="variant">
                  {{ variant }}
                </b-button>
              </template>
            </b-tab>
          </b-tabs>
        </b-card>
      </template>
    </my-list>
  </div>
</template>

<script>
import PageTitle from "@/layout/Components/PageTitle.vue";
import MyList from "@/components/myList";

export default {
  name: "test1",
  components: {MyList, PageTitle},
  data() {
    return {
      heading: 'Standard Buttons',
      subheading: 'Wide selection of buttons that feature different styles for backgrounds, borders and hover options!',
      icon: 'pe-7s-plane icon-gradient bg-tempting-azure',
      breadcrumbItem: [
        {
          text: 'Admin',
          href: '#'
        },
        {
          text: 'Manage',
          href: '#'
        },
        {
          text: 'Library',
          active: true
        }
      ],
      fields: ['first_name', 'last_name'],
      items: [
        {
          isActive: true,
          age: 40,
          first_name: 'Dickerson',
          last_name: 'Macdonald',
          _showDetails: false,
          style: "cursor: pointer;"
        },
        {isActive: false, age: 21, first_name: 'Larsen', last_name: 'Shaw', _showDetails: false},
        {
          isActive: false,
          age: 89,
          first_name: 'Geneva',
          last_name: 'Wilson',
          _showDetails: false,
        },
        {isActive: true, age: 38, first_name: 'Jami', last_name: 'Carney', _showDetails: false}
      ],
      showChart: false
    }

  }
}

</script>

<style scoped>

</style>