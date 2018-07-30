import model from '../../model/client-model'
import notify from '../../components/notification/function'
import bus from '../../utils/bus.js'

const handleError = err => {
  if (err.code === 401) {
    // 未登录
    notify({
      content: '你得先登录啊'
    })
    bus.$emit('auth')
    return
  }
  notify({
    content: err.message
  })
  return err
}

export default {
  updateCountAsync (store, data) {
    // console.log('asdasd')
    setTimeout(() => {
      store.commit('updateCount', {
        num: data.num
      })
    }, data.time)
  },
  fetchTodos ({ commit }) {
    return model.getAllTodos().then(data => {
      commit('setTodos', data)
    }).catch(err => {
      handleError(err)
    })
  },
  login ({commit}, {username, password}) {
    return new Promise((resolve, reject) => {
      model.login(username, password).then(data => {
        commit('setUser', data)
        notify({
          content: '登录成功'
        })
        resolve()
      }).catch(err => {
        reject(handleError(err))
      })
    })
  }
}
