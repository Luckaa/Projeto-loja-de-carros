<template>
  <div>
    <v-data-table :headers="headers" :items="produtos" class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.item.nome }}</td>
        <td class="text-xs-center">R$ {{ (props.item.valor).toFixed(2) }}</td>
        <td class="text-xs-center">
          <v-icon color="red" @click="removerItem(props.item)">remove_circle</v-icon>
        </td>

      </template>

      <template slot="footer">
        <tr>
          <td>
            <strong>Total</strong>
          </td>
          <td></td>
          <td>
            <strong>R$ {{ total.toFixed(2) }}</strong>
          </td>
        </tr>
      </template>

    </v-data-table>

    <v-flex xs12 sm4 text-xs-center>
      <v-btn color="info" @click="finalizarCompra()">Finalizar Compra</v-btn>
    </v-flex>

    <!-- Dialog -->
    <v-layout row justify-center>
      <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

        <v-card>

          <v-toolbar dark color="primary">
            <v-btn icon dark @click.native="dialog = false">
              <v-icon>close</v-icon>
            </v-btn>
            <v-toolbar-title>Finalizar Compra</v-toolbar-title>

          </v-toolbar>


        </v-card>
      </v-dialog>
    </v-layout>

  </div>
</template>

<script>
  export default {
    mounted() {
      this.adicionarAoLocalStorage();
    },
    methods: {
      calcularTotal() {
        this.total = 0;
        for (let i = 0; i < this.produtos.length; i++) {
          this.total += this.produtos[i].valor;
        }
      },

      adicionarAoLocalStorage() {
        if (localStorage.cart) {
          this.produtos = JSON.parse(localStorage.cart);
          this.calcularTotal();
        }
      },

      removerItem(produto) {
        for (let i = 0; i < this.produtos.length; i++) {
          if (this.produtos[i].nome == produto.nome) {
            this.produtos.splice(i, 1);
          }
        }

        localStorage.setItem('cart', JSON.stringify(this.produtos));
        this.adicionarAoLocalStorage();
      },

      finalizarCompra() {
        this.$router.replace("/area_pagamento");
      }
    },
    data() {
      return {
        dialog: false,
        headers: [{
            text: 'Produto',
            align: 'left',
            sortable: false,
            value: 'nome'
          },
          {
            text: 'Valor',
            value: 'valor'
          },
          {
            text: 'Remover',
            value: ''
          }
        ],
        total: 0,
        produtos: []
      }
    }
  }

</script>

<style>


</style>
