<template>
    <div class="uk-card uk-card-default uk-width-1-2@m">
        <div class="uk-card-header uk-flex uk-flex-between">
            <div class="uk-grid-small uk-flex-middle" uk-grid>
                <div class="uk-width-auto">
                    <app-avatar :image="avatar"></app-avatar>
                </div>
                <div class="uk-width-expand">
                    <h3 class="uk-card-title uk-margin-remove-bottom">{{ name }}</h3>
                    <p class="uk-text-meta uk-margin-remove-top">{{ email }}</p>
                </div>
            </div>
            <div class="uk-grid-small">
                <p class="uk-margin-small-bottom">{{ 'creationTime' | localize }}</p>
                <p class="uk-text-meta uk-margin-remove-top">{{ creationTime | date }}</p>
            </div>
        </div>
        <div class="uk-card-body" v-if="about">
            <p>{{ about }}</p>
        </div>
        <div class="uk-card-footer">
            <router-link 
                class="uk-button uk-button-secondary"
                to="/settings">
                {{ 'settings' | localize }}
            </router-link>
        </div>
    </div>
        
</template>

<script>
    import AppAvatar from '../components/AppAvatar.vue'
    import { mapGetters } from 'vuex'
    export default {
    components: { AppAvatar },
        data: () => ({
            name: '',
            email: '',
            about: '',
            creationTime: '',
            lastSignInTime : '' ,
            avatar: ''
        }),
        mounted() {
            this.name = this.info.name
            this.email = this.info.email
            this.about = this.info.about
            this.creationTime = this.info.creationTime
            this.lastSignInTime = this.info.lastSignInTime
            this.avatar = this.info.image
        },
        computed: {
            ...mapGetters(['info'])
        }
    }
</script>

<style lang="sass" scoped>
    
</style>