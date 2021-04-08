import firebase from 'firebase/app'
export default {
    actions: {
        async login({dispatch, commit}, {email, password}) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password)
            } catch(e) {
                commit('setError', e)
                throw e
            }
        },
        async register({dispatch, commit}, {email, password, name}){
            try {
                await firebase.auth().createUserWithEmailAndPassword(email, password)
                const userid = await dispatch('getUserId')
                const creationTime = firebase.auth().currentUser.metadata.creationTime
                const lastSignInTime = firebase.auth().currentUser.metadata.lastSignInTime
                await firebase.database().ref(`/users/${userid}/info`).set({
                    name,
                    email,
                    password,
                    creationTime,
                    lastSignInTime
                })
                
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        getUserId() {
            const user = firebase.auth().currentUser
            return  user ? user.uid : null 
            
        },
        async logout({ commit }) {
            await firebase.auth().signOut()
            commit('clearInfo')
        }
    }
}