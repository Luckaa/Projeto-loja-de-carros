<template>
  <div>
    <div style="padding:10px" >
      <v-btn color="info" v-if="!mostrarForm" @click="exibirForm">Adicionar carros</v-btn>
    </div>
    
  
    <v-dialog v-model="mostrarForm" width="500"  > 

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Adicionar carros
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
         <!-- {{items}} -->
         <!-- {{props}} -->
      
        <td class="text-xs-left">{{ props.item.ano }}</td>
        <td class="text-xs-left"> {{ props.item.combustivel }}</td>
        <td class="text-xs-left"> {{ (props.item.conservacao)}}</td>
        <td class="text-xs-left"> {{ (props.item.cor)}}</td>
        <td class="text-xs-left"><img style="width:80px;height:80px;overflow:hidden" :src="props.item.foto"></td>
        <td class="text-xs-left"> {{ (props.item.kilometragem) }}</td>
        <td class="text-xs-left"> {{ (props.item.modelo)}}</td>
        <td class="text-xs-left"> {{ (props.item.obs)}}</td>
    
        <td>
          <v-flex>
            <v-btn flat icon color="red">
              <v-icon  @click="deletarCarro(props.items);">delete</v-icon>
            </v-btn>
            <v-btn flat icon color="blue">
              <v-icon @click="editarCarro(props.items)">edit</v-icon>
            </v-btn>
          </v-flex>
        </td>
      </template>
    </v-data-table>


  </div>
</template>

<script>
  import API from '../lib/API';
  export default {

    mounted() {
      this.load();
    },

    methods: {
      load() {
        API.getCarros().then(carros => {
          this.carros = carros;
          console.log(carros);
          
        });
      },

         submit() {

        if (this.carro._id == null) {
          if (this.$refs.form.validate()) {
            API.adicionarCarros(this.carro)
              .then(response => {
                if (response) {
                  console.log("carro salvo com Sucesso!", "success");
                } else {
                  console.log("Erro ao salvar carro!", "error");
                }
                this.clear()
                this.load()
              });
          }
        } else {
          if (this.$refs.form.validate()) {
            API.editarCarros(this.carro)
              .then(response => {
                if (response) {
                  this.alerta("carro editado com Sucesso!", "success");
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
        console.log("teste");
        API.deletarCarros(carro)
          .then(response => {
            if (response) {
              this.alerta("carros removido com Sucesso!", "success");
              this.load()
            } else {
              this.alerta("Erro ao remover carros!", "error");
            }
          });
      },

      editarCarro(carros) {
        this.carros = carros; 
        this.mostrarForm = true;
      },

      confirmarExclusao(flag, carros) {
        console.log(flag);
        console.log(carros);

        if (flag) {
          this.deletarCarro(carros);
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
            text: 'Ano',
            value: 'ano'
          },
          {
            text: 'Combustivel',
            value: 'combustivel'
          },
          {
            text: 'conservacao',
            value: 'conservacao'
          },
          {
            text: 'cor',
            value: 'cor'
          },
          {
            text: 'foto',
            value: 'foto'
          },
            {
            text: 'kilometragem',
            value: 'kilometragem'
          },
            {
            text: 'modelo',
            value: 'modelo'
          },
          {
            text: 'obs',
            value: 'obs'
          },
          {
            text: 'Ações',
            value: ''
          }
        ],
        carros: [],
        valid: true,
        nomeRules: [
          v => !!v || 'Nome é Obrigatório!',
          v => (v && v.length <= 5000) || 'Nome deve ter no máximo 1000 characters!'
        ]
      }
    }
  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


</style>

