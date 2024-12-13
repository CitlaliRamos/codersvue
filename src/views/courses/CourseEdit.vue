<template>
        <h1>Aqui podras editar un curso</h1>
        {{post}}
        <br>
        {{ errors }}
        <form @submit.prevent="updatePost">
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
                <option v-for="categoria in categorias" :key="'categoria-'+categoria.id" :value="categoria.id">{{ categoria.nombre }}</option>
            </select>
        </div>
        <br>
        <button type="submit">Guardar</button>
    </form>
</template>
<script>
export default {
    data(){
        return {
            categorias: [],
            post:{},
            errors: []
        }
    },
    created(){
        this.getCategorias();
        this.getPost();
    },
    methods:{
        getCategorias(){
            this.axios.get('http://api.codersfree.test/api/categorias')
            .then(response =>{
                this.categorias = response.data.data;
            })
            .catch(error=>{
                console.log(error);
            }) 
        },
        getPost(){
            this.axios.get('http://api.codersfree.test/api/posts/'+this.$route.params.id+'?included=categoria')
            .then(response =>{
                this.post = response.data.data;                
            })
            .catch(error=>{
                console.log(error);
            })
        },
        
        updatePost(){
            this.axios.put('http://api.codersfree.test/api/posts/'+this.$route.params.id, this.post)
            .then( () =>{
                this.$router.push({name:'PostDetalls', params:{id:this.$route.params.id}});
            })
            .catch(error=>{
                //console.log(error);
                this.errors= error.response.data.errors;
            }) 
        }
    }
}
</script>
<style lang="">
    
</style>