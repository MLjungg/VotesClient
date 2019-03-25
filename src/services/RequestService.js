import Api from '@/services/Api'

export default{
  register (credentials) {
    return Api().post('register', credentials)
  },
  validate (credentials) {
    return Api().post('validate', credentials)
  },
  verifyToken (token) {
    return Api().post('verifyToken', token)
  },

  vote (vote) {
    return Api().post('vote', vote)
  },

  getVideo (user) {
    return Api().post('getVideo', user)
  }
}
