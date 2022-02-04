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

    <v-container class="mt-0">
      <v-row>
        <v-col class="pt-1 px-2" cols="12" sm="4" md="4">
          <v-card elevation="7">
            <v-card-title class="px-3 py-2 fontall">
              <v-icon left style="color: black"> mdi-cogs </v-icon>
              <h4>Divisi</h4>
            </v-card-title>
            <v-divider
              style="border-color: black"
              class="mx-2 mt-0"
            ></v-divider>
            <v-card-text class="fontall px-24 pt-0 pb-2" style="padding-left: 2px;padding-right: 2px;">
              <v-data-table
                :headers="headersdivisi"
                :items="itemsdivisi"
                :loading="loadtable"
                loading-text="Loading... Please wait"
                class="rounded elevation-0 mx-1 pa-1 mb-5 fontall"
                :disable-pagination="true"
                :hide-default-footer="true"
              >
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search..."
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn dark class="mb-2" @click="showAddModal()" color="green">
                        <v-icon small>mdi-plus</v-icon> Add Item
                    </v-btn>
                    <!-- Modal Add Edit -->
                    <v-dialog v-model="dialog" max-width="800px">
                      <!-- <v-card>
                        <v-card-title class="headermodalstyle">
                          Edit Item
                        </v-card-title>
                        <v-card-text class="fontall px-24 pt-0 pb-2">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="12" md="12" class="pa-1">
                                  <v-select
                                    v-model="defaultItem.role"
                                    :items="itemsrole"
                                    item-text="name"
                                    item-value="id"
                                    label="Pilih Role Admin"
                                    outlined
                                    clearable
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-text-field
                                    v-model="defaultItem.nama"
                                    label="Nama Admin"
                                    outlined
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-text-field
                                    v-model="defaultItem.no_telp"
                                    label="No Telp"
                                    outlined
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-text-field
                                    v-model="defaultItem.email"
                                    label="Email"
                                    outlined
                                    :rules="[rules.required, rules.email]"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  v-if="AddModal == true"
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  class="pa-1"
                                >
                                  <v-text-field
                                    v-model="defaultItem.password"
                                    label="Password"
                                    :rules="[rules.required, rules.countermin]"
                                    outlined
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-select
                                    v-model="defaultItem.status_admin"
                                    :items="itemsstatus_admin"
                                    item-text="text"
                                    item-value="value"
                                    label="Pilih Status Admin"
                                    outlined
                                    clearable
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pa-1">
                                  <v-textarea
                                    v-model="defaultItem.alamat"
                                    label="Alamat"
                                    outlined
                                    rows="3"
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-textarea>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red"
                            elevation="1"
                            outlined
                            @click="close"
                          >
                            <v-icon left> mdi-close-circle-outline </v-icon>
                            Cancel
                          </v-btn>
                          <v-btn
                            color="success"
                            elevation="1"
                            outlined
                            @click="save"
                          >
                            <v-icon left>
                              mdi-checkbox-marked-circle-outline
                            </v-icon>
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card> -->
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    class="mr-1"
                    @click="editpengaturan(item)"
                    color="warning"
                  >
                    mdi-pencil-circle-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col class="pt-1 px-2" cols="12" sm="8" md="8">
          <v-card elevation="7">
            <v-card-title class="px-3 py-2 fontall">
              <v-icon left style="color: black"> mdi-cogs </v-icon>
              <h4>Department</h4>
            </v-card-title>
            <v-divider
              style="border-color: black"
              class="mx-2 mt-0"
            ></v-divider>
            <v-card-text class="fontall px-24 pt-0 pb-2">
              <v-data-table
                :headers="headersdept"
                :items="itemsdept"
                :loading="loadtable"
                loading-text="Loading... Please wait"
                class="rounded elevation-0 mx-1 pa-1 mb-5 fontall"
                :disable-pagination="true"
                :hide-default-footer="true"
              >
                <template v-slot:item.is_aktif="{ item }">
                  <h5 :color="getColorStatus(item.is_aktif)">
                    {{ getTextStatus(item.is_aktif) }}
                  </h5>
                </template>
                <template v-slot:top>
                  <v-toolbar flat>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search..."
                        single-line
                        hide-details
                    ></v-text-field>
                    <v-divider class="mx-4" inset vertical></v-divider>
                    <v-spacer></v-spacer>
                    <v-btn dark class="mb-2" @click="showAddModal()" color="green">
                        <v-icon small>mdi-plus</v-icon> Add Item
                    </v-btn>
                    <!-- Modal Add Edit -->
                    <v-dialog v-model="dialog" max-width="800px">
                      <!-- <v-card>
                        <v-card-title class="headermodalstyle">
                          Edit Item
                        </v-card-title>
                        <v-card-text class="fontall px-24 pt-0 pb-2">
                          <v-form ref="form" v-model="valid" lazy-validation>
                            <v-container>
                              <v-row>
                                <v-col cols="12" sm="12" md="12" class="pa-1">
                                  <v-select
                                    v-model="defaultItem.role"
                                    :items="itemsrole"
                                    item-text="name"
                                    item-value="id"
                                    label="Pilih Role Admin"
                                    outlined
                                    clearable
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-text-field
                                    v-model="defaultItem.nama"
                                    label="Nama Admin"
                                    outlined
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-text-field
                                    v-model="defaultItem.no_telp"
                                    label="No Telp"
                                    outlined
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-text-field
                                    v-model="defaultItem.email"
                                    label="Email"
                                    outlined
                                    :rules="[rules.required, rules.email]"
                                  ></v-text-field>
                                </v-col>
                                <v-col
                                  v-if="AddModal == true"
                                  cols="12"
                                  sm="6"
                                  md="6"
                                  class="pa-1"
                                >
                                  <v-text-field
                                    v-model="defaultItem.password"
                                    label="Password"
                                    :rules="[rules.required, rules.countermin]"
                                    outlined
                                  ></v-text-field>
                                </v-col>
                                <v-col cols="12" sm="6" md="6" class="pa-1">
                                  <v-select
                                    v-model="defaultItem.status_admin"
                                    :items="itemsstatus_admin"
                                    item-text="text"
                                    item-value="value"
                                    label="Pilih Status Admin"
                                    outlined
                                    clearable
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-select>
                                </v-col>
                                <v-col cols="12" sm="12" md="12" class="pa-1">
                                  <v-textarea
                                    v-model="defaultItem.alamat"
                                    label="Alamat"
                                    outlined
                                    rows="3"
                                    :rules="[(v) => !!v || 'Field is required']"
                                  ></v-textarea>
                                </v-col>
                              </v-row>
                            </v-container>
                          </v-form>
                        </v-card-text>
                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="red"
                            elevation="1"
                            outlined
                            @click="close"
                          >
                            <v-icon left> mdi-close-circle-outline </v-icon>
                            Cancel
                          </v-btn>
                          <v-btn
                            color="success"
                            elevation="1"
                            outlined
                            @click="save"
                          >
                            <v-icon left>
                              mdi-checkbox-marked-circle-outline
                            </v-icon>
                            Save
                          </v-btn>
                        </v-card-actions>
                      </v-card> -->
                    </v-dialog>
                  </v-toolbar>
                </template>
                <template v-slot:item.actions="{ item }">
                  <v-icon
                    class="mr-1"
                    @click="editpengaturan(item)"
                    color="warning"
                  >
                    mdi-pencil-circle-outline
                  </v-icon>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

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
import HelperGlobal from "../../services/Helper";
const HelperGlobalService = new HelperGlobal();

