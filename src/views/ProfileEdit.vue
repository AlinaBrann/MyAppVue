<template>
	<div>
		<div class="uk-card uk-card-default uk-card-body uk-width-1-2@m">
			<h1 class="uk-heading-divider">Настройки профиля</h1>
			<form @submit.prevent="submitHandler">
				<div class="uk-flex uk-flex-center uk-margin-bottom">
					<div class="uk-width-1-2 ">
						<div class="uk-flex uk-flex-center uk-margin-bottom uk-margin-top">
							<input type="file" ref="input1" style="display: none" @change="previewImage" accept="image/*">
							<progress v-if="uploadVisibility" class="uk-progress" :value="uploadValue" max="100"></progress>
							<div v-else uk-lightbox="animation: scale">
								<a class="uk-inline" v-if="img1 != null" :href="img1">
									<img class="preview uk-border-circle uk-width-1-1" height="268" width="356" :src="img1">
								</a>
								<span 
									v-else
									class="uk-border-circle"
									width="40" 
									height="40" 
									uk-icon="icon: happy; ratio: 2;"
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
				<hr>
				<div class="uk-card">
					<h2 class="uk-card-title">Основная информация</h2>
					<div class="uk-margin">
						<label class="uk-form-label" for="userName">{{ 'name' | localize }}</label>
						<div class="uk-form-controls uk-margin-small-top">
							<input 
								id="userName"
								type="text" 
								class="uk-input uk-width-1-2" 
								v-model="userName"
								placeholder="Input">
						</div>
					</div>
					<div class="uk-margin">
						<label class="uk-form-label" for="userAbout">{{ 'aboutAuthor' | localize }}</label>
						<div class="uk-form-controls uk-margin-small-top">
							<textarea 
								id="userAbout"
								class="uk-textarea uk-width-1-2" 
								v-model="userAbout">
							</textarea>
						</div>
					</div>
				</div>
				<hr>
				<div class="uk-card">
					<h2 class="uk-card-title">Смена пароля</h2>
					<div class="uk-margin">
						<label class="uk-form-label" for="oldPassword">{{ 'checkPassword' | localize }}</label>
						<div class="uk-form-controls uk-margin-small-top">
							<div class="uk-inline uk-width-1-2">
								<span class="uk-form-icon uk-form-icon-flip" uk-icon="icon: lock"></span>
								<input 
									id="oldPassword"
									ref="oldPassword"
									type="password" 
									class="uk-input" 
									:class="{ 
										'uk-form-danger': $v.userPasswordCheck.$dirty && $v.userPasswordCheck.$error || $v.userPasswordCheck.$dirty && !passwordTrigger,
										'uk-form-success': passwordTrigger
									}"
									v-model.trim="$v.userPasswordCheck.$model">
							</div>
							
						</div>
					</div>
					<div class="uk-margin">
						<label 
							for="newPassword"
							class="uk-form-label" 
							:class="{'uk-text-muted': !passwordTrigger}">
							{{ 'enterNewPassword' | localize }}
						</label>
						<div class="uk-form-controls uk-margin-small-top">
							<input 
								type="text" 
								ref="newPassword"
								id="newPassword"
								class="uk-input uk-width-1-2" 
								:class="{ 'uk-form-danger': $v.newPassword.$error }"
								v-model.trim="$v.newPassword.$model"
								:disabled="!passwordTrigger ? true : false ">
							
						</div>
					</div>
					<div class="uk-margin">
						<label 
							for="repeatPassword"
							class="uk-form-label" 
							:class="{ 'uk-text-muted': !passwordTrigger || !newPassword.length }">
							{{ 'repeatPassword' | localize }}
						</label>
						<div class="uk-form-controls uk-margin-small-top">
							<input 
								type="text" 
								id="repeatPassword"
								class="uk-input uk-width-1-2" 
								:class="{ 'uk-form-danger': $v.repeatPassword.$error }"
								v-model.trim="$v.repeatPassword.$model"
								:disabled="!passwordTrigger || !newPassword.length ? true : false ">
							<div class="error" v-if="$v.repeatPassword.$dirty && !$v.repeatPassword.sameAsPassword">Passwords must be identical.</div>
						</div>
					</div>
				</div>
				<hr>
				<div class="uk-flex uk-flex-between">
					<button 
						type="submit" 
						class="uk-button uk-button-secondary" 
						v-text="updateText"
						:disabled="updateDisabled"
						>
					</button>
					<router-link 
						to="/profile"
						class="uk-button uk-button-default">
						{{ 'back' | localize }}
					</router-link>
				</div>
			</form>
		</div>
		<div id="modal-attention" uk-modal>
			<div class="uk-modal-dialog uk-margin-auto-vertical uk-modal-body uk-text-center">
				<button class="uk-modal-close-default" type="button" uk-close></button>
				<h2 class="uk-modal-title">{{ 'attention' | localize }}</h2>
				<p>{{ 'dataWasUpdated' | localize }}</p>
			</div>
		</div>
	</div>
