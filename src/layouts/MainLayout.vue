<template>
    <Loader v-if="loading"/>
    <div v-else class="main-wrapper uk-background-cover uk-background-fixed" uk-height-viewport>
        <TheNavbar :key="locale"/>
        <div class="uk-container uk-margin-top">
            <router-view /> 
        </div>
    </div>
</template>

<script>
import Loader from '../components/Loader.vue'
import TheNavbar from '../components/TheNavbar.vue'
export default {
    data: () => ({
		loading: true
	}),
    async mounted() {
        if (!this.$store.getters.info.length) {
            await this.$store.dispatch('fetchInfo')
        }
		
		this.loading = false

	},
    computed: {
		locale() {
			return this.$store.getters.info.locale
		}
    },
    components: {
        TheNavbar,
        Loader
    }
}
</script>

<style lang="sass" scoped>
    .main-wrapper
        background-image: url('../assets/images/main-background.jpg')
</style>