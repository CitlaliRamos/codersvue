<template>
    <h1>{{post.nombre}}</h1>
    <h2>{{ $route.params.id }}</h2>
    <p>{{ post.extracto }}</p>
    <p>{{ post.cuerpo }}</p>
    <p><b>Catgoria: </b>{{ categoria.nombre }}</p>
    <p><b>Usuario: </b>{{ user.name }}</p>

    <router-link :to="{name:'PostEdit', params: {id: post.id}}">Editar post</router-link>

</template>
<script>
export default {
    data(){
        return {
            post: {},
            categoria: {},
            user: {},
        }
    },
    created(){
        this.getPost();
    },
    methods:{
        getPost(){
            this.axios.get('http://api.codersfree.test/api/posts/'+this.$route.params.id+'?included=categoria,user')
            .then(response =>{
                this.post = response.data.data;
                this.categoria= this.post.categoria;
                this.user= this.post.user;
            })
            .catch(error=>{
                console.log(error);
            })
        },
        
    }
}
</script>
<style>
    
</style>