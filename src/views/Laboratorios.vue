<template>
  <v-container>
    <ValidationObserver slim v-slot="{ invalid }">
    <v-form>
      <p class="teal--text text-center">
        LLENE LA MAYOR CANTIDAD DE LABORATORIOS PARA MAYOR PRECISIÓN EN LAS
        PROBABILIDADES DE RCP
      </p>
      <v-expansion-panels multiple>
        <LabPanel
          v-for="lab in labs"
          :key="lab.title"
          :title="lab.title"
          :subtitle="lab.completed ? 'Completado' : 'Incompleto'"
          :completed="lab.completed ? true : false"
          :fields="lab.fields"
        />
      </v-expansion-panels>
      <div class="spacer"></div>
      <div class="d-flex justify-center">
        <v-btn color="primary" x-large rounded @click="submitLaboratories()"  :disabled="invalid">
          <v-icon left large dark>mdi-chevron-right</v-icon>Calcular probabilidad rcp
        </v-btn>
      </div>
    </v-form>
    </ValidationObserver>
  </v-container>
</template>

<script>
import LabPanel from "../components/LabPanel.vue";
import { mapState, mapActions } from "vuex";
import { ValidationObserver } from "vee-validate";

export default {
  components: {
    LabPanel,
    ValidationObserver
  },
  data: () => ({
    labs: {
      hematic_biometry: {
        title: "Biometría Hemática",
        fields: {
          hematocrit: {
            name: "Hematocrito",
            units: "%",
            value: null,
            type: "number",
          },
          hemoglobin: {
            name: "Hemoglobina",
            units: "gr/dL",
            value: null,
            type: "number",
          },
          leukocytes: {
            name: "Leucocitos",
            units: "cels./uL",
            value: null,
            type: "number",
            rules: "biometry:@leukocytes,@neutrophils,@lymphocytes"
          },
          neutrophils: {
            name: "Neutrófilos",
            units: "cels./uL",
            value: null,
            type: "number",
            rules: "biometry:@leukocytes,@neutrophils,@lymphocytes"
          },
          lymphocytes: {
            name: "Linfocitos",
            units: "cels./uL",
            value: null,
            type: "number",
            rules: "biometry:@leukocytes,@neutrophils,@lymphocytes"
          },
          platelets: {
            name: "Plaquetas",
            units: "cels./uL",
            value: null,
            type: "number",
          },
        },
      },
      blood_chemistry: {
        title: "Química Sanguínea",
        fields: {
          glucose: {
            name: "Glucosa",
            units: "mg/dL",
            value: null,
            type: "number",
          },
          urea: {
            name: "Urea",
            units: "mg/dL",
            value: null,
            type: "number",
          },
          creatinine: {
            name: "Creatina",
            units: "mg/dL",
            value: null,
            type: "number",
          },
          cholesterol: {
            name: "Colesterol",
            units: "mg/dL",
            value: null,
            type: "number",
          },
          triglycerides: {
            name: "Triglicéridos",
            units: "mg/dL",
            value: null,
            type: "number",
          },
          glycated_hemoglobin: {
            name: "Hemoglobina Glicada",
            units: "%",
            value: null,
            type: "number",
          },
        },
      },
      serum_electrolytes: {
        title: "Electrólitos Séricos",
        fields: {
          sodium: {
            name: "Sodio",
            units: "mEq/L",
            value: null,
            type: "number",
          },
          potassium: {
            name: "Potasio",
            units: "mEq/L",
            value: null,
            type: "number",
          },
        },
      },
      liver_function: {
        title: "Función Hepática",
        fields: {
          aspartate_aminotransferase: {
            name: "Aspartato Aminotransferasa",
            units: "U/L",
            value: null,
            type: "number",
          },
          alanine_transaminase: {
            name: "Alanina Aminotransferasa",
            units: "U/L",
            value: null,
            type: "number",
          },
          blood_urea_nitrogen: {
            name: "BUN Sérico (Nitrógeno Ureico)",
            units: "mg/dL",
            value: null,
            type: "number",
          },
        },
      },
      clotting_time: {
        title: "Tiempos de Coagulación",
        fields: {
          prothrombin: {
            name: "Protrombina (TP)",
            units: "segs.",
            value: null,
            type: "number",
          },
          thromboplastin: {
            name: "Tromboplastina (TPT)",
            units: "segs.",
            value: null,
            type: "number",
          },
        },
      },
      immunological: {
        title: "Inmunología",
        fields: {
          reactive_protein_c: {
            name: "Proteína C Reactiva",
            units: "Mg/dL",
            value: null,
            type: "number",
          },
          procalcitonin: {
            name: "Procalcitonina",
            units: "ng/mL",
            value: null,
            type: "number",
          },
          d_dimer: {
            name: "Dímero D",
            units: "mg/mL",
            value: null,
            type: "number",
          },
        },
      },
      cardiac_enzymes: {
        title: "Enzimas Cardíacas",
        fields: {
          cpk: {
            name: "CPK",
            units: "mg/dL",
            value: null,
            type: "number",
          },
          mioglobin: {
            name: "Mioglobina",
            units: "ng/ml",
            value: null,
            type: "number",
          },
        },
      },
      arterial_blood_gas: {
        title: "Gasometría arterial",
        fields: {
          ph: {
            name: "PH",
            units: "",
            type: "number",
            value: null
          },
          co2: {
            name: "CO2",
            units: "",
            type: "number",
            value: null
          },
          o2: {
            name: "O2",
            units: "",
            type: "number",
            value: null
          },
          hco3: {
            name: "HCO3-",
            units: "",
            type: "number",
            value: null
          },
          be: {
            name: "BE",
            units: "",
            type: "number",
            value: null
          },
        }
      },
      imaging: {
        title: "Imagenología",
        fields: {
          radiography: {
            name: "Radiografía de Torax o TAC",
            value: null,
            type: "boolean",
          },
          result: {
            name: "Resultado",
            value: null,
            type: "select",
            options: [
              {
                value: "normal",
                text: "Normal",
              },
              {
                value: "infiltrate",
                text: "Infiltrado",
              },
              {
                value: "apical_pneumatic_foci",
                text: "Focos neumónicos Apicales",
              },
              {
                value: "basal_pneumatic_foci",
                text: "Focos neumónicos Basales",
              },
              {
                value: "bilateral_pneumatic_foci",
                text: "Focos neumónicos Bilateral",
              },
              {
                value: "generalized_pneumatic_foci",
                text: "Focos neumónicos Generalizados",
              },
              {
                value: "medial_pneumatic_foci",
                text: "Focos neumónicos Mediales",
              },
              {
                value: "unilateral_pneumatic_foci",
                text: "Focos neumónicos Unilateral",
              },
            ],
          },
        },
      },
    },
  }),
  computed: {
    labsObject() {
      let record = {
        admission_date: this.record.admission_date,
        status: this.record.status,
      };
      for (const [lab, meta] of Object.entries(this.labs)) {
        if (!record[lab]) {
          record[lab] = {};
        }
        for (const [field, metaField] of Object.entries(
          this.labs[lab].fields
        )) {
          if (field !== "id" && this.labs[lab].fields[field].value !== null) {
            record[lab][field] =
              this.labs[lab].fields[field].value == ""
                ? null
                : this.labs[lab].fields[field].value;
          }
        }
        if (Object.keys(record[lab]).length === 0) {
          delete record[lab];
        }
      }
      return record;
    },
    ...mapState("record", ["record"]),
  },
  mounted() {
    for (const [lab, meta] of Object.entries(this.labs)) {
      if (this.record[lab]) {
        for (const [field, metaField] of Object.entries(
          this.labs[lab].fields
        )) {
          if (field !== "id") {
            this.labs[lab].fields[field].value = this.record[lab][field];
          }
        }
        if (this.record[lab].id) {
          this.labs[lab].completed = true;
        }
      }
    }
  },
  methods: {
    submitLaboratories() {
      this.$http.put(`records/${this.record.id}`, this.labsObject)
        .then((res) => {
          this.setRecord(res.data);
          this.$router.push({
            name: "probability",
            params: { uuid: this.record.id },
          });
        })
        .catch((error) => console.error(error));
    },
    ...mapActions("record", ["setRecord"]),
  },
};
</script>

<style></style>
