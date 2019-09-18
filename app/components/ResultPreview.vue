<template>
    <Page>
        <ActionBar title="EB Surveys">
            <ActionItem @tap="onNavBtnTap"
                ios.systemIcon="4" ios.position="left"
                android.systemIcon="ic_menu_back" android.position="actionBar">
            </ActionItem>
        </ActionBar>
        <StackLayout orientation="vertical" class="main-container" >
            <ListView for="(resultItem, no) in resultData.results" class="list-group" >
                <v-template>
                    <StackLayout>
                        <GridLayout class="item-container" columns="1*, 1*" rows="1*">
                            <Label row="0" col="0" class="result-title" :text="getFieldLabel(resultItem)" />
                            <Label row="0" col="1" class="result-title" :text="resultItem.value" />
                        </GridLayout>
                    </StackLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
export default {
    props: {
        resultData: Object
    },
    data() {
        return {
            
        }
    },
    methods: {
        onNavBtnTap() {
            this.$navigateBack();
        },
        getFieldLabel(resultItem) {
            return resultItem.fieldLabel + ":";
        }
    }
}
</script>

<style scoped>
.item-container {
    padding: 10 14;
}
</style>