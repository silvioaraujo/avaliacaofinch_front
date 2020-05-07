<template>
  <div>
    <img style="margin-top: 10%" src="http://www.finchsolucoes.com.br/assets/upload/logo_1.png" />
    <a-row style="padding-top: 1%">
      <a-col :span="10"></a-col>
      <a-col :span="4">
        <a-form
          id="components-form-demo-normal-login"
          :form="form"
          class="login-form"
          @submit="handleSubmit"
        >
          <a-form-item>
            <a-input
              v-decorator="[
          'cpf',
          { rules: [{ required: true, message: 'CPF obrigatório!' }] },
        ]"
              placeholder="CPF"
            >
              <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-input
              v-decorator="[
          'senha',
          { rules: [{ required: true, message: 'Senha obrigatória!' }] },
        ]"
              type="password"
              placeholder="Senha"
            >
              <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
            </a-input>
          </a-form-item>
          <a-alert v-if="usuarioInvalido" type="error" message="CPF ou Senha inválido(a)" banner />
          <a-form-item>
            <a-button type="primary" html-type="submit" class="login-form-button">Acessar</a-button>
            <router-link to="/cadastroUsuario">Cadastre-se</router-link>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="10"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usuarioInvalido: false
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "normal_login" });
  },
  created: function() {
    console.log(this.$store.getters.primeiraVez);
    if (
      this.$store.getters.primeiraVez ||
      this.$store.getters.primeiraVez == undefined
    ) {
      this.$store.dispatch("atualizarPrimeiroAcesso");
      this.$router.go();
    }
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFields((err, values) => {
        if (!err) {
          var CPF = values.cpf;
          var Senha = values.senha;
          this.$store
            .dispatch("login", { CPF, Senha })
            .then((response) => {
              console.log(response.data.length)
              if (response.data.length > 0)
                this.$router.push("/listaServicos");
              else
                this.usuarioInvalido = true;
            })
            .catch(error => console.log(error));
        }
      });
    }
  }
};
</script>
<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
</style>