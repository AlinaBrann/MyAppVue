<template>
    <div>
        <div class="uk-card uk-card-default uk-margin-bottom">
            <div class="uk-card-header">
                <div class="uk-grid-small uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                        <app-avatar :image="user.image"></app-avatar>
                    </div>
                    <div class="uk-width-expand">
                        <h3 class="uk-card-title uk-margin-remove-bottom">{{ user.name }}</h3>
                        <p class="uk-text-meta uk-margin-remove-top">{{ user.email }}</p>
                        
                        
                    </div>
                </div>
            </div>
            <div class="uk-card-body">
                <p class="uk-text-meta" v-if="userPosts">
                    {{ 'numberOfPosts' | localize }}: <strong class="uk-text-bold">{{ userPosts }}</strong>
                </p>
                <p class="uk-text-meta" v-else>
                    {{ 'noPosts' | localize }}
                </p>
            </div>
        </div>
    </div>
</template>

<script>
    import AppAvatar from './AppAvatar.vue'
    export default {
        components: { AppAvatar },
        props: ['user', 'id', 'userPosts']
    }
</script>

<style lang="scss" scoped>

</style>