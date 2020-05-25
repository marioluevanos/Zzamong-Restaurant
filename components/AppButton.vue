<template>
    <button class='app-button' @click='onButtonClick'>
        <AppIcon type='corner' 
            v-for='corner in ["top", "right", "bottom", "left"]' 
            :class='{[corner]: true}'
            :key='corner'/>
        <div class='inner'>
            <slot/>
        </div>
    </button>
</template>

<script>
import AppIcon from '@/components/AppIcon.vue'
export default {
    name: 'page-home',
    components: {
        AppIcon
    },
    props: {
        onButtonClick: {
            type: Function,
            default() {
                console.log('click')
            }
        }
    }
}
</script>

<style lang='scss'>

@import '../styles/vars';
@import '../styles/mixins';

.app-button {
    position: relative;
    padding: 0;
    background: none;
    border: 2px solid $color-midwhite;
    
    .app-icon {
        width: 24px;
        height: 24px;
        pointer-events: none;
        stroke: $color-midwhite;
        transition: all 0.2s ease-out;
        @include bp(mobile) {
            width: 18px;
            height: 18px;
        }
    }
    .inner {
        background: $color-midwhite;
        padding: vw(12) vw(25);
        margin: vw(11);
        font-weight: 700;
        color: $color-primary;
        @include base-font(large);
        pointer-events: all;
        position: relative;
        z-index: 10;
        transition: all 0.2s ease-in;
        @include bp(tablet) {
            padding: 10px 15px;
            margin: 12px;
        }
        @include bp(mobile) {
            margin: 8px;
        }
    }
    .app-icon.corner.top {
        top: -2px;
        left: -2px;
    }
    .app-icon.corner.right {
        top: -2px;
        right: -2px;
    }
    .app-icon.corner.bottom {
        bottom: -2px;
        right: -2px;
    }
    .app-icon.corner.left {
        bottom: -2px;
        left: -2px;
    }

    &.primary {
        border-color: $color-primary;
        .inner {
            background: $color-primary;
            color: $color-white;
        }
        .app-icon.corner {
            stroke: $color-primary;
        }
    }


    &:hover {
        border-color: darken($color-white, 15%);
        .inner {
            background: darken($color-white, 15%);
            transition: all 0.2s ease-out;
        }
        .app-icon.corner {
            stroke: darken($color-white, 15%);
            transition: all 0.2s ease-out;
        }
    }

    &.primary:hover {
        border-color: saturate($color-primary, 100%);
        .inner {
            background: saturate($color-primary, 100%);
        }
        .app-icon.corner {
            stroke: saturate($color-primary, 100%);
        }
    }
}
</style>
