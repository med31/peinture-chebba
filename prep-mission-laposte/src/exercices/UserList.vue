<script setup lang="ts">
import { ref } from "vue";

interface UserRow {
  firstName: string;
  lastName: string;
}

const firstName = ref("");
const lastName = ref("");
const users = ref<UserRow[]>([]);

function addUser(): void {
  if (!firstName.value.trim() || !lastName.value.trim()) return;
  users.value.push({
    firstName: firstName.value.trim(),
    lastName: lastName.value.trim(),
  });
  firstName.value = "";
  lastName.value = "";
}
</script>

<template>
  <div>
    <div>
      <label>
        First name
        <input v-model="firstName" />
      </label>
      <label>
        Last name
        <input v-model="lastName" />
      </label>
      <button type="button" @click="addUser">Add user</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Index</th>
          <th>First</th>
          <th>Last</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(user, index) in users" :key="index">
          <td>{{ index + 1 }}</td>
          <td>{{ user.firstName }}</td>
          <td>{{ user.lastName }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
