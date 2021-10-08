# Vore
A state management library based on vue3 reactivity api with typescript support


## Install

`npm install vore` or `yarn add vore`

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
import { Store } from 'vore'
import { User } from 'user-path'

export const store = new Store({
  user: new User()
})
```

### Step3. use store.get to access store instance
```vue
<template>
  <div>{{ userStore.fullname }}</div>
</template>

<script lang="ts" setup>
  import { onMounted } from 'vue'
  import { store } from 'store-path'
  
  const userStore = store.get('user')

  onMounted(() => {
    userStore.getUserInfo()
  })
</script>
```
