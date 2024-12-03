// Array com URLs das imagens da galeria
const galeriaImagens = [
    'images/img1.jpeg',
    'images/img2.jpeg', 
    'images/img3.jpeg',
    'images/img4.jpeg',
    'images/img5.jpeg',
    'images/img6.jpeg'
];

// Array de depoimentos
const depoimentos = [
    {
        nome: "João Silva",
        foto: "https://images.unsplash.com/photo-1570295999919-56ceb5ecca61",
        texto: "Melhor barbearia da cidade! Atendimento excepcional e resultado sempre perfeito.",
        avaliacao: 5
    },
    {
        nome: "Pedro Santos",
        foto: "https://images.unsplash.com/photo-1568602471122-7832951cc4c5",
        texto: "Profissionais muito capacitados e ambiente agradável.",
        avaliacao: 5
    },
    {
        nome: "Carlos Oliveira",
        foto: "https://images.unsplash.com/photo-1599566150163-29194dcaad36",
        texto: "Preço justo e qualidade incomparável. Recomendo!",
        avaliacao: 5
    }
];

// Função para carregar depoimentos
function carregarDepoimentos() {
    const container = document.getElementById('depoimentos-container');
    if (!container) return;
    
    container.innerHTML = ''; // Limpar o container antes de adicionar
    
    depoimentos.forEach(depoimento => {
        const col = document.createElement('div');
        col.className = 'col-md-4 mb-4';
        
        const estrelas = '★'.repeat(depoimento.avaliacao) + '☆'.repeat(5 - depoimento.avaliacao);
        
        col.innerHTML = `
            <div class="depoimento-card text-center">
                <div class="depoimento-img-container mb-3">
                    <img src="${depoimento.foto}" alt="${depoimento.nome}" class="depoimento-img">
                </div>
                <h5 class="depoimento-nome">${depoimento.nome}</h5>
                <div class="text-warning mb-2 estrelas">${estrelas}</div>
                <p class="text-muted depoimento-texto">${depoimento.texto}</p>
            </div>
        `;
        
        container.appendChild(col);
    });
}

// Função para carregar galeria
function carregarGaleria() {
    const galeriaContainer = document.getElementById('galeria-fotos');
    if (!galeriaContainer) return;
    
    galeriaContainer.innerHTML = ''; // Limpar o container antes de adicionar
    
    galeriaImagens.forEach(imagem => {
        const col = document.createElement('div');
        col.className = 'col-md-4 col-sm-6 galeria-item';
        
        const img = document.createElement('img');
        img.src = imagem;
        img.alt = 'Foto da barbearia';
        img.className = 'img-fluid';
        img.loading = 'lazy';
        
        col.appendChild(img);
        galeriaContainer.appendChild(col);
    });
}

// Função para animar números
function animateNumbers() {
    const numbers = {
        clientes: { final: 1000, duration: 2000 },
        experiencia: { final: 28, duration: 1500 },
        profissionais: { final: 8, duration: 1000 }
    };

    Object.entries(numbers).forEach(([key, { final, duration }]) => {
        const element = document.getElementById(`numero-${key}`);
        if (element) {
            let start = 0;
            const increment = final / (duration / 16);
            const timer = setInterval(() => {
                start += increment;
                if (start >= final) {
                    element.textContent = final.toLocaleString();
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(start).toLocaleString();
                }
            }, 16);
        }
    });
}

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    }
});

// Inicialização
document.addEventListener('DOMContentLoaded', () => {
    // Carregar conteúdo
    carregarDepoimentos();
    carregarGaleria();
    animateNumbers();

    // Scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // WhatsApp click handler
    const whatsappLink = document.querySelector('.fa-whatsapp').parentElement;
    if (whatsappLink) {
        whatsappLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://wa.me/5511999999999', '_blank');
        });
    }
}); 