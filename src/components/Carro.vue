<template>
  <v-form ref="form" v-model="valid" lazy-validation>
    <v-text-field v-model="modelo" label="Modelo"></v-text-field>
    <v-text-field v-model="ano" label="Ano"></v-text-field>
    <v-text-field v-model="kilometragem" label="Kilemetragem"></v-text-field>
    <v-text-field v-model="combustivel" label="Combustivel"></v-text-field>
    <v-text-field v-model="cor" label="Cor"></v-text-field>
    <v-text-field v-model="conservacao" label="Estado de Conservação"></v-text-field>
    <v-text-field v-model="obs" label="Observações"></v-text-field>


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
      carro: {},
      valid: true,
      modelo: '',
      ano: '',
      kilometragem: '',
      combustivel: '',
      cor: '',
      conservacao: '',
      obs: ''
    }),

    methods: {
      salvar() {
          this.carro.foto = this.foto
          this.carro.modelo = this.modelo
          this.carro.ano = this.ano
          this.carro.kilometragem = this.kilometragem
          this.carro.combustivel = this.combustivel
          this.carro.cor = this.cor
          this.carro.conservacao = this.conservacao
          this.carro.obs = this.obs

          API.salvarCarro(this.carro)
      },
        cancelar() {
    this.$refs.form.reset()
  }


    }
  }

</script>

<style>


</style>
