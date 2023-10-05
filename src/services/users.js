import useApi from 'src/composables/UseApi'

export default function usersService () {
  const { list, createuser, update, remove, getById } = useApi('users')

  return {
    list,
    createuser,
    update,
    remove,
    getById
  }
}