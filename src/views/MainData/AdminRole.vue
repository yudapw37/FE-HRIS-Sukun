<template>
  <div>
    <v-breadcrumbs
      class="breadcrumbsmain fontall"
      :items="itemsbr"
      large
      color="black"
      style="font-weight: bold"
      ><template v-slot:divider>
        <v-icon>mdi-chevron-right</v-icon>
      </template></v-breadcrumbs
    >

    <v-data-table
      :headers="headers"
      :items="dataobject"
      :search="search"
      class="rounded elevation-6 mx-3 pa-1 fontall"
    >
      <template v-slot:item.role_name="{ item }">
        <v-chip :color="getColorStatus(item.role)" dark>
          {{ item.role_name }}
        </v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <!-- <v-btn dark class="mb-2" @click="showAddModal()" color="green">
            <v-icon small>mdi-plus</v-icon> Add Item
          </v-btn> -->
          <!-- Modal Add Edit -->
          <v-dialog v-model="dialog" max-width="600px">
            <v-card>
              <v-card-title class="headermodalstyle">
                Edit Menu Access
              </v-card-title>
              <!-- <v-divider></v-divider> -->
              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="4" md="4">
                      <div>
                        <h5>Role</h5>
                        <h3 class="ml-2">{{ defaultItem.role_name }}</h3>
                      </div>
                    </v-col>
                    <v-col cols="12" sm="8" md="8">
                      <div>
                        <h5>Nama</h5>
                        <h3 class="ml-2">{{ defaultItem.Nama }}</h3>
                      </div>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-select
                        v-model="menudropdown"
                        :items="itemsMenu"
                        item-value="id"
                        item-text="name"
                        label="Pilih Tambah Menu Access"
                        outlined
                        v-on:change="selectedMenuAccess($event)"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-data-table
                        :headers="headersmenu"
                        :items="defaultItem.MenuTable"
                        class="elevation-1"
                        append-icon="mdi-magnify"
                        :items-per-page="5"
                      >
                        <template v-slot:item.actions="{ item }">
                          <v-icon
                            class="mr-2"
                            @click="deletelistmenu(item)"
                            color="red"
                          >
                            mdi-delete
                          </v-icon>
                          <!-- <v-icon @click="deleteItem(item)" color="red"> mdi-delete </v-icon> -->
                        </template>
                      </v-data-table>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="red" elevation="1" outlined @click="close">
                  <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                </v-btn>
                <v-btn color="success" elevation="1" outlined @click="save">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-2" @click="showEditModal(item)" color="warning">
          mdi-pencil-circle
        </v-icon>
        <!-- <v-icon @click="deleteItem(item)" color="red"> mdi-delete </v-icon> -->
      </template>
    </v-data-table>

    <v-snackbar
      v-model="snackbar"
      :color="colorsnackbar"
      :timeout="timeoutsnackbar"
    >
      {{ textsnackbar }}
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminMenu",
  data: () => ({
    itemsbr: [
      {
        text: "Data Admin",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Admin Menu",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama", value: "Nama" },
      { text: "Role Admin", value: "role_name" },
      { text: "Menu Acces", value: "Menu", width: "50%" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    headersmenu: [
      { text: "Menu Code", value: "MenuCode" },
      { text: "Nama Menu", value: "MenuName" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dataobject: [],
    itemsMenu: [],
    statusAdd: true,
    menudropdown: "",

    defaultItem: {
      code: "",
      Nama: "",
      role: "",
      role_name: "",
      Menu: "",
      MenuCode: [],
      MenuTable: [],
    },

    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",

    editedIndex: -1,
    editedItem: {
      MenuCode: "",
      MenuName: "",
    },
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.initialize();
    this.GetMenu();
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(
          this.BaseUrlGet + "GetAdminMenuAccess",
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.dataobject = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.dataobject = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.dataobject = [];
        }
      }
    },
    async GetMenu() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllMenuAccess", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result);
        if (response.data.length != 0) {
          this.itemsMenu = response.data.data.result;
        } else {
          console.log("Kosong");
          this.itemsEmp = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          this.alerttoken = true;
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsEmp = [];
        }
      }
    },
    async Update(datapost) {
      console.log(datapost);
      console.log("edit save");
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "EditMenuAccessadm",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses mengubah data";
          this.initialize();
        } else {
          this.dialog = true;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal mengubah data";
        }
      } catch (error) {
        console.error(error.response);
        if (error.response.status == 401) {
          this.dialog = true;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal mengubah data";
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.dialog = true;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal mengubah data";
        }
      }
    },

    showEditModal(item) {
      console.log(item);
      this.defaultItem.code = item.code;
      this.defaultItem.Nama = item.Nama;
      this.defaultItem.role = item.role;
      this.defaultItem.role_name = item.role_name;
      this.defaultItem.Menu = item.Menu;
      this.defaultItem.MenuCode = item.MenuCode;
      this.defaultItem.MenuTable = item.MenuTable;
      this.statusAdd = false;
      this.dialog = true;
    },

    close() {
      this.dialog = false;
    },

    selectedMenuAccess(a) {
      if (a != null) {
        var listmenu = this.defaultItem.MenuTable;
        var result = false;
        for (let n = 0; n < listmenu.length; n++) {
          if (listmenu[n].MenuCode == a) {
            result = true;
            break;
          }
        }
        if (result == false) {
          var itemsmenuset = {
            MenuCode: "",
            MenuName: "",
          };
          for (let i = 0; i < this.itemsMenu.length; i++) {
            if (this.itemsMenu[i].id == a) {
              // console.log(this.itemsMenu[i]);
              itemsmenuset.MenuCode = this.itemsMenu[i].id;
              itemsmenuset.MenuName = this.itemsMenu[i].name;
              // console.log(this.editedItem);
              break;
            }
          }
          this.defaultItem.MenuTable.push(itemsmenuset);
          // console.log(this.defaultItem.MenuTable);
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses Tambah Menu Access";
        } else {
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Menu Sudah Ada Bro..!!!";
        }
        // this.menudropdown.id = '';
      }
    },
    async deletelistmenu(item) {
      console.log(item);
      this.editedIndex = await this.defaultItem.MenuTable.indexOf(item);
      this.editedItem = await Object.assign({}, item);
      // console.log(this.editedIndex);
      // console.log(this.editedItem);
      this.defaultItem.MenuTable.splice(this.editedIndex, 1);
    },

    save() {
      if (this.defaultItem.code.length != 0) {
        var listmenupost = "";
        var listmenutemp = "";
        for (let n = 0; n < this.defaultItem.MenuTable.length; n++) {
          if (n == 0) {
            listmenutemp = this.defaultItem.MenuTable[n].MenuCode;
          } else {
            listmenutemp =
              listmenutemp + "," + this.defaultItem.MenuTable[n].MenuCode;
          }
        }
        listmenupost = "[" + listmenutemp + "]";
        console.log(listmenupost);
        const datapost = {
          code: this.defaultItem.code,
          list_menu: listmenupost,
          MenuTable: this.defaultItem.MenuTable,
        };
        console.log(datapost);
        if (this.statusAdd == false) {
          this.Update(datapost);
        } else {
          // this.addData();
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Semua kolom tidak boleh ada yang kosong";
      }
    },

    getColorStatus(role) {
      if (role == "1") return "green";
      else if (role == "2") return "orange";
      else if (role == "3") return "red";
      else return "blue";
    },
  },
};
</script>
