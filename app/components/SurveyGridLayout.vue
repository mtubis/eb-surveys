<template>
    <Page>
        <ActionBar title="EB Surveys">
            <ActionItem @tap="onNavBtnTap"
                ios.systemIcon="4" ios.position="left"
                android.systemIcon="ic_menu_back" android.position="actionBar">
            </ActionItem>
        </ActionBar>
        <GridLayout :columns="getColumnsLayout()" :rows="getRowsLayout()">
            <Button v-for="(field, key) in fields" :key="key" v-if="isButton(field)" :text="field.text" :row="field.row" :col="field.col" @tap="fieldAction(field)" :style="field.style" class="item-btn" />
            <Label v-for="(field, key) in fields" :key="key" v-if="isLabel(field)" :text="getItemText(field)" :row="field.row" :col="field.col" :style="field.style" class="item-label" />
        </GridLayout>
    </Page>
</template>

<script>
import * as dialogs from 'tns-core-modules/ui/dialogs';

export default {
    props: {
        surveyData: Object,
        resultData: Object,
        editMode: Boolean
    },
    data() {
        return {
            currentSurveyResults: {
                "surveyId": null,
                "identifier": null,
                "startTime": null,
                "finishTime": null,
                "latitude": "",
                "longitude": "",
                "results": [],
                "synchronized": false,
                "deactivated": false,
                "edited": null
            },
            tmpClickCounter: []
        }
    },
    computed: {
        fields() {
            return this.surveyData.fields;
        }
    },
    watch: {
        
    },
    methods: {
        saveResultsToVuex() {
            this.$store.commit('saveSurveyResults', this.currentSurveyResults);
        },
        onNavBtnTap() {
            dialogs.confirm({
                title: "Ergebnisse",
                message: "Die Ergebnisse der Umfrage aufschreiben?",
                okButtonText: "Speichern",
                cancelButtonText: "Stornieren",
            }).then(result => {
                if (result) {
                    this.saveResultsToVuex();
                }
                this.$navigateBack();
            });
        },
        getColumnsLayout() {
            return this.surveyData.layout.columns;
        },
        getRowsLayout() {
            return this.surveyData.layout.rows;
        },
        withLabel(fieldData) {
            return false;
        },
        isLabel(fieldData) {
            if (fieldData.type === "label") {
                return true;
            }
            return false;
        },
        isButton(fieldData) {
            if (fieldData.type === "button") {
                return true;
            }
            return false;
        },
        countSurveyResults() {
            var surveyResults = this.$store.state.results.filter(resultItem => {
                return resultItem.surveyId === this.surveyData.id;
            });
            return surveyResults.length;
        },
        generateResultIdentifier() {
            var identifier = this.surveyData.id + "#" + this.countSurveyResults() + "#" + (Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15));
            return identifier;
        },
        createSurveyResultData() {
            // ToDo: create data structure for survey results
            if (this.editMode === false && this.currentSurveyResults.identifier === null) {
                this.currentSurveyResults.surveyId = this.surveyData.id;
                this.currentSurveyResults.identifier = this.generateResultIdentifier();
                this.currentSurveyResults.startTime = Math.round((new Date()).getTime() / 1000);
                //this.currentSurveyResults.
            } else if (this.editMode && this.currentSurveyResults.identifier === null) {
                this.currentSurveyResults = this.resultData;
                this.surveyData.fields.forEach(field => {
                    if (field.type !== "label") {
                        var fieldIndex = this.resultData.results.findIndex(item => item.fieldId === field.id);
                        if (fieldIndex > -1) {
                            this.$set(this.tmpClickCounter, field.id, this.resultData.results[fieldIndex].value);
                        }
                    }
                });
            }
        },
        countTabs(fieldData) {
            var resultFieldIndex = this.currentSurveyResults.results.findIndex(item => item.fieldId === fieldData.id);
            if (resultFieldIndex > -1) {
                if (typeof this.currentSurveyResults.results[resultFieldIndex].value === "undefined" || this.currentSurveyResults.results[resultFieldIndex].value === null) {
                    this.currentSurveyResults.results[resultFieldIndex].value = 0;
                }
                var fieldVals = this.currentSurveyResults.results[resultFieldIndex];
                var newVal = this.currentSurveyResults.results[resultFieldIndex].value + 1;
                fieldVals.value = newVal;
                this.$set(this.currentSurveyResults.results, resultFieldIndex, fieldVals);
                this.$set(this.tmpClickCounter, fieldData.id, this.currentSurveyResults.results[resultFieldIndex].value);
            } else {
                this.createResultField(fieldData);
            }
        },
        fieldAction(fieldData) {
            switch (fieldData.action.type) {
                case "tabCounter":
                    this.countTabs(fieldData);
                    break;
                case "xyz":

                    break;
            }
        },
        getItemVariable(fieldData) {
            if (typeof this.tmpClickCounter[fieldData.formel.reference] === "undefined") {
                return "";
            }
            return this.tmpClickCounter[fieldData.formel.reference];
        },
        getItemText(fieldData) {
            switch (fieldData.textType)  {
                case "simple":
                    return fieldData.text;
                    break;
                case "variable":
                    return this.getItemVariable(fieldData);
                    break;
            }
        },
        createResultField(fieldData) {
            this.currentSurveyResults.results.push({
                "fieldId": fieldData.id,
                "fieldLabel": fieldData.label,
                "value": 0
            });
            this.$set(this.tmpClickCounter, fieldData.id, 0);
        }
    },
    created() {
        this.createSurveyResultData();
    },
    mounted() {
        this.surveyData.fields.forEach(field => {
            var fieldIndex = this.currentSurveyResults.results.findIndex(item => item.fieldId === field.id);
            if (fieldIndex === -1) {
                this.createResultField(field);
            }
        });
    }
}
</script>

<style scoped>
    .item-label {
        text-align: center;
        margin-top: 10;
        font-size: 20;
    }
</style>
