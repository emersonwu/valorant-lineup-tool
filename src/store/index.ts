import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { RootState } from './types';
import { filter } from '@/store/filter/index'
Vue.use(Vuex);

const store: StoreOptions<RootState> = {
    state: {
        helloMessage: "Hello Message!"
    },
    modules: {
        filter,
    }
}

export default new Vuex.Store(store);