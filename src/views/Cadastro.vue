<template>
  <div>
    <img style="margin-top: 9%" src="http://www.finchsolucoes.com.br/assets/upload/logo_1.png"/>
    <a-row style="padding-top: 1%">
      <a-col :span="5"></a-col>
      <a-col :span="11">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item v-bind="formItemLayout">
            <span slot="label">Nome</span>
            <a-input
              v-decorator="[
          'nome',
          {
            rules: [{ required: true, message: 'Nome obrigatório!', whitespace: false }],
          },
        ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="E-mail">
            <a-input
              v-decorator="[
          'email',
          {
            rules: [
              {
                type: 'email',
                message: 'Digite um e-mail válido!',
              },
              {
                required: true,
                message: 'E-mail obrigatório!',
              },
            ],
          },
        ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout">
            <span slot="label">CPF</span>
            <a-input
              v-decorator="[
          'cpf',
          {
            rules: [{ required: true, message: 'CPF obrigatório!', whitespace: false }],
          },
        ]"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Senha" has-feedback>
            <a-input
              v-decorator="[
          'senha',
          {
            rules: [
              {
                required: true,
                message: 'Senha obrigatória!',
              },
              {
                validator: validateToNextPassword,
              },
            ],
          },
        ]"
              type="password"
            />
          </a-form-item>
          <a-form-item v-bind="formItemLayout" label="Confirme sua senha" has-feedback>
            <a-input
              v-decorator="[
          'confirmarSenha',
          {
            rules: [
              {
                required: true,
                message: 'Confirmação da senha obrigatória!',
              },
              {
                validator: compareToFirstPassword,
              },
            ],
          },
        ]"
              type="password"
              @blur="handleConfirmBlur"
            />
          </a-form-item>
          <a-form-item v-bind="tailFormItemLayout">
            <a-button type="primary" html-type="submit">Cadastrar</a-button>
          </a-form-item>
        </a-form>
      </a-col>
      <a-col :span="8"></a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      confirmDirty: false,
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this, { name: "register" });
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.form.validateFieldsAndScroll((err, values) => {
        if (!err) {
          this.$store
            .dispatch("cadastrar", {
              CPF: values.cpf,
              Senha: values.senha,
              Nome: values.nome,
              Email: values.email
            })
            .then(() => this.$router.push("/"))
            .catch(error => console.log(error));
        }
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("senha")) {
        callback("As duas senhas precisam conferir!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    }
  }
};
</script>
