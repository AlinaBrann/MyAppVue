<template>
    <div>
        <div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
            <form @submit.prevent="submit">
                <fieldset class="uk-fieldset">
                    <legend class="uk-legend">{{ 'createPost' | localize }}</legend>
                    <div class="uk-flex uk-flex-center uk-margin-bottom">
                        <div class="uk-width-1-2 ">
                            <div class="uk-flex uk-flex-center uk-margin-bottom uk-margin-top">
                                <input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*">
                                <progress v-if="uploadVisibility" class="uk-progress" :value="uploadValue" max="100"></progress>
                                <div v-else uk-lightbox="animation: scale">
                                    <a class="uk-inline" v-if="img1 != null" :href="img1">
                                        <img class="preview  uk-width-1-1" height="268" width="356" :src="img1">
                                    </a>
                                    <span 
                                        v-else
                                        class="uk-border-circle"
                                        width="40" 
                                        height="40" 
                                        uk-icon="icon: upload; ratio: 2;"
                                    ></span>
                                </div>
                            </div>
                            
                            <div class="uk-flex uk-flex-between">
                                <button 
                                    type="button" 
                                    @click="click1" 
                                    class="uk-button uk-button-secondary" 
                                    v-text="!img1 ? uploadText : updateText"
                                    >
                                </button>
                                <button 
                                    type="button" 
                                    @click="deleteImage" 
                                    class="uk-button uk-button-default">
                                    {{ 'delete' | localize }}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="uk-margin">
                        <input 
                            class="uk-input" 
                            v-model.trim="title" 
                            type="text" 
                            :placeholder="'postTitle' | localize"
                            :class="{'uk-form-danger': $v.title.$dirty && !$v.title.required}"
                        >
                    </div>

                    <div class="uk-margin">
                        <textarea 
                            class="uk-textarea" 
                            v-model="text" 
                            rows="5" 
                            :placeholder="'postText' | localize"
                            >
                        </textarea>
                    </div>

                    <button 
                        class="uk-button uk-button-secondary" 
                        type="submit"
                        :disabled="updateDisabled">
                        {{ 'addPost' | localize }}
                    </button>

                </fieldset>
            </form>
        </div>
        <div id="modal-created" uk-modal>
			<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body uk-text-center">
				<button class="uk-modal-close-default" type="button" uk-close></button>
				<h2 class="uk-modal-title">{{ 'postWasPublished' | localize }}</h2>
			</div>
		</div>
    </div>
</template>

<script>
    import UIkit from 'uikit'
    import { required } from 'vuelidate/lib/validators'
    import localizeFilter from '@/filters/localize.filter'
    import firebase from 'firebase/app'
	import 'firebase/storage'
    export default {
        data: () => ({
            title: '',
            text: '',
            uploadValue: '',
			uploadVisibility: false,
            uploadText: localizeFilter('upload'),
			updateText: localizeFilter('update'),
			img1: null,
			imageName: '',
			imageData: '',
			currentUser: '',
			deleted: false
        }),
        validations: {
            title: {required}
        },
        
        methods: {
            click1() {
				this.$refs.input1.click()
				this.deleted = false
			},

			previewImage(event) {
				this.uploadValue = 0;
				this.uploadVisibility = true
				this.imageData = event.target.files[0];
				if (!this.deleted) {
					this.onUpload()
				}
			},	
			
			onUpload() {
				this.img1 = null
				this.imageName =  +new Date().getTime() + '.jpg';
				const storageRef = firebase.storage().ref(`posts/${this.imageName}`).put(this.imageData);
				storageRef.on(`state_changed`, snapshot => {
						this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					}, error => {
						console.log(error.message)
					},
					() => {
						this.uploadValue = 100;
						storageRef.snapshot.ref.getDownloadURL().then((url) => {
							this.img1 = url;
							this.uploadVisibility = false
						});
					}
				);
				
			},
			deleteImage() {
				this.deleted = true
				var desertRef = firebase.storage().ref().child(`/posts`).child(this.imageName);
				console.log(desertRef);
				desertRef.delete().then(() => {
					this.img1 = null
					const postData = {
						image: null
					}
					this.$store.dispatch('updatePost', postData)
					this.imageData = ''
					console.log('deleted');
				}).catch((error) => {
					console.log(error);
				});
			},
            async submit() {
                if(this.$v.$invalid) {
                    this.$v.$touch()
                    return
                }
                
                try {
                    const userid = await this.$store.dispatch('getUserId')
                    const post = await this.$store.dispatch('createPost',{
                        title: this.title,
                        text: this.text,
                        image: this.img1,
                        date: new Date(),
                        userid,
                        likes: 0,
                        date: new Date().getTime()
                    })
                    this.posts.push(post)
                    
                } catch (error) {
                    
                }
				UIkit.modal('#modal-created').show()
                this.title = ''
                this.text = ''
                this.updateDisabled = false
                this.imageData = ''
                this.img1 = null
                setTimeout(() => {
					UIkit.modal('#modal-created').hide()
				}, 3000);

            }
        },
        async mounted () {
            this.currentUser = await this.$store.dispatch('getUserId')
        },
        computed: {
            updateDisabled() {
				if(this.title.length){
					return false
				} else {
					return true
				}
				
			}
        },
    }
</script>

<style lang="scss" scoped>

</style>