</template>

<script>
	import firebase from 'firebase/app'
	import 'firebase/storage'
	import { mapGetters } from 'vuex'
	import localizeFilter from '@/filters/localize.filter'
	import { sameAs, minLength } from 'vuelidate/lib/validators'
	import UIkit from 'uikit'

	export default {
		data: () => ({
			uploadValue: '',
			uploadVisibility: false,
			uploadText: localizeFilter('upload'),
			updateText: localizeFilter('update'),
			img1: null,
			imageName: '',
			imageData: '',
			currentUser: '',
			deleted: false,
			userName: '',
			userAbout: '',
			userPassword: '',
			userPasswordCheck: '',
			newPassword: '',
			passwordTrigger: false,
      		repeatPassword: '',
			passwordHidden: ''
		}),
		validations: {
			newPassword: {
				minLength: minLength(6)
			},
			repeatPassword: {
				sameAsPassword: sameAs('newPassword')
			},
			userPasswordCheck: {
				minLength: minLength(6)
			}

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
			async getUId() {
				this.currentUser = await this.$store.dispatch('getUserId')
			},
			onUpload() {
				this.img1 = null
				this.imageName =  'Avatar_' + this.currentUser + '.jpg';
				const storageRef = firebase.storage().ref(`users/${this.currentUser}/${this.imageName}`).put(this.imageData);
				storageRef.on(`state_changed`, snapshot => {
						this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
					}, error => {
						console.log(error.message)
					},
					() => {
						this.uploadValue = 100;
						storageRef.snapshot.ref.getDownloadURL().then((url) => {
							this.img1 = url;
							const userData = {
								image: this.img1
							}
							this.$store.dispatch('updateInfo', userData)

							this.uploadVisibility = false
						});
					}
				);
				
			},
			deleteImage() {
				this.deleted = true
				var desertRef = firebase.storage().ref().child(`/users/${this.currentUser}`).child(this.imageName);
				console.log(desertRef);
				desertRef.delete().then(() => {
					this.img1 = null
					const userData = {
						image: null
					}
					this.$store.dispatch('updateInfo', userData)
					this.imageData = ''
					console.log('deleted');
				}).catch((error) => {
					console.log(error);
				});
			},
			focusNewPassInput() {
				this.$refs.oldPassword.blur()
				setTimeout(() => {
					this.$refs.newPassword.focus()
				}, 100);				
			},
			async submitHandler() {
				if (this.$v.$invalid) {
					this.$v.$touch()
					return
				}
				try {
					const userData = {
						name: this.userName,
						about: this.userAbout,
						password: this.passwordHidden
					}
					await this.$store.dispatch('updateInfo', userData)
					UIkit.modal('#modal-attention').show()
					

				} catch (e) {}
				setTimeout(() => {
					UIkit.modal('#modal-attention').hide()
				}, 3000);
				this.updateDisabled = false
				
			}
		},
		mounted() {
			if(this.info.image) {
				this.img1 = this.info.image	
			}
			this.getUId()
		},
		watch: {
			
			userPasswordCheck(newValue, oldValue) {
				if (this.userPassword == newValue) {
					this.passwordTrigger = true
					this.focusNewPassInput()
				} else {
					this.passwordTrigger = false
				}
			},
			repeatPassword(newValue) {
				if (newValue) {
					this.passwordHidden = newValue
				}
				
			}
		},
		created () {
			this.userName = this.info.name
			this.userAbout = this.info.about
			this.userPassword = this.info.password
			this.passwordHidden = this.userPassword
		},
		computed: {
            ...mapGetters(['info']),
			updateDisabled() {
				if(this.info.name === this.userName && this.info.about === this.userAbout){
					return true
				} else {
					return false
				}
				
			}
        }
	}
</script>

<style lang="sass" scoped>
</style>