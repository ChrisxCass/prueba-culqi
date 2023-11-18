<script setup lang="ts">
import Service from "@/services/";
import { useRouter } from "vue-router";
import { ref } from "vue";

const password = ref("");
const correo = ref("");
const isInvalidUser = ref(false);
const router = useRouter();

const logIn = async () => {
  try {
    const response = await Service.validateAccess({
      correo: correo.value,
      password: password.value,
    });
    if (response.status == "success" && response.data) {
      isInvalidUser.value = false;
      localStorage.setItem("token", response.data.token);
      router.push({ name: "department" });
      return response.data;
    } else {
      isInvalidUser.value = true;
      console.error("Error in validateAccess");
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <div class="grid grid-cols-2 h-screen">
    <div class="">
      <div class="h-2/3 bg-blue-600">
        <img
          class="w-full h-full object-cover"
          src="@/assets/images/login.png"
          alt="imagen login Culqi"
        />
      </div>
      <div
        class="h-1/3 bg-blue-900 flex space-y-6 flex-col bg-blue-900 text-white border-t-4 px-12 pt-12 pb-20 pb-auto border-green-700"
      >
        <img
          class="w-[117.75px] h-9"
          src="@/assets/images/logo_white.svg"
          alt="logo Culqi"
        />
        <h2 class="text-5xl font-bold leading-12 tracking-tight">
          Dale más power ⚡ a tus empleados hoy 💪
        </h2>
        <p class="text-base font-normal leading-6">
          Te ayudamos a gestionarlos de manera más sencilla
        </p>
      </div>
    </div>

    <div class="grid place-items-center px-2 py-6">
      <form action="#" class="w-[480px] mt-auto mb-8">
        <fieldset class="flex flex-col space-y-8">
          <legend
            class="text-greyscale-900 text-center font-bold text-2xl leading-[130%]"
          >
            Inicia sesión
          </legend>

          <div class="flex flex-col space-y-6">
            <div class="flex flex-col space-y-[10px]">
              <label for="correo" class="block text-sm"
                >correo electrónico:</label
              >
              <input
                type="email"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-700 focus:shadow-outline"
                id="correo"
                v-model="correo"
                name="correo"
                placeholder="Ingresa el correo electrónico"
                required
              />
            </div>

            <div class="flex flex-col space-y-[10px]">
              <label for="password" class="block text-sm">Contraseña:</label>
              <input
                type="password"
                id="password"
                name="password"
                v-model="password"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-green-700 focus:shadow-outline"
                placeholder="Ingresa la contraseña"
                required
              />
            </div>
          </div>
          <p class="text-red-400 flex items-center" v-if="isInvalidUser">
            <i class="material-icons inline-block align-middle">info</i>
            <span class="ml-1">correo o contraseña incorrectos</span>
          </p>
          <button
            type="submit"
            class="w-full bg-blue-900 hover:bg-blue-800 text-white font-bold py-2 px-4 rounded"
            @click.prevent="logIn()"
          >
            Iniciar sesión
          </button>

          <p class="w-full text-center">
            ¿Eres nuevo aquí?
            <a href="#" class="text-green-700">Crea una cuenta</a>
          </p>
        </fieldset>
      </form>
      <p class="mt-auto">© 2023 Culqi . Todos los derechos reservados</p>
    </div>
  </div>
</template>

<style scoped>
</style>