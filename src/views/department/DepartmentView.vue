<script setup lang="ts">
import { RouterView } from "vue-router";
import VerticalNav from '@/components/VerticalNav.vue';
import NavBar from '@/components/NavBar.vue';
</script>

<template>
    <div class="flex flex-row min-h-screen">
    <VerticalNav class="w-3/12 h-auto" />
    <div class="flex flex-col w-9/12">
        <NavBar />
        <RouterView />
    </div>
    </div>
</template>
