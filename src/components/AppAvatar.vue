<template>
    <div>
        <div class="uk-width-auto" v-if="image">
            <img 
                class="uk-border-circle avatar"
                :class="{ '_small': small === true }"
                :src="image" 
                alt="">
        </div>
        <div class="uk-width-auto" v-else>
            <span 
                class="uk-border-circle avatar-placeholder"
                :class="{ '_small': small === true }"
                uk-icon="icon: happy; ratio: 2;"
            ></span>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['image','small']
    }
</script>

<style lang="scss" scoped>

</style>