export default {
  name: "SysParam",
  data: () => ({
    itemsbr: [
      {
        text: "Employee",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "System Parameter",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    rules: {
      required: (value) => !!value || "Required.",
      countermin: (value) => value.length > 5 || "Min 6 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },
    loading: false,
    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    dialogReset: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headersdivisi: [
      { text: "Code", value: "divisi_code" },
      { text: "Nama", value: "nama" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    headersdept: [
      { text: "Divisi", value: "divisi_nama" },
      { text: "Department_code", value: "department_code" },
      { text: "Nama Department", value: "dept_nama" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],

    defaultItem: {
      user_id: "",
      nama: "",
      no_telp: "",
      alamat: "",
      pekerjaan: "",
      status_admin: "",
      password: "",
      role_code: "",
      email: "",
      role_name: "",
    },

    itemsdept:[],
    itemsdivisi:[],
    itemsrole: [],
    itemsemp: [],
    itemsstatus_admin: [
      { text: "Aktif", value: 0 },
      { text: "Tidak_Aktif", value: 1 },
    ],

    AddModal: true,
    valid: true,

    snackbar: false,
    textsnackbar: "Test",
    timeoutsnackbar: 2000,
    colorsnackbar: null,

    admin_id: "",
  }),

  created() {
    this.authtoken = localStorage.getItem("token");
    this.BaseUrlGet = localStorage.getItem("BaseUrlGet");
    this.User = JSON.parse(localStorage.getItem("User"));
    if (this.User) {
      this.admin_id = this.User.code;
    }
    this.initialize();
    this.getRole();
    this.getDivisi();
    this.getDept();
    this.getEmp();
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetUser", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
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
    async getDivisi() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllDivisi", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsdivisi = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsdivisi = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsdivisi = [];
        }
      }
    },
    async getDept() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllDepartment", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsdept = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsdept = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsdept = [];
        }
      }
    },
    async getRole() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllRole", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsrole = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsrole = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsrole = [];
        }
      }
    },
    async getEmp() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAllEmployee", {
          headers: {
            Authorization: `Bearer ` + this.authtoken,
          },
        });
        console.log(response.data.data.result.data);
        if (response.data.length != 0) {
          this.itemsemp = response.data.data.result.data;
        } else {
          console.log("Kosong");
          this.itemsemp = [];
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.itemsemp = [];
        }
      }
    },
    async addApi(datapost) {
      try {
        const response = await axios.post(
          this.BaseUrlGet + "RegistUser",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        this.loading = false;
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },
    async editApi(datapost) {
      console.log(datapost);
      try {
        const response = await axios.post(
          this.BaseUrlGet + "EditUser",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        this.loading = false;
        if (response.data.data.result == "success") {
          this.dialog = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menambahkan data";
          this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error);
        this.loading = false;
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },
    async deleteApi() {
      const datapost = {
        user_id: this.defaultItem.user_id,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteUser",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses menghapus data";

          this.dialogDelete = false;
          this.initialize();
        } else {
          this.dialog = true;
        }
      } catch (error) {
        console.error(error);
        if (error.response.status == 401) {
          localStorage.removeItem("token");
          this.$router.push("/");
        }
      }
    },
    async resetItemConfirm() {
      console.log(this.defaultItem);
      const datapost = {
        user_id: this.defaultItem.user_id,
        email: this.defaultItem.email,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "ResetPasswordUser",
          datapost,
          {
            headers: {
              Authorization: `Bearer ` + this.authtoken,
            },
          }
        );
        console.log(response.data.data.result);
        if (response.data.data.result == "success") {
          this.dialogReset = false;
          this.snackbar = true;
          this.colorsnackbar = "green";
          this.textsnackbar = "Sukses mengubah data";
          this.initialize();
        } else {
          this.dialogReset = true;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal mengubah data";
        }
      } catch (error) {
        console.error(error.response);
        if (error.response.status == 401) {
          this.dialogReset = true;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal mengubah data";
          localStorage.removeItem("token");
          this.$router.push("/");
        } else {
          this.dialogReset = true;
          this.snackbar = true;
          this.colorsnackbar = "red";
          this.textsnackbar = "Gagal mengubah data";
        }
      }
    },

    showAddModal() {
      this.defaultItem.user_id = "";
      this.defaultItem.nama = "";
      this.defaultItem.no_telp = "";
      this.defaultItem.nik = "";
      this.defaultItem.pekerjaan = "";
      this.defaultItem.status_admin = "";
      this.defaultItem.role_code = "";
      this.defaultItem.email = "";
      this.defaultItem.role_name = "";
      this.formTitle = "Add Item";
      // console.log();
      this.AddModal = true;
      this.dialog = true;
    },
    showEditModal(item) {
      this.defaultItem = Object.assign({}, item);
      this.defaultItem.role_code = parseInt(item.role_code);
      this.formTitle = "Edit Item";
      console.log(this.defaultItem);
      this.AddModal = false;
      this.dialog = true;
    },
    showDeleteModal(item) {
      this.defaultItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    close() {
      this.dialog = false;
      this.dialogReset = false;
    },
    closeDelete() {
      this.dialogDelete = false;
    },

    save() {
      this.loading = true;

      const datapost = {
        nik: this.defaultItem.nik,
        role_code: this.defaultItem.role_code,
        no_telp: this.defaultItem.no_telp,
        email: this.defaultItem.email,
        password: "default",
        status_admin: "default",
        user_id: "default",
        // alamat: this.defaultItem.alamat,
      };

      if (HelperGlobalService.checkMandatory(datapost, "object") == true) {
        if (this.defaultItem.user_id) {
          console.log("Save Edit");
          datapost.user_id= this.defaultItem.user_id,
          datapost.status_admin= this.defaultItem.status_admin,
          this.editApi(datapost);
        } else {
          console.log("Save Add");
          datapost.password= this.defaultItem.password,
          this.addApi(datapost);
        }
      } else {
        this.snackbar = true;
        this.colorsnackbar = "red";
        this.textsnackbar =
          "Gagal Simpan, Kolom required tidak boleh ada yang kosong";
      }
    },

    deleteItemConfirm() {
      this.deleteApi();
    },

    resetItem(item) {
      this.defaultItem.user_id = item.user_id;
      this.defaultItem.email = item.email;
      this.dialogReset = true;
    },

    getColorStatus(role_code) {
      console.log(role_code);
      if (role_code == 0) return "#25695C";
      else if (role_code == 1) return "#25695C";
      else if (role_code == 2) return "#BF9168";
      else if (role_code == 3) return "#D42F2F";
      else return "#9CACA3";
    },
  },
};
</script>
