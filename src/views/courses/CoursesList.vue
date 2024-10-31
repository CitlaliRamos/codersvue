<template>
    <h1>Listado de Posts</h1>

    <ul v-if="errors.length > 0">
        <li v-for="error in errors" :key="error.id">{{ error }}</li>
    </ul>
    <br>

    <form @submit.prevent="savePost">
        <div>
            <label for="nombre">Nombre</label><br>
            <input v-model="post.nombre" id="nombre" type="text" placeholder="Ingrese el Nombre del Post">
        </div>
        <br>
        <div>
            <label for="slug">slug</label><br>
            <input v-model="post.slug" id="slug" type="text" placeholder="Ingrese el slug del Post">
        </div>
        <br>
        <div>
            <label for="extracto">Extracto</label><br>
            <textarea v-model="post.extracto" id="extracto" placeholder="Ingrese el extracto del Post"></textarea>
        </div>
        <br>
        <div>
            <label for="cuerpo">Cuerpo</label><br>
            <textarea v-model="post.cuerpo" id="cuerpo" placeholder="Ingrese el cuerpo del Post"></textarea>
        </div>
        <br>
        <div>
            <label for="categoria">Categoria</label><br>
            <select name="" id="categoria" v-model="post.categoria_id">
                <!--<option v-for="categoria in categorias" :key="categoria.id" value="{{ categoria.id }}">{{ categoria.nombre }}</option>-->
                <option value="" selected disabled>Seleccione una categoria</option>
                <option v-for="categoria in categorias" :key="categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
            </select>
        </div>
        <br>
        <button type="submit">Guardar</button>
    </form>

    <ul>
        <li v-for="post in posts" :key="post.id">
            <router-link :to="{name: 'PostDetalls', params: {id: post.id} }">
                {{ post.nombre }}
            </router-link>
            -
            <button @click="deletePost(post.id)">Eliminar</button>
        </li>
    </ul>
</template>
<script>
export default {
    data(){
        return {
            posts: [],
            categorias: [],
            post:{
                nombre: '',
                slug: '',
                extracto: '',
                cuerpo: '',
                categoria_id: ''
            },
            errors: []
        }
    },
    
    created(){
        this.getPosts();
        this.getCategorias();
    },

    methods:{
        getPosts(){
            this.axios.get('http://127.0.0.1:8000/api/posts')
            .then(response =>{
                this.posts = response.data.data;
            })
            .catch(error=>{
                console.log(error);
            })
        },
        getCategorias(){
            this.axios.get('http://127.0.0.1:8000/api/categorias')
            .then(response =>{
                this.categorias = response.data.data;
            })
            .catch(error=>{
                console.log(error);
            }) 
        },
        savePost(){
            this.axios.post('http://127.0.0.1:8000/api/posts',this.post)
            .then(response =>{
                let post =response.data.data;
                this.posts.push(post);
                this.post={
                    nombre: '',
                    slug: '',
                    extracto: '',
                    cuerpo: '',
                    categoria_id: ''
                };
                this.errors=[];
            })
            .catch(error=>{
                this.errors= Object.values(error.response.data.errors).flat();
            }) 
        },
        deletePost(id){
            this.axios.delete('http://127.0.0.1:8000/api/posts/'+id)
            .then(() =>{
                this.posts = this.posts.filter(post => post.id != id)
            })
            .catch(error=>{
                console.log(error);
            }) 
        }

    }
}
</script>
<style>
    
</style>