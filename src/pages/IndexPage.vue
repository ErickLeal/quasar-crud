<template>
  <q-page padding>
    <q-table
      title="Users"
      :rows="rows"
      :columns="columns"
      row-key="name"
    >
    <template v-slot:top>
        <span class="text-h5">Users</span>
        <q-space />
        <q-btn color="primary" label="Create" :to="{ name: 'formUser' }" />
      </template>
    
    <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-sm">
          <q-btn icon="edit" color="info" dense size="sm" @click="handleEditUser(props.row.user_id)" />
          <q-btn icon="delete" color="negative" dense size="sm" @click="handleDeleteUser(props.row.user_id)" />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue'
import usersService from 'src/services/users'
import { useQuasar } from 'quasar'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'IndexPage',

  setup() {
    const rows = ref([])
    const columns = [
      { name: 'user_id', field: 'user_id', label: 'Id', sortable: true, align: 'left' },
      { name: 'name', field: 'name', label: 'Name', sortable: true, align: 'left' },
      { name: 'email', field: 'email', label: 'Email', sortable: true, align: 'left' },
      { name: 'actions', field: 'actions', label: 'Ações', align: 'right' }
    ]

    const { list, remove } = usersService()
    const $q = useQuasar()
    const router = useRouter()

    onMounted(() => {
      getUsers()
    })

    const getUsers = async () => {
      try {
        const data = await list()
        rows.value = data
      } catch (error) {
        console.error(error)
      }
    }

    const handleDeleteUser = async (user_id) => {
      try {
        $q.dialog({
          title: 'Delete',
          message: 'Do you want to delete this user ?',
          cancel: true,
          persistent: true
        }).onOk(async () => {
          await remove(user_id)
          $q.notify({ message: 'Successful deleted', icon: 'check', color: 'positive' })
          await getUsers()
        })
      } catch (error) {
        $q.notify({ message: 'Error', icon: 'times', color: 'negative' })
      }
    }

    const handleEditUser = (id) => {
      router.push({ name: 'formUser', params: { id } })
    }

    return {
      rows,
      columns,
      handleDeleteUser,
      handleEditUser
    }

  }

})
</script>
