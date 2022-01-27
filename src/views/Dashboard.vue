<template>
  <v-container class="mt-9 pa-0">
    <v-row>
      <v-col cols="12" md="12">
        <div>
          <v-alert
            v-model="alert"
            type="success"
            border="left"
            close-text="Close Alert"
            color="#444941"
            dark
            class="fontall"
            dismissible
          >
            Login Berhasil! Selamat datang di <strong>HRIS</strong>
          </v-alert>
        </div>

        <v-card>
          <v-card-title class="fontall" v-if="isMorning()">
            Good Morning, {{ namaAdmin }}</v-card-title
          >
          <v-card-title class="fontall" v-else>
            Good Afternoon, {{ namaAdmin }}</v-card-title
          >
          <v-card-subtitle class="fontall">
            it's
            {{
              new Date().toLocaleDateString(undefined, {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })
            }}
          </v-card-subtitle>
          <v-card-text>
            <v-row>
              <v-col cols="6" md="3" class="d-flex align-end">
                <v-avatar size="50" rounded class="elevation-1">
                  <v-icon dark size="40" color="#444941"
                    >mdi-account-multiple
                  </v-icon>
                </v-avatar>
                <div class="ms-3">
                  <p class="itemparent mb-0">
                    {{ data1.Judul }}
                  </p>
                  <h3 class="fontall">
                    {{ data1.Count }}
                  </h3>
                </div>
              </v-col>

              <v-col cols="6" md="3" class="d-flex align-end">
                <v-avatar size="50" rounded class="elevation-1">
                  <v-icon size="40" color="#444941">mdi-account-remove</v-icon>
                </v-avatar>
                <div class="ms-3">
                  <p class="itemparent mb-0">
                    {{ data2.Judul }}
                  </p>
                  <h3 class="fontall">
                    {{ data2.Count }}
                  </h3>
                </div>
              </v-col>

              <v-col cols="6" md="3" class="d-flex align-end">
                <v-avatar size="50" rounded class="elevation-1">
                  <v-icon size="40" color="#444941">mdi-account-check</v-icon>
                </v-avatar>
                <div class="ms-3">
                  <p class="itemparent mb-0">
                    {{ data4.Judul }}
                  </p>
                  <h3 class="fontall">
                    {{ data4.Count }}
                  </h3>
                </div>
              </v-col>
              <v-col cols="3">
                <v-row align="center" justify="center" class="mb-0">
                  <v-img
                    max-width="150"
                    src="/images/people.png"
                    style="margin-top: 2px"
                  ></v-img>
                </v-row>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-row dense class="mt-5">
      <v-col class="pa-2 mb-3" cols="12" sm="4" md="4">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Employee Age Breakdown
          </header>
          <div>
            <apexchart
              type="bar"
              height="250"
              :options="chartOptionsColumn"
              :series="seriesColumn"
              class="fontall"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="4" md="4">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Employment Status
          </header>

          <!-- <h5>Permanent</h5>
          <v-progress-linear value="12" height="30" color="#444941">
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}</strong>
            </template></v-progress-linear
          >
          <br />
          <h5>Contract</h5>
          <v-progress-linear value="60" height="30" color="#9CACA3">
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}</strong>
            </template></v-progress-linear
          >
          <br />
          <h5>Probation</h5>
          <v-progress-linear value="44" height="30" color="#E4CA43">
            <template v-slot:default="{ value }">
              <strong>{{ Math.ceil(value) }}</strong>
            </template></v-progress-linear
          > -->
          <div id="chart" class="fontall">
            <apexchart
              type="bar"
              height="250"
              :options="chartOptionsBar"
              :series="seriesBar"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="4" md="4">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Gender Diversity
          </header>
          <div>
            <apexchart
              width="350"
              type="donut"
              :options="chartOptionsDonut"
              :series="seriesDonut"
              :color="colors"
              class="fontall"
            ></apexchart>
          </div>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="6">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header
            class="fontall pa-2 mb-3"
            style="text-align: center"
            table-header-color="orange"
          >
            List Karyawan Terlambat
          </header>

          <v-data-table
            id="mytable"
            :headers="headers"
            :items="profils"
            hide-default-footer
            disable-sort
          >
          </v-data-table>
        </v-card>
      </v-col>
      <v-col class="pa-2 mb-3" cols="12" sm="6" md="6">
        <v-card class="fontall pa-md-4" height="355px" elevation="5">
          <header class="fontall pa-2 mb-3" style="text-align: center">
            Pending Task
          </header>

          <v-tabs v-model="tab" background-color="#9CACA3" color="black" grow>
            <v-tab v-for="item in items" :key="item" class="itemparent">
              {{ item.tab }}
            </v-tab>
          </v-tabs>

          <v-tabs-items v-model="tab" class="fontall">
            <v-tab-item v-for="item in items" :key="item">
              <v-card flat>
                <v-card-text>{{ item.content }}</v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs-items>
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
    tab: null,
    items: [
      { tab: "Pengumuman", content: "Tab 1 Content" },
      { tab: "Persetujuan", content: "Tab 2 Content" },
      { tab: "Perpanjangan Kontrak", content: "Tab 3 Content" },
    ],
    isMorning() {
      return new Date().getHours() < 12 ? true : false;
    },
    seriesDonut: [100, 55],
    chartOptionsDonut: {
      chart: {
        type: "donut",
        fontFamily: "Montserrat",
      },
      responsive: [
        {
          breakpoint: undefined,
          options: {},
        },
      ],
      legend: {
        position: "bottom",
        fontWeight: "bold",
      },
      labels: ["Laki-laki", "Perempuan"],
      colors: ["#444941", "#99A799"],
    },
    seriesBar: [
      {
        name: "Permanent",
        data: [100],
      },
      {
        name: "Contract",
        data: [212],
      },
      {
        name: "Probation",
        data: [333],
      },
    ],
    chartOptionsBar: {
      chart: {
        type: "bar",
        height: 200,
        stacked: true,
        stackType: "100%",
        fontFamily: "Montserrat",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },

      stroke: {
        width: 1,
        colors: ["#444941"],
      },
      xaxis: {
        categories: ["Status"],
      },

      fill: {
        opacity: 1,
      },
      colors: ["#444941", "#99A799", "#25695C"],
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 40,
        fontWeight: "bold",
      },
    },
    seriesColumn: [
      {
        name: "Age Groups",
        data: [35, 50, 47, 38, 25],
      },
    ],
    chartOptionsColumn: {
      chart: {
        type: "bar",
        height: 200,
        fontFamily: "Montserrat",
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      colors: ["#99A799", "#25695C"],
      legend: {
        position: "bottom",
        horizontalAlign: "left",
        offsetX: 40,
        fontWeight: "bold",
      },
      xaxis: {
        categories: ["20's", "30's", "40's", "50's", "60's"],
        title: {
          text: "Age Groups",
        },
      },
      yaxis: {
        title: {
          text: "Employee",
        },
      },
      fill: {
        opacity: 1,
      },
    },

    drawer: null,
    BaseUrlGet: "",
    authtoken: "",

    headers: [
      {
        text: "Nama",
        align: "start",
        sortable: false,
        value: "name",
      },
      { text: "Email", value: "email" },

      { text: "Status", value: "status_name" },
    ],
    profils: [
      {
        name: "Admin1",
        email: "admin1@mail.com",
        status_name: "Approve",
        status: "1",
      },
      {
        name: "Admin2",
        email: "admin2@mail.com",
        status_name: "Pending",
        status: "1",
      },
      {
        name: "Cust1",
        email: "cust1@mail.com",
        status_name: "Decline",
        status: "1",
      },
      {
        name: "Cust2",
        email: "cust2@mail.com",
        status_name: "Pending",
        status: "1",
      },
    ],
    defaultItem: {
      code: "",
      nama: "",
      email: "",
      status: "",
      status_name: "",
    },

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
  getColorStatus(status_name) {
    if (status_name == "1") return "green";
    else if (status_name == "2") return "orange";
    else if (stastatus_nametus == "3") return "red";
    else return "blue";
  },
};
</script>