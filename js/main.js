// --- SISTEMA INTERNO DE ALTERNÂNCIA DE ABAS ---
const linksAbas = document.querySelectorAll('.nav-link');
const conteudosAbas = document.querySelectorAll('.tab-content');

linksAbas.forEach(link => {
    link.addEventListener('click', () => {
        // Remove estado ativo de todos os botões do menu
        linksAbas.forEach(l => l.classList.remove('active'));
        // Esconde todos os conteúdos das abas
        conteudosAbas.forEach(c => c.classList.remove('active-content'));

        // Ativa o botão clicado
        link.classList.add('active');
        // Mostra a aba correspondente usando o atributo data-target
        const idAlvo = link.getAttribute('data-target');
        document.getElementById(idAlvo).classList.add('active-content');
    });
});


// --- LÓGICA DO FORMULÁRIO E GRÁFICO DINÂMICO ---
document.getElementById('form-carbono').addEventListener('submit', function(event) {
    event.preventDefault();

    const energia = parseFloat(document.getElementById('energia').value) || 0;
    const combustivel = parseFloat(document.getElementById('combustivel').value) || 0;
    const residuos = parseFloat(document.getElementById('residuos').value) || 0;

    // Cálculo aproximado em toneladas
    const totalAnualToneladas = ((energia * 0.1 + combustivel * 2.3 + residuos * 1.2) * 12) / 1000;

    const container = document.getElementById('resultado-container');
    const texto = document.getElementById('resultado-texto');
    const badge = document.getElementById('badge-status');
    const barra = document.getElementById('barra-progresso');

    let mensagemEstilizada = "";
    let porcentagemGrafico = 0;
    
    // Alvo ideal de emissão sustentável é abaixo de 3 toneladas por residência
    if (totalAnualToneladas <= 3.0) {
        badge.className = "badge-sustentavel badge-bom";
        badge.innerHTML = "<i class='fa-solid fa-circle-check'></i> Pegada de Carbono Sob Controle";
        mensagemEstilizada = `A simulação aponta uma emissão residencial estimada de <strong>${totalAnualToneladas.toFixed(2)} toneladas</strong> de CO₂ por ano. Este patamar está de acordo com as diretrizes de equilíbrio e responsabilidade ambiental estimuladas pelo Concurso Agrinho. 🌱`;
        
        // Calcula porcentagem sutil para a barra (limite máximo visual de 3 toneladas)
        porcentagemGrafico = (totalAnualToneladas / 3.0) * 40; // Fica na zona verde/baixa da barra
    } else {
        badge.className = "badge-sustentavel badge-alerta";
        badge.innerHTML = "<i class='fa-solid fa-circle-exclamation'></i> Alerta de Alta Emissão";
        mensagemEstilizada = `A simulação detectou uma emissão de <strong>${totalAnualToneladas.toFixed(2)} toneladas</strong> de CO₂ por ano. <br><br>💡 <strong>Recomendação do Campo:</strong> Para mitigar esse impacto ecológico no ecossistema, sugere-se a adoção de práticas integradas de conservação e manejo energético.`;
        
        porcentagemGrafico = Math.min((totalAnualToneladas / 10) * 100, 100); // Sobe o gráfico de acordo com o excesso
    }

    texto.innerHTML = mensagemEstilizada;
    container.classList.remove('hidden');
    
    // Força o navegador a processar a animação da barra subindo suavemente
    setTimeout(() => {
        barra.style.width = `${porcentagemGrafico}%`;
    }, 100);

    container.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
});
