import { api } from 'boot/axios'

export default function useApi (url) {
  const list = async () => {
    try {
      const { data } = await api.get(url)
      return data.users
    } catch (error) {
      throw new Error(error)
    }
  }

  const getById = async (id) => {
    try {
      const { data } = await api.get(`${url}/${id}`)
      return data
    } catch (error) {
      throw error
    }
  }

  const createuser = async (form) => {
    try {
      const { data } = await api.post(`${url}/singup`, form)
      return data
    } catch (error) {
      throw error
    }
  }

  const update = async (form) => {
    try {
      const { data } = await api.put(`${url}/${form.user_id}`, form)
      return data
    } catch (error) {
      throw error
    }
  }

  const remove = async (id) => {
    try {
      const { data } = await api.delete(`${url}/${id}`)
      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  return {
    list,
    createuser,
    update,
    remove,
    getById
  }
}