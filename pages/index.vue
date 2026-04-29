<template>
  <div class="login-page">
    <h1>Login</h1>
    <v-form @submit.prevent="onLogin">
      <v-text-field
        v-model="userId"
        label="User ID"
        required
        autofocus
        prepend-inner-icon="mdi-account"
        color="primary"
      />
      <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
    </v-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '~/stores/auth'

const userId = ref('user1')
const auth = useAuthStore()
const router = useRouter()

auth.hydrate()

function onLogin() {
  auth.login(userId.value)
  router.push('/account/orders')
}
</script>

<style scoped>
.login-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border-radius: 8px;
  background: #fff;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
</style>
