import axios from "axios";
const api = axios.create({
    baseURL:"http://localhost:3000/api",
    headers:{
        "Content-Type":"application/json"
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// ============================================
// AUTENTICAÇÃO
// ============================================

export const login = async (payload) => {
    return await api.post('/auth/login', payload);
};

export const register = async (payload) => {
    return await api.post('/auth/register', payload);
};

// ============================================
// EMPRESA
// ============================================

export const getEmpresaById = async (empresaId) => {
    return await api.get(`/empresa/${empresaId}`);
};

export const updateEmpresa = async (empresaId, data) => {
    return await api.put(`/empresa/${empresaId}`, data);
};

export const getEmpresaDashboard = async (empresaId) => {
    return await api.get(`/empresa/${empresaId}/dashboard`);
};

// ============================================
// VEÍCULOS
// ============================================

// GET - Buscar todos os veículos (com filtro opcional de empresa)
export const getVeiculos = async (empresaId) => {
    return await api.get('/vehicle', {
        params: empresaId ? { empresaId } : {}
    });
};

// GET - Buscar veículo por ID
export const getVeiculoById = async (veiculoId) => {
    return await api.get(`/vehicle/${veiculoId}`);
};

// POST - Criar novo veículo
export const createVeiculo = async (veiculoData) => {
    return await api.post('/vehicle/create', veiculoData);
};

// PUT - Atualizar veículo
export const updateVeiculo = async (veiculoId, veiculoData) => {
    return await api.put(`/vehicle/${veiculoId}`, veiculoData);
};

// DELETE - Excluir veículo
export const deleteVeiculo = async (veiculoId) => {
    return await api.delete(`/vehicle/${veiculoId}`);
};

// POST - Vincular funcionário ao veículo
export const vincularFuncionario = async (carroId, funcionarioId) => {
    return await api.post(`/vehicle/${carroId}/vincular-funcionario`, {
        funcionarioId
    });
};

// POST - Desvincular funcionário do veículo
export const desvincularFuncionario = async (carroId) => {
    return await api.post(`/vehicle/${carroId}/desvincular-funcionario`);
};

// PUT - Atualizar dados OBD
export const atualizarDadosOBD = async (carroId, dadosOBD) => {
    return await api.put(`/vehicle/${carroId}/dados-obd`, dadosOBD);
};

// GET - Histórico OBD
export const getHistoricoOBD = async (carroId, params = {}) => {
    return await api.get(`/vehicle/${carroId}/historico-obd`, { params });
};

// GET - Alertas OBD
export const getAlertasOBD = async (carroId, params = {}) => {
    return await api.get(`/vehicle/${carroId}/alertas`, { params });
};

// ============================================
// FUNCIONÁRIOS
// ============================================

// GET - Buscar todos os funcionários (com filtro opcional de empresa)
export const getFuncionarios = async (empresaId) => {
    return await api.get('/user', {
        params: empresaId ? { empresaId } : {}
    });
};

// GET - Buscar funcionário por ID
export const getFuncionarioById = async (funcionarioId) => {
    return await api.get(`/user/${funcionarioId}`);
};

// POST - Adicionar funcionário (apenas empresa)
export const addFuncionario = async (funcionarioData) => {
    return await api.post('/user/add', funcionarioData);
};

// DELETE - Excluir funcionário
export const deleteFuncionario = async (funcionarioId) => {
    return await api.delete(`/user/${funcionarioId}`);
};

// GET - Meu carro (funcionário)
export const getMeuCarro = async (funcionarioId) => {
    return await api.get(`/user/${funcionarioId}/meu-carro`);
};

export const getEmpresaId = () => {
    try {
        const funcionarioString = localStorage.getItem('funcionario');
        if (funcionarioString) {
            const funcionario = JSON.parse(funcionarioString);
            return funcionario.empresaId; 
        }
        return null;
    } catch{
        return null;
    }
};



// export const getEmpresaDashboard = (empresaId) => {
//     // Adiciona o token de autorização ao cabeçalho (necessário para a maioria das rotas protegidas)
//     const accessToken = localStorage.getItem('accessToken');
    
//     return api.get(`/empresa/${empresaId}/dashboard`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`
//         }
//     });
// }

// export const getTodos = ()=>api.get("/getAll");
export const registerAdmin = (payload)=>api.post("/auth/register", payload);
// export const login = (payload)=>api.post("/auth/login", payload);
// export const deleteTodo = (id)=>api.delete(`/${id}`);
// export const getOne = (id)=>api.get(`/${id}`);
// export const updateParcial = (id, data)=>api.patch(`/${id}`, data);
// export const updateCompleta = (id, data)=>api.put(`/${id}`, data);
export default api;
