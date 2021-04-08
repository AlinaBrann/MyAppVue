<template>
    <div class="empty-wrapper uk-background-cover">
        <router-view /> 
    </div>
</template>

<script>
    import messages from '@/utils/messages'
    export default {
        computed: {
            error() {
                return this.$store.getters.error
            }
        },
        watch: {
            error(fbError){ 
                this.$error(messages[fbError.code] || 'Что-то пошло не так')
            }
        }
    }
</script>

<style lang="sass" scoped>
    .empty-wrapper
        background-image: url(../assets/images/background.jpg)
</style>