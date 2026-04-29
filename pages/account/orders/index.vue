<template>
  <v-container class="py-8">
    <v-row justify="center">
      <v-col cols="12" md="10" lg="8">
        <v-card class="orders-card" elevation="4">
          <v-toolbar color="primary" dark flat>
            <v-toolbar-title class="text-h5">Order History</v-toolbar-title>
            <v-spacer />
            <v-btn icon @click="logout">
              <v-icon>mdi-logout</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text class="orders-content">
            <v-row class="mb-5 mt-3">
              <v-col cols="12" md="5">
                <v-select
                  v-model="statusFilter"
                  :items="statusItems"
                  label="Status"
                  item-title="title"
                  item-value="value"
                  variant="outlined"
                  density="comfortable"
                  hide-details
                  clearable
                />
              </v-col>
            </v-row>
            <v-divider class="mb-4" />
            <v-skeleton-loader v-if="loading" type="table" />
            <v-alert
              v-else-if="paginatedOrders.length === 0"
              type="info"
              variant="tonal"
            >
              No orders found.
            </v-alert>
            <v-data-table
              v-else
              :headers="headers"
              :items="paginatedOrders"
              :items-per-page="store.pagination.perPage"
              hide-default-footer
              density="comfortable"
              hover
            >
              <template #item.id="{ item }">
                <NuxtLink
                  :to="{
                    path: `/account/orders/${item.id}`,
                    query: {
                      status: statusFilter || undefined,
                      page: currentPage
                    }
                  }"
                  class="text-primary font-weight-medium"
                >
                  #{{ item.id }}
                </NuxtLink>
              </template>
              <template #item.status="{ item }">
                <v-chip
                  :color="statusColor(item.status)"
                  variant="tonal"
                  size="small"
                >
                  {{ item.status }}
                </v-chip>
              </template>
              <template #item.amount="{ item }">
                {{ item.amount.toFixed(2) }} zł
              </template>
            </v-data-table>
          </v-card-text>
          <div v-if="totalPages > 1" class="orders-footer">
            <v-pagination
              v-model="currentPage"
              :length="totalPages"
              color="primary"
            />
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useOrdersStore } from '~/stores/orders'
import { useAuthStore } from '~/stores/auth'
import type { OrderStatus } from '~/types/order.types'

const store = useOrdersStore()
const auth = useAuthStore()
const route = useRoute()
const router = useRouter()

const loading = ref(true)

const statusFilter = ref<string>('')
const currentPage = ref(1)

const statusItems = [
  { title: 'All', value: '' },
  { title: 'pending_payment', value: 'pending_payment' },
  { title: 'processing', value: 'processing' },
  { title: 'awaiting_sample', value: 'awaiting_sample' },
  { title: 'in_lab', value: 'in_lab' },
  { title: 'ready', value: 'ready' },
  { title: 'cancelled', value: 'cancelled' },
]

const headers = [
  { title: 'Order ID', value: 'id' },
  { title: 'Date', value: 'createdAt' },
  { title: 'Status', value: 'status' },
  { title: 'Amount', value: 'amount' },
]

onMounted(async () => {
  auth.hydrate()
  if (store.orders.length === 0) {
    const res = await fetch('/orders.json')
    const data = await res.json()
    store.setOrders(data)
  }
  const status = (route.query.status as string) || ''
  const page = Number(route.query.page) || 1

  statusFilter.value = status
  store.setStatusFilter(status ? (status as OrderStatus) : null)

  const filtered = store.filteredOrders
  const maxPage = Math.max(
    1,
    Math.ceil(filtered.length / store.pagination.perPage)
  )

  store.setPage(page, maxPage)
  currentPage.value = store.pagination.currentPage
  loading.value = false
})

watch(statusFilter, (val) => {
  store.setStatusFilter(val ? (val as OrderStatus) : null)
  const filtered = store.filteredOrders
  const maxPage = Math.max(
    1,
    Math.ceil(filtered.length / store.pagination.perPage)
  )

  store.setPage(1, maxPage)
  currentPage.value = 1

  router.replace({
    query: {
      ...route.query,
      status: val || undefined,
      page: 1,
    },
  })
})

watch(currentPage, (val) => {
  store.setPage(val)
  router.replace({
    query: {
      ...route.query,
      page: val,
    },
  })
})

watch(
  () => route.fullPath,
  () => {
    const status = (route.query.status as string) || ''
    const page = Number(route.query.page) || 1

    statusFilter.value = status
    store.setStatusFilter(status ? (status as OrderStatus) : null)

    const filtered = store.filteredOrders
    const maxPage = Math.max(
      1,
      Math.ceil(filtered.length / store.pagination.perPage)
    )

    store.setPage(page, maxPage)
    currentPage.value = store.pagination.currentPage
  }
)

const paginatedOrders = computed(() => store.paginatedOrders)
const totalPages = computed(() => store.totalPages)

function logout() {
  auth.logout()
  router.push('/login')
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
</script>

<style scoped>
.orders-card {
  display: flex;
  flex-direction: column;
  height: 70vh;
  border-radius: 18px;
}

.orders-content {
  flex: 1;
  overflow-y: auto;
}

.orders-footer {
  padding: 12px;
  border-top: 1px solid #eee;
  background: white;
}
</style>