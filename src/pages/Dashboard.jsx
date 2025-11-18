import React from 'react';
import Layout from '../components/layout/Layout';
import { getEmpresaDashboard } from '../api/caravana.js'; 
import { Truck, Users, CheckCircle2 } from 'lucide-react'; 
// Importe useToast, se necessário, para tratamento de erro

// Função auxiliar para obter o ID da Empresa do localStorage
const getEmpresaId = () => {
    try {
        const funcionarioString = localStorage.getItem('funcionario');
        if (funcionarioString) {
            const funcionario = JSON.parse(funcionarioString);
            return funcionario.empresa?.id || funcionario.empresa?._id; 
        }
        return null;
    } catch (e) {
        return null;
    }
};

const Dashboard = () => {
    // 1. Estados para armazenar os dados
    const [totalFuncionarios, setTotalFuncionarios] = React.useState('...');
    const [loading, setLoading] = React.useState(true);

    React.useEffect(() => {
        const empresaId = getEmpresaId();
        
        if (!empresaId) {
            setTotalFuncionarios('N/A');
            setLoading(false);
            return;
        }

        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const response = await getEmpresaDashboard(empresaId);
                // Acessa o total de funcionários do objeto de resposta
                const total = response.data.estatisticas.funcionarios.total; 
                setTotalFuncionarios(total);

            } catch (error) {
                console.error('Erro ao buscar dashboard:', error);
                setTotalFuncionarios('Erro');
                // Se usar useToast: showToast('Erro ao carregar dados do dashboard.', 'error');
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    return (
        <Layout>
            <div className="p-4">
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Dashboard</h1>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    
                    {/* Card de Veículos (Exemplo) */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Total de Veículos</h2>
                            <p className="text-3xl text-[#FF860B] mt-2">15</p>
                        </div>
                        <Truck size={36} className="text-[#FF860B]/70" />
                    </div>
                    
                    {/* Card de Funcionários (Atualizado) */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Total de Funcionários</h2>
                            {loading ? (
                                // Animação de loading enquanto carrega
                                <div className="mt-2 w-8 h-8 border-4 border-gray-200 border-t-[#002970] rounded-full animate-spin"></div>
                            ) : (
                                // Exibe o valor do estado
                                <p className="text-3xl text-[#002970] mt-2">{totalFuncionarios}</p>
                            )}
                        </div>
                        <Users size={36} className="text-[#002970]/70" />
                    </div>
                    
                    {/* Card de Projetos (Exemplo) */}
                    <div className="bg-white p-6 rounded-lg shadow-md flex items-center justify-between">
                        <div>
                            <h2 className="text-xl font-semibold text-gray-700">Projetos em Andamento</h2>
                            <p className="text-3xl text-green-500 mt-2">5</p>
                        </div>
                        <CheckCircle2 size={36} className="text-green-500/70" />
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Dashboard;