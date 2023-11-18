<script setup lang="ts">
import Service from "@/services/";
import { ref, onMounted } from "vue";

import Employee from "@/types/";

const fields: string[] = [
  "ID",
  "Nombre",
  "Correo",
  "Cargo",
  "Departamento",
  "Oficina",
  "Estado de Cuenta",
  "Actions",
];

const employees = ref<Employee[]>([]);

const currentPage = ref(1);
const limit = ref(10);
const total = ref(0);
const totalPages = ref(0);
const loading = ref(false);

const getEmployees = async () => {
  try {
    loading.value = true;
    const response = await Service.getEmployees({
      limit: limit.value,
      page: currentPage.value,
    });

    if (response.status === "success" && response.data) {
      employees.value = response.data;
      total.value = response.total;
      totalPages.value = Math.ceil(total.value / limit.value);
    } else {
      console.error("Error in getEmployees");
    }
  } catch (error) {
    console.error("Error:", error);
  } finally {
    loading.value = false;
  }
};

const changePage = (newPage: number) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    getEmployees();
  }
};

onMounted(() => {
  getEmployees();
});
</script>
<template>
  <section class="px-6 mt-8">
    <div class="p-6 shadow rounded flex flex-col space-y-6">
      <div class="flex flex-row">
        <div class="w-8/12 flex flex-col space-y-1 justify-center">
          <h2 class="font-bold text-xl">Empleados</h2>
          <p class="text-base font-medium text-gray-600">
            Gestiona tus empleados
          </p>
        </div>
        <div class="w-4/12 flex justify-end">
          <button
            class="bg-transparent ml-5 hover:bg-blue-800 text-blue-800 font-semibold hover:text-white py1 px-4 border border-blue-800 hover:border-transparent rounded"
          >
            <i class="material-icons inline-block align-middle">note_add</i>

            Descargar
          </button>
          <button
            class="bg-blue-900 ml-5 hover:bg-blue-800 text-white font-semibold hover:text-white py-1 px-4 border border-blue-900 hover:border-transparent rounded"
          >
            <i class="material-icons inline-block align-middle">add</i>
            Nuevo
          </button>
        </div>
      </div>
      <div class="flex flex-row items-start">
        <div class="w-8/12 flex border rounded w-full py-2 px-3 leading-tight">
          <input type="text" class="flex-1 outline-none rounded" />
          <i class="material-icons inline-block align-middle ml-2">search</i>
        </div>
        <div class="w-4/12 ml-4">
          <select
            id="countries"
            class="bg-white border border-gray text-sm rounded-lg block w-full p-2.5 outline-none"
          >
            <option selected disabled>Nombre de cargo</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>
      </div>
      <div class="mt-7 overflow-x-auto h-[568px] rounded">
        <div v-if="loading" class="text-center">
          <i class="material-icons inline-block align-middle">refresh</i>

          <p class="mt-2 text-gray-500">Cargando...</p>
        </div>
        <div v-if="!employees.length && !loading" class="text-center">
          <i class="material-icons inline-block align-middle">block</i>

          <p class="mt-2 text-gray-500">No hay registros para mostrar.</p>
        </div>
        <table
          v-else
          class="items-center bg-transparent w-full border-collapse whitespace-nowrap"
        >
          <thead>
            <tr>
              <th
                v-for="(field, index) in fields"
                :key="index"
                class="px-6 align-middle text-center border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              >
                {{ field }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in employees" :key="index">
              <td
                v-for="(value, key) in employee"
                :key="key"
                class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
                {{ value }}
              </td>
              <td
                class="border-t-0 px-2 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-2 flex space-x-1"
              >
                <i
                  class="material-icons inline-block align-middle bg-blue-900 hover:bg-blue-800 text-white font-bold p-[5px] rounded cursor-pointer"
                  >visibility</i
                >

                <i
                  class="material-icons inline-block align-middle bg-orange-600 hover:bg-orange-500 text-white font-bold p-[5px] rounded cursor-pointer"
                  >edit</i
                >

                <i
                  class="material-icons inline-block align-middle bg-red-600 hover:bg-red-500 text-white font-bold p-[5px] rounded cursor-pointer"
                  >delete</i
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="w-full">
        <div class="relative overflow-hidden bg-white rounded-b-lg shadow-md">
          <nav
            class="flex flex-col items-start justify-between p-4 space-y-3 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <ul class="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  @click.prevent="changePage(currentPage - 1)"
                  class="flex items-center justify-center h-full py-1.5 px-3 ml-0 text-gray-500 bg-white rounded-l-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <i class="w-5 h-5 material-icons inline-block align-middle"
                    >navigate_before</i
                  >
                </a>
              </li>
              <li v-for="pageNumber in totalPages" :key="pageNumber">
                <a
                  href="#"
                  @click.prevent="changePage(pageNumber)"
                  class="flex items-center justify-center px-3 py-2 text-sm leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                  :class="{ 'font-semibold': pageNumber === currentPage }"
                >
                  {{ pageNumber }}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  @click.prevent="changePage(currentPage + 1)"
                  class="flex items-center justify-center h-full py-1.5 px-3 leading-tight text-gray-500 bg-white rounded-r-lg border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
                >
                  <i class="w-5 h-5 material-icons inline-block align-middle"
                    >navigate_next</i
                  >
                </a>
              </li>
            </ul>
            <div class="flex flex-row">
              <span class="text-sm font-normal text-gray-500 flex items-center">
                Showing
                <span class="font-semibold m-1">{{
                  (currentPage - 1) * limit + 1
                }}</span
                >-
                <span class="font-semibold m-1">{{
                  Math.min(currentPage * limit, total)
                }}</span>
                of
                <span class="font-semibold m-1">{{ total }}</span>
              </span>
              <div class="p-1 ml-1">
                <select
                  id="countries"
                  class="bg-white border border-gray text-sm rounded-lg block w-full p-2.5 outline-none"
                  v-model="limit"
                  @change="getEmployees"
                >
                  <option>5</option>
                  <option>10</option>
                  <option>50</option>
                  <option>100</option>
                </select>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </div>
  </section>
</template>
