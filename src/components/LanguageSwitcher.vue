<template>
    <div>
        <div class="uk-inline">
            <button class="uk-button uk-button-default" type="button"> {{ localeTitle }}</button>
            <div uk-dropdown="mode: click">
                <form @submit.prevent="submitHandler">
                    <ul class="uk-list uk-list-divider">
                        <li v-for="(item, idx) in locales" :key="idx">
                            <label :class="(locale === item.value) ? 'uk-text-primary' : 'uk-text-muted'">
                                <input 
                                    hidden
                                    @change="filterChanged" 
                                    ref="radio"
                                    class="uk-radio" 
                                    type="radio" 
                                    name="locale" 
                                    :value="item.value" 
                                    :data-title="item.name"
                                    v-model="locale"> 
                                {{ item.name }} 
                            </label>
                        </li>
                    </ul>
                        
                       
                </form>
                
            </div>
        </div>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        data: () => ({
            locale: '',
            localeTitle: '',
            locales: [
                {
                    name: 'Ру',
                    value: 'ru-RU'
                },
                {
                    name: 'En',
                    value: 'en-US'
                }
            ]
        }),
        mounted () {
            this.locale = this.info.locale
            const title = this.locales.find(title => title.value === this.info.locale);
            this.localeTitle = title.name
            console.log(title.name);
        },
        methods: {
            ...mapActions(['updateInfo']),
            filterChanged(radio) {
                
                this.submitHandler()
                const title = radio.currentTarget.getAttribute('data-title')
                this.localeTitle = title
                console.log(this.localeTitle);
               
            },
            async submitHandler() {
                try {
                    await this.updateInfo({
                        locale: this.locale
                    })
                } catch(e) {
                    console.log(e);
                }
            }
        },
        computed: {
            ...mapGetters(['info'])
        },
    }
</script>

<style lang="scss" scoped>

</style>