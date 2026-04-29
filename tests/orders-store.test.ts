import { setActivePinia, createPinia } from 'pinia'
import { useOrdersStore } from '../stores/orders'
import type { OrderStatus } from '~/types/order.types'

describe('Orders Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('filters orders by status', () => {
    const store = useOrdersStore()
    store.setOrders([
      { id: '1', createdAt: '', status: 'ready', items: [], amount: 10, labLocation: '' },
      { id: '2', createdAt: '', status: 'cancelled', items: [], amount: 20, labLocation: '' },
    ])
    store.setStatusFilter('ready')
    expect(store.filteredOrders.length).toBe(1)
    expect(store.filteredOrders[0].status).toBe('ready')
  })

  it('paginates orders', () => {
    const store = useOrdersStore()
    const orders = Array.from({ length: 12 }, (_, i) => ({
      id: String(i+1), createdAt: '', status: 'ready' as OrderStatus, items: [], amount: 10, labLocation: ''
    }))
    store.setOrders(orders)
    store.setPage(2)
    expect(store.paginatedOrders.length).toBe(5)
    expect(store.paginatedOrders[0].id).toBe('6')
  })
})
