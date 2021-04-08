<template>
    <div class="uk-card uk-card-default uk-margin-bottom" >
        <div class="uk-card-header">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-3-4">
                    <h3 class="uk-card-title uk-text-bold uk-text-large">{{ post.title }}</h3>
                </div>
                <div class="uk-width-1-4 uk-text-right">
                    <timeago :datetime="post.date" v-if="post.date" locale="ru"></timeago>
                </div>
            </div>
        </div>
        <div class="uk-card-body">
            <img :src="post.image" class="uk-margin-bottom" v-if="post.image" :alt="post.title">
            <p v-if="post.text">{{ post.text }}</p>
        </div>
        <div class="uk-card-footer">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-1-2">
                    <button 
                        class="like-button uk-background-default"
                        :class="{ 'uk-text-danger': pressed }"
                        @click="likeIncrement(post)"
                        >
                        <span class="uk-margin-small-right" uk-icon="heart"></span>
                        <span>{{ post.likes }}</span>
                    </button>
                </div>
                
                <div class="uk-width-expand uk-flex uk-flex-right uk-flex-top">
                    <div class="uk-margin-right">
                        <app-avatar :image="authorAvatar" :small="true"></app-avatar>
                    </div>
                    <div class="">
                        <h3 class="uk-card-title uk-margin-remove-bottom">{{ authorName }}</h3>
                        <p class="uk-text-meta uk-margin-remove-top">{{ authorEmail }}</p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<script>
    import AppAvatar from './AppAvatar.vue'
    import {mapGetters} from 'vuex'
    export default {
    components: { AppAvatar },
        props: ['post'],
        data: () => ({
            postid: '',
            pressed: false,
            author: {},
            authorName: '',
            authorEmail: '',
            authorAvatar: ''
        }),
        methods: {
            async likeIncrement(post) {
                if (this.pressed && post.likes != 0) {
                    post.likes  --
                    this.pressed = false
                    
                }  else if (!this.pressed) {
                    post.likes  ++
                    this.pressed = true
                } 
                try {
                    const likeData = {
                        likes: post.likes,
                        id: post.id
                    }
                    await this.$store.dispatch('updateLikes', likeData)
                } catch (error) {
                    
                }
            }
            
        },
        async mounted() {
            const id = this.post.userid
            
            const author = await this.$store.dispatch('featchAuthor', id)
            this.authorName = author.info.name,
            this.authorEmail = author.info.email   
            this.authorAvatar = author.info.image   
            
        },
        computed: {
            ...mapGetters(['posts'])
        }
    }
</script>

<style lang="sass" scoped>
    .like-button
        border: none
        cursor: pointer
        outline: none
</style>