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
      class="rounded elevation-6 mx-3 pa-1 itemchild"
    >
      <template v-slot:item.role_name="{ item }">
        <v-chip label :color="getColorStatus(item.role)" dark>
          {{ item.role_name }}
        </v-chip>
      </template>

      <template v-slot:top>
        <v-toolbar flat>
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search here..."
            single-line
            hide-details
          ></v-text-field>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-btn dark class="mb-2" @click="showAddModal()" color="#25695c">
            <v-icon small>mdi-plus</v-icon> Add Item
          </v-btn>
          <!-- Modal Add Edit -->
          <v-dialog v-model="dialog" max-width="800px">
            <v-card>
              <v-card-title class="headermodalstyle">
                {{ formTitle }}
              </v-card-title>
              <!-- <v-divider></v-divider> -->
              <v-card-text class="fontall">
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container fluid>
                    <v-row>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-select
                          v-model="defaultItem.role"
                          :items="itemsrole"
                          label="Pilih Role Admin"
                          class="fontall"
                          item-text="name"
                          item-value="id"
                          outlined
                          color="#25695c"
                          dense
                          clearable
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.nama"
                          outlined
                          label="Nama Admin"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.no_telp"
                          outlined
                          label="No Telp"
                          class="fontall"
                          color="#25695c"
                          dense
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-text-field
                          v-model="defaultItem.email"
                          outlined
                          label="No Telp"
                          class="fontall"
                          color="#25695c"
                          dense
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
                          :rules="[rules.required, rules.countermin]"
                          outlined
                          label="Password"
                          class="fontall"
                          color="#25695c"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6" class="pa-1">
                        <v-select
                          v-model="defaultItem.status_admin"
                          :items="itemsstatus_admin"
                          item-text="text"
                          item-value="value"
                          outlined
                          label="Pilih Status Admin"
                          class="fontall"
                          color="#25695c"
                          dense
                          clearable
                          :rules="[(v) => !!v || 'Field is required']"
                        ></v-select>
                      </v-col>
                      <v-col cols="12" sm="12" md="12" class="pa-1">
                        <v-textarea
                          v-model="defaultItem.alamat"
                          outlined
                          label="Alamat"
                          class="fontall"
                          color="#25695c"
                          dense
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
                <v-btn dark color="red" @click="close">
                  <v-icon left> mdi-close-circle-outline </v-icon> Cancel
                </v-btn>
                <v-btn dark color="#25695c" @click="save">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Delete -->
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to delete this item?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="closeDelete">
                  <v-icon left> mdi-close-circle-outline </v-icon>
                  Cancel
                </v-btn>
                <v-btn dark color="#25695c" @click="deleteItemConfirm">
                  <v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <!-- Modal Reset -->
          <v-dialog v-model="dialogReset" max-width="500px">
            <v-card>
              <v-card-title class="headline"
                >Are you sure you want to reset password?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="red" @click="close">
                  <v-icon left> mdi-close-circle-outline </v-icon> Cancel</v-btn
                >
                <v-btn dark color="#25695c" @click="resetItemConfirm"
                  ><v-icon left> mdi-checkbox-marked-circle-outline </v-icon>
                  OK</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <!-- <v-icon class="mr-2" @click="detailItem(item)" color="primary">
          mdi-information
        </v-icon> -->
        <v-icon class="mr-1" @click="showEditModal(item)" color="#bf9168">
          mdi-pencil-outline
        </v-icon>
        <v-icon class="mr-1" @click="resetItem(item)" color="#25695C">
          mdi-autorenew
        </v-icon>
        <v-icon @click="showDeleteModal(item)" color="#d42f2f">
          mdi-delete-outline
        </v-icon>
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
  name: "Admin",
  data: () => ({
    itemsbr: [
      {
        text: "Data Admin",
        disabled: true,
        href: "breadcrumbs_dashboard",
      },
      {
        text: "Admin",
        disabled: true,
        href: "breadcrumbs_link_1",
      },
    ],

    rules: {
      required: (value) => !!value || "Required.",
      countermin: (value) => value.length > 6 || "Min 6 characters",
      email: (value) => {
        const pattern =
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return pattern.test(value) || "Invalid e-mail.";
      },
    },

    formTitle: "Add Item",
    value: "add",
    dialog: false,
    dialogDelete: false,
    dialogReset: false,
    search: "",
    authtoken: "",
    BaseUrlGet: "",
    headers: [
      { text: "Nama Admin", value: "nama" },
      { text: "Role Admin", value: "role_name" },
      { text: "No Telp", value: "no_telp" },
      { text: "Email", value: "email" },
      //   { text: "User ID", value: "username" },
      { text: "Actions", value: "actions", sortable: false, width: "15%" },
    ],
    dataobject: [],

    defaultItem: {
      code: "",
      nama: "",
      no_telp: "",
      alamat: "",
      pekerjaan: "",
      status_admin: "",
      password: "",
      role: "",
      email: "",
      role_name: "",
    },

    itemsrole: [],
    itemsstatus_admin: [
      { text: "Aktif", value: "aktif" },
      { text: "Non_Aktif", value: "non_aktif" },
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
  },

  methods: {
    async initialize() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetAdmin", {
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
    async getRole() {
      try {
        const response = await axios.get(this.BaseUrlGet + "GetRole", {
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
    async addApi() {
      const datapost = {
        name: this.defaultItem.nama,
        role: this.defaultItem.role,
        no_telp: this.defaultItem.no_telp,
        email: this.defaultItem.email,
        password: this.defaultItem.password,
        status_admin: this.defaultItem.status_admin,
        alamat: this.defaultItem.alamat,
      };

      try {
        const response = await axios.post(
          this.BaseUrlGet + "RegistAdmin",
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
          this.textsnackbar = "Sukses menambahkan data";
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
    async editApi() {
      const datapost = {
        code: this.defaultItem.code,
        name: this.defaultItem.nama,
        role: this.defaultItem.role,
        no_telp: this.defaultItem.no_telp,
        email: this.defaultItem.email,
        status_admin: this.defaultItem.status_admin,
        alamat: this.defaultItem.alamat,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "EditAdmin",
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
          this.textsnackbar = "Sukses menambahkan data";
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
    async deleteApi() {
      const datapost = {
        code: this.defaultItem.code,
      };
      console.log(datapost);
      // this.dialogDetail = false;
      try {
        const response = await axios.post(
          this.BaseUrlGet + "DeleteAdmin",
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
          this.textsnackbar = "Sukses menambahkan data";

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
      console.log(this.defaultItem.employee_no);
      const datapost = {
        code: this.defaultItem.code,
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

    showAddModal() {
      this.defaultItem.code = "";
      this.defaultItem.nama = "";
      this.defaultItem.no_telp = "";
      this.defaultItem.alamat = "";
      this.defaultItem.pekerjaan = "";
      this.defaultItem.status_admin = "";
      this.defaultItem.role = "";
      this.defaultItem.email = "";
      this.defaultItem.role_name = "";
      this.formTitle = "Add Item";
      // console.log();
      if (this.$refs.form) {
        this.$refs.form.reset();
      }
      this.AddModal = true;
      this.dialog = true;
    },
    showEditModal(item) {
      this.defaultItem = Object.assign({}, item);
      this.defaultItem.role = parseInt(item.role);
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
      this.$refs.form.validate();

      if (this.$refs.form.validate() == true) {
        if (this.defaultItem.code) {
          console.log("Save Edit");
          this.editApi();
        } else {
          console.log("Save Add");
          this.addApi();
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
      this.defaultItem.code = item.code;
      this.defaultItem.email = item.email;
      this.dialogReset = true;
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
