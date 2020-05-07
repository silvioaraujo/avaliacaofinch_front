<template>
  <div>
    <menu-component></menu-component>
    <a-row>
      <a-col :span="5">
        <img style="margin-top: 2%" src="http://www.finchsolucoes.com.br/assets/upload/logo_1.png" />
      </a-col>
      <a-col :span="14">
        <h1 style="margin-top: 2%; font-size: 24px;">Demandas</h1>
      </a-col>
      <a-col :span="5"></a-col>
    </a-row>
    <a-row style="margin-top: 1%">
      <a-col :span="4"></a-col>
      <a-col :span="16">
        <a-table :columns="columns" :data-source="data" bordered>
          <template
            v-for="col in ['cliente', 'dataAgendamento', 'observacao', 'descricao', 'valor', 'status', 'operation']"
            :slot="col"
          ></template>
          <template slot="operation" slot-scope="text, record">
            <div class="editable-row-operations">
              <a-popconfirm
                v-if="record.status == 'Aguardando Atendimento'"
                title="Confirma a realização deste serviço?"
                cancelText="Não"
                okText="Sim"
                @confirm="() => realizarServico(record)"
              >
                <a>Realizar Serviço</a>
              </a-popconfirm>
              <a-popconfirm
                v-else-if="record.status == 'Em Andamento' && record.id_usuario == usuarioLogado"
                title="Confirma a conclusão deste serviço?"
                cancelText="Não"
                okText="Sim"
                @confirm="() => realizarServico(record)"
              >
                <a>Finalizar Serviço</a>
              </a-popconfirm>
              <label
                v-else-if="record.status == 'Em Andamento' && record.id_usuario != usuarioLogado"
              >Em Andamento</label>
              <label v-else>Concluído</label>
            </div>
          </template>
        </a-table>
      </a-col>
      <a-col :span="4"></a-col>
    </a-row>
  </div>
</template>
<script>
import _ from "lodash";
import menuComponent from "@/components/MenuComponent";

const columns = [
  {
    title: "Cliente",
    dataIndex: "cliente",
    width: "13%"
  },
  {
    title: "Data de Agendamento",
    dataIndex: "dataAgendamento",
    width: "23%"
  },
  {
    title: "Observação",
    dataIndex: "observacao",
    width: "23%"
  },
  {
    title: "Descrição",
    dataIndex: "descricao",
    width: "18%"
  },
  {
    title: "Valor",
    dataIndex: "valor",
    width: "8%"
  },
  {
    title: "Status",
    dataIndex: "status",
    width: "15%"
  },
  {
    title: "",
    dataIndex: "operation",
    scopedSlots: { customRender: "operation" }
  }
];

const data = [];

export default {
  data() {
    return {
      data,
      columns,
      usuarioLogado: this.$store.getters.idUsuarioLogado
    };
  },
  created: function() {
    this.$store
      .dispatch("getFila")
      .then(response => {
        response.data.forEach(element => {
          data.push({
            key: element.id,
            cliente: element.cliente,
            dataAgendamento: element.dataAgendamento,
            observacao: element.observacao,
            descricao: element.tipo.descricao,
            valor: element.tipo.valor,
            status: "Aguardando Atendimento",
            id_usuario: null
          });
        });
      })
      .catch(error => console.log(error));
    this.$store
      .dispatch("getServicos")
      .then(response => {
        response.data.forEach(element => {
          var obj = _.find(data, { key: element.ID_Servico });
          obj.status = element.Status_Servico;
          obj.id_usuario = element.ID_Usuario;
        });
      })
      .catch(error => {
        console.log(error);
      });
  },
  methods: {
    realizarServico(servico) {
      var ID_Usuario = this.$store.getters.idUsuarioLogado;
      this.$store
        .dispatch("setServico", {
          ID_Servico: servico.key,
          Status_Servico: servico.status,
          ID_Usuario
        })
        .then(() => this.$router.go())
        .catch(error => console.log(error));
    }
  },
  components: {
    menuComponent
  }
};
</script>
<style scoped>
.editable-row-operations a {
  margin-right: 8px;
}
</style>
