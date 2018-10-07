<template>
  <v-layout>

    <v-container fluid>
      <p>Forma de Pagamento</p>

      <v-radio-group v-model="radios" :mandatory="false">
        <v-radio label="Débito" value="debito" @click="show = false"></v-radio>

        <v-radio label="Crédito" value="credito" @click="credito()"></v-radio>
      </v-radio-group>

      <v-layout row wrap align-center>

        <v-flex xs6>
          <v-select v-model="select" :items="items" item-text="state" item-value="abbr" label="Número de parcelas"
            persistent-hint return-object single-line v-if="show"></v-select>
        </v-flex>
      </v-layout>

      <v-btn color="info" @click="pagar">Pagar</v-btn>

      <div class="text-xs-center">
        <v-dialog v-model="dialog" width="500">

          <v-card>
            <v-card-title class="headline grey lighten-2" primary-title>
              Confirmação de Pagamento
            </v-card-title>

            <v-card-text>
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0gBFBu8n9p9KLXjARJ__CEui5_5Lz-kFTmXA52PtvsekMIH2mCw"
                alt="Pagamento efetuado">
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="fecharConfirmacao">
                Voltar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </div>
    </v-container>

    <!-- <v-container fluid> -->/

    <!-- </v-container> -->


  </v-layout>
</template>

<script>
export default {
  mounted() {},

  data() {
    return {
      show: false,
      dialog: false,
      radios: "Forma de Pagamento",
      select: {
        state: "à vista",
        abbr: "AV"
      },
      items: [
        {
          state: "1x",
          abbr: "1x"
        },
        {
          state: "2x",
          abbr: "2x"
        },
        {
          state: "3x",
          abbr: "3x"
        },
        {
          state: "4x",
          abbr: "4x"
        },
        {
          state: "5x",
          abbr: "5x"
        },
        {
          state: "6x",
          abbr: "6x"
        }
      ]
    };
  },
  methods: {
    credito() {
      this.show = true;
    },

    fecharConfirmacao() {
      this.dialog = false;
    },
    pagar() {
      this.dialog = true;
    }
  }
};
</script>

<style>
</style>
