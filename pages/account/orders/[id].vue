<template>
  <v-container class="py-10">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card v-if="order" class="order-card">
          <div
            class="order-header"
            :class="statusClass(order.status)"
          >
            <div>
              <div class="text-h6 font-weight-bold">
                Order #{{ order.id }}
              </div>
              <div class="text-caption opacity-70">
                {{ formatDate(order.createdAt) }}
              </div>
            </div>
            <div class="header-right">
              <NuxtLink
                :to="{
                  path: '/account/orders',
                  query: {
                    status: route.query.status || undefined,
                    page: route.query.page || 1
                  }
                }"
              >
                <v-btn
                  class="back-btn"
                  variant="elevated"
                  color="white"
                  prepend-icon="mdi-arrow-left"
                >
                  Back
                </v-btn>
              </NuxtLink>
            </div>
          </div>
          <v-divider />
          <v-card-text class="order-content">
            <v-row density="comfortable">
              <v-col cols="12" md="5">
                <v-card variant="outlined" class="pa-4 h-100">
                  <div class="text-subtitle-1 font-weight-bold mb-4">
                    Order details
                  </div>
                  <v-list density="compact">
                    <v-list-item>
                      <v-list-item-title>Status</v-list-item-title>
                      <v-list-item-subtitle>
                        <v-chip
                          :color="statusColor(order.status)"
                          variant="tonal"
                        >
                          {{ order.status }}
                        </v-chip>
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Lab</v-list-item-title>
                      <v-list-item-subtitle>
                        {{ order.labLocation }}
                      </v-list-item-subtitle>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-title>Total</v-list-item-title>
                      <v-list-item-subtitle class="font-weight-bold">
                        {{ order.amount.toFixed(2) }} zł
                      </v-list-item-subtitle>
                    </v-list-item>
                  </v-list>
                </v-card>
              </v-col>
              <v-col cols="12" md="7">
                <v-card variant="outlined" class="pa-4 h-100">
                  <div class="text-subtitle-1 font-weight-bold mb-4">
                    Tests
                  </div>
                  <v-divider class="mb-3" />
                  <div
                    v-for="item in order.items"
                    :key="item.testId"
                    class="item-row"
                  >
                    <div>
                      <div class="font-weight-medium">
                        {{ item.testName }}
                      </div>
                      <div class="text-caption text-grey">
                        Quantity: {{ item.quantity }}
                      </div>
                    </div>
                    <div class="font-weight-bold">
                      {{ item.price.toFixed(2) }} zł
                    </div>
                  </div>
                </v-card>
              </v-col>
              <v-col cols="12">
                <div class="actions">
                  <v-btn
                    v-if="order.resultPdf"
                    color="success"
                    prepend-icon="mdi-file-pdf-box"
                    :href="order.resultPdf"
                    target="_blank"
                  >
                    Download PDF
                  </v-btn>
                  <v-btn
                    v-if="order.status === 'pending_payment'"
                    color="warning"
                    prepend-icon="mdi-reload"
                    @click="retryPayment"
                  >
                    Retry payment
                  </v-btn>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
        <v-alert v-else type="error" class="mt-8">
          Order not found
        </v-alert>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useOrdersStore } from '~/stores/orders'
import { onMounted, ref } from 'vue'

const route = useRoute()
const store = useOrdersStore()
const order = ref<any>(null)

onMounted(async () => {
  if (store.orders.length === 0) {
    const res = await fetch('/orders.json')
    const data = await res.json()
    store.setOrders(data)
  }

  order.value = store.getOrderById(route.params.id as string)
})

function retryPayment() {
  alert('Payment retry simulated!')
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString()
}

function statusColor(status: string) {
  switch (status) {
    case 'ready': return 'success'
    case 'cancelled': return 'error'
    case 'processing': return 'info'
    case 'in_lab': return 'primary'
    case 'awaiting_sample': return 'warning'
    case 'pending_payment': return 'orange'
    default: return 'grey'
  }
}

function statusClass(status: string) {
  return `header--${status}`
}
</script>

<style scoped>
.order-card {
  border-radius: 18px;
  overflow: hidden;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 20px;
  backdrop-filter: blur(10px);
}

.back-btn {
  border-radius: 999px;
  text-transform: none;
  font-weight: 600;
}

.order-content {
  padding: 24px;
}

.item-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-row:last-child {
  border-bottom: none;
}

.actions {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;
}

.header--ready {
  background: rgba(76, 175, 80, 0.08);
}

.header--cancelled {
  background: rgba(244, 67, 54, 0.08);
}

.header--processing {
  background: rgba(33, 150, 243, 0.08);
}

.header--in_lab {
  background: rgba(63, 81, 181, 0.08);
}

.header--awaiting_sample {
  background: rgba(255, 152, 0, 0.10);
}

.header--pending_payment {
  background: rgba(255, 152, 0, 0.08);
}
</style>