<template>
    <nav>
        <ul>
            <router-link to="/film" tag="li" activeClass="myactive">
            <i class="iconfont icondianying"></i>
            <span>电影</span>
            </router-link>
            <router-link v-if="$store.state.city.id" to="/cinema/clist" tag="li" activeClass="myactive">
            <i class="iconfont iconyingyuan"></i>
            <span>影院</span>
            </router-link>
            <router-link v-else to="/cinema" tag="li" activeClass="myactive">
            <i class="iconfont iconyingyuan"></i>
            <span>影院</span>
            </router-link>
            <router-link to="/center" tag="li" activeClass="myactive">
            <i class="iconfont iconwode"></i>
            <span>我的</span>
            </router-link>
        </ul>
    </nav>
</template>

<style lang="scss" scoped>
    .myactive{
        color: #FF5F16,
    }

    nav{
        position: fixed;
        bottom: 0px;
        left: 0px;
        width: 100%;
        height: 50px;
        background: white;
        border-bottom: solid 1px  #EDEDED;
        ul{
            display: flex;
            li{
                flex: 1;
                text-align: center;
            }
            // i{
            //     display: block;
            //     font-size: 16px;
            // }
            span{
                display: block;
                font-size: 10px;
            }
        }
    }
</style>
