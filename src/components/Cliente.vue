<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="nome" label="Nome"></v-text-field>
    <v-text-field v-model="email" label="E-mail"></v-text-field>
    <v-text-field v-model="telefone" label="Telefone"></v-text-field>
    <v-text-field v-model="cpf" label="CPF"></v-text-field>
    <v-text-field v-model="senha" label="Senha" type="password"></v-text-field>
    <v-text-field v-model="confirmarSenha" label="Confirmar Senha" type="password"></v-text-field>


    <v-btn @click="salvar">
      Salvar
    </v-btn>
    <v-btn @click="cancelar">Cancelar</v-btn>
  </v-form>
</template>

<script>
  import API from '@/lib/HttpRequest'
  export default {
    data: () => ({
      cliente: {},
      valid: true,
      nome: '',
      email: '',
      telefone: '',
      cpf: '',
      senha: '',
      confirmarSenha: ''
    }),

    methods: {
      salvar() {
        if (this.senha === this.confirmarSenha) {
          this.cliente.nome = this.nome
          this.cliente.email = this.email
          this.cliente.telefone = this.telefone
          this.cliente.cpf = this.cpf
          this.cliente.senha = this.senha

          API.salvarCliente(this.cliente)
        } else {
          alert("Senhas não coincidem")
        }
      },
        cancelar() {
    this.$refs.form.reset()
  }


    }
  }

</script>

<style>

</style>
