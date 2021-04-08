import UIkit from 'uikit'
import localizeFilter from '@/filters/localize.filter'

export default {
    install(Vue, options) {
        Vue.prototype.$message = function(html) {
            UIkit.notification({message: html, status: 'success'});

        }

        Vue.prototype.$error = function(html) {
            UIkit.notification({message: `[${localizeFilter('Error')}]: ${html}`,status: 'danger'});
        }
    }
}