<template>
  <v-card flat bordered class="my-card">
    <v-card-text class="row">
      <v-card flat bordered class="col-6">
        <v-card-title>
          <div class="text-h6">COVID Overall Data By Country</div>
          <span>click country for detail below</span>
          <v-text-field dense outlined v-model="searchCountry"
                        placeholder="Search by country"></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table :title="`Countries (${countries.length})`" :items="countries"
                        @click:row="onClickCountry" :items-per-page="5" :headers="countryHeaders" row-key="name"
                        :search="searchCountry" :options.sync="pagination"/>
        </v-card-text>
      </v-card>
      <v-card flat bordered class="col-6">
        <v-card-title>
          <div class="text-h6">COVID Overall Data (India)</div>
          <v-btn @click="getCountryData" label="Get Data" color="primary"/>
          <v-text-field dense outlined v-model="searchState"
                        placeholder="Search by state"></v-text-field>
        </v-card-title>
        <v-card-text>
          <v-data-table :items-per-page="5" :title="`States (${result.states.length})`"
                        :items="result.states" :headers="stateHeaders" :search="searchState" row-key="name"
                        :options.sync="pagination"/>
        </v-card-text>
      </v-card>
    </v-card-text>
  </v-card>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    currentCountry: ("India"), countries: [], searchCountry: "", result: {states: []},
    searchState: "", pagination: {rowsPerPage: 10},
    stateHeaders: [
      {text: "State", align: "left", name: "state", value: "state", sortable: true,},
      {text: "Cases", name: "cases", value: "cases", sortable: true, format: (val) => val?.toLocaleString("en-IN"),},
      {
        text: "Active", name: "active", value: "active", sortable: true, format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Deaths", name: "deaths", value: "deaths",
        sortable: true, format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Recovered", name: "recovered", value: "recovered",
        sortable: true, format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Today Cases", name: "todayCases", value: "todayCases",
        sortable: true, format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Today Active", name: "todayActive", value: "todayActive",
        sortable: true, format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Today Deaths", name: "todayDeaths", value: "todayDeaths",
        sortable: true, format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Today Recovered", name: "todayRecovered", value: "todayRecovered",
        sortable: true, format: (val) => val?.toLocaleString("en-IN"),
      },
    ],
    countryHeaders: [
      {
        text: "Country", align: "left", name: "country", value: "country", sortable: true,
      },
      {
        text: "Cases", name: "cases", value: "cases", sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Active", name: "active", value: "active", sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Deaths", name: "deaths", value: "deaths", sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
      {
        text: "Recovered", name: "recovered", value: "recovered", sortable: true,
        format: (val) => val?.toLocaleString("en-IN"),
      },
    ]
  }),
  mounted() {
    this.getCountryData();
    this.getWorldData();
  },
  methods: {
    getWorldData() {
      axios
          .get(
              "https://disease.sh/v3/covid-19/countries?yesterday=false&twoDaysAgo=false&allowNull=true"
          )
          .then((res) => {
            this.countries = res.data;
            this.$emit(
                "country-clicked",
                res.data.find((c) => c.country === "India")
            );
          });
    },
    getCountryData() {
      axios.get(`https://disease.sh/v3/covid-19/gov/India`).then((res) => {
        this.result = res.data;
      });
    },
    onClickCountry(evt) {
      this.currentCountry = evt.country;
      this.$emit("country-clicked", evt);
    }
  }
}
</script>