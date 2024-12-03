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

// Função para carregar depoimentos com lazy loading
function carregarDepoimentos() {
    const container = document.getElementById('depoimentos-container');
    if (!container) return;
    
    const template = depoimentos.map(depoimento => {
        const estrelas = '★'.repeat(depoimento.avaliacao) + '☆'.repeat(5 - depoimento.avaliacao);
        return `
            <div class="col-md-4 mb-4">
                <div class="depoimento-card text-center">
                    <div class="depoimento-img-container mb-3">
                        <img src="${depoimento.foto}" alt="${depoimento.nome}" class="depoimento-img" loading="lazy" width="100" height="100">
                    </div>
                    <h5 class="depoimento-nome">${depoimento.nome}</h5>
                    <div class="text-warning mb-2 estrelas">${estrelas}</div>
                    <p class="text-muted depoimento-texto">${depoimento.texto}</p>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = template;
}

// Função para carregar galeria com lazy loading
function carregarGaleria() {
    const galeriaContainer = document.getElementById('galeria-fotos');
    if (!galeriaContainer) return;
    
    const template = galeriaImagens.map(imagem => `
        <div class="col-md-4 col-sm-6">
            <div class="galeria-item">
                <img src="${imagem}" alt="Foto da barbearia" loading="lazy" />
            </div>
        </div>
    `).join('');
    
    galeriaContainer.innerHTML = template;
}

// Função otimizada para animar números usando IntersectionObserver
function setupNumberAnimation() {
    const numbers = {
        clientes: { final: 1000, duration: 2000 },
        experiencia: { final: 28, duration: 1500 },
        profissionais: { final: 8, duration: 1000 }
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                const key = element.id.replace('numero-', '');
                const { final, duration } = numbers[key];
                
                let start = 0;
                const startTime = performance.now();
                
                function animate(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const current = Math.floor(final * progress);
                    element.textContent = current.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    }
                }
                
                requestAnimationFrame(animate);
                observer.unobserve(element);
            }
        });
    }, { threshold: 0.5 });

    Object.keys(numbers).forEach(key => {
        const element = document.getElementById(`numero-${key}`);
        if (element) {
            observer.observe(element);
        }
    });
}

// Scroll suave otimizado
function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                requestAnimationFrame(() => {
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                });
            }
        });
    });
}

// Inicialização otimizada
document.addEventListener('DOMContentLoaded', () => {
    // Carregar conteúdo
    carregarDepoimentos();
    carregarGaleria();
    setupNumberAnimation();
    setupSmoothScroll();

    // WhatsApp click handler
    const whatsappLink = document.querySelector('.whatsapp-float');
    if (whatsappLink) {
        whatsappLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.open('https://wa.me/5547988231069', '_blank');
        });
    }
}); 