<template>
    <login-card></login-card>
</template>

<script setup lang="ts">
import { useAppStore } from "@/app.store";
console.log(useAppStore().isLoggedIn);
</script>
