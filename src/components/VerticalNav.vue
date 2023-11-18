<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <section
    class="shadow px-8 py-6 h-screen flex flex-col space-y-6 justify-center items-between"
  >
    <div class="flex items-center justify-center">
      <img
        class="w-[117.75px] h-9"
        src="@/assets/images/logo_black.svg"
        alt="logo Culqi"
      />
    </div>
    <ul class="flex-1">
      <li>
        <RouterLink
          to="employees"
          class="hover:bg-gray-200 rounded px-4 py-2 block font-bold text-grayscale-900"
          :class="$route.name == 'employees' && 'bg-gray-100 text-green-400'"
        >
          <i class="material-icons inline-block align-middle">group</i>
          Empleados
        </RouterLink>
      </li>
      <li class="mt-2">
        <RouterLink
          to="recruiment"
          :class="$route.name == 'recruiment' && 'bg-gray-100 text-green-400'"
          class="hover:bg-gray-200 rounded px-4 py-2 block font-bold text-grayscale-900"
        >
          <i class="material-icons inline-block align-middle">work</i>
          Reclutamiento
        </RouterLink>
      </li>
    </ul>

    <RouterLink
      class="w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-2 px-4 text-center border border-blue-900 hover:border-transparent rounded mt-8"
      to="login"
    >
      Salir
    </RouterLink>
  </section>
</template>
