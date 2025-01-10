<template>
    <v-app class="w-100">
        <v-app-bar>
            <div class="wrapper">
                <nav>
                    <router-link to="/">Home</router-link>
                    <router-link to="/tictactoe">TicTacToe</router-link>
                </nav>
            </div>
        </v-app-bar>

        <v-main class="main">
            <router-view />
        </v-main>
    </v-app>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { socket } from "@/plugins/websocket";

onMounted(() => {
    socket.on("connected", () => {
        console.log("CONNECTED ", socket.id);

        socket.on("disconnect", () => {
            console.log("Disconnected from server");
        });
    });
});
</script>

<style>
#app {
    margin: 0;
    padding: 0;
}

.main {
    width: 100vw;
}
</style>
