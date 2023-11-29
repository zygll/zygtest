<template>
    <div>
        <button @click="nameData">invoke nameData</button><br>
        <button @click="nameMethod">invoke nameMethod</button><br>
        <button @click="yetAnotherMethod">invoke yetAnotherMethod</button>
    </div>
</template>

<script>
export default {
    data() {
        return {
            nameData: () => {
                console.log("nameData", this.otherMethod()) // doesn't work
            },
            id: 3,
            ids: [1, 2, 3, 4],
            equalsIdData:(i) => {
                return this.id === i;
            },
        }
    },
    methods: {
        nameMethod() {
            console.log("nameMethod", this.otherMethod()); // works
        },
        otherMethod() {
            return "I am other method";
        },
        equalsIdMethod: function (i) {
            return this.id === i;
        },
        yetAnotherMethod: function () {
            console.log('equalsIdMethod:', this.ids.filter(this.equalsIdMethod)); // filters correctly
            console.log('equalsIdData:', this.ids.filter(this.equalsIdData)); // filters incorrectly
        },
    }
}
</script>

<style></style>