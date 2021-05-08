<template>
  <v-main>
    <country-historical/>
    <world-vaccine-coverage/>
    <covid-data-by-country @country-clicked="viewCountryData"/>
    <country-covid-data v-if="countryData" :country-data="countryData"/>
  </v-main>
</template>
<script>
import CountryHistorical from "@/components/CountryHistorical.vue";
import WorldVaccineCoverage from "@/components/WorldVaccineCoverage.vue";
import CovidDataByCountry from "@/components/CovidDataByCountry.vue";
import CountryCovidData from "@/components/CountryCovidData.vue";

export default {
  name: 'Dashboard',
  components: {
    CountryHistorical,
    WorldVaccineCoverage,
    CovidDataByCountry,
    CountryCovidData,
  },
  data: () => ({
    countryData: null
  }),
  methods: {
    viewCountryData(param) {
      this.countryData = param;
    }
  }
}
</script>