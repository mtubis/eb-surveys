<template>
    <Page>
        <ActionBar :title="selectedSurvey.name">
           <ActionItem @tap="onNavBtnTap"
                ios.systemIcon="4" ios.position="left"
                android.systemIcon="ic_menu_back" android.position="actionBar">
            </ActionItem>
        </ActionBar>
        <StackLayout orientation="vertical" class="main-container" >
            <Button v-if="needForNewResults" text="neue Umfrage" @tap="newSurveyResults" class="btn btn-primary"></Button>
            <!-- list of results -->
            <ListView for="(surveyResult, no) in surveyResults" class="list-group" >
                <v-template>
                  <StackLayout>
                  <GridLayout class="item-container" columns="9*, 1*" rows="1*, 2*, 1*">
                    <!-- 1) survey title -->
                    <Label class="item-title" row="0" col="0" colSpan="2" :text="resultName(surveyResult)" />
                    <GridLayout row="1" col="0" rows="1*, 2*, 1*" columns="1*, 1*, 1*, 1*, 1*, 1*" rowSpan="3" class="item-body">
                        <!-- 2) dates -->
                        <Label id="surveyStart" textWrap="true" class="item-date" row="1" col="0" colSpan="3" :text="resultDateStart(surveyResult)" />
                        <Label id="surveyFinish" textWrap="true" class="item-date" row="1" col="3" colSpan="3" :text="resultDateEnd(surveyResult)" />
                        <!-- 3) buttons -->
                        <Label class="item-btn btn btn-primary" row="2" col="0" colSpan="2" text="Vorschau" @tap="navigateToResultPreview(surveyResult)" />
                        <Label class="item-btn btn btn-primary" row="2" col="2" colSpan="2" text="Bearbeiten" @tap="editSurveyResults(surveyResult)" />
                        <Label class="item-btn btn btn-primary" row="2" col="4" colSpan="2" text="Verwerfen" @tap="deleteResultItem(surveyResult)" />
                    </GridLayout>
                    <!-- button -->
                    <Label class="item-save-btn" :class="resultSaveStatus(surveyResult)" row="1" col="1" rowSpan="3" :text="resultSaveStatusText(surveyResult)" @tap="saveResults(surveyResult)" />
                  </GridLayout>
                  </StackLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
//import * as surveysDB from '../../db.json';
import * as dialogs from 'tns-core-modules/ui/dialogs';

import ResultPreview from "./ResultPreview";
import SurveyGridLayout from "./SurveyGridLayout";

export default {
    props: {
        selectedSurvey: Object
    },
    data() {
        return {
            //surveysData: []
        }
    },
    computed: {
        surveysData() {
            return this.$store.state.results;
        },
        surveyResults() {
            return this.surveysData.filter(resultItem => {
                return resultItem.surveyId === this.selectedSurvey.id;
            });
        },
        needForNewResults() {
            if (this.selectedSurvey.amount === null || this.surveyResults.length < this.selectedSurvey.amount) {
                return true;
            }
            return false;
        }
    },
    created() {
        this.$store.dispatch('getResultsData');
    },
    methods: {
        onNavBtnTap() {
            this.$navigateBack();
        },
        newSurveyResults() {
            var surveyData = this.selectedSurvey;
            var resultData = {};
            var editMode = false;
            switch (this.selectedSurvey.layout.type) {
                case "GridLayout":
                    this.$navigateTo(SurveyGridLayout, { props: {surveyData, resultData, editMode} });
                    break;
                case "StackLayout":

                    break;
            }
        },
        editSurveyResults(resultData) {
            var surveyData = this.selectedSurvey;
            var editMode = true;
            switch (this.selectedSurvey.layout.type) {
                case "GridLayout":
                    this.$navigateTo(SurveyGridLayout, { props: {surveyData, resultData, editMode} });
                    break;
                case "StackLayout":

                    break;
            }
        },
        resultName(resultData) {
            return this.selectedSurvey.name + " (ID: " + resultData.identifier + ")";
        },
        getDateString(date) {
            return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        },
        resultDateStart(resultData) {
            var date = new Date(resultData.startTime * 1000);
            return "Start:\n" + this.getDateString(date);
        },
        resultDateEnd(resultData) {
            var date = new Date(resultData.finishTime * 1000);
            var dateString = "Ende:\n";
            if (resultData.finishTime === null) {
                dateString += "---";
            } else {
                dateString += this.getDateString(date);
            }
            return dateString;
        },
        resultSaveStatus(resultData) {
            if (resultData.synchronized) {
                return "item-btn-saved";
            }
            return "item-btn-unsaved";
        },
        resultSaveStatusText(resultData) {
            if (resultData.synchronized) {
                return "ok";
            }
            return "Save!"
        },
        navigateToResultPreview(resultData) {
            this.$navigateTo(ResultPreview, { props: { resultData } });
        },
        saveResults(resultData) {
            resultData.synchronized = true;
            resultData.finishTime = Math.round((new Date()).getTime() / 1000);
            if (!resultData.synchronized) {
                this.$store.dispatch('sendSurveyResults', resultData);
            }
        },
        deleteResultItem(resultData) {
            console.log('deleting result');
            this.$store.dispatch('deleteSurveyResult', resultData);
        }
    }
}
</script>

<style scoped>
    .main-container {
        background-color: #ffffff;
    }
    .item-container {
        padding: 0;
        margin-bottom: 6;
        border-width: 1;
        border-color: #eeeeee;
        border-style: solid;
        box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.75);
    }
    .btn {
        background-color: #ddd;
        color: #363636;
        font-weight: bold;
        text-align: center;
    }
    .item-btn {
        margin: 6 12;
        padding: 2;
    }
    .list-group {
        margin: 0 6 0 6;
        padding: 0;
    }
    .item-body {
        background-color: #ffffff;
        border-width: 0 1 0 0;
        border-color: #eeeeee;
        border-style: solid;
    }
    .item-date {
        padding-left: 3;
        border-width: 0 1 0 0;
        border-color: #eeeeee;
        border-style: solid;
    }
    .item-title {
        margin: 0;
        padding: 4;
        background-color: #eeeeee;
        color: #363636;
    }
    .item-save-btn {
        background-color: #ffffff;
    }
    .item-btn-saved {
        padding-top: 40;
        text-align: center;
        background-image: url("~/assets/images/correct.png");
        background-repeat: no-repeat;
        background-size: 100 100;
        background-position:50% 10%;
    }
    .item-btn-unsaved {
        padding-top: 40;
        text-align: center;
        color: red;
        background-image: url("~/assets/images/refresh.png");
        background-repeat: no-repeat;
        background-size: 100 100;
        background-position:50% 10%;
    }
</style>
