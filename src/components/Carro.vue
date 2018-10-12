<template>
  <div>
    <div style="padding:10px" >
      <v-btn color="info" v-if="!mostrarForm" @click="exibirForm">Adicionar Carro</v-btn>
    </div>

    <v-dialog v-model="mostrarForm" width="500"  >

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Adicionar Carro
        </v-card-title>

        <!-- Formulario -->

        <v-form ref="form" v-if="mostrarForm" v-model="valid" lazy-validation style="padding:10px">
          <v-text-field v-model="carro.foto" :rules="nomeRules" :counter="30" label="Foto" required></v-text-field>
          <v-text-field v-model="carro.modelo" label="Modelo" required></v-text-field>
          <v-text-field v-model="carro.ano" label="Ano" required></v-text-field>
          <v-text-field v-model="carro.kilometragem" label="Quilometragem" required></v-text-field>
          <v-text-field v-model="carro.combustivel" label="Combustivel" required></v-text-field>
          <v-text-field v-model="carro.cor" label="Cor" required></v-text-field>
          <v-text-field v-model="carro.conservacao" label="Estado de Conservação" required></v-text-field>
          <v-text-field v-model="carro.obs" label="Observações" required></v-text-field>

          <v-btn :disabled="!valid" @click="submit">
            salvar
          </v-btn>
          <v-btn @click="clear">cancelar</v-btn>
        </v-form>

      </v-card>
    </v-dialog>

    <v-data-table :headers="headers" :items="carros" hide-actions class="elevation-1">
      <template slot="items" slot-scope="props">
        <td>{{ props.carro.nome }}</td>
        <td class="text-xs-left">{{ props.carro.descricao }}</td>
        <td class="text-xs-left">R$ {{ (props.carro.valor).toFixed(2) }}</td>
        <td class="text-xs-left">
          <img style="width:80px;height:80px;overflow:hidden" :src="props.carro.foto">
        </td>
        <td>
          <v-flex>
            <v-btn flat icon color="red">
              <v-icon  @click="deletarCarro(props.carro); console.log('guribom')">delete</v-icon>
            </v-btn>
            <v-btn flat icon color="blue">
              <v-icon @click="editarCarro(props.carro)">edit</v-icon>
            </v-btn>
          </v-flex>
        </td>
      </template>
    </v-data-table>


  </div>
</template>

<script>
  import API from '@/lib/API';
  export default {

    mounted() {
      this.load();
    },

    methods: {
      load() {
        API.getCarros().then(carro => {
          this.carro = carro;
        });
      },

      submit() {
        if (this.carro._id == null) {
          if (this.$refs.form.validate()) {
            API.adicionarCarro(this.carro)
              .then(response => {
                if (response) {
                  this.alerta("Carro salvo com Sucesso!", "success");
                } else {
                  this.alerta("Erro ao salvar carro!", "error");
                }
                this.clear()
                this.load()
              });
          }
        } else {
          if (this.$refs.form.validate()) {
            API.editarCarro(this.carro)
              .then(response => {
                if (response) {
                  this.alerta("Carro editado com Sucesso!", "success");
                } else {
                  this.alerta("Erro ao editar carro!", "error");
                }
                this.clear()
                this.load()
              });
          }
        }

      },

      clear() {
        this.$refs.form.reset()
        this.exibirForm();
      },

      exibirForm() {
        this.mostrarForm = !this.mostrarForm;
      },

      deletarCarro(carro) {
        console.log(carro);
        API.deletarCarro(carro)
          .then(response => {
            if (response) {
              this.alerta("carro removido com Sucesso!", "success");
              this.load()
            } else {
              this.alerta("Erro ao remover carro!", "error");
            }
          });
      },

      editarcarro(carro) {
        this.carro = carro;
        this.mostrarForm = true;
      },

      confirmarExclusao(flag, carro) {
        console.log(flag);
        console.log(carro);

        if (flag) {
          this.deletarcarro(carro);
        }
        this.dialog = false;
      },

      alerta(msg, type) {
        let msgObj = {
          msg: msg,
          type: type,
          value: true
        };

        this.$store.commit('CHANGE_MSG', msgObj);
      }
    },

    data() {
      return {
        carro: {},
        dialog: false,
        mostrarForm: false,
        headers: [{
            text: 'Foto',
            value: 'foto'
          },
          {
            text: 'Modelo',
            value: 'modelo'
          },
          {
            text: 'Ano',
            value: 'ano'
          },
          {
            text: 'Quilometragem',
            value: 'quilometragem'
          },
          {
            text: 'Combustivel',
            value: 'combustivel'
          },
            {
            text: 'Cor',
            value: 'cor'
          },
            {
            text: 'Conservação',
            value: 'conservacao'
          },
        ],
        carros: [],
        valid: true,
        nomeRules: [
          v => !!v || 'Nome é Obrigatório!',
          v => (v && v.length <= 30) || 'Nome deve ter no máximo 30 characters!'
        ]
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

