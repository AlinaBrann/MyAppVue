<template>
    <div>
        <div class="uk-flex uk-flex-center">
            <div class="uk-width-3-4" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 300">
                <user-card
                    v-for="(user, idx) in users"
                    :key="idx"
                    :user="user.info"
                    :userPosts="user.userPosts.length"
                ></user-card>
            </div>
        </div>
    </div>
</template>

<script>
    import UserCard from '../components/UserCard.vue'
    export default {
    components: { UserCard },
        data:() => ({
            users: []
        }),
        async mounted() {
            const allPosts = await this.$store.dispatch('featchPosts')
            const users = await this.$store.dispatch('featchUsers')
            this.users = users.map( user => {
                const userPosts = allPosts.filter( p => p.userid === user.id)
                return {
                    ...user,
                    userPosts
                }
            })
            this.users.sort(function(a, b){
                return a.userPosts.length-b.userPosts.length
                }).reverse() 
        }
    }
</script>

<style lang="scss" scoped>

</style>