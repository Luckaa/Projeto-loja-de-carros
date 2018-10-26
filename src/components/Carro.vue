<template>
  <div>
    <div style="padding:10px" >
      <v-btn color="info" v-if="!mostrarForm" @click="exibirForm">Adicionar carros</v-btn>
    </div>
     
    <v-dialog v-model="mostrarForm" width="400"  > 

      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          Adicionar carros
        </v-card-title>

        <!-- Formulario -->
        

        <v-form ref="form" v-if="mostrarForm" v-model="valid" lazy-validation style="padding:10px">
          <v-text-field v-model="carro.foto" label="Foto" required></v-text-field>
          <v-text-field v-model="carro.modelo" label="Modelo" required></v-text-field>
          <v-text-field v-model="carro.ano" label="Ano" required></v-text-field>
          <v-text-field v-model="carro.kilometragem" label="Quilometragem" required></v-text-field>
          <v-text-field v-model="carro.combustivel" label="Combustivel" required></v-text-field>
          <v-text-field v-model="carro.cor" label="Cor" required></v-text-field>
          <v-text-field v-model="carro.conservacao" label="Estado de Conservação" required></v-text-field>

          <v-btn :disabled="!valid" @click="submit">
            salvar
          </v-btn>
          <v-btn @click="clear">cancelar</v-btn>
        </v-form>

      </v-card>
    </v-dialog>


    <v-data-table :headers="headers" :items="carros" hide-actions  :loading="true" light class="elevation-1">
      <template slot="items" slot-scope="props">
         <!-- {{items}} -->
         <!-- {{props}} -->
      
        <td class="text-xs-left"> {{ (props.item.modelo)}} </td>
        <td class="text-xs-left">{{ props.item.ano }}</td>
        <td class="text-xs-left"> {{ props.item.combustivel }}</td>
        <td class="text-xs-left"> {{ (props.item.kilometragem) }}</td>
        <td class="text-xs-left"> {{ (props.item.cor)}}</td>
        <td class="text-xs-left"> {{ (props.item.conservacao)}}</td>
        <td class="text-xs-left"><img style="width:80px;height:80px;overflow:hidden" :src="props.item.foto"></td>

        <td>
          <v-flex>
            <v-btn flat icon color="black" v-if="!excluirMesmo" @click="exibirExcluir">
              <v-icon v-model="excluirMesmo">delete</v-icon>
            </v-btn>


            <v-btn flat icon color="blue" @click="editarCarro(props.item)">
              <v-icon>edit</v-icon>
            </v-btn>
          </v-flex>
        </td>

          <v-dialog v-model="excluirMesmo" width="300"  > 
              <v-card>
                  <v-card-title class="headline">Deseja mesmo excluir esse carro?</v-card-title>
                  <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="red darken-1" flat @click="exibirExcluir()">Não</v-btn>
                  <v-btn color="green darken-1" flat @click="deletarCarro(props.item)">Sim</v-btn>
                  </v-card-actions>
              </v-card>
      </v-dialog>
      

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
                  console.log("carro editado com Sucesso!", "success");
                } else {
                  console.log("Erro ao editar carro!", "error");
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
      exibirExcluir() {
        this.excluirMesmo = !this.excluirMesmo;
      },
      deletarCarro(carro) {
        console.log(carro)
        this.exibirExcluir()
        API.deletarCarros(carro)
        .then(response => {
            if (response) {
              console.log("Carro removido com Sucesso!", "success");
              this.load()
            } else {
              console.log("Erro ao remover carro!", "error");
            }
          });
      },
      editarCarro(carro) {
        this.carro = carro; 
        this.mostrarForm = true;
      },
    },
    data() {
      return {
        carro: {},
        carros: [],
        valid: true,
        dialog: false,
        mostrarForm: false,
        excluirMesmo: false,
        headers: [{
            text: 'Modelo',
            value: 'modelo'
          },
          {
            text: 'Ano',
            value: 'ano'
          },
          {
            text: 'Combustivel',
            value: 'combustivel'
          },
          {
            text: 'Quilometragem',
            value: 'kilometragem'
          },
          {
            text: 'Cor',
            value: 'cor'
          },
            {
            text: 'Conservação',
            value: 'conservacao'
          },
            {
            text: 'Foto',
            value: 'foto'
          },
          {
            text: 'Ações',
            value: ''
          }
        ],
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