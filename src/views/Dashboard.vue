<template>
  <v-container class="mt-9 pa-0">
    <v-row dense>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card color="#444941" :elevation="hover ? 16 : 2">
            <v-row>
              <v-col cols="12" sm="8">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn
                        color="#5B6156"
                        elevation="0"
                        class="itemparent white--text"
                      >
                        {{ data1.Count }}
                      </v-btn>
                    </div>
                    <v-list-item-title class="itemparent white--text">
                      {{ data1.Judul }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="fontall white--text">{{
                      data1.Deskripsi
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col class="mr-6 mt-15">
                <v-icon x-large color="white"> mdi-account-multiple </v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>

      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card color="#25695c" :elevation="hover ? 16 : 2">
            <v-row>
              <v-col cols="12" sm="8">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn
                        color="#357C6F"
                        elevation="0"
                        class="itemparent white--text"
                      >
                        {{ data2.Count }}
                      </v-btn>
                    </div>
                    <v-list-item-title class="itemparent white--text">
                      {{ data2.Judul }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="fontall white--text">{{
                      data2.Deskripsi
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col class="mr-6 mt-15">
                <v-icon x-large color="white">mdi-account-remove</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card color="#49AB83" :elevation="hover ? 16 : 2">
            <v-row>
              <v-col cols="12" sm="8">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn
                        color="#54B68E"
                        elevation="0"
                        class="itemparent white--text"
                      >
                        {{ data3.Count }}
                      </v-btn>
                    </div>
                    <v-list-item-title class="itemparent white--text">
                      {{ data3.Judul }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="fontall white--text">{{
                      data3.Deskripsi
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col class="mr-6 mt-15">
                <v-icon x-large color="white">mdi-account-check</v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-hover v-slot="{ hover }" open-delay="200">
          <v-card color="#99A799" :elevation="hover ? 16 : 2">
            <v-row>
              <v-col cols="12" sm="8">
                <v-list-item three-line>
                  <v-list-item-content>
                    <div class="mb-4">
                      <v-btn
                        color="#ADC2A9"
                        elevation="0"
                        class="itemparent white--text"
                      >
                        {{ data4.Count }}
                      </v-btn>
                    </div>
                    <v-list-item-title class="itemparent white--text">
                      {{ data4.Judul }}
                    </v-list-item-title>
                    <v-list-item-subtitle class="fontall white--text">{{
                      data4.Deskripsi
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              </v-col>
              <v-col class="mr-6 mt-15">
                <v-icon x-large color="white">mdi-account-clock </v-icon>
              </v-col>
            </v-row>
          </v-card>
        </v-hover>
      </v-col>
    </v-row>

    <v-row dense class="mt-2">
      <v-col class="px-2 mt-1" cols="12" sm="8" md="8">
        <v-card elevation="5" class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto mt-7"
            color="#5F7A61"
            elevation="12"
            max-width="calc(100% - 30px)"
          >
            <v-sparkline
              :labels="labelsSparkline"
              :value="valueSparkline"
              :gradient="gradient"
              :gradient-direction="gradientDirection"
              max-height="80px"
              min-height="70px"
              line-width="2"
              padding="16"
              color="white"
              class="fontall"
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2">
              <v-btn block text small class="fontall grey--text"
                >GRAFIK PRODUKTIFITAS</v-btn
              >
            </div>

            <div class="fontall grey--text">Last Campaign Performance</div>
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="fontall grey--text font-weight-light"
              >Grafik Hasil Pengelolaan 1 Tahun
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="4" md="4">
        <v-card class="pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Gender Diversity
          </header>
          <div>
            <apexchart
              width="350"
              type="donut"
              :options="chartOptions"
              :series="series"
              :color="colors"
              class="fontall"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";
import VueApexCharts from "vue-apexcharts";
const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "black"],
  ["purple", "violet"],
  ["#FF0", "#F0F", "#00c6ff"],
  ["#1feaea", "#ffd200", "#f72047"],
];

export default {
  name: "Dashboard",
  components: {
    apexchart: VueApexCharts,
  },
  data: () => ({
    series: [100, 55],
    chartOptions: {
      chart: {
        type: "donut",
      },
      responsive: [
        {
          breakpoint: undefined,
          options: {},
        },
      ],
      legend: {
        position: "bottom",
      },
      labels: ["Laki-laki", "Perempuan"],
      colors: ["#444941", "#99A799"],
    },
    drawer: null,
    BaseUrlGet: "",
    authtoken: "",

    data1: {
      Judul: "Jumlah Karyawan",
      Deskripsi: "Detail Data Total Karyawan",
      Count: "1",
      link: "/",
    },
    data2: {
      Judul: "Jumlah Karyawan Ijin",
      Deskripsi: "Detail Data Karyawan Ijin",
      Count: "11",
      link: "/",
    },
    data3: {
      Judul: "Persetujuan",
      Deskripsi: "Detail Data Persetujuan",
      Count: "111",
      link: "/",
    },
    data4: {
      Judul: "Karyawan Terlambat",
      Deskripsi: "Detail Karywan Terlambat",
      Count: "1111",
      link: "/",
    },

    gradientDirection: "top",
    gradients,
    gradient: gradients[10],
    labelsSparkline: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "August",
      "Sept",
      "Okt",
      "Nop",
      "Dec",
    ],
    valueSparkline: [350, 200, 410, 390, 310, 460, 250, 240, 0, 0, 0, 0],
    srcimage: "https://cdn.vuetifyjs.com/images/cards/foster.jpg",
    datacollection: null,
    namaAdmin: "Nama Admin",

    chartData: [
      ["Tempat", "Total"],
      ["Lokasi1", 1000],
      ["Lokasi2", 1170],
      ["Lokasi3", 760],
      ["Lokasi4", 1030],
      ["Lokasi5", 600],
    ],
    chartOptionsGoogle: {
      title: "Chart Dashboard",
      // pieHole: 0.4,
      is3D: true,
      legend: "none",
      pieSliceText: "label",
      width: $(window).width() * 0.25,
      height: $(window).height() * 0.45,
    },
    chartOptionsGoogleMobile: {
      title: "Chart Dashboard",
      // pieHole: 0.4,
      is3D: true,
      legend: "none",
      pieSliceText: "label",
    },
  }),
  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.firstinitialize();
  },
  methods: {
    async firstinitialize() {
      if (this.authtoken) {
      } else {
        localStorage.removeItem("token");
        this.$router.push("/");
      }
    },
  },
  handleSectionClick(section, event) {
    console.log(`${section.label} clicked.`);
  },
};
</script>
