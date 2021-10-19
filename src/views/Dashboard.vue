<template>
  <v-container class="mt-4 pa-1">
    <v-row dense>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-card
          :to="data1.link"
          style="border-left: 10px solid rgb(28 157 255)"
          elevation="5"
        >
          <v-card-title class="text-h5 pa-3"> {{ data1.Judul }} </v-card-title>
          <v-card-subtitle class="mb-2 pt-1">
            {{ data1.Deskripsi }}
          </v-card-subtitle>
          <v-row>
            <v-col class="pa-3" cols="4">
              <v-icon x-large class="ml-3">
                mdi-folder-multiple-plus-outline
              </v-icon>
            </v-col>
            <v-col class="pa-1" cols="8">
              <p
                class="text-h4 mr-6 mt-2"
                style="display: flex; justify-content: flex-end"
              >
                {{ data1.Count }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-card
          :to="data2.link"
          style="border-left: 10px solid rgb(191 28 255)"
          elevation="5"
        >
          <v-card-title class="text-h5 pa-3"> {{ data2.Judul }} </v-card-title>
          <v-card-subtitle class="mb-2 pt-1">
            {{ data2.Deskripsi }}
          </v-card-subtitle>
          <v-row>
            <v-col class="pa-3" cols="4">
              <v-icon x-large class="ml-3">
                mdi-file-table-box-multiple-outline
              </v-icon>
            </v-col>
            <v-col class="pa-1" cols="8">
              <p
                class="text-h4 mr-6 mt-2"
                style="display: flex; justify-content: flex-end"
              >
                {{ data2.Count }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-card
          :to="data3.link"
          style="border-left: 10px solid rgb(210 8 53)"
          elevation="5"
        >
          <v-card-title class="text-h5 pa-3"> {{ data3.Judul }} </v-card-title>
          <v-card-subtitle class="mb-2 pt-1">
            {{ data3.Deskripsi }}
          </v-card-subtitle>
          <v-row>
            <v-col class="pa-3" cols="4">
              <v-icon x-large class="ml-3">
                mdi-checkbox-multiple-marked-outline
              </v-icon>
            </v-col>
            <v-col class="pa-1" cols="8">
              <p
                class="text-h4 mr-6 mt-2"
                style="display: flex; justify-content: flex-end"
              >
                {{ data3.Count }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="3">
        <v-card
          :to="data4.link"
          style="border-left: 10px solid rgb(8 210 128)"
          elevation="5"
        >
          <v-card-title class="text-h5 pa-3"> {{ data4.Judul }} </v-card-title>
          <v-card-subtitle class="mb-2 pt-1">
            {{ data4.Deskripsi }}
          </v-card-subtitle>
          <v-row>
            <v-col class="pa-3" cols="4">
              <v-icon x-large class="ml-3"> mdi-calendar-clock </v-icon>
            </v-col>
            <v-col class="pa-1" cols="8">
              <p
                class="text-h4 mr-6 mt-2"
                style="display: flex; justify-content: flex-end"
              >
                {{ data4.Count }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <v-row dense class="mt-2">
      <v-col class="px-2 mt-1" cols="12" sm="8" md="8">
        <v-card elevation="5" class="mt-4 mx-auto">
          <v-sheet
            class="v-sheet--offset mx-auto mt-7"
            color="cyan"
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
            ></v-sparkline>
          </v-sheet>

          <v-card-text class="pt-0">
            <div class="text-h6 font-weight-light mb-2">
              <v-btn block text small class="grey--text">Grafik Data</v-btn>
            </div>

            <!-- <div class="subheading font-weight-light grey--text">
              Last Campaign Performance
            </div> -->
            <v-divider class="my-2"></v-divider>
            <v-icon class="mr-2" small> mdi-clock </v-icon>
            <span class="text-caption grey--text font-weight-light"
              >Grafik Hasil Pengelolaan 1 Tahun
            </span>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col class="px-1 py-1 mt-1" cols="12" sm="4" md="4">
        <v-card class="d-none d-md-block" elevation="5">
          <v-card-text class="py-1 px-1">
            <GChart
              type="PieChart"
              :data="chartData"
              :options="chartOptionsGoogle"
            />
          </v-card-text>
        </v-card>

        <v-card class="d-sm-block d-md-none" elevation="5">
          <v-card-text class="py-1 px-1">
            <GChart
              type="PieChart"
              :data="chartData"
              :options="chartOptionsGoogleMobile"
            />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
// import axios from "axios";

const gradients = [
  ["#222"],
  ["#42b3f4"],
  ["red", "orange", "yellow"],
  ["purple", "violet"],
  ["#FF0", "#F0F", "#00c6ff"],
  ["#1feaea", "#ffd200", "#f72047"],
];

export default {
  name: "Dashboard",
  data: () => ({
    drawer: null,
    BaseUrlGet: "",
    authtoken: "",

    data1: {
      Judul: "Data Dashboard 1",
      Deskripsi: "Detail Data Dashboard",
      Count: "1",
      link: "/",
    },
    data2: {
      Judul: "Data Dashboard 2",
      Deskripsi: "Detail Data Dashboard",
      Count: "11",
      link: "/",
    },
    data3: {
      Judul: "Data Dashboard 3",
      Deskripsi: "Detail Data Dashboard",
      Count: "111",
      link: "/",
    },
    data4: {
      Judul: "Data Dashboard 4",
      Deskripsi: "Detail Data Dashboard",
      Count: "1111",
      link: "/",
    },

    gradientDirection: "top",
    gradients,
    gradient: gradients[5],
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
};
</script>
