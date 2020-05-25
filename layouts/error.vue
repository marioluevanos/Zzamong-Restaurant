<template>
    <main class='error'>
        <div class='message'>
            <h1>{{error.message}}</h1>
            <p>{{error.statusCode}}</p>
        </div>
    </main>
</template>

<script>
export default {
    name: 'layout-error',
    props: {
        error: Object
    }
}
</script>

<style lang='scss' scoped>

@import '../styles/vars';
@import '../styles/mixins';

main.error {
    background: $color-gold;
    position: relative;
    display: flex;
    padding: vw(240) vw(120);
    align-content: center;
    justify-content: space-evenly;
    flex-direction: column;
    text-align: center;
}

p {
    margin-top: vw(30);
}
</style>