<template>
    <div>
        <div class="uk-flex uk-flex-center uk-margin-large-bottom">
            <div class="uk-width-2-3" uk-scrollspy="target: > div; cls: uk-animation-fade; delay: 300">
                <post-card
                    v-for="(post, idx) in posts"
                    :key="idx"
                    :post="post"
                    >
                </post-card>
            </div>
        </div>
    </div>
</template>

<script>
    import PostCard from '../components/PostCard.vue'
    export default {
        data: () => ({
            posts: []
        }),
        async mounted() {
            this.posts = await this.$store.dispatch('featchPosts')
            this.posts.sort(function(a, b){
                return a.likes-b.likes
            }).reverse() 
        },

        components: { PostCard }
    }
</script>

<style lang="scss" scoped>

</style>