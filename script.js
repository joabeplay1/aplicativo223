document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentAreas = document.querySelectorAll('.content-area > div');
    const bluetoothStatus = document.getElementById('bluetooth-status');
    const connectButton = document.getElementById('connect-bluetooth');
    const modeCards = document.querySelectorAll('.mode-card');
    const controllerDisplay = document.querySelector('.controller-display .controller-layout');
    const actionLog = document.getElementById('action-log'); // Elemento visual de ações

    // Função para atualizar o log na tela
    function logAction(message) {
        actionLog.innerHTML = `<i class="fas fa-satellite-dish"></i> Comando: <strong>${message}</strong>`;
        actionLog.style.color = 'var(--neon-green)';
        actionLog.style.textShadow = 'var(--glow-intensity-green)';
        
        // Retorna para o estado normal após 500ms
        clearTimeout(window.logTimeout);
        window.logTimeout = setTimeout(() => {
            actionLog.innerHTML = 'Aguardando comando...';
            actionLog.style.color = 'var(--neon-blue)';
            actionLog.style.textShadow = 'var(--glow-intensity)';
        }, 1000);
    }

    // Navigation
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            navItems.forEach(nav => nav.classList.remove('active'));
            item.classList.add('active');

            contentAreas.forEach(content => content.classList.remove('active'));
            const targetId = item.dataset.target;
            document.getElementById(targetId).classList.add('active');
        });
    });

    // Bluetooth Connection Simulation
    let isConnected = false;
    connectButton.addEventListener('click', () => {
        if (!isConnected) {
            bluetoothStatus.classList.remove('disconnected');
            bluetoothStatus.innerHTML = '<i class="fab fa-bluetooth-b"></i> Bluetooth: Conectado';
            connectButton.textContent = 'Desconectar Bluetooth';
            connectButton.style.backgroundColor = 'var(--neon-green)';
            connectButton.style.boxShadow = 'var(--glow-intensity-green)';
            isConnected = true;
            if (navigator.vibrate) {
                navigator.vibrate(200);
            }
            logAction('Bluetooth Conectado!');
        } else {
            bluetoothStatus.classList.add('disconnected');
            bluetoothStatus.innerHTML = '<i class="fab fa-bluetooth-b"></i> Bluetooth: Desconectado';
            connectButton.textContent = 'Conectar Bluetooth';
            connectButton.style.backgroundColor = 'var(--neon-blue)';
            connectButton.style.boxShadow = 'var(--glow-intensity)';
            isConnected = false;
            logAction('Bluetooth Desconectado!');
        }
    });

    // Controller Layouts (Constantes de layouts mantidos)
    const controllerLayouts = {
        ps5: `
            <div class="controller-side">
                <div class="trigger" data-button="L2">L2</div>
                <div class="shoulder-button" data-button="L1">L1</div>
                <div class="dpad">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP">▲</div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN">▼</div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT">◀</div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT">▶</div>
                    <div class="dpad-button dpad-center"></div>
                </div>
                <div class="analog-stick" id="left-stick" data-stick="LS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
            <div class="controller-center">
                <div class="ps-logo-button" data-button="PS_HOME"><i class="fab fa-playstation"></i></div>
                <div class="btn-control" data-button="SHARE">SHARE</div>
                <div class="btn-control" data-button="OPTIONS">OPTIONS</div>
            </div>
            <div class="controller-side">
                <div class="trigger" data-button="R2">R2</div>
                <div class="shoulder-button" data-button="R1">R1</div>
                <div class="ps-button triangle" data-button="TRIANGLE">▲</div>
                <div class="ps-button circle" data-button="CIRCLE">●</div>
                <div class="ps-button cross" data-button="CROSS">✕</div>
                <div class="ps-button square" data-button="SQUARE">■</div>
                <div class="analog-stick" id="right-stick" data-stick="RS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
        `,
        xbox: `
            <div class="controller-side">
                <div class="trigger" data-button="LT">LT</div>
                <div class="shoulder-button" data-button="LB">LB</div>
                <div class="dpad">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP">▲</div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN">▼</div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT">◀</div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT">▶</div>
                    <div class="dpad-button dpad-center"></div>
                </div>
                <div class="analog-stick" id="left-stick" data-stick="LS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
            <div class="controller-center">
                <div class="xbox-logo-button" data-button="XBOX_HOME"><i class="fab fa-xbox"></i></div>
                <div class="btn-control" data-button="VIEW">VIEW</div>
                <div class="btn-control" data-button="MENU">MENU</div>
            </div>
            <div class="controller-side">
                <div class="trigger" data-button="RT">RT</div>
                <div class="shoulder-button" data-button="RB">RB</div>
                <div class="xbox-button y" data-button="Y">Y</div>
                <div class="xbox-button b" data-button="B">B</div>
                <div class="xbox-button a" data-button="A">A</div>
                <div class="xbox-button x" data-button="X">X</div>
                <div class="analog-stick" id="right-stick" data-stick="RS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
        `,
        ps4: `
            <div class="controller-side">
                <div class="trigger" data-button="L2">L2</div>
                <div class="shoulder-button" data-button="L1">L1</div>
                <div class="dpad">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP">▲</div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN">▼</div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT">◀</div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT">▶</div>
                    <div class="dpad-button dpad-center"></div>
                </div>
                <div class="analog-stick" id="left-stick" data-stick="LS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
            <div class="controller-center">
                <div class="ps-logo-button" data-button="PS_HOME"><i class="fab fa-playstation"></i></div>
                <div class="btn-control" data-button="SHARE">SHARE</div>
                <div class="btn-control" data-button="OPTIONS">OPTIONS</div>
            </div>
            <div class="controller-side">
                <div class="trigger" data-button="R2">R2</div>
                <div class="shoulder-button" data-button="R1">R1</div>
                <div class="ps-button triangle" data-button="TRIANGLE">▲</div>
                <div class="ps-button circle" data-button="CIRCLE">●</div>
                <div class="ps-button cross" data-button="CROSS">✕</div>
                <div class="ps-button square" data-button="SQUARE">■</div>
                <div class="analog-stick" id="right-stick" data-stick="RS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
        `,
        ps3: `
            <div class="controller-side">
                <div class="trigger" data-button="L2">L2</div>
                <div class="shoulder-button" data-button="L1">L1</div>
                <div class="dpad">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP">▲</div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN">▼</div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT">◀</div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT">▶</div>
                    <div class="dpad-button dpad-center"></div>
                </div>
                <div class="analog-stick" id="left-stick" data-stick="LS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
            <div class="controller-center">
                <div class="ps-logo-button" data-button="PS_HOME"><i class="fab fa-playstation"></i></div>
                <div class="btn-control" data-button="SELECT">SELECT</div>
                <div class="btn-control" data-button="START">START</div>
            </div>
            <div class="controller-side">
                <div class="trigger" data-button="R2">R2</div>
                <div class="shoulder-button" data-button="R1">R1</div>
                <div class="ps-button triangle" data-button="TRIANGLE">▲</div>
                <div class="ps-button circle" data-button="CIRCLE">●</div>
                <div class="ps-button cross" data-button="CROSS">✕</div>
                <div class="ps-button square" data-button="SQUARE">■</div>
                <div class="analog-stick" id="right-stick" data-stick="RS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
        `,
        ps2: `
            <div class="controller-side">
                <div class="shoulder-button" data-button="L2">L2</div>
                <div class="shoulder-button" data-button="L1">L1</div>
                <div class="dpad">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP">▲</div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN">▼</div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT">◀</div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT">▶</div>
                    <div class="dpad-button dpad-center"></div>
                </div>
                <div class="analog-stick" id="left-stick" data-stick="LS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
            <div class="controller-center">
                <div class="btn-control" data-button="ANALOG">ANALOG</div>
                <div class="btn-control" data-button="SELECT">SELECT</div>
                <div class="btn-control" data-button="START">START</div>
            </div>
            <div class="controller-side">
                <div class="shoulder-button" data-button="R2">R2</div>
                <div class="shoulder-button" data-button="R1">R1</div>
                <div class="ps-button triangle" data-button="TRIANGLE">▲</div>
                <div class="ps-button circle" data-button="CIRCLE">●</div>
                <div class="ps-button cross" data-button="CROSS">✕</div>
                <div class="ps-button square" data-button="SQUARE">■</div>
                <div class="analog-stick" id="right-stick" data-stick="RS">
                    <div class="analog-thumb"></div>
                </div>
            </div>
        `,
        retro: `
            <div class="controller-side" style="gap: 25px;">
                <div class="dpad" style="width: 100px; height: 100px; border-radius: 50%;">
                    <div class="dpad-button dpad-up" data-button="UP" style="top: 0; left: 35px; width: 30px; height: 30px; border-radius: 5px 5px 0 0;"></div>
                    <div class="dpad-button dpad-down" data-button="DOWN" style="bottom: 0; left: 35px; width: 30px; height: 30px; border-radius: 0 0 5px 5px;"></div>
                    <div class="dpad-button dpad-left" data-button="LEFT" style="left: 0; top: 35px; width: 30px; height: 30px; border-radius: 5px 0 0 5px;"></div>
                    <div class="dpad-button dpad-right" data-button="RIGHT" style="right: 0; top: 35px; width: 30px; height: 30px; border-radius: 0 5px 5px 0;"></div>
                    <div class="dpad-button dpad-center" style="top: 35px; left: 35px; width: 30px; height: 30px; border-radius: 0;"></div>
                </div>
                <div class="btn-control" data-button="SELECT" style="width: 70px; border-radius: 10px;">SELECT</div>
            </div>
            <div class="controller-center" style="flex-direction: row; gap: 30px;">
                <div class="btn-control" data-button="START" style="width: 70px; border-radius: 10px;">START</div>
            </div>
            <div class="controller-side" style="gap: 25px;">
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px;">
                    <div class="btn-control" data-button="Y" style="background-color: #00ff00; border-color: #00cc00;">Y</div>
                    <div class="btn-control" data-button="X" style="background-color: #0000ff; border-color: #0000cc;">X</div>
                    <div class="btn-control" data-button="B" style="background-color: #ff0000; border-color: #cc0000;">B</div>
                    <div class="btn-control" data-button="A" style="background-color: #ffcc00; border-color: #cc9900;">A</div>
                </div>
                <div class="shoulder-button" data-button="R" style="width: 100px;">R</div>
            </div>
        `,
        arcade: `
            <div class="controller-side" style="gap: 25px;">
                <div class="analog-stick" id="left-stick" data-stick="ARCADE_STICK" style="width: 120px; height: 120px; border-radius: 10px; background-color: var(--bg-dark);">
                    <div class="analog-thumb" style="width: 80px; height: 80px; border-radius: 10px; background-color: var(--neon-red); border-color: var(--neon-red); box-shadow: var(--glow-intensity-red);"></div>
                </div>
            </div>
            <div class="controller-center" style="flex-direction: row; gap: 30px;">
                <div class="btn-control" data-button="COIN" style="width: 70px; border-radius: 10px;">COIN</div>
                <div class="btn-control" data-button="START" style="width: 70px; border-radius: 10px;">START</div>
            </div>
            <div class="controller-side" style="gap: 25px;">
                <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 15px;">
                    <div class="btn-control" data-button="P1" style="background-color: #ff0055; border-color: #cc0044;">P1</div>
                    <div class="btn-control" data-button="P2" style="background-color: #00f0ff; border-color: #00c0cc;">P2</div>
                    <div class="btn-control" data-button="P3" style="background-color: #00ff00; border-color: #00cc00;">P3</div>
                    <div class="btn-control" data-button="K1" style="background-color: #a020f0; border-color: #8010c0;">K1</div>
                    <div class="btn-control" data-button="K2" style="background-color: #ffcc00; border-color: #cc9900;">K2</div>
                    <div class="btn-control" data-button="K3" style="background-color: #ff0055; border-color: #cc0044;">K3</div>
                </div>
            </div>
        `,
        volante: `
            <div class="controller-side" style="gap: 15px;">
                <div class="trigger" data-button="ACCEL">ACCEL</div>
                <div class="shoulder-button" data-button="BRAKE">BRAKE</div>
                <div class="dpad" style="width: 80px; height: 80px; border-radius: 50%;">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP" style="top: 0; left: 25px; width: 30px; height: 30px; border-radius: 5px 5px 0 0;"></div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN" style="bottom: 0; left: 25px; width: 30px; height: 30px; border-radius: 0 0 5px 5px;"></div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT" style="left: 0; top: 25px; width: 30px; height: 30px; border-radius: 5px 0 0 5px;"></div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT" style="right: 0; top: 25px; width: 30px; height: 30px; border-radius: 0 5px 5px 0;"></div>
                    <div class="dpad-button dpad-center" style="top: 25px; left: 25px; width: 30px; height: 30px; border-radius: 0;"></div>
                </div>
            </div>
            <div class="controller-center" style="flex-direction: column; gap: 20px;">
                <div class="analog-stick" id="steering-wheel" data-stick="VOLANTE" style="width: 180px; height: 180px; border-radius: 50%; background-color: var(--bg-dark); border: 4px solid var(--neon-blue);">
                    <div class="analog-thumb" style="width: 80px; height: 80px; border-radius: 50%; background-color: var(--bg-light); border: 2px solid var(--neon-blue);"></div>
                </div>
                <div class="btn-control" data-button="HORN" style="width: 80px; height: 40px; border-radius: 10px;">HORN</div>
            </div>
            <div class="controller-side" style="gap: 15px;">
                <div class="trigger" data-button="GEAR_UP">GEAR+</div>
                <div class="shoulder-button" data-button="GEAR_DOWN">GEAR-</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <div class="btn-control" data-button="VIEW_CAM">CAM</div>
                    <div class="btn-control" data-button="MAP">MAP</div>
                    <div class="btn-control" data-button="PAUSE">PAUSE</div>
                    <div class="btn-control" data-button="RESET">RESET</div>
                </div>
            </div>
        `,
        fps: `
            <div class="controller-side" style="gap: 15px;">
                <div class="trigger" data-button="AIM">AIM</div>
                <div class="shoulder-button" data-button="GRENADE">GRENADE</div>
                <div class="dpad">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP">▲</div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN">▼</div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT">◀</div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT">▶</div>
                    <div class="dpad-button dpad-center"></div>
                </div>
                <div class="analog-stick" id="left-stick" data-stick="MOVE">
                    <div class="analog-thumb"></div>
                </div>
            </div>
            <div class="controller-center">
                <div class="btn-control" data-button="MAP">MAP</div>
                <div class="btn-control" data-button="SCORE">SCORE</div>
            </div>
            <div class="controller-side" style="gap: 15px;">
                <div class="trigger" data-button="SHOOT">SHOOT</div>
                <div class="shoulder-button" data-button="RELOAD">RELOAD</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <div class="btn-control" data-button="JUMP">JUMP</div>
                    <div class="btn-control" data-button="CROUCH">CROUCH</div>
                    <div class="btn-control" data-button="MELEE">MELEE</div>
                    <div class="btn-control" data-button="SPRINT">SPRINT</div>
                </div>
                <div class="analog-stick" id="right-stick" data-stick="CAMERA">
                    <div class="analog-thumb"></div>
                </div>
            </div>
        `,
        corrida: `
            <div class="controller-side" style="gap: 15px;">
                <div class="trigger" data-button="ACCEL">ACCEL</div>
                <div class="shoulder-button" data-button="BRAKE">BRAKE</div>
                <div class="dpad">
                    <div class="dpad-button dpad-up" data-button="DPAD_UP">▲</div>
                    <div class="dpad-button dpad-down" data-button="DPAD_DOWN">▼</div>
                    <div class="dpad-button dpad-left" data-button="DPAD_LEFT">◀</div>
                    <div class="dpad-button dpad-right" data-button="DPAD_RIGHT">▶</div>
                    <div class="dpad-button dpad-center"></div>
                </div>
                <div class="analog-stick" id="left-stick" data-stick="DIREÇÃO">
                    <div class="analog-thumb"></div>
                </div>
            </div>
            <div class="controller-center">
                <div class="btn-control" data-button="HORN">HORN</div>
                <div class="btn-control" data-button="NITRO">NITRO</div>
            </div>
            <div class="controller-side" style="gap: 15px;">
                <div class="trigger" data-button="HANDBRAKE">HANDBRAKE</div>
                <div class="shoulder-button" data-button="REVERSE">REVERSE</div>
                <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 10px;">
                    <div class="btn-control" data-button="CAM">CAM</div>
                    <div class="btn-control" data-button="MAP">MAP</div>
                    <div class="btn-control" data-button="PAUSE">PAUSE</div>
                    <div class="btn-control" data-button="RESET">RESET</div>
                </div>
                <div class="analog-stick" id="right-stick" data-stick="CAMERA">
                    <div class="analog-thumb"></div>
                </div>
            </div>
        `
    };

    modeCards.forEach(card => {
        card.addEventListener('click', () => {
            modeCards.forEach(mc => mc.classList.remove('active'));
            card.classList.add('active');
            const mode = card.dataset.mode;
            controllerDisplay.innerHTML = controllerLayouts[mode] || '<p style="color: var(--text-medium); font-size: 1.2em; text-align: center;">Layout não disponível para este modo.</p>';
            controllerDisplay.dataset.mode = mode.toUpperCase();
            setupControllerInteractions();
            logAction(`Modo ${mode.toUpperCase()} carregado!`);
        });
    });

    function setupControllerInteractions() {
        // Mapeia todos os botões clicáveis
        const buttons = controllerDisplay.querySelectorAll('.btn-control, .dpad-button, .trigger, .shoulder-button, .ps-button, .xbox-button, .ps-logo-button, .xbox-logo-button');
        
        buttons.forEach(button => {
            // Previne falhas se o elemento de centro do dpad for clicado sem data-button
            if (!button.dataset.button) return;

            button.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                button.classList.add('active');
                if (navigator.vibrate) {
                    navigator.vibrate(50); // Vibração ao tocar
                }
                
                // Registra visualmente no App 
                const btnName = button.dataset.button;
                logAction(`Apertou: ${btnName}`);
                console.log(`Button pressed: ${btnName}`);
            });
            
            button.addEventListener('pointerup', () => {
                button.classList.remove('active');
            });
            
            button.addEventListener('pointerleave', () => {
                button.classList.remove('active');
            });
        });

        // Simulação do Analógico (Joysticks)
        const analogSticks = controllerDisplay.querySelectorAll('.analog-stick');
        analogSticks.forEach(stick => {
            const thumb = stick.querySelector('.analog-thumb');
            const stickName = stick.dataset.stick || 'Analógico';
            let isDragging = false;
            let startX, startY;
            let stickRect;

            const moveThumb = (e) => {
                if (!isDragging) return;
                e.preventDefault();

                const clientX = e.clientX || e.touches[0].clientX;
                const clientY = e.clientY || e.touches[0].clientY;

                let offsetX = clientX - stickRect.left - stickRect.width / 2;
                let offsetY = clientY - stickRect.top - stickRect.height / 2;

                const maxDistance = (stickRect.width / 2) - (thumb.offsetWidth / 2);
                const distance = Math.sqrt(offsetX * offsetX + offsetY * offsetY);

                // Mantém o thumb dentro do círculo do analógico
                if (distance > maxDistance) {
                    const angle = Math.atan2(offsetY, offsetX);
                    offsetX = Math.cos(angle) * maxDistance;
                    offsetY = Math.sin(angle) * maxDistance;
                }

                thumb.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
                
                // Exibe no log a inclinação do eixo X e Y convertida para porcentagem (-100 a 100)
                const percentX = Math.round((offsetX / maxDistance) * 100);
                const percentY = Math.round((offsetY / maxDistance) * -100); // Invertido para cima ser positivo
                
                // Atualiza o log visual com limite de spam para não travar a UI
                if (Math.abs(percentX) > 10 || Math.abs(percentY) > 10) {
                    logAction(`${stickName} [X: ${percentX}%, Y: ${percentY}%]`);
                }
            };

            stick.addEventListener('pointerdown', (e) => {
                e.preventDefault();
                isDragging = true;
                stickRect = stick.getBoundingClientRect();
                thumb.classList.add('active');
                if (navigator.vibrate) {
                    navigator.vibrate(30);
                }
                logAction(`Tocou no ${stickName}`);
                document.addEventListener('pointermove', moveThumb);
                document.addEventListener('pointerup', stopDragging);
            });

            const stopDragging = () => {
                isDragging = false;
                thumb.style.transform = `translate(0, 0)`; // Volta pro centro
                thumb.classList.remove('active');
                logAction(`Soltou o ${stickName}`);
                document.removeEventListener('pointermove', moveThumb);
                document.removeEventListener('pointerup', stopDragging);
            };
        });
    }
});
