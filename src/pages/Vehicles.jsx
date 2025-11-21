import React, { useState, useEffect } from 'react';
import Layout from '../components/layout/Layout';
import { Plus, Edit, Trash2, Eye, AlertTriangle, Calendar, X, Gauge, Fuel } from 'lucide-react';
import { getVeiculos, deleteVeiculo, createVeiculo, updateVeiculo, getEmpresaId } from '../api/caravana.js';
import { toast } from 'react-toastify';
import { useSocket } from '../hooks/useSocket';

// =======================================================================
// 📌 COMPONENTE EXTRAÍDO: FORMULÁRIO MODAL
// Este componente foi movido para fora do componente principal Vehicles
// para evitar que ele seja recriado (e perca o foco do input) a cada render.
// =======================================================================
const FormModal = ({ 
    showFormModal, 
    handleCloseForm, 
    handleSubmit, 
    handleInputChange, 
    formData, 
    editingVeiculo 
}) => {
    if (!showFormModal) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
                {/* Header do Modal */}
                <div className="bg-gradient-to-r from-[#002970] to-[#FF860B] p-6 text-white sticky top-0">
                    <div className="flex justify-between items-center">
                        <h2 className="text-2xl font-bold">
                            {editingVeiculo ? 'Editar Veículo' : 'Novo Veículo'}
                        </h2>
                        <button
                            onClick={handleCloseForm}
                            className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>
                </div>

                {/* Formulário */}
                <form onSubmit={handleSubmit} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Placa */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Placa <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="placa"
                                value={formData.placa}
                                onChange={handleInputChange}
                                placeholder="ABC-1234"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent uppercase"
                            />
                        </div>

                        {/* Modelo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Modelo <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="modelo"
                                value={formData.modelo}
                                onChange={handleInputChange}
                                placeholder="Onix"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            />
                        </div>

                        {/* Marca */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Marca <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="marca"
                                value={formData.marca}
                                onChange={handleInputChange}
                                placeholder="Chevrolet"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            />
                        </div>

                        {/* Ano */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ano <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="ano"
                                value={formData.ano}
                                onChange={handleInputChange}
                                min="1900"
                                max={new Date().getFullYear() + 1}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            />
                        </div>

                        {/* Tipo de Veículo */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo de Veículo
                            </label>
                            <select
                                name="tipoVeiculo"
                                value={formData.tipoVeiculo}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            >
                                <option value="Passeio">Passeio</option>
                                <option value="Caminhão">Caminhão</option>
                                <option value="Van">Van</option>
                                <option value="SUV">SUV</option>
                                <option value="Pickup">Pickup</option>
                            </select>
                        </div>

                        {/* Tipo de Combustível */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tipo de Combustível
                            </label>
                            <select
                                name="tipoCombustivel"
                                value={formData.tipoCombustivel}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            >
                                <option value="Flex">Flex</option>
                                <option value="Gasolina">Gasolina</option>
                                <option value="Etanol">Etanol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="Elétrico">Elétrico</option>
                                <option value="Híbrido">Híbrido</option>
                                <option value="GNV">GNV</option>
                            </select>
                        </div>

                        {/* Cor */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Cor
                            </label>
                            <input
                                type="text"
                                name="cor"
                                value={formData.cor}
                                onChange={handleInputChange}
                                placeholder="Preto"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            />
                        </div>

                        {/* Chassi */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Chassi
                            </label>
                            <input
                                type="text"
                                name="chassi"
                                value={formData.chassi}
                                onChange={handleInputChange}
                                placeholder="234561231"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            />
                        </div>

                        {/* KM Total */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                KM Total
                            </label>
                            <input
                                type="number"
                                name="kmTotal"
                                value={formData.kmTotal}
                                onChange={handleInputChange}
                                min="0"
                                placeholder="125500"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            />
                        </div>

                        {/* Próxima Manutenção */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Próxima Manutenção
                            </label>
                            <input
                                type="date"
                                name="proxManutencao"
                                value={formData.proxManutencao}
                                onChange={handleInputChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF860B] focus:border-transparent"
                            />
                        </div>
                    </div>

                    {/* Botões */}
                    <div className="flex gap-4 mt-6">
                        <button
                            type="button"
                            onClick={handleCloseForm}
                            className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="flex-1 px-6 py-3 bg-[#FF860B] text-white rounded-lg hover:bg-orange-600 transition-colors font-medium shadow-lg hover:shadow-xl"
                        >
                            {editingVeiculo ? 'Atualizar' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

// =======================================================================
// 📌 COMPONENTE PRINCIPAL: Vehicles
// =======================================================================
const Vehicles = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showFormModal, setShowFormModal] = useState(false);
    const [selectedVeiculo, setSelectedVeiculo] = useState(null);
    const [editingVeiculo, setEditingVeiculo] = useState(null);
    const [formData, setFormData] = useState({
        placa: '',
        modelo: '',
        marca: '',
        ano: new Date().getFullYear(),
        tipoVeiculo: 'Passeio',
        tipoCombustivel: 'Flex',
        cor: '',
        chassi: '',
        kmTotal: 0,
        proxManutencao: ''
    });

    const { socket, isConnected } = useSocket();

    // Data atual
    const dataHoje = new Date().toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    useEffect(() => {
        fetchVeiculos();
    }, []);

    useEffect(() => {
        if (!socket || !isConnected) return;

        // Inscreve em todos os carros da lista
        veiculos.carros?.forEach(veiculo => {
            socket.emit('subscribe', veiculo._id);
        });

        // Listener para atualizações OBD
        socket.on('obd:atualizado', (data) => {
            console.log('📡 Dados OBD recebidos:', data);
            
            // Atualiza o estado local dos veículos
            setVeiculos(prevVeiculos => ({
                ...prevVeiculos,
                carros: prevVeiculos.carros?.map(veiculo => 
                    veiculo._id === data.carroId 
                        ? { 
                            ...veiculo, 
                            dadosOBD: data.dadosOBD,
                            kmTotal: data.kmTotal 
                          }
                        : veiculo
                ) || []
            }));

            // Notificação toast opcional
            // toast.info(`Dados OBD atualizados para ${data.carroId}`);
        });

        return () => {
            socket.off('obd:atualizado');
        };
    }, [socket, isConnected, veiculos.carros]);

    const fetchVeiculos = async () => {
        setLoading(true);
        try {
            const empresaId = getEmpresaId();
            const response = await getVeiculos(empresaId);
            setVeiculos(response.data || []);
        } catch (error) {
            console.error('Erro ao buscar veículos:', error);
            toast.error('Erro ao carregar veículos');
        } finally {
            setLoading(false);
        }
    };

    const calcularConsumoMedio = (veiculo) => {
        if (!veiculo.dadosOBD?.consumoInstantaneo) {
            return 'N/A';
        }
        return `${veiculo.dadosOBD.consumoInstantaneo.toFixed(1)} km/L`;
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este veículo?')) return;
        
        try {
            await deleteVeiculo(id);
            toast.success('Veículo excluído com sucesso!');
            fetchVeiculos();
        } catch (error) {
            console.error('Erro ao excluir veículo:', error);
            toast.error(error.response?.data?.message || 'Erro ao excluir veículo');
        }
    };

    const handleOpenForm = (veiculo = null) => {
        if (veiculo) {
            // Modo edição
            setEditingVeiculo(veiculo);
            setFormData({
                placa: veiculo.placa || '',
                modelo: veiculo.modelo || '',
                marca: veiculo.marca || '',
                ano: veiculo.ano || new Date().getFullYear(),
                tipoVeiculo: veiculo.tipoVeiculo || 'Passeio',
                tipoCombustivel: veiculo.tipoCombustivel || 'Flex',
                cor: veiculo.cor || '',
                chassi: veiculo.chassi || '',
                kmTotal: veiculo.kmTotal || 0,
                // Garantir o formato YYYY-MM-DD para o input 'date'
                proxManutencao: veiculo.proxManutencao ? new Date(veiculo.proxManutencao).toISOString().split('T')[0] : ''
            });
        } else {
            // Modo criação
            setEditingVeiculo(null);
            setFormData({
                placa: '',
                modelo: '',
                marca: '',
                ano: new Date().getFullYear(),
                tipoVeiculo: 'Passeio',
                tipoCombustivel: 'Flex',
                cor: '',
                chassi: '',
                kmTotal: 0,
                proxManutencao: ''
            });
        }
        setShowFormModal(true);
    };

    const handleCloseForm = () => {
        setShowFormModal(false);
        setEditingVeiculo(null);
        setFormData({
            placa: '',
            modelo: '',
            marca: '',
            ano: new Date().getFullYear(),
            tipoVeiculo: 'Passeio',
            tipoCombustivel: 'Flex',
            cor: '',
            chassi: '',
            kmTotal: 0,
            proxManutencao: ''
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const payload = {
                ...formData,
                ano: parseInt(formData.ano),
                kmTotal: parseFloat(formData.kmTotal)
            };

            if (editingVeiculo) {
                await updateVeiculo(editingVeiculo._id, payload);
                toast.success('Veículo atualizado com sucesso!');
            } else {
                const empresaId = getEmpresaId();
                await createVeiculo({ ...payload, empresa: empresaId });
                toast.success('Veículo cadastrado com sucesso!');
            }
            
            handleCloseForm();
            fetchVeiculos();
        } catch (error) {
            console.error('Erro ao salvar veículo:', error);
            const message = error.response?.data?.message || error.response?.data?.erros?.[0] || 'Erro ao salvar veículo';
            toast.error(message);
        }
    };

    const handleViewDetails = (veiculo) => {
        setSelectedVeiculo(veiculo);
        setShowModal(true);
    };

    // Função para determinar cor do status
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case 'ativo':
                return 'bg-green-500';
            case 'manutencao':
            case 'manutenção':
                return 'bg-yellow-500';
            case 'inativo':
                return 'bg-red-500';
            default:
                return 'bg-gray-500';
        }
    };

    const StatusIndicator = ({ status }) => (
        <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getStatusColor(status)}`}></div>
            <span className="text-sm font-medium capitalize">{status || 'N/A'}</span>
        </div>
    );

    // Card do veículo
    const VehicleCard = ({ veiculo }) => (
        <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden">
            {/* Header do Card */}
            <div className="bg-gradient-to-r from-[#002970] to-[#FF860B] p-4 text-white">
                <div className="flex justify-between items-start">
                    <div>
                        <h3 className="text-xl font-bold">{veiculo.modelo || 'Modelo N/A'}</h3>
                        <p className="text-sm opacity-90">{veiculo.placa || 'Placa N/A'}</p>
                    </div>
                    <StatusIndicator status={veiculo.status} />
                </div>
            </div>

            {/* Informações do Veículo */}
            <div className="p-4 space-y-3">
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                        <p className="text-gray-500">Marca</p>
                        <p className="font-semibold">{veiculo.marca || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Ano</p>
                        <p className="font-semibold">{veiculo.ano || 'N/A'}</p>
                    </div>
                    <div>
                        <p className="text-gray-500">Cor</p>
                        <p className="font-semibold">{veiculo.cor || 'N/A'}</p>
                    </div>
                    {/* ✅ KM Total em Tempo Real */}
                    <div>
                        <p className="text-gray-500 flex items-center gap-1">
                            <Gauge size={14} /> KM Total
                        </p>
                        <p className="font-semibold text-blue-600">
                            {veiculo.kmTotal?.toLocaleString('pt-BR') || '0'} km
                        </p>
                    </div>
                </div>

                {/* ✅ Dados OBD em Tempo Real */}
                {veiculo.dadosOBD && (
                    <div className="bg-gradient-to-r from-blue-50 to-green-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-xs text-gray-600 mb-2 font-medium">📡 Dados em Tempo Real</p>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                            <div>
                                <p className="text-gray-600 text-xs flex items-center gap-1">
                                    <Fuel size={12} /> Consumo Médio
                                </p>
                                <p className="font-bold text-green-700">
                                    {calcularConsumoMedio(veiculo)}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-xs">Velocidade</p>
                                <p className="font-bold text-blue-700">
                                    {veiculo.dadosOBD.velocidade || 0} km/h
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-xs">Temperatura</p>
                                <p className="font-bold text-orange-600">
                                    {veiculo.dadosOBD.temperatura?.toFixed(1) || 0}°C
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 text-xs">Combustível</p>
                                <p className="font-bold text-purple-600">
                                    {veiculo.dadosOBD.nivelCombustivel || 0}%
                                </p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                            Atualizado: {veiculo.dadosOBD.ultimaAtualizacao 
                                ? new Date(veiculo.dadosOBD.ultimaAtualizacao).toLocaleTimeString('pt-BR')
                                : 'N/A'}
                        </p>
                    </div>
                )}

                {/* Alertas */}
                {veiculo.alertas > 0 && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-2 rounded">
                        <AlertTriangle size={16} />
                        <span className="text-sm font-medium">{veiculo.alertas} alerta(s)</span>
                    </div>
                )}

                {/* Próxima Revisão */}
                {veiculo.proximaRevisao && (
                    <div className="flex items-center gap-2 text-blue-600 bg-blue-50 p-2 rounded">
                        <Calendar size={16} />
                        <span className="text-sm">Revisão: {new Date(veiculo.proximaRevisao).toLocaleDateString('pt-BR')}</span>
                    </div>
                )}
            </div>

            {/* Ações */}
            <div className="border-t border-gray-100 p-4 flex gap-2">
                <button
                    onClick={() => handleViewDetails(veiculo)}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <Eye size={16} />
                    Detalhes
                </button>
                <button
                    onClick={() => handleOpenForm(veiculo)}
                    className="flex items-center justify-center px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                    <Edit size={16} />
                </button>
                <button
                    onClick={() => handleDelete(veiculo._id)}
                    className="flex items-center justify-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                    <Trash2 size={16} />
                </button>
            </div>
        </div>
    );

    // Modal de Detalhes
    const DetailsModal = () => {
        if (!showModal || !selectedVeiculo) return null;

        return (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header do Modal */}
                    <div className="bg-gradient-to-r from-[#002970] to-[#FF860B] p-6 text-white">
                        <div className="flex justify-between items-start">
                            <div>
                                <h2 className="text-2xl font-bold">{selectedVeiculo.modelo}</h2>
                                <p className="text-lg opacity-90">{selectedVeiculo.placa}</p>
                            </div>
                            <button
                                onClick={() => setShowModal(false)}
                                className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded"
                            >
                                ✕
                            </button>
                        </div>
                    </div>

                    {/* Conteúdo do Modal */}
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Marca</p>
                                <p className="text-lg font-semibold">{selectedVeiculo.marca || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Modelo</p>
                                <p className="text-lg font-semibold">{selectedVeiculo.modelo || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Ano</p>
                                <p className="text-lg font-semibold">{selectedVeiculo.ano || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Cor</p>
                                <p className="text-lg font-semibold">{selectedVeiculo.cor || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Placa</p>
                                <p className="text-lg font-semibold">{selectedVeiculo.placa || 'N/A'}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Status</p>
                                <StatusIndicator status={selectedVeiculo.status} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">KM Atual</p>
                                <p className="text-lg font-semibold">{selectedVeiculo.kmAtual?.toLocaleString('pt-BR') || '0'} km</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Consumo Médio</p>
                                <p className="text-lg font-semibold">{selectedVeiculo.consumoMedio || 'N/A'} km/L</p>
                            </div>
                        </div>

                        {selectedVeiculo.observacoes && (
                            <div>
                                <p className="text-sm text-gray-500 mb-2">Observações</p>
                                <p className="text-gray-700 bg-gray-50 p-3 rounded">{selectedVeiculo.observacoes}</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <Layout>
            <div className="space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Lista de Veículos</h1>
                        <p className="text-sm text-gray-600 capitalize mt-1">{dataHoje}</p>
                        {/* ✅ Indicador de Conexão Socket */}
                        <div className="flex items-center gap-2 mt-1">
                            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <span className="text-xs text-gray-500">
                                {isConnected ? 'Tempo real ativo' : 'Reconectando...'}
                            </span>
                        </div>
                    </div>
                    <button
                        onClick={() => handleOpenForm()}
                        className="flex items-center gap-2 px-6 py-3 bg-[#FF860B] text-white rounded-lg hover:bg-orange-600 transition-colors shadow-lg hover:shadow-xl"
                    >
                        <Plus size={20} />
                        Novo Veículo
                    </button>
                </div>

                {/* Indicadores de Status */}
                <div className="flex gap-4 items-center bg-white p-4 rounded-lg shadow-md">
                    <span className="text-sm font-medium text-gray-600">Status:</span>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-green-500"></div>
                        <span className="text-sm">Ativo</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-yellow-500"></div>
                        <span className="text-sm">Manutenção</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-4 h-4 rounded-full bg-red-500"></div>
                        <span className="text-sm">Inativo</span>
                    </div>
                </div>

                {/* Grid de Veículos */}
                {loading ? (
                    <div className="flex items-center justify-center h-64">
                        <div className="w-12 h-12 border-4 border-gray-200 border-t-[#FF860B] rounded-full animate-spin"></div>
                    </div>
                ) : veiculos.carros.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {veiculos.carros.map((veiculo) => (
                            <VehicleCard key={veiculo._id} veiculo={veiculo} />
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-12 text-center">
                        <div className="text-gray-400 mb-4">
                            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-gray-700 mb-2">Nenhum veículo cadastrado</h3>
                        <p className="text-gray-500 mb-6">Comece adicionando o primeiro veículo da frota</p>
                        <button
                            onClick={() => handleOpenForm()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#FF860B] text-white rounded-lg hover:bg-orange-600 transition-colors"
                        >
                            <Plus size={20} />
                            Adicionar Veículo
                        </button>
                    </div>
                )}
            </div>

            {/* Modal de Detalhes */}
            <DetailsModal />

            {/* Modal de Formulário, passando as funções e estados como props */}
            <FormModal 
                showFormModal={showFormModal}
                handleCloseForm={handleCloseForm}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                formData={formData}
                editingVeiculo={editingVeiculo}
            />
        </Layout>
    );
};

export default Vehicles;