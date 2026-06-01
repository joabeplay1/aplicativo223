let apps = JSON.parse(localStorage.getItem('jr_apps')) || [];
let apiKey = localStorage.getItem('jr_api_key') || '';
let currentEditingId = null;

document.addEventListener('DOMContentLoaded', () => {
    updateDashboard();
    checkApiStatus();
    renderAppList();
});

function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.style.display = 'none');
    document.getElementById(`section-${sectionId}`).style.display = 'block';
    
    document.querySelectorAll('nav li').forEach(li => li.classList.remove('active'));
    const navItem = document.getElementById(`nav-${sectionId}`);
    if (navItem) navItem.classList.add('active');
}

function saveApiKey() {
    const key = document.getElementById('api-key-input').value;
    if (key.length < 10) {
        alert('Por favor, insira uma chave válida.');
        return;
    }
    apiKey = key;
    localStorage.setItem('jr_api_key', key);
    checkApiStatus();
    alert('Chave API configurada com sucesso!');
}

function checkApiStatus() {
    const statusText = document.getElementById('api-status-text');
    if (apiKey) {
        statusText.innerText = 'Conectado';
        statusText.className = 'status-on';
        document.getElementById('api-key-input').value = '********' + apiKey.slice(-4);
    }
}

function generateApp() {
    const prompt = document.getElementById('app-prompt').value;
    if (!prompt) return alert('Descreva sua ideia primeiro.');
    if (!apiKey) return alert('Configure sua API Key antes de começar.');

    document.getElementById('generation-progress').style.display = 'block';
    
    // Simulating AI Processing delay
    setTimeout(() => {
        const newApp = {
            id: Date.now(),
            name: prompt.substring(0, 20) + '...',
            description: prompt,
            color: '#1a237e',
            banner: 'Seja bem-vindo ao seu novo sistema!',
            tech: document.getElementById('app-tech').value,
            version: 1,
            createdAt: new Date().toLocaleDateString()
        };
        
        apps.push(newApp);
        saveApps();
        document.getElementById('generation-progress').style.display = 'none';
        document.getElementById('app-prompt').value = '';
        alert('Aplicativo gerado com sucesso!');
        showSection('my-apps');
        renderAppList();
        updateDashboard();
    }, 2500);
}

