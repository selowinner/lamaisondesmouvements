<template>
  <div class="singInContentBox">
    <div class="signInHeaderBox">
      <img src="@/assets/icone/2-MinoA.png" alt="" srcset="" />
    </div>
    <v-form class="signInBodyBox">
      <div>
        <v-row>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              solo
              rounded
              ref="deno"
              v-model="userCredentials.pseudo"
              background-color="accent"
              height="100"
              type="text"
              :rules="[() => !!userCredentials.pseudo]"
              label="Pseudo"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6">
            <v-text-field
              solo
              rounded
              ref="anag"
              v-model="userCredentials.password"
              background-color="accent"
              height="100"
              type="password"
              :rules="[() => !!userCredentials.password]"
              label="password"
              persistent-hint
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </div>
      <div>
        <!-- <div class="checkboxBox">
                    <div></div>
                    <p>se souvenir de moi</p>
                </div>
                <p>mot de passe oublié ?</p> -->
      </div>
      <div>
        <div class="submitBouton" v-on:click.prevent="submit">
          <img src="@/assets/icone/right-arrowA.png" alt="" srcset="" />
        </div>
      </div>
    </v-form>
    <div class="signInFooterBox">
      <img src="@/assets/icone/1-MinordC.png" alt="" />
      <p>minord software suit</p>
    </div>

    <!-- ALERT -->
    <!-- <transition name="slide">
      <v-alert v-if="addingSuccess" elevation="13" type="success" max-width="300" class="alert" color="mainGreenColor">{{this.companyaddingResponse.message}}</v-alert>
      </transition> -->
    <transition name="slide">
      <v-alert
        v-if="addingfalse"
        elevation="13"
        type="error"
        max-width="300"
        class="alert"
        color="error"
        >{{ this.companyaddingResponse }}</v-alert
      >
    </transition>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  name: "login",
  components: {},

  data: () => ({
    // for alerte
    // addingSuccess: false,
    addingfalse: false,

    // for companies adding
    userCredentials: {
      pseudo: "",
      password: "",
      softLevel: "station",
    },

    companyaddingResponse: "",
  }),

  methods: {
    submit() {
      this.$store
        .dispatch("auth_request", this.userCredentials)
        .then(() => {
          this.$router.push("/");
        })
        .catch((authError) => {
          this.companyaddingResponse =
            "Le Pseudo ou le mot de passe est incorrecte";
          this.addingfalse = !this.addingfalses;
          setTimeout(() => {
            this.addingfalse = false;
          }, 3000);
          console.error(";) Le moniteur: auth failling ", authError);
        });
    },
  },
};
</script>

<style scoped>
.singInContentBox {
  height: 100vh;
  width: 100vw;
  background-image: radial-gradient(
    circle,
    #67d1ac,
    #5fc3a0,
    #57b594,
    #50a788,
    #489a7c,
    #459477,
    #418e72,
    #3e886d,
    #3e886d,
    #3e886d,
    #3e886d,
    #3e886d
  );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.signInHeaderBox {
  height: 85vh;
  margin-top: -60vh;
  width: 40vw;
  background: var(--main-white-color);
  display: flex;
  justify-content: center;
  align-items: flex-end;
  border-radius: 100%;
  box-shadow: -1px 10px 23px -1px rgb(28 28 28 / 64%);
}
.signInHeaderBox img {
  height: 140px;
  margin-bottom: 30px;
}

.signInBodyBox {
  width: 46vw;
  /* background: rgb(98, 79, 182); */
}
.signInBodyBox div:first-child {
  display: flex;
  justify-content: space-between;
  text-align: center;
  font-size: 20px;
  /* background: rebeccapurple; */
}
.v-text-field--solo:not(.v-text-field--solo-flat)
  > .v-input__control
  > .v-input__slot {
  box-shadow: 2px 6px 20px -1px rgb(26 26 26) !important; /* box shadow des input du login */
}
/* .signInBodyBox div:first-child input{
    height: 90px;
    width: 320px;
    border: none;
    border-radius: 20px;
    text-align: center;
    font-size: 20px;
    color: var(--main-white-color);
    background-color: var(--main-white-color);
    box-shadow: 2px 6px 20px -1px rgb(28 28 28 / 64%);

} */
.signInBodyBox div:nth-child(2) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--main-white-color);
}
.checkboxBox {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 140px;
  /* background-color: rgb(187, 179, 219); */
}
.checkboxBox > div {
  height: 17px;
  width: 17px;
  background-color: rgb(255, 255, 255);
  border-radius: 3px;
}
.signInBodyBox div:nth-child(3) {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
  width: 100%;
}
.submitBouton {
  padding-left: 12px;
  height: 45px;
  width: 70px;
  border-radius: 10px;
  background: var(--main-white-color);
  box-shadow: 2px 6px 20px -1px rgb(28 28 28 / 64%);
  cursor: pointer;
}

.signInFooterBox {
  height: 10vh;
  width: 60vw;
  background: var(--main-white-color);
  border-radius: 200% 200% 10% 10%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--main-green-color);
  font-size: 23px;
  box-shadow: -1px -10px 25px -1px rgb(28 28 28 / 64%);
}
.signInFooterBox img {
  height: 17px;
  margin-right: 20px;
}

/* input */
</style>
