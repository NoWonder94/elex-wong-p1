<template>
    <div class="page-container">
        <div class="page-container-inner flex-center">
            <div class="error">
                <div class="flex-center">
                    <i class="icon el-icon-warning"></i>
                    <span class="info">{{ $t('error.403') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {}
</script>


<style scoped>
    .error {
        color: #F56C6C;
    }

    .error {
        position:fixed;
        top:50%;
        left:50%;
        transform:translate(-50%,-50%);
        -webkit-transform:translate(-50%,-50%);
        -moz-transform:translate(-50%,-50%);
        -ms-transform:translate(-50%,-50%);
        -o-transform:translate(-50%,-50%);
    }
    
    .error .icon {
        font-size: 2rem;
    }

    .error .info {
        margin-left: 1rem;
        font-size: 1.6rem;
    }
</style>
