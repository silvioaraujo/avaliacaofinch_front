
<template>
  <div>
    <a-menu mode="horizontal" style="text-align: right;">
      <a-menu-item @click="deslogar()" key="deslogar" >
        <a>Sair</a>
      </a-menu-item>
    </a-menu>
  </div>
</template>
<script>
export default {
  data() {
    return {
    };
  },
  methods: {
      deslogar() {
          this.$store.dispatch("atualizarPrimeiroAcesso").then(() => {
              this.$router.push('/')
          })
      }
  }
};
</script>