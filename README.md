# Vore
A state management library based on vue3 reactivity api with typescript support

## Usage

### Step1. Defind a store class
```typescript
class User {
  firstName: string
  lastName: string

  get fullname() {
    if(!this.firstName && !this.lastName) {
      return ''
    }
    return this.firstName + ' ' + this.lastName
  }

  getUserInfo() {
    this.firstName = 'hello'
    this.lastName = 'world'
  }
}
```

### Setp2. Create store
```typescript
import { createStore } from 'vore'
import { User } from 'user-path'

export const store = createStore({
  user: User
})
```

### Step3. use store to access store instance
```vue
<template>
  <div>{{ userStore.fullname }}</div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { store } from 'store-path'
  
  const userStore = store.useStore('user')

  onMounted(() => {
    userStore.getUserInfo()
  })
</script>
```
