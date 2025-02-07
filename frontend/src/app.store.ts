import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { socket } from "@/plugins/websocket";

export const useAppStore = defineStore("app", () => {
    const isLoggedIn = computed(() => {
        return localStorage.getItem("user") != null 
    })

    return {isLoggedIn};
});
