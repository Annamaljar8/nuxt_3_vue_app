<template>
  <v-container class="py-8 login-wrapper">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="pa-6">
          <h1 class="text-h5 font-weight-bold mb-4">Login</h1>
          <v-form @submit.prevent="onLogin">
            <v-text-field
              v-model="userId"
              label="User ID"
              required
              autofocus
              prepend-inner-icon="mdi-account"
            />
            <v-btn type="submit" color="primary" class="mt-4" block>Login</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
.v-container {
  max-width: 600px;
}
.login-wrapper {
  display: flex;
  align-items: center;
  height: 65vh;
}
</style>
