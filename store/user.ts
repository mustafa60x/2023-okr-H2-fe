// store/user.ts

import { defineStore } from 'pinia';
import { storeNames } from './enums'
import { useAuthStore } from './auth';
import { storeToRefs } from 'pinia';

export const useUserStore = defineStore(storeNames.USER, {
  state: () => ({
    user: {
        _id: '',
        name: '',
        profile: '',
        email: '',
    }
  }),
  getters: {
    // userDetail: (state) => state.user,
  },
  actions: {
    async getUserDetail(userId: any) {
      const { user } = useUserStore();
      const { isAuthenticated } = storeToRefs(useAuthStore());
      const token = localStorage.getItem("accessToken") as any;
      const { data, pending, error }: any = await useFetch(`api/users/${userId}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${JSON.parse(token)}` },
      });

      if (error.value) {
        throw new Error(error.message)
      }

      // this.loading = pending;

      user._id = data?.value?._id;
      user.name = data?.value?.name;
      user.email = data?.value?.email;
      user.profile = data?.value?.profile;

      localStorage.setItem("isAuth", 'true');
      isAuthenticated.value = true;
    },
  },
});