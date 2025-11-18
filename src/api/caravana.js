import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:3000/api",
    headers:{
        "Content-Type":"application/json"
    }
})

export const getEmpresaDashboard = (empresaId) => {
    // Adiciona o token de autorização ao cabeçalho (necessário para a maioria das rotas protegidas)
    const accessToken = localStorage.getItem('accessToken');
    
    return api.get(`/empresa/${empresaId}/dashboard`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
}

// export const getTodos = ()=>api.get("/getAll");
export const registerAdmin = (payload)=>api.post("/auth/register", payload);
export const login = (payload)=>api.post("/auth/login", payload);
// export const deleteTodo = (id)=>api.delete(`/${id}`);
// export const getOne = (id)=>api.get(`/${id}`);
// export const updateParcial = (id, data)=>api.patch(`/${id}`, data);
// export const updateCompleta = (id, data)=>api.put(`/${id}`, data);
export default api;
