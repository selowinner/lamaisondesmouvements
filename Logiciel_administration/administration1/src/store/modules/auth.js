import axios from "axios"
// import Vue from 'vue'

const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    // user_info:{},
}



const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status,

  //   TheUser: state => {
  //     let USer = state.user_info

  //     return USer
  // },
}


const mutations = {

    // SET_ANALITYCS (state, data){
    //     state.analytycs = data
    // },
    AUTH_REQUEST: (state) => {
        state.status = 'loading'
    },
    AUTH_SUCCESS: (state, token) => {
        state.status = 'success'
        state.token = token
    },
    AUTH_ERROR: (state) => {
        state.status = 'error'
    },
    AUTH_LOGOUT: (state) => {
      state.status = ''
      state.token = ''
    },
    // USER_INFO: (state, theuser) => {
    //   state.user_info = theuser
    // },


}

const actions = {
    // init_analytycs: ({commit}) => {
    //     Vue.prototype.$http
    //         .get('http://127.0.0.1:3333/administration/analytics')
    //         .then(res => {
    //             commit('SET_ANALITYCS', res.data.data)
    //         })
    //         .catch(error => console.log(error))
    // } 
    auth_request: ({commit, /*dispatch*/}, user) => {
        return new Promise((resolve, reject) => { // The Promise used for router redirect in login
          commit('AUTH_REQUEST')
          axios({url: 'user/login', data: user, method: 'POST' })
            .then(resp => {
              if (resp.data.status == "error") {// in case of falling authentification {c'est Le moniteur qui a fait le son}
                const authError = resp.data
                resolve(authError)
              }
              const theuser = resp.data.user //The UserData
              localStorage.setItem('user-info', theuser.pseudo) // store UserPseudo in localstorage

              const token = resp.data.token.token //The token
              localStorage.setItem('user-token', token) // store the token in localstorage
              axios.defaults.headers.common['Authorization'] = `Bearer ${token}` // the following line To set the  authorization header {Le moniteur}
              commit('AUTH_SUCCESS', token)
              // you have your token, now log in your user :)
              // dispatch('init_user') // you can find this action in modules.user.js file {le moniteur}
              // commit('USER_INFO', theuser)
              resolve(resp)
            })
          .catch(err => {
            commit('AUTH_ERROR', err)
            localStorage.removeItem('user-token') // if the request fails, remove any possible user token if possible
            reject(err)
          })
        })
      },

    auth_logout: ({commit}) => {
        return new Promise((resolve) => {
            commit('AUTH_LOGOUT')
            localStorage.removeItem('user-token')
            // remove the axios default header
            // delete axios.defaults.headers.common['Authorization']
            resolve()
        })
    }
    
}


export default({
    state,
    mutations,
    actions,
    getters
  });