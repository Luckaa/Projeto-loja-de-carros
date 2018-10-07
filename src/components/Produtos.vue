<template>
  <v-layout column>
    <v-flex xs12>

      <v-card>
        <v-container fluid grid-list-md>
          <v-layout row wrap>
            <v-flex v-for="produto in produtos" :key="produto._id" xs6>

              <v-card>

                <v-card-media :src="produto.foto" height="200px">
                  <v-container fill-height fluid pa-2>
                    <v-layout fill-height>

                    </v-layout>
                  </v-container>
                </v-card-media>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-flex align-start flexbox>
                    <span class="headline black--text" v-text="produto.nome"></span>
                  </v-flex>
                  <v-btn icon>
                    <v-icon @click="selecionarProduto(produto)">search</v-icon>
                  </v-btn>
                </v-card-actions>

              </v-card>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>

      <!-- Dialog -->

      <v-layout row justify-center>
        <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">

          <v-card>

            <!-- Toolbar -->
            <v-toolbar dark color="primary">
              <v-btn icon dark @click.native="dialog = false">
                <v-icon>arrow_back</v-icon>
              </v-btn>
              <v-toolbar-title>Detalhes do Produto</v-toolbar-title>
            </v-toolbar>

            <!-- Content -->
            <v-layout>
              <v-flex xs12>
                <v-card>
                  <v-card-media :src="produtoSelecionado.foto" height="400px"></v-card-media>

                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0">{{ produtoSelecionado.nome }}</h3>
                      <div style="margin-left:20px; margin-top:10px">

                        <div>
                          <label>Descrição: </label>
                          <span> {{ produtoSelecionado.descricao }}</span>
                        </div>
                        <div>
                          <label>Valor: </label>
                          <span>R$ {{ (produtoSelecionado.valor).toFixed(2) }}</span>
                        </div>

                      </div>
                    </div>
                  </v-card-title>

                  <v-card-actions>
                    <v-flex xs12 sm4 text-xs-center>
                      <v-btn color="info" @click="adicionarAoCarrinho()">Adicionar ao Carrinho</v-btn>
                    </v-flex>
                  </v-card-actions>
                </v-card>
              </v-flex>
            </v-layout>

          </v-card>
        </v-dialog>
      </v-layout>
    </v-flex>
  </v-layout>
</template>

<script>
  import HttpRequest from "@/lib/HttpRequest";
  export default {
    mounted() {
      this.produtos = JSON.parse(localStorage.getItem("produtosDoEstabelecimento"));
      console.log(this.produtos);

    },
    methods: {
      selecionarProduto(produto) {
        this.dialog = true;
        this.produtoSelecionado = produto;
      },

      adicionarAoCarrinho() {
        this.carrinho = JSON.parse(localStorage.cart);
        this.carrinho.push(this.produtoSelecionado);
        localStorage.setItem("cart", JSON.stringify(this.carrinho));
        this.dialog = false;
      }
    },
    data() {
      return {
        dialog: false,
        produtoSelecionado: {
          nome: "",
          descricao: "",
          valor: 0
        },
        carrinho: [],
        produtos: []
      }
    }
  }

</script>

<style>


</style>
