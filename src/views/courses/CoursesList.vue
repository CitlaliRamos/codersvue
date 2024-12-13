<template>
    <h1>Listado de Posts</h1>

    <ul v-if="errors.length > 0">
        <li v-for="error in errors" :key="error.id">{{ error }}</li>
    </ul>
    <br>

    <form @submit.prevent="savePost"  class="mb-4">
        <div class="mb-2">
            <label for="nombre">Nombre</label><br>
            <input v-model="post.nombre" id="nombre" type="text" placeholder="Ingrese el Nombre del Post">
        </div>
        
        <div class="mb-2">
            <label for="slug">slug</label><br>
            <input v-model="post.slug" id="slug" type="text" placeholder="Ingrese el slug del Post">
        </div>
        
        <div class="mb-2">
            <label for="extracto">Extracto</label><br>
            <textarea v-model="post.extracto" id="extracto" placeholder="Ingrese el extracto del Post"></textarea>
        </div>
        
        <div class="mb-2">
            <label for="cuerpo">Cuerpo</label><br>
            <textarea v-model="post.cuerpo" id="cuerpo" placeholder="Ingrese el cuerpo del Post"></textarea>
        </div>
        
        <div class="mb-2">
            <label for="categoria">Categoria</label><br>
            <select name="" id="categoria" v-model="post.categoria_id">
                <!--<option v-for="categoria in categorias" :key="categoria.id" value="{{ categoria.id }}">{{ categoria.nombre }}</option>-->
                <option value="" selected disabled>Seleccione una categoria</option>
                <option v-for="categoria in categorias" :key="'categoria-'+categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
            </select>
        </div>
        
        <button type="submit" class="btn btn-primary btn-sm">Guardar</button>
    </form>

    <ul>
        <li v-for="post in posts" :key="'post-'+post.id" class="mb-2">
            <router-link :to="{name: 'PostDetalls', params: {id: post.id} }">
                {{ post.nombre }}
            </router-link>
            -
            <button @click="deletePost(post.id)" class="btn btn-danger btn-sm">Eliminar</button>
        </li>
    </ul>

    <!--paginacion-->
    <div class="d-flex justify-content-center">
        <nav aria-label="Page navigation example">
        <ul class="pagination">
            <li v-for="pagination_link in pagination_links" 
                :key="'pagination_link-' + pagination_link.label"
                class="page-item"
                :class="{
                    disabled : pagination_link.url==null,
                    active : pagination_link.active,
                }"
                ><a class="page-link" 
                    @click="changePage(pagination_link.url)"
                    v-html="pagination_link.label" style="cursor: pointer" href="#">
                </a></li>
        </ul>
        </nav>
    </div>
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
            pagination_links: [],
            errors: []
        }
    },
    
    created(){
        this.getPosts();
        this.getCategorias();
    },

    computed:{
        page(){
            return this.$route.query.page;
        }
    },

    watch:{
        page(){
            this.getPosts()
        }
    },

    methods:{
        getPosts(){
            this.axios.get('http://api.codersfree.test/api/posts?perPage=10' + '&page=' + this.page)
            .then(response =>{
                let res = response.data;
                this.posts = res.data;
                this.pagination_links = res.meta.links;
            })
            .catch(error=>{
                console.log(error);
            })
        },
        getCategorias(){
            this.axios.get('http://api.codersfree.test/api/categorias')
            .then(response =>{
                this.categorias = response.data.data;
            })
            .catch(error=>{
                console.log(error);
            }) 
        },
        savePost(){
            this.axios.post('http://api.codersfree.test/api/posts',this.post)
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
            this.axios.delete('http://api.codersfree.test/api/posts/'+id)
            .then(() =>{
                this.posts = this.posts.filter(post => post.id != id)
            })
            .catch(error=>{
                console.log(error);
            }) 
        },
        changePage(url){
            this.$router.replace({
                query:{
                    page: url.split('page=')[1]
                }
            })
        }

    }
}
</script>
<style>
    
</style>