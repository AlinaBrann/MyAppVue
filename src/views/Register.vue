<template>
    <div class="login-page uk-flex uk-flex-center uk-flex-middle" uk-height-viewport>
        <form 
            class="uk-card uk-card-default uk-card-body uk-width-1-2 uk-width-1-3@xl uk-align-center"
            @submit.prevent="submit"
            >
            <fieldset class="uk-fieldset uk-text-center">

                <legend class="uk-legend">{{ 'register' | localize }}</legend>
                <div class="uk-margin">
                    <input 
                        class="uk-input" 
                        type="text" 
                        :placeholder="'name' | localize"
                        
                        v-model.trim="name"
                        :class="{'uk-form-danger': $v.name.$dirty && !$v.name.required}"
                    >
                </div> 
                <div class="uk-margin">
                    <input 
                        class="uk-input" 
                        type="email" 
                        :placeholder="'email' | localize"
                        
                        v-model.trim="email"
                        :class="{'uk-form-danger': ($v.email.$dirty && !$v.email.required) || ($v.email.$dirty && !$v.email.email)}"
                    >
                </div>
                <div class="uk-margin">
                    <input 
                        class="uk-input" 
                        type="text" 
                        :placeholder="'password' | localize"
                        v-model="password"
                        :class="{'uk-form-danger': ($v.password.$dirty && !$v.password.required) || ($v.password.$dirty && !$v.password.minLength )}" 
                    >
                </div>
                <button 
                    type="submit"
                    class="uk-button uk-button-secondary"
                >{{ 'register' | localize}}</button>
                <div class="uk-margin">
                    <p>{{ 'or' | localize }} <router-link to="/login">{{ 'loginLink' | localize }}</router-link></p>
                </div>
            </fieldset>
        </form>
    </div>
</template>

<script>
    import messages from '@/utils/messages'
    import { email, required, minLength } from 'vuelidate/lib/validators'
    import localizeFilter from '@/filters/localize.filter'

    export default {
        data: () => ({
            name: '',
            email: '',
            password: ''
        }),
        validations: {
            name: { required },
            email: { email, required },
            password: { required, minLength: minLength(6)}   
        },
        methods: {
            async submit() {
                if(this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                const formData = {
                    name: this.name,
                    email: this.email,
                    locale: 'ru-RU',
                    password: this.password
                }
                try {
                    await this.$store.dispatch('register', formData)
                    this.$router.push('/hot')
                } catch (error) {
                }
            }
        },
        mounted() {
            if( messages[this.$route.query.message]) {
                this.$message(localizeFilter(messages[this.$route.query.message]))
            }
        }
    }
</script>

<style lang="sass">
    
</style>