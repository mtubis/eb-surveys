<template>
    <Page>
        <ActionBar title="EB Surveys">
          <ActionItem
            text="Login"
            @tap="login"
            style="color:#ffffff"
          />
        </ActionBar>
        <StackLayout orientation="vertical" class="list-group-item" >
            <ListView for="survey in surveys" class="list-group" @itemTap="navigateToSurvey">
              <v-template>
                <Label class="list-group-item" :text="survey.name" />
              </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
  import LoginPage from './LoginPage';
  import { mapState, mapActions, mapMutations, mapGetters } from "vuex";
  //import * as dialogs from 'tns-core-modules/ui/dialogs';
  //import * as surveysDB from '../../db.json';

  import SurveyDetails from "./SurveyDetails";

  export default {
    data() {
      return {
        loginPage: LoginPage,
      }
    },
    created() {
      this.$store.dispatch('getSurveysData');
    },
    computed: {
      surveys() {
        return this.$store.state.surveys;
      }
    },
    watch: {
      
    },
    methods: {
      login: function() {
        this.$navigateTo(this.loginPage);
      },
      navigateToSurvey: function(event) {
        var selectedSurvey = event.item;
        this.$navigateTo(SurveyDetails, { props: { selectedSurvey } });
      }
    }
  }
</script>

<style scoped>
    ActionBar {
        text-align: center;
    }
    .list-group-item {
      padding: 10 14;
    }

</style>