function renderAppList() {
    const grid = document.getElementById('apps-grid');
    grid.innerHTML = '';
    
    if (apps.length === 0) {
        grid.innerHTML = '<p>Nenhum aplicativo criado ainda.</p>';
        return;
    }

    apps.forEach(app => {
        const card = document.createElement('div');
        card.className = 'app-card';
        card.innerHTML = `
            <div class="app-card-header">${app.name}</div>
            <div class="app-card-body">
                <p><strong>Criado em:</strong> ${app.createdAt}</p>
                <p><strong>Tech:</strong> ${app.tech}</p>
                <p><strong>Versão:</strong> ${app.version}</p>
            </div>
            <div class="app-card-actions">
                <button onclick="editApp(${app.id})">Editar</button>
                <button onclick="deleteApp(${app.id})" style="color:red">Excluir</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

function editApp(id) {
    const app = apps.find(a => a.id === id);
    if (!app) return;
    
    currentEditingId = id;
    document.getElementById('editing-app-name').innerText = app.name;
    document.getElementById('edit-name').value = app.name;
    document.getElementById('edit-color').value = app.color;
    document.getElementById('edit-banner').value = app.banner;
    
    showSection('editor');
    updatePreviewLive();
}

function updatePreviewLive() {
    const name = document.getElementById('edit-name').value;
    const color = document.getElementById('edit-color').value;
    const banner = document.getElementById('edit-banner').value;
    const preview = document.getElementById('rendered-content');
    
    preview.innerHTML = `
        <div style="background:${color}; color:white; padding:20px; text-align:center">
            <nav style="display:flex; justify-content:space-between; align-items:center">
                <h1 style="font-size:1.2rem">${name}</h1>
                <div><small>Menu ☰</small></div>
            </nav>
        </div>
        <div style="padding:40px; text-align:center">
            <h2 style="margin-bottom:20px">${banner}</h2>
            <button style="background:${color}; color:white; border:none; padding:10px 20px; border-radius:5px">Botão Funcional</button>
            <div style="margin-top:30px; display:grid; grid-template-columns:1fr 1fr; gap:10px">
                <div style="height:100px; background:#f0f0f0; border-radius:10px"></div>
                <div style="height:100px; background:#f0f0f0; border-radius:10px"></div>
            </div>
        </div>
    `;
}

function saveCurrentApp() {
    const index = apps.findIndex(a => a.id === currentEditingId);
    if (index === -1) return;
    
    apps[index].name = document.getElementById('edit-name').value;
    apps[index].color = document.getElementById('edit-color').value;
    apps[index].banner = document.getElementById('edit-banner').value;
    apps[index].version++;
    
    saveApps();
    alert('Aplicativo salvo com sucesso!');
    renderAppList();
}

function deleteApp(id) {
    if (confirm('Tem certeza que deseja excluir este aplicativo? Esta ação não pode ser desfeita.')) {
        apps = apps.filter(a => a.id !== id);
        saveApps();
        renderAppList();
        updateDashboard();
    }
}

function updateDashboard() {
    const statCount = document.getElementById('stat-count');
    if(statCount) statCount.innerText = apps.length;
    
    const list = document.getElementById('activity-list');
    if (list) {
        if (apps.length > 0) {
            list.innerHTML = apps.slice(-3).reverse().map(app => `<li>Projeto "${app.name}" foi atualizado.</li>`).join('');
        } else {
            list.innerHTML = '<li>Comece configurando sua chave API para criar seu primeiro app.</li>';
        }
    }
}

function saveApps() {
    localStorage.setItem('jr_apps', JSON.stringify(apps));
}

function setPreviewSize(size) {
    const frame = document.getElementById('app-preview-frame');
    frame.className = `preview-${size}`;
}

function toggleAssistant() {
    const drawer = document.getElementById('assistant-drawer');
    drawer.classList.toggle('drawer-closed');
    if (!drawer.classList.contains('drawer-closed') && document.getElementById('chat-messages').innerHTML === '') {
        addChatMessage('ai', 'Olá! Eu sou o Jesus Reina AI. Em que posso ajudar na criação do seu aplicativo hoje?');
    }
}

function addChatMessage(type, text) {
    const chat = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `msg msg-${type}`;
    div.innerText = text;
    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight;
}

function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const text = input.value.trim();
    if (!text) return;
    
    addChatMessage('user', text);
    input.value = '';
    
    setTimeout(() => {
        if (text.toLowerCase().includes('exportar')) {
            addChatMessage('ai', 'Para exportar, vá até a aba "Exportar" no menu lateral. Você pode baixar o código em ZIP ou publicar direto no GitHub.');
        } else if (text.toLowerCase().includes('cor')) {
            addChatMessage('ai', 'Entendido! Estou ajustando a paleta de cores para ser mais moderna. Veja a prévia no editor.');
        } else {
            addChatMessage('ai', 'Estou analisando sua solicitação. Posso realizar alterações no código ou adicionar novas páginas ao seu projeto "' + (currentEditingId ? 'atual' : 'Novo App') + '".');
        }
    }, 1000);
}

function askAI(command) {
    toggleAssistant();
    addChatMessage('user', command);
    setTimeout(() => {
        addChatMessage('ai', `Processando comando: "${command}"... Aplicando melhorias via Gemini.`);
        if (command.includes('Login')) {
            document.getElementById('edit-banner').value += ' [Sessão de Login Ativada]';
            updatePreviewLive();
        }
    }, 1200);
}

function exportZip() {
    alert('Gerando pacote de arquivos... O download iniciará em instantes.');
}
