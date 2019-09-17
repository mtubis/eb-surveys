<template>
    <Page>
        <ActionBar :title="selectedSurvey.name">
           <ActionItem @tap="onNavBtnTap"
                ios.systemIcon="4" ios.position="left"
                android.systemIcon="ic_menu_back" android.position="actionBar">
            </ActionItem>
        </ActionBar>
        <StackLayout orientation="vertical" class="main-container" >
            <!-- add button when possible -->
            <Button v-if="needForNewResults" text="neue Umfrage" @tap="newSurveyResults" class="btn btn-primary"></Button>
            <!-- list of results -->
            <ListView for="(surveyResult, no) in surveyResults" class="list-group" >
            <!--<StackLayout orientation="vertical" for="(surveyResult, no) in surveyResults" class="list-group" >-->
                <v-template>
                  <StackLayout>
                  <GridLayout class="item-container" columns="9*, 1*" rows="1*, 2*, 1*">
                    <!-- 1) survey title -->
                    <Label class="item-title" row="0" col="0" colSpan="2" :text="resultName(surveyResult)" />
                    <!--<label class="list-number" :text="no" row="0" col="0" rowSpan="3" />-->
                    <GridLayout row="1" col="0" rows="1*, 2*, 1*" columns="1*, 1*, 1*, 1*, 1*, 1*" rowSpan="3" class="item-body">
                        <!-- 1) survey title -->
                        <!-- <Label class="item-title" row="0" col="0" colSpan="6" :text="resultName(surveyResult)" /> -->
                        <!-- 2) dates -->
                        <Label id="surveyStart" textWrap="true" class="item-date" row="1" col="0" colSpan="3" :text="resultDateStart(surveyResult)" />
                        <!--<Label wrapLayout="true" class="item-date" row="1" col="0" colSpan="3">
                            <Label.formattedText>
                                <FormattedString>
                                    <FormattedString.spans>
                                        <Span text="Start: &#xa; &#xa;" />
                                        <Span :text="resultDateStart(surveyResult)" />
                                    </FormattedString.spans>
                                </FormattedString>
                            </Label.formattedText>
                        </Label>-->
                        <Label id="surveyFinish" textWrap="true" class="item-date" row="1" col="3" colSpan="3" :text="resultDateEnd(surveyResult)" />
                        <!--<Label textWrap="true" class="item-date" row="1" col="1" colSpan="3">
                            <Label.formattedText>
                                <FormattedString>
                                    <FormattedString.spans>
                                        <Span text="Ende: &#xa; &#xa;" />
                                        <Span :text="resultDateEnd(surveyResult)" />
                                    </FormattedString.spans>
                                </FormattedString>
                            </Label.formattedText>
                        </Label>-->
                        <!-- 3) buttons -->
                        <Label class="item-btn btn btn-primary" row="2" col="0" colSpan="2" text="Vorschau" />
                        <Label class="item-btn btn btn-primary" row="2" col="2" colSpan="2" text="Bearbeiten" />
                        <Label class="item-btn btn btn-primary" row="2" col="4" colSpan="2" text="Verwerfen" />
                    </GridLayout>
                    <!-- button? -->
                    <Label class="item-save-btn" :class="resultSaveStatus(surveyResult)" row="1" col="1" rowSpan="3" :text="resultSaveStatusText(surveyResult)" />
                  </GridLayout>
                  </StackLayout>
                </v-template>
            <!--</StackLayout>-->
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import * as surveysDB from '../../db.json';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export default {
    props: {
        selectedSurvey: Object
    },
    data() {
        return {
            surveysData: []
        }
    },
    computed: {
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
        this.surveysData = surveysDB.results;
        /*console.log(this.selectedSurvey);
        console.log('=================');
        console.log(this.surveysData);
        console.log('=================');*/
        //console.log();
    },
    methods: {
        onNavBtnTap() {
            this.$navigateBack();
        },
        newSurveyResults() {
            console.log('new survey :)');
        },
        resultName(resultData) {
            /*onsole.log('@@@ resultData @@@');
            console.log(resultData);*/
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
            return "Ende:\n" + this.getDateString(date);
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
        }
    }
}
</script>

<style scoped>
    .main-container {
        background-color: #ffffff;
    }
    .item-container {
        /*border: 1px solid #363636 !important;*/
        padding: 0;
        margin-bottom: 6;
        border-width: 1;
        border-color: #eeeeee;
        border-style: solid;
        /*-webkit-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 1px 3px 0px rgba(0,0,0,0.75);*/
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
    /*.btn-primary {
        background-color: #0075BE;
        color: #ffffff;
    }*/
    .list-group {
        /*margin: 0 6;
        border: 1px solid #363535 !important;*/
        margin: 0 6 0 6;
        padding: 0;
        
    }
    .item-body {
        /*border-right: #363636;*/
        background-color: #ffffff;
        border-width: 0 1 0 0;
        border-color: #eeeeee;
        border-style: solid;
    }
    .item-date {
        /*position: relative;
        width: 100%;
        height: auto;*/
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
        /*border-left: #363636;*/
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
