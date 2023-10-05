<template>
  <q-page padding>
    <q-form @submit="onSubmit" class="row q-col-gutter-sm">
      <q-input outlined v-model="form.name" label="Name" lazy-rules class="col-lg-6 col-xs-12"
        :rules="[val => val && val.length > 0 || 'Required Field']" />

      <q-input outlined v-model="form.email" filled type="email" label="Email" lazy-rules class="col-lg-6 col-xs-12"
        :rules="[val => val && val.length > 0 || 'Required Field']" />

      <q-input outlined v-model="form.password" filled type="password" label="Password" lazy-rules
        class="col-lg-6 col-xs-12" :rules="[val => val && val.length > 0 || 'Required Field']" />

      <div class="col-12 q-gutter-sm">
        <q-btn label="Save" color="primary" class="float-right" icon="save" type="submit" />
        <q-btn label="Cancel" color="white" class="float-right" text-color="primary" :to="{ name: 'home' }" />
      </div>
    </q-form>
  </q-page>
</template>
  
<script>
import { defineComponent, ref, onMounted } from 'vue'
import usersService from 'src/services/users'
import { useQuasar, QSpinnerGears } from 'quasar'
import { useRouter, useRoute } from 'vue-router'

export default defineComponent({
  name: 'FormUser',
  setup() {
    const { createuser, getById, update } = usersService()
    const $q = useQuasar()
    const router = useRouter()
    const route = useRoute()
    const form = ref({
      name: '',
      email: '',
      password: ''
    })

    onMounted(async () => {
      if (route.params.id) {
        getUser(route.params.id)
      }
    })

    const getUser = async (id) => {
      try {
        const response = await getById(id)
        form.value = response.user
      } catch (error) {
       
        let message = 'Unexpected error'

        if (error.response.data.message) {
          message = error.response.data.message
        }

        $q.notify({
          message: message,
          color: 'negative'
        })
      }
    }

    const onSubmit = async () => {
      let data
      try {
        if (form.value.user_id) {
          data = await update(form.value)
        } else {

          data = await createuser(form.value)
        }


        $q.notify({
          message: data.message,
          icon: 'check',
          color: 'positive'
        })
        $q.notify({
          spinner: QSpinnerGears,
          message: 'Token received ' + data.user.token,
          timeout: 6000
        })
        router.push({ name: 'home' })

      } catch (error) {

        let message = 'Unexpected error'

        if (error.response.data.message) {
          message = error.response.data.message
        }

        $q.notify({
          message: message,
          color: 'negative'
        })
      }
    }

    return {
      form,
      onSubmit
    }
  }
})
</script>