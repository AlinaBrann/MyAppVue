import firebase from 'firebase/app'

export default {
    state: {
        posts: []
    },
    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        }
    },
    actions: {
        async createPost({dispatch, commit}, {title, image, text, userid, likes, date}){
            try {

                const curPost = await firebase.database().ref(`/posts`).push({ title, text, image, userid, likes, date})
                return { title, text, image, userid, likes, date, id: curPost.key}
                
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async updatePost({dispatch, commit, getters}, toUpdate) {
            try {
              const updateData = {...getters.info, ...toUpdate}
              await firebase.database().ref(`/posts`).update(updateData)
              commit('setInfo', updateData)
            } catch (e) {
              commit('setError', e)
            }
        },
        async featchPosts({ dispatch, commit }) {
            try {
                const posts = (await firebase.database().ref(`/posts`).once('value')).val() || []
                return Object.keys(posts).map( key => ({...posts[key], id: key})).reverse()
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async featchAuthor({ dispatch, commit }, id ) {
            try {
                const author = (await firebase.database().ref(`/users`).child(id).once('value')).val() || {}
                
                return { ...author, id} 
            } catch (error) {
                commit('setError', error)
                throw error
            }
        },
        async updateLikes({dispatch, commit}, { likes, id }){
            try {
                await firebase.database().ref(`/posts`).child(id).update({likes})
                
            } catch (error) {
                commit('setError', error)
                throw error
            }
        }
    },
    getters: {
        posts: s => s.posts
    }
    
}