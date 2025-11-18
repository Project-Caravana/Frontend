import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Truck, Users, CircleUser, LogOut } from 'lucide-react'; 

// Função auxiliar para recuperar dados do usuário do localStorage
const getFuncionario = () => {
    try {
        const funcionario = localStorage.getItem('funcionario');
        // Usamos um placeholder se não houver dados
        return funcionario ? JSON.parse(funcionario) : { nome: 'Usuário', email: 'usuario@app.com' };
    } catch (e) {
        return { nome: 'Usuário', email: 'usuario@app.com' };
    }
};

const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Veículos', href: '/veiculos', icon: Truck },
    { name: 'Funcionários', href: '/funcionarios', icon: Users },
];

const Layout = ({ children }) => {
    const location = useLocation();
    const funcionario = getFuncionario();

    // Função para simular o logout
    const handleLogout = () => {
        localStorage.removeItem('accessToken'); // Remove o token
        localStorage.removeItem('funcionario'); // Remove os dados do usuário
        window.location.href = '/login'; // Redireciona para a página de login
    };

    return (
        <div className="flex h-screen bg-gray-50">
            {/* Sidebar */}
            <div className="flex flex-col w-64 bg-white border-r border-gray-200 shadow-xl">
                
                {/* Logo / Título da Aplicação */}
                <div className="flex items-center justify-center h-16 border-b border-gray-200">
                    <span className="text-xl font-bold text-[#002970]">App Name</span>
                </div>
                
                {/* Seção de Perfil do Usuário */}
                <div className="p-4 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                        {/* Foto de Perfil (Placeholder com ícone Lucide) */}
                        <div className="relative w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-500">
                            {/* Você pode substituir o CircleUser por uma tag <img> com a foto real do usuário */}
                            <CircleUser size={24} />
                        </div>
                        <div>
                            <p className="text-sm font-semibold text-gray-800 truncate">{funcionario.nome}</p>
                            <p className="text-xs text-gray-500 truncate">{funcionario.email || 'Admin'}</p>
                        </div>
                    </div>
                </div>

                {/* Links de Navegação */}
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = location.pathname === item.href;
                        return (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors duration-200 font-medium ${
                                    isActive
                                        ? 'bg-[#002970] text-white shadow-md' // Cor azul usada em Login.jsx
                                        : 'text-gray-600 hover:bg-gray-100 hover:text-[#002970]'
                                }`}
                            >
                                <item.icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                {/* Botão de Sair/Logout (opcional, mas recomendado) */}
                <div className="p-4 border-t border-gray-200">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-500 hover:bg-red-50 hover:text-red-700 transition-colors duration-200 font-medium"
                    >
                        <LogOut size={20} />
                        <span>Sair</span>
                    </button>
                </div>
            </div>

            {/* Conteúdo Principal */}
            <main className="flex-1 overflow-y-auto p-6">
                {children}
            </main>
        </div>
    );
};

export default Layout;