<template>
    <header>
        <nav class="uk-navbar-container" uk-navbar>
            <div class="uk-navbar-left">

                <ul class="uk-navbar-nav">
                    <router-link 
                        v-for="nav in navLinks"
                        :key="nav.title"
                        :to="nav.path" 
                        v-slot="{ href, navigate, isActive }"
                        :exact="nav.exact"
                        custom>
                        <li :class="isActive && 'uk-active'">
                            <a :href="href" @click="navigate">{{ nav.title }}</a>
                        </li>
                    </router-link>
                </ul>
            </div>
           
            <div class="uk-navbar-right">
                <div class="uk-margin-right">
                    <LanguageSwitcher />
                </div>
                <ul class="uk-navbar-nav">
                    <li>
                        <a href="#"><span uk-icon="icon: user"></span> {{ userName }}</a>
                        <div class="uk-navbar-dropdown">
                            <ul class="uk-nav uk-navbar-dropdown-nav">
                                <li class="uk-active">
                                    <router-link to="/profile">{{ 'profile' | localize }}</router-link>
                                </li>
                                <li class="uk-active">
                                    <router-link to="/new-post">{{ 'createPost' | localize }}</router-link>
                                </li>
                                <li class="uk-nav-divider"></li>
                                <button
                                    class="uk-button uk-button-secondary uk-margin-top"
                                    @click.prevent="logout"
                                >{{ 'logout' | localize}}</button>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
        </nav>
    </header>
</template>

<script>
    import {mapGetters} from 'vuex'

    import localizeFilter from '@/filters/localize.filter'
    import LanguageSwitcher from './LanguageSwitcher.vue'
    export default {
        components: { LanguageSwitcher },
        data: () => ({
            
            navLinks: [
                {
                    title: localizeFilter('hot'),
                    path: '/hot',
                    exact: true
                },
                {
                    title: localizeFilter('new'),
                    path: '/new'
                },
                {
                    title: localizeFilter('createPost'),
                    path: '/new-post'
                },
                {
                    title: localizeFilter('users'),
                    path: '/users'
                }
            ]
        }),
        
        methods: {
            
            async logout() {
                await this.$store.dispatch('logout')
                this.$router.push('/login?message=logout')
            }
        },
        computed: {
            ...mapGetters(['info']),
            userName() {
                return this.info.name
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>